import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { useGameStore } from '../../store/gameStore';
import anime from 'animejs';
import * as THREE from 'three';

const currentLookAt = new THREE.Vector3(0, 1.5, 0);

export const CameraController = () => {
  const { camera } = useThree();
  const sequence = useGameStore(state => state.sequence);
  const setDialogueActive = useGameStore(state => state.setDialogueActive);
  const setSequence = useGameStore(state => state.setSequence);
  const setQuestionActive = useGameStore(state => state.setQuestionActive);
  const animatingRef = useRef(false);

  const WAYPOINTS: Record<string, {
    path?: { pos: [number, number, number]; lookAt: [number, number, number]; duration: number; easing?: string }[];
    pos?: [number, number, number];
    lookAt?: [number, number, number];
    duration?: number;
    fov?: number;
    easing?: string;
  }> = {
    CAR_ARRIVING:      { pos: [0, 1.5, 50],  lookAt: [0, 1.5, 22],   duration: 0 },
    ALIGHTING:         { pos: [0, 1.5, 8],   lookAt: [0, 1.6, -13],  duration: 2500, easing: 'easeInOutSine' },
    GREETING:          { pos: [0, 1.5, 8],   lookAt: [0, 1.6, -13],  duration: 0 },
    TRANSITION_LAB:    { 
      path: [
        { pos: [0, 1.5, -8], lookAt: [0, 1.5, -16], duration: 1200, easing: 'easeInQuad' }, // Walk straight into lobby
        { pos: [-8, 1.5, -14], lookAt: [-15, 1.5, -16], duration: 1200, easing: 'linear' }, // Turn left down hallway
        { pos: [-14, 1.5, -16], lookAt: [-15, 1.62, -21.06], duration: 1400, easing: 'easeOutQuad' } // Enter lab and look at screen
      ]
    },
    IN_LAB:            { pos: [-14, 1.5, -16], lookAt: [-15, 1.62, -21.06], duration: 0 },
    APPROACHING_SCREEN:{ pos: [-15, 1.6, -19.5], lookAt: [-15, 1.62, -21.06], duration: 2500, fov: 45, easing: 'cubicBezier(0.4, 0, 0.2, 1)' },
    QUESTION_ACTIVE:   { pos: [-15, 1.6, -19.5], lookAt: [-15, 1.62, -21.06], duration: 0, fov: 45 },
    FAREWELL_TRANSIT:  { pos: [0, 1.5, 5],   lookAt: [0, 1.6, -13],  duration: 3500, fov: 58, easing: 'easeInOutSine' },
    FAREWELL:          { pos: [0, 1.5, 5],   lookAt: [0, 1.6, -13],  duration: 0, fov: 58 },
  };

  useEffect(() => {
    const target = WAYPOINTS[sequence];
    if (!target || animatingRef.current) return;

    if (target.duration === 0) {
      if (target.pos && target.lookAt) {
        camera.position.set(...target.pos);
        currentLookAt.set(...target.lookAt);
        camera.lookAt(currentLookAt);
      }
      if (target.fov) {
        (camera as THREE.PerspectiveCamera).fov = target.fov;
        (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
      }

      if (sequence === 'GREETING') setDialogueActive(true);
      if (sequence === 'FAREWELL')  setDialogueActive(true);

      if (sequence === 'IN_LAB') {
        setTimeout(() => setSequence('APPROACHING_SCREEN'), 1800);
      }
      return;
    }

    animatingRef.current = true;
    const isPerspective = (camera as THREE.PerspectiveCamera).isPerspectiveCamera;
    const startFov = isPerspective ? (camera as THREE.PerspectiveCamera).fov : 58;
    const targetFov = target.fov || 58;

    const tweenProxy = {
      px: camera.position.x, py: camera.position.y, pz: camera.position.z,
      lx: currentLookAt.x, ly: currentLookAt.y, lz: currentLookAt.z,
      fov: startFov
    };

    const updateCamera = () => {
      camera.position.set(tweenProxy.px, tweenProxy.py, tweenProxy.pz);
      currentLookAt.set(tweenProxy.lx, tweenProxy.ly, tweenProxy.lz);
      camera.lookAt(currentLookAt);
      if (isPerspective) {
        (camera as THREE.PerspectiveCamera).fov = tweenProxy.fov;
        (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
      }
    };

    const completeAnimation = () => {
      animatingRef.current = false;
      if (sequence === 'ALIGHTING')         setSequence('GREETING');
      if (sequence === 'TRANSITION_LAB')    setSequence('IN_LAB');
      if (sequence === 'APPROACHING_SCREEN') setQuestionActive(true);
      if (sequence === 'FAREWELL_TRANSIT')  setSequence('FAREWELL');
    };

    if (target.path) {
      const tl = anime.timeline({
        targets: tweenProxy,
        update: updateCamera,
        complete: completeAnimation
      });
      target.path.forEach(step => {
        tl.add({
          px: step.pos[0], py: step.pos[1], pz: step.pos[2],
          lx: step.lookAt[0], ly: step.lookAt[1], lz: step.lookAt[2],
          duration: step.duration,
          easing: step.easing || 'linear'
        });
      });
    } else if (target.pos && target.lookAt) {
      anime({
        targets: tweenProxy,
        px: target.pos[0], py: target.pos[1], pz: target.pos[2],
        lx: target.lookAt[0], ly: target.lookAt[1], lz: target.lookAt[2],
        fov: targetFov,
        duration: target.duration,
        easing: target.easing || 'easeInOutSine',
        update: updateCamera,
        complete: completeAnimation
      });
    }
  }, [sequence]);

  return null;
};

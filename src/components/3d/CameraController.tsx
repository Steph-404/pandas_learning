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
    pos: [number, number, number];
    lookAt: [number, number, number];
    duration: number;
  }> = {
    // Exterior — camera behind/beside car watching building approach
    CAR_ARRIVING:      { pos: [0, 1.5, 50],  lookAt: [0, 1.5, 22],   duration: 0 },
    // Walk forward from car stop toward assistant at entrance
    ALIGHTING:         { pos: [0, 1.5, 8],   lookAt: [0, 1.6, -12],  duration: 5000 },
    // Face-to-face with Dr. Nwosu — dialogue starts
    GREETING:          { pos: [0, 1.5, 8],   lookAt: [0, 1.6, -12],  duration: 0 },
    // Walk through entrance into the lab office
    TRANSITION_LAB:    { pos: [0, 1.5, -10], lookAt: [0, 1.2, -28],  duration: 4000 },
    // Inside lab, settled at desk distance
    IN_LAB:            { pos: [0, 1.5, -10], lookAt: [0, 1.5, -28],  duration: 0 },
    // Zoom into monitor
    APPROACHING_SCREEN:{ pos: [0, 1.62, -22],lookAt: [0, 1.62, -35], duration: 3000 },
    // Walk back out from desk toward entrance (farewell escort)
    FAREWELL_TRANSIT:  { pos: [0, 1.5, 5],   lookAt: [0, 1.6, -12],  duration: 4000 },
    // Outside at entrance facing assistant for farewell
    FAREWELL:          { pos: [0, 1.5, 5],   lookAt: [0, 1.6, -12],  duration: 0 },
  };

  useEffect(() => {
    const target = WAYPOINTS[sequence];
    if (!target || animatingRef.current) return;

    if (target.duration === 0) {
      camera.position.set(...target.pos);
      currentLookAt.set(...target.lookAt);
      camera.lookAt(currentLookAt);

      if (sequence === 'GREETING') setDialogueActive(true);
      if (sequence === 'FAREWELL')  setDialogueActive(true);

      if (sequence === 'IN_LAB') {
        setTimeout(() => setSequence('APPROACHING_SCREEN'), 1800);
      }
      return;
    }

    animatingRef.current = true;
    const tweenProxy = {
      px: camera.position.x, py: camera.position.y, pz: camera.position.z,
      lx: currentLookAt.x, ly: currentLookAt.y, lz: currentLookAt.z,
    };

    anime({
      targets: tweenProxy,
      px: target.pos[0], py: target.pos[1], pz: target.pos[2],
      lx: target.lookAt[0], ly: target.lookAt[1], lz: target.lookAt[2],
      duration: target.duration,
      easing: 'easeInOutSine',
      update: () => {
        camera.position.set(tweenProxy.px, tweenProxy.py, tweenProxy.pz);
        currentLookAt.set(tweenProxy.lx, tweenProxy.ly, tweenProxy.lz);
        camera.lookAt(currentLookAt);
      },
      complete: () => {
        animatingRef.current = false;
        if (sequence === 'ALIGHTING')         setSequence('GREETING');
        if (sequence === 'TRANSITION_LAB')    setSequence('IN_LAB');
        if (sequence === 'APPROACHING_SCREEN') setQuestionActive(true);
        if (sequence === 'FAREWELL_TRANSIT')  setSequence('FAREWELL');
      },
    });
  }, [sequence]);

  return null;
};

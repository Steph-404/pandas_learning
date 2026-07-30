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

  // Waypoints: pos = camera position, lookAt = where camera looks
  const WAYPOINTS: Record<string, { pos: [number,number,number]; lookAt: [number,number,number]; duration: number }> = {
    // Exterior — looking at building entrance while car drives up
    CAR_ARRIVING: { pos: [0, 1.5, 50], lookAt: [0, 1.5, 20], duration: 0 },
    // Walk forward from where car stopped, face the assistant
    ALIGHTING:    { pos: [0, 1.5, 8], lookAt: [0, 1.5, 0], duration: 5000 },
    // Settled, looking at assistant — dialogue starts
    GREETING:     { pos: [0, 1.5, 8], lookAt: [0, 1.5, 0], duration: 0 },
    // Walk through entrance toward office
    TRANSITION_LAB: { pos: [0, 1.5, -10], lookAt: [0, 1.0, -18], duration: 4000 },
    // Inside lab, looking at desk from a step back
    IN_LAB:       { pos: [0, 1.5, -10], lookAt: [0, 1.5, -22], duration: 0 },
    // Zoom into monitor — screen fills view
    APPROACHING_SCREEN: { pos: [0, 1.62, -22], lookAt: [0, 1.62, -30], duration: 3500 },
  };

  useEffect(() => {
    const target = WAYPOINTS[sequence];
    if (!target || animatingRef.current) return;

    if (target.duration === 0) {
      camera.position.set(...target.pos);
      currentLookAt.set(...target.lookAt);
      camera.lookAt(currentLookAt);

      if (sequence === 'GREETING') {
        setDialogueActive(true);
      }
      if (sequence === 'IN_LAB') {
        // Short pause then zoom to screen
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
        if (sequence === 'ALIGHTING') {
          setSequence('GREETING');
        }
        if (sequence === 'TRANSITION_LAB') {
          setSequence('IN_LAB');
        }
        if (sequence === 'APPROACHING_SCREEN') {
          setQuestionActive(true);
        }
      },
    });
  }, [sequence]);

  return null;
};

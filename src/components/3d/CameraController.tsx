import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useGameStore } from '../../store/gameStore';
import anime from 'animejs';
import * as THREE from 'three';

// We keep track of the current lookAt globally outside React 
// so we can tween it smoothly along with the position.
const currentLookAt = new THREE.Vector3(0, 1.5, 0);

export const CameraController = () => {
  const { camera } = useThree();
  const sequence = useGameStore(state => state.sequence);
  const setDialogueActive = useGameStore(state => state.setDialogueActive);
  const setSequence = useGameStore(state => state.setSequence);
  
  const POSITIONS = {
    CAR_ARRIVING: { pos: [0, 1.5, 45], lookAt: [0, 1.5, 35], duration: 0 },
    ALIGHTING: { pos: [0, 1.5, 6], lookAt: [0, 1.5, 0], duration: 4000 },
    GREETING: { pos: [0, 1.5, 6], lookAt: [0, 1.5, 0], duration: 0 },
    TRANSITION_LAB: { pos: [0, 1.5, -2], lookAt: [0, 1.5, -6], duration: 2500 },
    IN_LAB: { pos: [0, 1.5, -2], lookAt: [0, 1.5, -6], duration: 0 }
  };

  useEffect(() => {
    const target = POSITIONS[sequence as keyof typeof POSITIONS];
    if (!target) return;

    if (target.duration === 0) {
      camera.position.set(target.pos[0], target.pos[1], target.pos[2]);
      currentLookAt.set(target.lookAt[0], target.lookAt[1], target.lookAt[2]);
      camera.lookAt(currentLookAt);
      
      if (sequence === 'CAR_ARRIVING') {
        // Auto start sequence: Alight from car
        setTimeout(() => setSequence('ALIGHTING'), 1000);
      }
      return;
    }

    // Create a proxy object to hold tweenable values
    const tweenProxy = {
      px: camera.position.x, py: camera.position.y, pz: camera.position.z,
      lx: currentLookAt.x, ly: currentLookAt.y, lz: currentLookAt.z
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
        if (sequence === 'ALIGHTING') {
          setSequence('GREETING');
          setDialogueActive(true);
        }
        if (sequence === 'TRANSITION_LAB') {
          setSequence('IN_LAB');
          useGameStore.getState().setQuestionActive(true);
        }
      }
    });

  }, [sequence, camera, setDialogueActive, setSequence]);

  return null;
};

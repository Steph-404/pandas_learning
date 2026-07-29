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
    ARRIVING: { pos: [0, 2, 35], lookAt: [0, 1.5, 0], duration: 0 },
    GREETING: { pos: [0, 1.5, 6], lookAt: [0, 1.5, 0], duration: 4000 },
    TRANSITION_LAB: { pos: [0, 1.5, -2], lookAt: [0, 1.5, -6], duration: 3000 },
    IN_LAB: { pos: [0, 1.5, -2], lookAt: [0, 1.5, -6], duration: 0 }
  };

  useEffect(() => {
    const target = POSITIONS[sequence as keyof typeof POSITIONS];
    if (!target) return;

    if (target.duration === 0) {
      camera.position.set(target.pos[0], target.pos[1], target.pos[2]);
      currentLookAt.set(target.lookAt[0], target.lookAt[1], target.lookAt[2]);
      camera.lookAt(currentLookAt);
      
      if (sequence === 'ARRIVING') {
        // Auto start sequence
        setTimeout(() => setSequence('GREETING'), 1000);
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
        if (sequence === 'GREETING') {
          setDialogueActive(true);
        }
        if (sequence === 'TRANSITION_LAB') {
          setSequence('IN_LAB');
          setDialogueActive(true); // Restart dialogue inside lab
        }
      }
    });

  }, [sequence, camera, setDialogueActive, setSequence]);

  return null;
};

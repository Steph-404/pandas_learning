import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '../../store/gameStore';
import { AssistantModel } from './AssistantModel';

export const AssistantCharacter = () => {
  const groupRef = useRef<THREE.Group>(null);
  const sequence = useGameStore(state => state.sequence);

  // Determine animation based on sequence
  const animation = useMemo(() => {
    switch (sequence) {
      case 'CAR_ARRIVING': return 'Idle'; 
      case 'ALIGHTING': return 'Walk'; // Walks towards building as user alights
      case 'GREETING': return 'Wave'; // Waves twice
      case 'TRANSITION_LAB': return 'Walk'; // Walks to the left lab
      case 'IN_LAB': return 'Idle';
      case 'APPROACHING_SCREEN': return 'Idle';
      case 'FAREWELL_TRANSIT': return 'Walk';
      case 'FAREWELL': return 'Wave';
      default: return 'Idle';
    }
  }, [sequence]);
  
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    
    // Animate assistant position based on sequence:
    let targetZ = 12; // Start standing away from building, closer to the road
    let targetX = 0;
    
    // Waypoint logic for entering the lab without phasing through walls
    if (sequence === 'ALIGHTING' || sequence === 'GREETING') {
      targetZ = -12; // Walks to entrance
      targetX = 0;
    } else if (sequence === 'TRANSITION_LAB' || sequence === 'IN_LAB' || sequence === 'APPROACHING_SCREEN') {
      const currentZ = groupRef.current.position.z;
      const currentX = groupRef.current.position.x;
      
      if (currentZ > -15.5 && currentX > -2) {
        // Step 1: walk straight into the lobby
        targetZ = -16;
        targetX = 0;
      } else if (currentX > -14) {
        // Step 2: walk left down the hallway
        targetZ = -16;
        targetX = -15;
      } else {
        // Step 3: enter the lab room
        targetZ = -19.5;
        targetX = -16; // Move to the side of the desk so screen is visible
      }
    } else if (sequence === 'FAREWELL_TRANSIT' || sequence === 'FAREWELL') {
      targetZ = -12;
      targetX = 0;
    }

    const prevX = groupRef.current.position.x;
    const prevZ = groupRef.current.position.z;

    // Constant speed movement instead of lerp
    const distZ = targetZ - prevZ;
    const distX = targetX - prevX;
    const dist = Math.sqrt(distX * distX + distZ * distZ);
    
    if (dist > 0.05) {
      const moveSpeed = 3.5; // Constant walking speed
      const step = Math.min(moveSpeed * delta, dist);
      groupRef.current.position.x += (distX / dist) * step;
      groupRef.current.position.z += (distZ / dist) * step;
    }
    
    // Calculate direction of movement
    const dx = groupRef.current.position.x - prevX;
    const dz = groupRef.current.position.z - prevZ;
    const speed = Math.sqrt(dx*dx + dz*dz) / delta;
    
    let targetRotation = groupRef.current.rotation.y;
    
    if (speed > 0.1) {
      // If moving, face the direction of movement (added PI to fix backward walking)
      targetRotation = Math.atan2(dx, dz) + Math.PI;
    } else {
      // If stationary, face the user
      // Player is roughly at X=-15, Z=-18 in lab, X=0, Z=8 outside
      let lookTargetX = 0;
      let lookTargetZ = 8;
      if (sequence === 'IN_LAB' || sequence === 'APPROACHING_SCREEN') {
          lookTargetX = -15;
          lookTargetZ = -18;
      }
      targetRotation = Math.atan2(lookTargetX - groupRef.current.position.x, lookTargetZ - groupRef.current.position.z) + Math.PI;
    }
    
    // Smooth rotation
    const currentRot = groupRef.current.rotation.y;
    // Handle wrap around
    let diff = targetRotation - currentRot;
    while (diff < -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;
    
    groupRef.current.rotation.y += diff * delta * 5.0;
  });

  return (
    <group ref={groupRef} position={[0, 0, 18]}>
      {/* Halo/Spotlight */}
      <pointLight position={[0, 4, 0]} color="#ffd4a0" intensity={2.0} distance={8} />

      {/* The Animated Model */}
      <AssistantModel animation={animation} scale={[0.8, 0.8, 0.8]} />

      {/* Floating name label */}
      <Float speed={2} rotationIntensity={0} floatIntensity={0.2} floatingRange={[-0.05, 0.05]}>
        <group position={[0, 3.2, 0]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.2}
            color="#1a4a8a"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.01}
            outlineColor="#ffffff"
          >
            Dr. Amara Nwosu
          </Text>
          <Text
            position={[0, -0.22, 0]}
            fontSize={0.12}
            color="#2a6aaa"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.005}
            outlineColor="#ffffff"
          >
            Senior Data Scientist
          </Text>
        </group>
      </Float>
    </group>
  );
};

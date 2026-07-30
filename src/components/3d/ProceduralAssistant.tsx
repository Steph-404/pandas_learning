import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ProceduralAssistantProps {
  animation?: 'Idle' | 'Walk' | 'Wave' | 'Sitting';
  [key: string]: any;
}

export const ProceduralAssistant = ({ animation = 'Idle', ...props }: ProceduralAssistantProps) => {
  const group = useRef<THREE.Group>(null);
  const leftLeg = useRef<THREE.Group>(null);
  const rightLeg = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);
  const body = useRef<THREE.Mesh>(null);

  const animTime = useRef(0);

  useFrame((state, delta) => {
    if (!group.current || !leftLeg.current || !rightLeg.current || !leftArm.current || !rightArm.current || !body.current) return;

    if (animation === 'Walk') {
      animTime.current += delta * 8.0; // Walk speed multiplier
      
      const swing = Math.sin(animTime.current) * 0.6;
      
      leftLeg.current.rotation.x = swing;
      rightLeg.current.rotation.x = -swing;
      
      leftArm.current.rotation.x = -swing;
      rightArm.current.rotation.x = swing;
      rightArm.current.rotation.z = 0.1; // reset wave
      
      // Slight body bobbing during walk
      body.current.position.y = 1.3 + Math.abs(Math.sin(animTime.current)) * 0.05;
      
    } else if (animation === 'Wave') {
      animTime.current += delta * 6.0;
      
      // Reset legs
      leftLeg.current.rotation.x = THREE.MathUtils.lerp(leftLeg.current.rotation.x, 0, 0.1);
      rightLeg.current.rotation.x = THREE.MathUtils.lerp(rightLeg.current.rotation.x, 0, 0.1);
      leftArm.current.rotation.x = THREE.MathUtils.lerp(leftArm.current.rotation.x, 0, 0.1);
      
      // Wave right arm
      if (animTime.current < 15) {
        rightArm.current.rotation.z = Math.sin(animTime.current) * 0.4 - 2.5; // Raised arm
        rightArm.current.rotation.x = 0;
      } else {
        rightArm.current.rotation.z = THREE.MathUtils.lerp(rightArm.current.rotation.z, 0.1, 0.1);
      }
      body.current.position.y = 1.3;
      
    } else if (animation === 'Sitting') {
      // Sitting pose
      leftLeg.current.rotation.x = -Math.PI / 2.2;
      rightLeg.current.rotation.x = -Math.PI / 2.2;
      leftArm.current.rotation.x = -0.2;
      rightArm.current.rotation.x = -0.2;
      rightArm.current.rotation.z = 0.1;
      body.current.position.y = 0.9; // Lowered body
    } else {
      // Idle
      animTime.current = 0;
      leftLeg.current.rotation.x = THREE.MathUtils.lerp(leftLeg.current.rotation.x, 0, 0.1);
      rightLeg.current.rotation.x = THREE.MathUtils.lerp(rightLeg.current.rotation.x, 0, 0.1);
      leftArm.current.rotation.x = THREE.MathUtils.lerp(leftArm.current.rotation.x, 0, 0.1);
      rightArm.current.rotation.x = THREE.MathUtils.lerp(rightArm.current.rotation.x, 0, 0.1);
      rightArm.current.rotation.z = THREE.MathUtils.lerp(rightArm.current.rotation.z, 0.1, 0.1);
      body.current.position.y = THREE.MathUtils.lerp(body.current.position.y, 1.3, 0.1);
    }
  });

  // Colors
  const coatColor = "#f0f2f5";
  const pantsColor = "#2c3e50";
  const skinColor = "#8d5524"; // warm brown skin tone
  const hairColor = "#111111";
  const shoeColor = "#333333";

  return (
    <group ref={group} {...props}>
      <group ref={body} position={[0, 1.3, 0]}>
        
        {/* Torso (Lab Coat) */}
        <mesh castShadow>
          <boxGeometry args={[0.45, 0.65, 0.25]} />
          <meshStandardMaterial color={coatColor} roughness={0.8} />
        </mesh>
        
        {/* Head */}
        <group position={[0, 0.45, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.25, 0.28, 0.25]} />
            <meshStandardMaterial color={skinColor} roughness={0.6} />
          </mesh>
          {/* Hair */}
          <mesh position={[0, 0.15, 0]} castShadow>
            <boxGeometry args={[0.27, 0.08, 0.27]} />
            <meshStandardMaterial color={hairColor} roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.05, -0.14]} castShadow>
            <boxGeometry args={[0.27, 0.2, 0.05]} />
            <meshStandardMaterial color={hairColor} roughness={0.9} />
          </mesh>
          {/* Glasses */}
          <mesh position={[0, 0.05, 0.13]}>
            <boxGeometry args={[0.26, 0.08, 0.02]} />
            <meshStandardMaterial color="#111" roughness={0.2} metalness={0.8} />
          </mesh>
        </group>
        
        {/* Left Arm */}
        <group ref={leftArm} position={[-0.3, 0.25, 0]}>
          <mesh position={[0, -0.25, 0]} castShadow>
            <boxGeometry args={[0.12, 0.5, 0.12]} />
            <meshStandardMaterial color={coatColor} roughness={0.8} />
          </mesh>
          {/* Left Hand */}
          <mesh position={[0, -0.55, 0]} castShadow>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color={skinColor} roughness={0.6} />
          </mesh>
        </group>
        
        {/* Right Arm */}
        <group ref={rightArm} position={[0.3, 0.25, 0]}>
          <mesh position={[0, -0.25, 0]} castShadow>
            <boxGeometry args={[0.12, 0.5, 0.12]} />
            <meshStandardMaterial color={coatColor} roughness={0.8} />
          </mesh>
          {/* Right Hand */}
          <mesh position={[0, -0.55, 0]} castShadow>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color={skinColor} roughness={0.6} />
          </mesh>
        </group>
        
        {/* Left Leg */}
        <group ref={leftLeg} position={[-0.12, -0.32, 0]}>
          <mesh position={[0, -0.3, 0]} castShadow>
            <boxGeometry args={[0.16, 0.6, 0.16]} />
            <meshStandardMaterial color={pantsColor} roughness={0.9} />
          </mesh>
          {/* Left Shoe */}
          <mesh position={[0, -0.65, 0.05]} castShadow>
            <boxGeometry args={[0.18, 0.1, 0.22]} />
            <meshStandardMaterial color={shoeColor} roughness={0.8} />
          </mesh>
        </group>
        
        {/* Right Leg */}
        <group ref={rightLeg} position={[0.12, -0.32, 0]}>
          <mesh position={[0, -0.3, 0]} castShadow>
            <boxGeometry args={[0.16, 0.6, 0.16]} />
            <meshStandardMaterial color={pantsColor} roughness={0.9} />
          </mesh>
          {/* Right Shoe */}
          <mesh position={[0, -0.65, 0.05]} castShadow>
            <boxGeometry args={[0.18, 0.1, 0.22]} />
            <meshStandardMaterial color={shoeColor} roughness={0.8} />
          </mesh>
        </group>

      </group>
    </group>
  );
};

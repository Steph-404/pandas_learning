import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '../../store/gameStore';

export const AssistantCharacter = () => {
  const chestRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const armLRef = useRef<THREE.Mesh>(null);
  const armRRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.PointLight>(null);

  const sequence = useGameStore(state => state.sequence);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Breathing chest
    if (chestRef.current) {
      chestRef.current.scale.y = 1 + Math.sin(t * 1.4) * 0.025;
    }
    // Gentle head bob
    if (headRef.current) {
      headRef.current.position.y = 1.72 + Math.sin(t * 1.4) * 0.012;
    }
    // Subtle arm swing
    if (armLRef.current) {
      armLRef.current.rotation.x = Math.sin(t * 0.9) * 0.07;
    }
    if (armRRef.current) {
      armRRef.current.rotation.x = -Math.sin(t * 0.9) * 0.07;
    }
    // Halo pulse
    if (haloRef.current) {
      haloRef.current.intensity = 1.0 + Math.sin(t * 2) * 0.15;
    }

    // Animate assistant position based on sequence:
    // During FAREWELL_TRANSIT/FAREWELL: she walks back to entrance
    if (groupRef.current) {
      let targetZ = -13; // default: standing at entrance
      if (sequence === 'FAREWELL_TRANSIT' || sequence === 'FAREWELL') {
        targetZ = -12; // slightly closer to camera for farewell
      }
      // Smooth lerp toward target z
      groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.04;
    }
  });

  const skinColor = '#c8956c';
  const shirtColor = '#2d5fa6';
  const pantsColor = '#1c2a3a';
  const glassColor = '#aaccee';
  const shoeColor = '#2a1a0a';
  const hairColor = '#1a1008';
  const coatColor = '#1d3a6a';

  return (
    // Start at entrance z:-13, face toward camera (+Z direction)
    <group ref={groupRef} position={[0, 0, -13]}>
      {/* Warm halo above head */}
      <pointLight ref={haloRef} position={[0, 3.2, 0]} color="#ffd4a0" intensity={1.0} distance={6} />

      {/* Shoes */}
      <mesh position={[-0.16, 0.07, 0]} castShadow>
        <boxGeometry args={[0.17, 0.12, 0.32]} />
        <meshStandardMaterial color={shoeColor} roughness={0.8} />
      </mesh>
      <mesh position={[0.16, 0.07, 0]} castShadow>
        <boxGeometry args={[0.17, 0.12, 0.32]} />
        <meshStandardMaterial color={shoeColor} roughness={0.8} />
      </mesh>

      {/* Trousers */}
      <mesh position={[-0.15, 0.52, 0]} castShadow>
        <boxGeometry args={[0.23, 0.75, 0.24]} />
        <meshStandardMaterial color={pantsColor} roughness={0.9} />
      </mesh>
      <mesh position={[0.15, 0.52, 0]} castShadow>
        <boxGeometry args={[0.23, 0.75, 0.24]} />
        <meshStandardMaterial color={pantsColor} roughness={0.9} />
      </mesh>

      {/* Shirt torso */}
      <mesh ref={chestRef} position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[0.58, 0.62, 0.28]} />
        <meshStandardMaterial color={shirtColor} roughness={0.85} />
      </mesh>

      {/* Lab coat over shirt */}
      <mesh position={[0, 1.1, -0.02]} castShadow>
        <boxGeometry args={[0.66, 0.64, 0.26]} />
        <meshStandardMaterial color={coatColor} roughness={0.9} transparent opacity={0.55} />
      </mesh>

      {/* Left arm */}
      <mesh ref={armLRef} position={[-0.42, 1.08, 0]} castShadow>
        <boxGeometry args={[0.18, 0.58, 0.18]} />
        <meshStandardMaterial color={coatColor} roughness={0.9} />
      </mesh>

      {/* Right arm */}
      <mesh ref={armRRef} position={[0.42, 1.08, 0]} castShadow>
        <boxGeometry args={[0.18, 0.58, 0.18]} />
        <meshStandardMaterial color={coatColor} roughness={0.9} />
      </mesh>

      {/* Left hand */}
      <mesh position={[-0.42, 0.74, 0]} castShadow>
        <boxGeometry args={[0.14, 0.12, 0.12]} />
        <meshStandardMaterial color={skinColor} roughness={0.8} />
      </mesh>

      {/* Right hand */}
      <mesh position={[0.42, 0.74, 0]} castShadow>
        <boxGeometry args={[0.14, 0.12, 0.12]} />
        <meshStandardMaterial color={skinColor} roughness={0.8} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.52, 0]} castShadow>
        <boxGeometry args={[0.16, 0.18, 0.16]} />
        <meshStandardMaterial color={skinColor} roughness={0.8} />
      </mesh>

      {/* Head */}
      <mesh ref={headRef} position={[0, 1.72, 0]} castShadow>
        <boxGeometry args={[0.38, 0.42, 0.35]} />
        <meshStandardMaterial color={skinColor} roughness={0.75} />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 1.93, 0]} castShadow>
        <boxGeometry args={[0.40, 0.16, 0.37]} />
        <meshStandardMaterial color={hairColor} roughness={0.95} />
      </mesh>
      {/* Hair back */}
      <mesh position={[0, 1.74, 0.19]} castShadow>
        <boxGeometry args={[0.38, 0.36, 0.04]} />
        <meshStandardMaterial color={hairColor} roughness={0.95} />
      </mesh>

      {/* Glasses left lens */}
      <mesh position={[-0.10, 1.73, -0.18]}>
        <boxGeometry args={[0.12, 0.08, 0.02]} />
        <meshStandardMaterial color={glassColor} transparent opacity={0.55} metalness={0.2} />
      </mesh>

      {/* Glasses right lens */}
      <mesh position={[0.10, 1.73, -0.18]}>
        <boxGeometry args={[0.12, 0.08, 0.02]} />
        <meshStandardMaterial color={glassColor} transparent opacity={0.55} metalness={0.2} />
      </mesh>

      {/* Glasses bridge */}
      <mesh position={[0, 1.73, -0.18]}>
        <boxGeometry args={[0.06, 0.02, 0.02]} />
        <meshStandardMaterial color="#888" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Name badge */}
      <mesh position={[0.18, 1.12, -0.15]}>
        <boxGeometry args={[0.16, 0.10, 0.01]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>

      {/* Floating name label */}
      <Text
        position={[0, 2.25, 0]}
        fontSize={0.14}
        color="#1a4a8a"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.006}
        outlineColor="#ffffff"
      >
        Dr. Amara Nwosu
      </Text>
      <Text
        position={[0, 2.08, 0]}
        fontSize={0.085}
        color="#2a6aaa"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.004}
        outlineColor="#ffffff"
      >
        Senior Data Scientist
      </Text>
    </group>
  );
};

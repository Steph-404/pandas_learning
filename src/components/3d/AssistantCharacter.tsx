import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export const AssistantCharacter = () => {
  const chestRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const armLRef = useRef<THREE.Mesh>(null);
  const armRRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // Chest breathing
    if (chestRef.current) {
      chestRef.current.scale.y = 1 + Math.sin(t * 1.4) * 0.025;
    }
    // Gentle head bob
    if (headRef.current) {
      headRef.current.position.y = 1.72 + Math.sin(t * 1.4) * 0.012;
    }
    // Subtle arm swing
    if (armLRef.current) {
      armLRef.current.rotation.x = Math.sin(t * 0.8) * 0.06;
    }
    if (armRRef.current) {
      armRRef.current.rotation.x = -Math.sin(t * 0.8) * 0.06;
    }
    // Warm halo pulse
    if (haloRef.current) {
      haloRef.current.intensity = 1.5 + Math.sin(t * 2) * 0.2;
    }
  });

  const skinColor = '#c8956c';
  const shirtColor = '#2d5fa6';
  const pantsColor = '#1c2a3a';
  const glassColor = '#aaccee';
  const shoeColor = '#1a1a1a';
  const hairColor = '#1a1008';
  const coatColor = '#1d3a6a';

  return (
    <group position={[0, 0, 0]}>
      {/* Warm halo light above assistant */}
      <pointLight ref={haloRef} position={[0, 3.2, 0]} color="#ffd080" intensity={1.5} distance={5} />

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

      {/* Shirt / torso */}
      <mesh ref={chestRef} position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[0.58, 0.62, 0.28]} />
        <meshStandardMaterial color={shirtColor} roughness={0.85} />
      </mesh>

      {/* Lab coat / jacket */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[0.66, 0.64, 0.30]} />
        <meshStandardMaterial color={coatColor} roughness={0.9} transparent opacity={0.6} />
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
      <mesh position={[0, 1.92, 0]} castShadow>
        <boxGeometry args={[0.40, 0.16, 0.37]} />
        <meshStandardMaterial color={hairColor} roughness={0.95} />
      </mesh>

      {/* Glasses — left lens */}
      <mesh position={[-0.10, 1.73, -0.18]}>
        <boxGeometry args={[0.12, 0.08, 0.02]} />
        <meshStandardMaterial color={glassColor} transparent opacity={0.55} metalness={0.2} />
      </mesh>

      {/* Glasses — right lens */}
      <mesh position={[0.10, 1.73, -0.18]}>
        <boxGeometry args={[0.12, 0.08, 0.02]} />
        <meshStandardMaterial color={glassColor} transparent opacity={0.55} metalness={0.2} />
      </mesh>

      {/* Glasses — bridge */}
      <mesh position={[0, 1.73, -0.18]}>
        <boxGeometry args={[0.06, 0.02, 0.02]} />
        <meshStandardMaterial color="#888" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Name badge */}
      <mesh position={[0.18, 1.12, -0.16]}>
        <boxGeometry args={[0.16, 0.10, 0.01]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
      </mesh>

      {/* Name tag text */}
      <Text
        position={[0, 2.22, 0]}
        fontSize={0.12}
        color="#64c8ff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.005}
        outlineColor="#001a2a"
      >
        Dr. Amara Nwosu
      </Text>
      <Text
        position={[0, 2.07, 0]}
        fontSize={0.075}
        color="#aaddff"
        anchorX="center"
        anchorY="middle"
      >
        Senior Data Scientist
      </Text>
    </group>
  );
};

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../../store/gameStore';

interface ProceduralCarProps {
  onArrived?: () => void;
}

export const ProceduralCar = ({ onArrived }: ProceduralCarProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const wheelFLRef = useRef<THREE.Mesh>(null);
  const wheelFRRef = useRef<THREE.Mesh>(null);
  const wheelBLRef = useRef<THREE.Mesh>(null);
  const wheelBRRef = useRef<THREE.Mesh>(null);

  const sequence = useGameStore(state => state.sequence);
  const arrivedRef = useRef(false);
  const startZ = 70;
  const stopZ = 20;
  const speed = useRef(0.18); // starts fast, decelerates

  useFrame(() => {
    if (!groupRef.current) return;
    if (sequence !== 'CAR_ARRIVING') return;
    if (arrivedRef.current) return;

    const currentZ = groupRef.current.position.z;
    const distLeft = currentZ - stopZ;
    
    // Decelerate as we approach
    if (distLeft < 18) {
      speed.current = Math.max(0.008, distLeft * 0.012);
    }

    if (distLeft <= 0.05) {
      arrivedRef.current = true;
      groupRef.current.position.z = stopZ;
      onArrived?.();
      return;
    }

    groupRef.current.position.z -= speed.current;

    // Spin wheels proportional to speed
    const spin = speed.current * 0.6;
    [wheelFLRef, wheelFRRef, wheelBLRef, wheelBRRef].forEach(ref => {
      if (ref.current) ref.current.rotation.x -= spin;
    });
  });

  // Car body colors
  const bodyColor = '#1a2a3a';
  const glassColor = '#8ab4d4';
  const wheelColor = '#1a1a1a';
  const rimColor = '#aaaaaa';
  const lightColor = '#ffffee';

  return (
    <group ref={groupRef} position={[0, 0, startZ]} rotation={[0, Math.PI, 0]}>
      {/* Headlights */}
      <pointLight position={[-0.7, 0.5, -2.2]} color="#fff5cc" intensity={3} distance={18} castShadow />
      <pointLight position={[0.7, 0.5, -2.2]} color="#fff5cc" intensity={3} distance={18} castShadow />

      {/* Main body */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={[1.9, 0.55, 4.2]} />
        <meshStandardMaterial color={bodyColor} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Cabin roof */}
      <mesh position={[0, 1.08, 0.1]} castShadow>
        <boxGeometry args={[1.72, 0.52, 2.2]} />
        <meshStandardMaterial color={bodyColor} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 1.0, -0.96]}>
        <boxGeometry args={[1.6, 0.44, 0.05]} />
        <meshStandardMaterial color={glassColor} transparent opacity={0.55} metalness={0.1} roughness={0} />
      </mesh>

      {/* Rear window */}
      <mesh position={[0, 1.0, 1.22]}>
        <boxGeometry args={[1.6, 0.44, 0.05]} />
        <meshStandardMaterial color={glassColor} transparent opacity={0.45} metalness={0.1} roughness={0} />
      </mesh>

      {/* Side windows */}
      {[-0.87, 0.87].map((x, i) => (
        <mesh key={i} position={[x, 1.05, 0.1]}>
          <boxGeometry args={[0.05, 0.38, 1.8]} />
          <meshStandardMaterial color={glassColor} transparent opacity={0.45} metalness={0.1} roughness={0} />
        </mesh>
      ))}

      {/* Hood */}
      <mesh position={[0, 0.72, -1.85]} castShadow>
        <boxGeometry args={[1.88, 0.14, 0.6]} />
        <meshStandardMaterial color={bodyColor} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Headlight clusters */}
      {[-0.6, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 0.55, -2.12]}>
          <boxGeometry args={[0.4, 0.18, 0.05]} />
          <meshStandardMaterial color={lightColor} emissive={lightColor} emissiveIntensity={2} />
        </mesh>
      ))}

      {/* Tail lights */}
      {[-0.6, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 0.55, 2.12]}>
          <boxGeometry args={[0.4, 0.18, 0.05]} />
          <meshStandardMaterial color="#ff2200" emissive="#ff2200" emissiveIntensity={1.5} />
        </mesh>
      ))}

      {/* Front bumper */}
      <mesh position={[0, 0.2, -2.15]} castShadow>
        <boxGeometry args={[1.85, 0.24, 0.12]} />
        <meshStandardMaterial color="#555" metalness={0.8} roughness={0.4} />
      </mesh>

      {/* Rear bumper */}
      <mesh position={[0, 0.2, 2.15]} castShadow>
        <boxGeometry args={[1.85, 0.24, 0.12]} />
        <meshStandardMaterial color="#555" metalness={0.8} roughness={0.4} />
      </mesh>

      {/* Wheels — FL */}
      <group position={[-0.98, 0.28, -1.3]}>
        <mesh ref={wheelFLRef} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.22, 16]} />
          <meshStandardMaterial color={wheelColor} roughness={0.9} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.16, 0.16, 0.23, 8]} />
          <meshStandardMaterial color={rimColor} metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Wheels — FR */}
      <group position={[0.98, 0.28, -1.3]}>
        <mesh ref={wheelFRRef} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.22, 16]} />
          <meshStandardMaterial color={wheelColor} roughness={0.9} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.16, 0.16, 0.23, 8]} />
          <meshStandardMaterial color={rimColor} metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Wheels — BL */}
      <group position={[-0.98, 0.28, 1.3]}>
        <mesh ref={wheelBLRef} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.22, 16]} />
          <meshStandardMaterial color={wheelColor} roughness={0.9} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.16, 0.16, 0.23, 8]} />
          <meshStandardMaterial color={rimColor} metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Wheels — BR */}
      <group position={[0.98, 0.28, 1.3]}>
        <mesh ref={wheelBRRef} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.22, 16]} />
          <meshStandardMaterial color={wheelColor} roughness={0.9} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.16, 0.16, 0.23, 8]} />
          <meshStandardMaterial color={rimColor} metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
};

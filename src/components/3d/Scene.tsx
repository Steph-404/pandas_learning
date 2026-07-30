import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { CameraController } from './CameraController';
import { ProceduralCar } from './ProceduralCar';
import { AssistantCharacter } from './AssistantCharacter';
import { OfficeLab } from './OfficeLab';
import { useGameStore } from '../../store/gameStore';

// The exterior environment — road, building facade, entrance
const ExteriorEnvironment = () => {
  return (
    <group>
      {/* Road / ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 25]} receiveShadow>
        <planeGeometry args={[12, 70]} />
        <meshStandardMaterial color="#0a0e14" roughness={0.95} />
      </mesh>

      {/* Road center-line markings */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 5 + i * 5]}>
          <planeGeometry args={[0.12, 2.0]} />
          <meshStandardMaterial color="#eecc44" emissive="#eecc44" emissiveIntensity={0.6} />
        </mesh>
      ))}

      {/* Wide ground plane beyond road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#080c12" roughness={1} />
      </mesh>

      {/* Pavement / sidewalk leading to building */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, -6]} receiveShadow>
        <planeGeometry args={[10, 20]} />
        <meshStandardMaterial color="#101822" roughness={0.9} />
      </mesh>

      {/* Building facade */}
      <mesh position={[0, 3, -17]} receiveShadow castShadow>
        <boxGeometry args={[16, 10, 0.4]} />
        <meshStandardMaterial color="#0a1520" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Building window grid — lit offices */}
      {[[-4, 5], [0, 5], [4, 5], [-4, 3], [0, 3], [4, 3], [-4, 1], [0, 1], [4, 1]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, -16.7]}>
          <boxGeometry args={[1.4, 1.0, 0.05]} />
          <meshStandardMaterial
            color="#102040"
            emissive={i % 3 === 0 ? '#3060a0' : i % 3 === 1 ? '#204060' : '#1a88ff'}
            emissiveIntensity={0.8 + (i % 2) * 0.4}
          />
        </mesh>
      ))}

      {/* Entrance overhang */}
      <mesh position={[0, 2.6, -12.5]} castShadow>
        <boxGeometry args={[6, 0.2, 4]} />
        <meshStandardMaterial color="#0f1d30" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Overhang support pillars */}
      {[-2.6, 2.6].map((x, i) => (
        <mesh key={i} position={[x, 1.2, -12.5]} castShadow>
          <boxGeometry args={[0.18, 2.4, 0.18]} />
          <meshStandardMaterial color="#0a1520" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}

      {/* Entrance door frame */}
      <mesh position={[0, 1.2, -16.6]}>
        <boxGeometry args={[2.4, 2.8, 0.12]} />
        <meshStandardMaterial color="#0d1e32" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* Door glass */}
      <mesh position={[0, 1.15, -16.5]}>
        <boxGeometry args={[2.0, 2.4, 0.04]} />
        <meshStandardMaterial color="#4488cc" transparent opacity={0.35} metalness={0.2} roughness={0} />
      </mesh>

      {/* Entrance ground lights */}
      <pointLight position={[-2, 0.5, -14]} color="#aaccff" intensity={1.5} distance={6} />
      <pointLight position={[2, 0.5, -14]} color="#aaccff" intensity={1.5} distance={6} />

      {/* Street lamps */}
      {[[-5, 15], [5, 15], [-5, 30], [5, 30]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 2.2, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.08, 4.4, 6]} />
            <meshStandardMaterial color="#1a2a3a" roughness={0.8} />
          </mesh>
          <mesh position={[0, 4.5, 0]}>
            <boxGeometry args={[0.4, 0.15, 0.4]} />
            <meshStandardMaterial color="#ffffcc" emissive="#ffffcc" emissiveIntensity={2} />
          </mesh>
          <pointLight position={[0, 4.4, 0]} color="#fff5aa" intensity={2} distance={10} />
        </group>
      ))}

      {/* Distant city glow on horizon */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, -80]}>
        <planeGeometry args={[200, 20]} />
        <meshStandardMaterial color="#101828" emissive="#1a3060" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
};

// Handles the car arriving and triggering the alighting sequence
const CarSequence = () => {
  const sequence = useGameStore(state => state.sequence);
  const setSequence = useGameStore(state => state.setSequence);

  const handleArrived = () => {
    setTimeout(() => setSequence('ALIGHTING'), 800);
  };

  if (sequence === 'COMPLETED') return null;

  return <ProceduralCar onArrived={handleArrived} />;
};

export const Scene: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', backgroundColor: '#000' }}>
      <Canvas
        shadows
        camera={{ fov: 60, near: 0.1, far: 500 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#040810']} />
        <Stars radius={120} depth={60} count={4000} factor={4} saturation={0} fade speed={0.5} />

        {/* Ambient + directional lighting */}
        <ambientLight intensity={0.08} color="#2040a0" />
        <directionalLight
          castShadow
          position={[8, 14, 10]}
          intensity={0.4}
          color="#7090d0"
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={120}
          shadow-camera-left={-30}
          shadow-camera-right={30}
          shadow-camera-top={30}
          shadow-camera-bottom={-30}
        />

        <CameraController />
        <ExteriorEnvironment />

        {/* Car */}
        <Suspense fallback={null}>
          <CarSequence />
        </Suspense>

        {/* Assistant — visible from exterior */}
        <Suspense fallback={null}>
          <AssistantCharacter />
        </Suspense>

        {/* Office Lab — positioned behind entrance */}
        <Suspense fallback={null}>
          <OfficeLab />
        </Suspense>
      </Canvas>
      {children}
    </div>
  );
};

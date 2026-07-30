import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { CameraController } from './CameraController';
import { ProceduralCar } from './ProceduralCar';
import { AssistantCharacter } from './AssistantCharacter';
import { OfficeLab } from './OfficeLab';
import { useGameStore } from '../../store/gameStore';

// The exterior environment — road, building facade, entrance
const ExteriorEnvironment = () => {
  return (
    <group>
      {/* Wide ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#8a9e6a" roughness={1} />
      </mesh>

      {/* Road surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0, 25]} receiveShadow>
        <planeGeometry args={[10, 80]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.95} />
      </mesh>

      {/* Road center-line markings */}
      {Array.from({ length: 14 }).map((_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 55 - i * 5]}>
          <planeGeometry args={[0.14, 2.2]} />
          <meshStandardMaterial color="#e8d040" />
        </mesh>
      ))}

      {/* Pavement / forecourt in front of building */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -8]} receiveShadow>
        <planeGeometry args={[20, 24]} />
        <meshStandardMaterial color="#c8c0b0" roughness={0.85} />
      </mesh>

      {/* Building facade */}
      <mesh position={[0, 4.5, -18]} receiveShadow castShadow>
        <boxGeometry args={[20, 12, 0.5]} />
        <meshStandardMaterial color="#e0dbd0" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Building window grid */}
      {[
        [-5, 7], [0, 7], [5, 7],
        [-5, 5], [0, 5], [5, 5],
        [-5, 3], [0, 3], [5, 3],
      ].map(([x, y], i) => (
        <group key={i} position={[x, y, -17.6]}>
          {/* Window frame */}
          <mesh>
            <boxGeometry args={[1.6, 1.1, 0.08]} />
            <meshStandardMaterial color="#4a4a4a" metalness={0.5} roughness={0.5} />
          </mesh>
          {/* Window glass */}
          <mesh position={[0, 0, 0.05]}>
            <boxGeometry args={[1.4, 0.95, 0.04]} />
            <meshStandardMaterial color="#90c4d4" transparent opacity={0.6} metalness={0.3} roughness={0} />
          </mesh>
        </group>
      ))}

      {/* Building sign */}
      <mesh position={[0, 9.2, -17.6]}>
        <boxGeometry args={[8, 1.0, 0.1]} />
        <meshStandardMaterial color="#1a3a6a" />
      </mesh>

      {/* Entrance overhang */}
      <mesh position={[0, 3.0, -13]} castShadow receiveShadow>
        <boxGeometry args={[7, 0.25, 5]} />
        <meshStandardMaterial color="#c8c0b4" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Support pillars */}
      {[-3, 3].map((x, i) => (
        <mesh key={i} position={[x, 1.5, -13]} castShadow>
          <boxGeometry args={[0.22, 3.0, 0.22]} />
          <meshStandardMaterial color="#b8b0a4" roughness={0.7} />
        </mesh>
      ))}

      {/* Entrance door frame */}
      <mesh position={[0, 1.4, -17.6]}>
        <boxGeometry args={[2.8, 3.2, 0.15]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Door glass */}
      <mesh position={[0, 1.35, -17.5]}>
        <boxGeometry args={[2.4, 2.8, 0.05]} />
        <meshStandardMaterial color="#90c4d4" transparent opacity={0.4} metalness={0.3} roughness={0} />
      </mesh>

      {/* Street lamps */}
      {[[-5, 20], [5, 20], [-5, 35], [5, 35], [-5, 50], [5, 50]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 2.5, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.10, 5, 6]} />
            <meshStandardMaterial color="#888" roughness={0.7} metalness={0.3} />
          </mesh>
          <mesh position={[0.5, 5.0, 0]}>
            <boxGeometry args={[0.5, 0.18, 0.5]} />
            <meshStandardMaterial color="#aaa" roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* Grass patches */}
      {[[-8, -5], [8, -5], [-12, 10], [12, 10]].map(([x, z], i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.01, z]}>
          <planeGeometry args={[5, 8]} />
          <meshStandardMaterial color="#5a8a3a" roughness={1} />
        </mesh>
      ))}
    </group>
  );
};

const CarSequence = () => {
  const sequence = useGameStore(state => state.sequence);
  const setSequence = useGameStore(state => state.setSequence);

  const handleArrived = () => {
    setTimeout(() => setSequence('ALIGHTING'), 800);
  };

  if (sequence === 'FAREWELL_TRANSIT' || sequence === 'FAREWELL' || sequence === 'COMPLETED') {
    return null;
  }

  return <ProceduralCar onArrived={handleArrived} />;
};

export const Scene: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', backgroundColor: '#87CEEB' }}>
      <Canvas
        shadows
        camera={{ fov: 58, near: 0.1, far: 600 }}
        gl={{ antialias: true }}
      >
        {/* ── DAYTIME SKY (procedural — like the well folder) ── */}
        <Sky
          distance={450000}
          sunPosition={[100, 80, -100]}
          inclination={0.49}
          azimuth={0.25}
          turbidity={2}
          rayleigh={0.4}
          mieCoefficient={0.003}
          mieDirectionalG={0.8}
        />

        {/* ── DAYTIME LIGHTING ── */}
        <ambientLight intensity={1.2} color="#fff8f0" />
        <directionalLight
          castShadow
          position={[60, 120, 40]}
          intensity={3.5}
          color="#fff5e0"
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={200}
          shadow-camera-left={-60}
          shadow-camera-right={60}
          shadow-camera-top={60}
          shadow-camera-bottom={-60}
        />
        {/* Soft sky fill light from above */}
        <hemisphereLight args={['#9bbfff', '#6a8a50', 0.8]} />

        <CameraController />
        <ExteriorEnvironment />

        <Suspense fallback={null}>
          <CarSequence />
        </Suspense>

        <Suspense fallback={null}>
          <AssistantCharacter />
        </Suspense>

        <Suspense fallback={null}>
          <OfficeLab />
        </Suspense>
      </Canvas>

      {children}
    </div>
  );
};

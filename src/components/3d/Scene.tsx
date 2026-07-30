import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { CameraController } from './CameraController';
import { ProceduralCar } from './ProceduralCar';
import { AssistantCharacter } from './AssistantCharacter';
import { OfficeLab } from './OfficeLab';
import { useGameStore } from '../../store/gameStore';

// Exterior environment — road, forecourt, building
const ExteriorEnvironment = () => {
  return (
    <group>
      {/* Wide ground — green-ish grass/tarmac */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial color="#7a9a5a" roughness={1} />
      </mesh>

      {/* Road surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0, 30]} receiveShadow>
        <planeGeometry args={[10, 100]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.95} />
      </mesh>

      {/* Road center-line markings */}
      {Array.from({ length: 16 }).map((_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 60 - i * 5.5]}>
          <planeGeometry args={[0.14, 2.2]} />
          <meshStandardMaterial color="#e8d040" />
        </mesh>
      ))}

      {/* Forecourt / pavement */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -8]} receiveShadow>
        <planeGeometry args={[24, 28]} />
        <meshStandardMaterial color="#cec8bc" roughness={0.85} />
      </mesh>

      {/* Building — main facade */}
      <mesh position={[0, 5, -20]} receiveShadow castShadow>
        <boxGeometry args={[24, 14, 0.6]} />
        <meshStandardMaterial color="#e0dbd0" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Building — side wings */}
      <mesh position={[-14, 3.5, -16]} receiveShadow castShadow>
        <boxGeometry args={[4, 10, 8]} />
        <meshStandardMaterial color="#d8d2c8" roughness={0.7} />
      </mesh>
      <mesh position={[14, 3.5, -16]} receiveShadow castShadow>
        <boxGeometry args={[4, 10, 8]} />
        <meshStandardMaterial color="#d8d2c8" roughness={0.7} />
      </mesh>

      {/* Window grid */}
      {[
        [-6, 8], [0, 8], [6, 8],
        [-6, 5.5], [0, 5.5], [6, 5.5],
        [-6, 3], [0, 3], [6, 3],
      ].map(([x, y], i) => (
        <group key={i} position={[x, y, -19.6]}>
          <mesh>
            <boxGeometry args={[2.0, 1.4, 0.1]} />
            <meshStandardMaterial color="#4a4a4a" metalness={0.5} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.06]}>
            <boxGeometry args={[1.75, 1.18, 0.04]} />
            <meshStandardMaterial color="#9fc8d8" transparent opacity={0.6} metalness={0.4} roughness={0} />
          </mesh>
        </group>
      ))}

      {/* Building name sign */}
      <mesh position={[0, 10.5, -19.6]}>
        <boxGeometry args={[10, 1.2, 0.12]} />
        <meshStandardMaterial color="#1a3a6a" />
      </mesh>

      {/* Entrance overhang */}
      <mesh position={[0, 3.2, -14]} castShadow receiveShadow>
        <boxGeometry args={[8, 0.3, 6]} />
        <meshStandardMaterial color="#c8c0b4" roughness={0.7} metalness={0.15} />
      </mesh>

      {/* Support pillars */}
      {[-3.6, 3.6].map((x, i) => (
        <mesh key={i} position={[x, 1.6, -14]} castShadow>
          <boxGeometry args={[0.28, 3.2, 0.28]} />
          <meshStandardMaterial color="#b8b0a4" roughness={0.7} />
        </mesh>
      ))}

      {/* Entrance door frame */}
      <mesh position={[0, 1.55, -19.7]}>
        <boxGeometry args={[3.2, 3.8, 0.2]} />
        <meshStandardMaterial color="#333" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Door glass */}
      <mesh position={[0, 1.45, -19.55]}>
        <boxGeometry args={[2.7, 3.3, 0.06]} />
        <meshStandardMaterial color="#90c4d4" transparent opacity={0.45} metalness={0.4} roughness={0} />
      </mesh>

      {/* Street lamps */}
      {[[-5.5, 18], [5.5, 18], [-5.5, 32], [5.5, 32], [-5.5, 46], [5.5, 46]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 2.8, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.12, 5.6, 7]} />
            <meshStandardMaterial color="#888" roughness={0.6} metalness={0.4} />
          </mesh>
          <mesh position={[0.6, 5.7, 0]}>
            <boxGeometry args={[0.6, 0.22, 0.6]} />
            <meshStandardMaterial color="#aaa" roughness={0.4} metalness={0.3} />
          </mesh>
          {/* Arm */}
          <mesh position={[0.3, 5.6, 0]}>
            <boxGeometry args={[0.6, 0.06, 0.06]} />
            <meshStandardMaterial color="#999" roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* Grass verges */}
      {[[-9, -6], [9, -6], [-16, 14], [16, 14], [-22, 28], [22, 28]].map(([x, z], i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.01, z]}>
          <planeGeometry args={[8, 12]} />
          <meshStandardMaterial color="#5a8a3a" roughness={1} />
        </mesh>
      ))}

      {/* Distant trees (simple cones + cylinders) */}
      {[[-25, 20], [-28, 35], [25, 25], [28, 40], [-30, 50], [30, 50]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 1.8, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.3, 3.6, 6]} />
            <meshStandardMaterial color="#5a4030" roughness={0.9} />
          </mesh>
          <mesh position={[0, 5.2, 0]} castShadow>
            <coneGeometry args={[2.2, 5, 8]} />
            <meshStandardMaterial color="#2d6e28" roughness={0.95} />
          </mesh>
          <mesh position={[0, 3.8, 0]} castShadow>
            <coneGeometry args={[1.6, 3.5, 7]} />
            <meshStandardMaterial color="#348030" roughness={0.95} />
          </mesh>
        </group>
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

  const isCarVisible = ['CAR_ARRIVING', 'ALIGHTING', 'GREETING', 'TRANSITION_LAB'].includes(sequence);
  if (!isCarVisible) return null;

  return <ProceduralCar onArrived={handleArrived} />;
};

export const Scene: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', backgroundColor: '#87CEEB' }}>
      <Canvas
        shadows
        camera={{ fov: 58, near: 0.1, far: 800 }}
        gl={{ antialias: true }}
      >
        {/* ── DAYTIME PROCEDURAL SKY (Rayleigh scattering — matches well/ folder) ── */}
        <Sky
          distance={450000}
          sunPosition={[80, 60, -120]}
          inclination={0.49}
          azimuth={0.25}
          turbidity={1.8}
          rayleigh={0.3}
          mieCoefficient={0.003}
          mieDirectionalG={0.85}
        />

        {/* Image-based environment lighting — adds realistic reflections */}
        <Environment preset="park" />

        {/* ── DAYTIME LIGHTING ── */}
        <ambientLight intensity={1.4} color="#fff8f0" />
        <directionalLight
          castShadow
          position={[80, 140, -100]}
          intensity={4.0}
          color="#fff5e0"
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={250}
          shadow-camera-left={-80}
          shadow-camera-right={80}
          shadow-camera-top={80}
          shadow-camera-bottom={-80}
        />
        {/* Sky fill light */}
        <hemisphereLight args={['#9bbfff', '#6a8a40', 1.0]} />

        {/* ── SCENE COMPONENTS ── */}
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

        {/* ── POST-PROCESSING EFFECTS ── */}
        <EffectComposer enableNormalPass={false}>
          <Bloom
            luminanceThreshold={0.8}
            luminanceSmoothing={0.9}
            intensity={0.6}
            mipmapBlur
          />
          <Vignette
            offset={0.08}
            darkness={0.6}
          />
        </EffectComposer>
      </Canvas>

      {children}
    </div>
  );
};

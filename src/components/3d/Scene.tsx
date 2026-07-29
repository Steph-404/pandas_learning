import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { CameraController } from './CameraController';
import { useAssets } from './AssetManager';

const NarrativeAssets = () => {
  const { vehicleTex, assistantTex } = useAssets();
  const vehicleRef = useRef<THREE.Group>(null);
  const assistantRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (vehicleRef.current) {
      // Gentle hover/idle for vehicle
      vehicleRef.current.position.y = 3 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
    if (assistantRef.current) {
      // Gentle breathing/bobbing for assistant
      assistantRef.current.position.y = 1.5 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    }
  });

  return (
    <>
      {/* Vehicle Billboard in Arrival Zone */}
      <group ref={vehicleRef} position={[0, 3, 35]}>
        <Billboard position={[0, 0, 0]}>
          <mesh>
            <planeGeometry args={[8, 8]} />
            <meshBasicMaterial 
              map={vehicleTex} 
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              transparent={true}
            />
          </mesh>
        </Billboard>
      </group>

      {/* Assistant Billboard in Greeting Zone */}
      <group ref={assistantRef} position={[0, 1.5, 0]}>
        <Billboard position={[0, 0, 0]}>
          <mesh>
            <planeGeometry args={[4, 4]} />
            <meshBasicMaterial 
              map={assistantTex} 
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              transparent={true}
            />
          </mesh>
        </Billboard>
      </group>
    </>
  );
};

const FieldStation = () => {
  return (
    <group>
      {/* Ground Path (Arrival to Lab) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 15]} receiveShadow>
        <planeGeometry args={[20, 50]} />
        <meshStandardMaterial color="#1a252f" />
      </mesh>
      
      {/* Lab Platform */}
      <mesh position={[0, -0.4, -6]} receiveShadow>
        <boxGeometry args={[12, 0.2, 12]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      
      {/* Lab Server Racks / Equipment */}
      <mesh position={[-4, 1.5, -9]} castShadow receiveShadow>
        <boxGeometry args={[2, 4, 1]} />
        <meshStandardMaterial color="#34495e" />
      </mesh>
      <mesh position={[4, 1.5, -9]} castShadow receiveShadow>
        <boxGeometry args={[2, 4, 1]} />
        <meshStandardMaterial color="#34495e" />
      </mesh>
      
      {/* Main Lab Terminal (Focal Point in Lab) */}
      <mesh position={[0, 1, -8]} castShadow receiveShadow>
        <boxGeometry args={[4, 2, 1]} />
        <meshStandardMaterial color="#64c8ff" emissive="#64c8ff" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
};

export const Scene: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', backgroundColor: '#000' }}>
      <Canvas shadows>
        <color attach="background" args={['#050812']} />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <CameraController />
        <ambientLight intensity={0.2} color="#406080" />
        <directionalLight 
          castShadow 
          position={[10, 20, 5]} 
          intensity={0.8} 
          color="#aaccff"
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024} 
        />
        
        <FieldStation />
        
        <Suspense fallback={null}>
          <NarrativeAssets />
        </Suspense>
      </Canvas>
      {/* HTML Overlays */}
      {children}
    </div>
  );
};

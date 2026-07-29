import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';

const FieldStation = () => {
  return (
    <group>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      
      {/* Main Tent/Station */}
      <mesh position={[0, 1.5, -5]} castShadow receiveShadow>
        <boxGeometry args={[6, 4, 4]} />
        <meshStandardMaterial color="#34495e" />
      </mesh>
      
      {/* Decorative Boxes / Equipment */}
      <mesh position={[3, 0, -2]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#e67e22" />
      </mesh>
      <mesh position={[-4, 0.5, -3]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 2, 1.5]} />
        <meshStandardMaterial color="#95a5a6" />
      </mesh>
    </group>
  );
};

export const Scene: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas shadows camera={{ position: [0, 2, 8], fov: 60 }}>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.5} />
        <directionalLight 
          castShadow 
          position={[10, 10, 5]} 
          intensity={1.5} 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024} 
        />
        <FieldStation />
        <OrbitControls 
          enablePan={false} 
          enableZoom={false} 
          maxPolarAngle={Math.PI / 2 - 0.1}
        />
      </Canvas>
      {/* HTML Overlays */}
      {children}
    </div>
  );
};

import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export const EnvironmentalArtifacts: React.FC = () => {
  // We will procedurally build these artifacts instead of loading GLTFs to save bandwidth/complexity,
  // just like we did with the car and the office geometry.
  // The positioning ensures they don't block the camera path (which is at x=0, z from 70 to -17)
  // or the character path (which walks along x=-15.5 roughly).

  return (
    <group>
      {/* ── EXTERIOR PROPS ── */}
      
      {/* 1. Parked SUV (Parked safely at x=10, z=20, out of the way) */}
      <group position={[10, 0, 20]} rotation={[0, -Math.PI / 4, 0]}>
        <mesh position={[0, 0.7, 0]} castShadow>
          <boxGeometry args={[2.2, 0.7, 4.8]} />
          <meshStandardMaterial color="#2d3a35" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.4, 0]} castShadow>
          <boxGeometry args={[2.0, 0.7, 2.8]} />
          <meshStandardMaterial color="#2d3a35" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Wheels */}
        {[[-1.1, 0.4, -1.6], [1.1, 0.4, -1.6], [-1.1, 0.4, 1.6], [1.1, 0.4, 1.6]].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
            <meshStandardMaterial color="#111" />
          </mesh>
        ))}
      </group>

      {/* 2. Bicycle leaning on the building (x=14, z=-2) */}
      <group position={[14, 0.5, -2]} rotation={[0.2, 0, 0.1]}>
        <mesh position={[0, 0, -0.6]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.35, 0.35, 0.05, 16]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <mesh position={[0, 0, 0.6]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.35, 0.35, 0.05, 16]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[0.05, 0.05, 1.2]} />
          <meshStandardMaterial color="#b23a3a" metalness={0.8} />
        </mesh>
      </group>

      {/* 3. Station Signage (x=-10, z=5) -> move to [0, 2.5, -13] per document */}
      <group position={[0, 2.5, -13]} rotation={[0, 0, 0]}>
        <mesh position={[0, 1, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 2]} />
          <meshStandardMaterial color="#555" metalness={0.8} />
        </mesh>
        <mesh position={[0.8, 1.6, 0]} castShadow>
          <boxGeometry args={[1.6, 0.6, 0.05]} />
          <meshStandardMaterial color="#1a4a8a" />
        </mesh>
        {/* Faux text lines on sign */}
        <mesh position={[0.8, 1.7, 0.03]}>
          <boxGeometry args={[1.2, 0.1, 0.02]} />
          <meshStandardMaterial color="#fff" />
        </mesh>
        <mesh position={[0.8, 1.5, 0.03]}>
          <boxGeometry args={[0.8, 0.05, 0.02]} />
          <meshStandardMaterial color="#64c8ff" />
        </mesh>
      </group>

      {/* 3.5 Planters at entrance */}
      {[[-4, 0, -12], [4, 0, -12]].map((pos, i) => (
        <group key={`planter-${i}`} position={pos as [number, number, number]}>
          <mesh position={[0, 0.3, 0]} castShadow>
            <cylinderGeometry args={[0.6, 0.4, 0.6]} />
            <meshStandardMaterial color="#888" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.7, 0]} castShadow>
            <sphereGeometry args={[0.7, 12, 12]} />
            <meshStandardMaterial color="#2d6e28" roughness={1} />
          </mesh>
        </group>
      ))}

      {/* 3.6 Welcome Mat */}
      <mesh position={[0, 0.02, -13.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.5, 1.5]} />
        <meshStandardMaterial color="#333" roughness={1} />
      </mesh>

      {/* 3.7 Delivery Boxes */}
      <group position={[8, 0.4, -10]} rotation={[0, -0.2, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.2, 0.8, 1]} />
          <meshStandardMaterial color="#c2a278" roughness={0.9} />
        </mesh>
        <mesh position={[0.2, 0.7, 0.1]} rotation={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[0.8, 0.6, 0.8]} />
          <meshStandardMaterial color="#b39164" roughness={0.9} />
        </mesh>
      </group>

      {/* 3.8 Security Camera */}
      <group position={[-3, 3.5, -14]} rotation={[0.5, 0.3, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#222" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.15]}>
          <circleGeometry args={[0.08, 16]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[0, 0, 0.16]}>
          <circleGeometry args={[0.02, 8]} />
          <meshStandardMaterial color="#ff2222" emissive="#ff2222" emissiveIntensity={1} />
        </mesh>
      </group>

      {/* 4. Roof Details (HVAC & Satellite) (on top of main building y=4.5) */}
      <group position={[5, 4.5, -15]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[3, 1, 3]} />
          <meshStandardMaterial color="#aaa" metalness={0.8} />
        </mesh>
        <mesh position={[-4, 0.8, -2]} rotation={[-Math.PI / 6, Math.PI / 4, 0]} castShadow>
          <cylinderGeometry args={[1.5, 0.2, 0.3, 16]} />
          <meshStandardMaterial color="#eee" />
        </mesh>
        <mesh position={[-4, 0.8, -2]} rotation={[-Math.PI / 6, Math.PI / 4, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 2]} />
          <meshStandardMaterial color="#555" />
        </mesh>
      </group>
    </group>
  );
};

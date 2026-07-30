import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const OfficeLab = () => {
  const screenGlowRef = useRef<THREE.MeshStandardMaterial>(null);
  const screenLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Subtle monitor flicker
    if (screenGlowRef.current) {
      screenGlowRef.current.emissiveIntensity = 0.85 + Math.sin(t * 3.1) * 0.05 + Math.random() * 0.02;
    }
    if (screenLightRef.current) {
      screenLightRef.current.intensity = 1.2 + Math.sin(t * 2.4) * 0.1;
    }
  });

  const floorColor = '#0d1520';
  const wallColor = '#0f1a28';
  const ceilingColor = '#0a1220';
  const deskColor = '#1c2a38';
  const deskSurface = '#243444';
  const screenColor = '#0a2040';
  const screenEmissive = '#1a88ff';

  return (
    <group position={[0, 0, -15]}>
      {/* Ceiling light strips — RectAreaLight-style via emissive boxes */}
      <mesh position={[-2.5, 3.98, 0]}>
        <boxGeometry args={[0.2, 0.04, 8]} />
        <meshStandardMaterial color="#6af" emissive="#6af" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[2.5, 3.98, 0]}>
        <boxGeometry args={[0.2, 0.04, 8]} />
        <meshStandardMaterial color="#6af" emissive="#6af" emissiveIntensity={1.2} />
      </mesh>

      {/* Ceiling lights (actual) */}
      <pointLight position={[-2.5, 3.6, 0]} color="#aaccff" intensity={3} distance={10} />
      <pointLight position={[2.5, 3.6, 0]} color="#aaccff" intensity={3} distance={10} />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color={floorColor} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color={ceilingColor} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 2, -5.8]} receiveShadow>
        <boxGeometry args={[12, 4, 0.2]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>

      {/* Back wall panel detail strips */}
      {[-3, 0, 3].map((x, i) => (
        <mesh key={i} position={[x, 2, -5.7]}>
          <boxGeometry args={[0.06, 3.6, 0.04]} />
          <meshStandardMaterial color="#1d3a5a" emissive="#1d3a5a" emissiveIntensity={0.4} />
        </mesh>
      ))}

      {/* Left wall */}
      <mesh position={[-5.8, 2, 0]} receiveShadow>
        <boxGeometry args={[0.2, 4, 12]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>

      {/* Right wall */}
      <mesh position={[5.8, 2, 0]} receiveShadow>
        <boxGeometry args={[0.2, 4, 12]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>

      {/* ─── DESK ─── */}
      {/* Desk surface */}
      <mesh position={[0, 0.78, -2.2]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 0.08, 1.4]} />
        <meshStandardMaterial color={deskSurface} metalness={0.4} roughness={0.5} />
      </mesh>

      {/* Desk left side return */}
      <mesh position={[-1.5, 0.44, -1.6]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.88, 0.08]} />
        <meshStandardMaterial color={deskColor} roughness={0.7} />
      </mesh>
      <mesh position={[1.5, 0.44, -1.6]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.88, 0.08]} />
        <meshStandardMaterial color={deskColor} roughness={0.7} />
      </mesh>

      {/* Desk legs */}
      {[[-1.6, -1.8], [-1.6, -2.8], [1.6, -1.8], [1.6, -2.8]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.39, z]} castShadow>
          <boxGeometry args={[0.08, 0.78, 0.08]} />
          <meshStandardMaterial color={deskColor} roughness={0.8} />
        </mesh>
      ))}

      {/* ─── MONITOR ─── */}
      {/* Monitor stand arm */}
      <mesh position={[0, 0.98, -2.8]} castShadow>
        <boxGeometry args={[0.06, 0.36, 0.06]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.16, -2.64]}>
        <boxGeometry args={[0.06, 0.06, 0.36]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Monitor bezel */}
      <mesh position={[0, 1.62, -3.1]} castShadow>
        <boxGeometry args={[2.1, 1.25, 0.08]} />
        <meshStandardMaterial color="#111" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Monitor screen (glowing) */}
      <mesh position={[0, 1.62, -3.06]}>
        <boxGeometry args={[1.96, 1.12, 0.01]} />
        <meshStandardMaterial
          ref={screenGlowRef}
          color={screenColor}
          emissive={screenEmissive}
          emissiveIntensity={0.85}
          roughness={0}
          metalness={0.1}
        />
      </mesh>

      {/* Screen light spill */}
      <pointLight ref={screenLightRef} position={[0, 1.62, -2.8]} color="#1a88ff" intensity={1.2} distance={4} />

      {/* ─── KEYBOARD ─── */}
      <mesh position={[0, 0.84, -1.9]} castShadow>
        <boxGeometry args={[1.1, 0.04, 0.38]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* key rows (visual detail) */}
      {[0, 1, 2].map(row => (
        <mesh key={row} position={[0, 0.875, -1.76 - row * 0.1]}>
          <boxGeometry args={[0.95, 0.005, 0.07]} />
          <meshStandardMaterial color="#2a2a44" />
        </mesh>
      ))}

      {/* ─── MOUSE ─── */}
      <mesh position={[0.72, 0.84, -1.9]} castShadow>
        <boxGeometry args={[0.12, 0.04, 0.22]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* ─── MUG ─── */}
      <mesh position={[-0.9, 0.96, -2.6]} castShadow>
        <cylinderGeometry args={[0.06, 0.055, 0.14, 10]} />
        <meshStandardMaterial color="#1e3a5f" roughness={0.7} />
      </mesh>
      {/* Mug steam (thin rising box with fade) */}
      <mesh position={[-0.9, 1.1, -2.6]}>
        <boxGeometry args={[0.02, 0.1, 0.02]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.15} />
      </mesh>

      {/* ─── BOOKSHELF on left wall ─── */}
      <mesh position={[-5.5, 1.5, -3]} castShadow receiveShadow>
        <boxGeometry args={[0.4, 3, 2.4]} />
        <meshStandardMaterial color="#14243a" roughness={0.95} />
      </mesh>
      {/* Books */}
      {[
        { x: -5.47, y: 0.64, z: -2.8, color: '#a03030', w: 0.04, h: 0.22 },
        { x: -5.45, y: 0.64, z: -2.68, color: '#2a6a40', w: 0.05, h: 0.26 },
        { x: -5.47, y: 0.64, z: -2.56, color: '#2a4a8a', w: 0.04, h: 0.24 },
        { x: -5.45, y: 0.64, z: -2.44, color: '#8a5a20', w: 0.06, h: 0.28 },
        { x: -5.47, y: 1.44, z: -2.8, color: '#5a2a8a', w: 0.04, h: 0.22 },
        { x: -5.45, y: 1.44, z: -2.65, color: '#8a2a2a', w: 0.05, h: 0.24 },
        { x: -5.47, y: 1.44, z: -2.52, color: '#1a5a6a', w: 0.04, h: 0.22 },
      ].map((b, i) => (
        <mesh key={i} position={[b.x, b.y, b.z]} castShadow>
          <boxGeometry args={[0.06, b.h, b.w]} />
          <meshStandardMaterial color={b.color} roughness={0.9} />
        </mesh>
      ))}

      {/* ─── PLANT in corner ─── */}
      <mesh position={[5.0, 0.26, -4.8]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.3, 8]} />
        <meshStandardMaterial color="#3a2a1a" roughness={0.9} />
      </mesh>
      <mesh position={[5.0, 0.72, -4.8]} castShadow>
        <sphereGeometry args={[0.4, 8, 6]} />
        <meshStandardMaterial color="#1a5a2a" roughness={0.95} />
      </mesh>
      <mesh position={[4.72, 0.9, -4.62]} castShadow>
        <sphereGeometry args={[0.22, 7, 5]} />
        <meshStandardMaterial color="#1d6030" roughness={0.95} />
      </mesh>

      {/* ─── WALL SCREEN / poster on back wall ─── */}
      <mesh position={[0, 2.4, -5.69]}>
        <boxGeometry args={[3.2, 1.8, 0.02]} />
        <meshStandardMaterial color="#081428" emissive="#0a2a50" emissiveIntensity={0.6} roughness={0} />
      </mesh>
      <mesh position={[0, 2.4, -5.68]}>
        <boxGeometry args={[3.0, 1.62, 0.01]} />
        <meshStandardMaterial color="#0d1e40" emissive="#1a5a9a" emissiveIntensity={0.4} roughness={0} />
      </mesh>
    </group>
  );
};

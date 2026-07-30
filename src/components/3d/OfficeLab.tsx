import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '../../store/gameStore';

const OfficeDoor = () => {
  const sequence = useGameStore(state => state.sequence);
  const leftDoor = useRef<THREE.Mesh>(null);
  const rightDoor = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!leftDoor.current || !rightDoor.current) return;
    const isOpen = ['TRANSITION_LAB', 'IN_LAB', 'APPROACHING_SCREEN'].includes(sequence);
    
    // Doors slide along local Z axis
    const targetZLeft = isOpen ? 3.5 : 2.0; // Slides towards +Z (front)
    const targetZRight = isOpen ? 0.5 : 2.0; // Slides towards -Z (back)
    
    leftDoor.current.position.z += (targetZLeft - leftDoor.current.position.z) * delta * 2.0;
    rightDoor.current.position.z += (targetZRight - rightDoor.current.position.z) * delta * 2.0;
  });

  return (
    <group position={[0, 1.5, 0]}>
      {/* Door frame */}
      <mesh position={[0, 0, 2]}>
        <boxGeometry args={[0.3, 3, 4.1]} />
        <meshStandardMaterial color="#1a2a3a" />
      </mesh>
      {/* Left panel (slides front) */}
      <mesh ref={leftDoor} position={[0, 0, 3.0]}>
        <boxGeometry args={[0.1, 2.9, 1.9]} />
        <meshStandardMaterial color="#4a8cc4" transparent opacity={0.35} metalness={0.6} roughness={0} />
      </mesh>
      {/* Right panel (slides back) */}
      <mesh ref={rightDoor} position={[0, 0, 1.0]}>
        <boxGeometry args={[0.1, 2.9, 1.9]} />
        <meshStandardMaterial color="#4a8cc4" transparent opacity={0.35} metalness={0.6} roughness={0} />
      </mesh>
    </group>
  );
};

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
    <group position={[-15, 0, -18]}>
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

      {/* Right wall with doorway */}
      <group position={[5.8, 0, 0]}>
        {/* Top piece (above door) */}
        <mesh position={[0, 3.5, 0]} receiveShadow>
          <boxGeometry args={[0.2, 1, 12]} />
          <meshStandardMaterial color={wallColor} roughness={0.9} />
        </mesh>
        {/* Front piece (Z = 4 to 6) */}
        <mesh position={[0, 1.5, 5]} receiveShadow>
          <boxGeometry args={[0.2, 3, 2]} />
          <meshStandardMaterial color={wallColor} roughness={0.9} />
        </mesh>
        {/* Back piece (Z = -6 to 0) */}
        <mesh position={[0, 1.5, -3]} receiveShadow>
          <boxGeometry args={[0.2, 3, 6]} />
          <meshStandardMaterial color={wallColor} roughness={0.9} />
        </mesh>
        
        {/* The sliding glass doors */}
        <OfficeDoor />
      </group>

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

      {/* ─── DESK CLUTTER ─── */}
      {/* Paper balls */}
      {[
        { x: -1.2, z: -1.8, c: "#dddddd" },
        { x: -1.4, z: -2.0, c: "#cccccc" },
        { x: 1.2, z: -2.4, c: "#e0e0e0" }
      ].map((p, i) => (
        <mesh key={`pb-${i}`} position={[p.x, 0.85, p.z]} castShadow>
          <dodecahedronGeometry args={[0.04, 0]} />
          <meshStandardMaterial color={p.c} roughness={0.9} />
        </mesh>
      ))}
      
      {/* Stack of printouts */}
      <mesh position={[1.2, 0.83, -1.8]} rotation={[0, -0.2, 0]} castShadow>
        <boxGeometry args={[0.4, 0.04, 0.5]} />
        <meshStandardMaterial color="#eeeeee" roughness={0.8} />
      </mesh>
      <mesh position={[1.22, 0.85, -1.82]} rotation={[0, -0.1, 0]} castShadow>
        <boxGeometry args={[0.4, 0.01, 0.5]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </mesh>

      {/* Headphones */}
      <mesh position={[1.2, 0.88, -2.0]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.08, 0.02, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#111" roughness={0.5} />
      </mesh>
      <mesh position={[1.12, 0.88, -2.0]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.08]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[1.28, 0.88, -2.0]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.08]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Water bottle */}
      <mesh position={[-0.6, 0.92, -1.7]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.28, 12]} />
        <meshStandardMaterial color="#88ccff" transparent opacity={0.6} roughness={0.1} />
      </mesh>
      <mesh position={[-0.6, 1.07, -1.7]}>
        <cylinderGeometry args={[0.04, 0.04, 0.02, 12]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Sticky note pad */}
      <mesh position={[0.5, 0.84, -1.7]} rotation={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[0.15, 0.02, 0.15]} />
        <meshStandardMaterial color="#ffe066" />
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
        { x: -5.47, y: 0.64, z: -2.56, color: '#1a6aaa', w: 0.06, h: 0.26 },
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

      {/* Stacked lab reports on top */}
      {[0, 1, 2].map(i => (
        <mesh key={`report-${i}`} position={[-5.45, 3.02 + i * 0.02, -2.5]} rotation={[0, Math.random() * 0.1, 0]}>
          <boxGeometry args={[0.2, 0.015, 0.25]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#eeeeee" : "#333333"} />
        </mesh>
      ))}

      {/* Trophy */}
      <mesh position={[-5.45, 3.1, -2.9]}>
        <cylinderGeometry args={[0.02, 0.05, 0.1]} />
        <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-5.45, 3.16, -2.9]}>
        <sphereGeometry args={[0.04]} />
        <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
      </mesh>

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
      <mesh position={[2, 2.4, -5.69]}>
        <boxGeometry args={[3.2, 1.8, 0.02]} />
        <meshStandardMaterial color="#081428" emissive="#0a2a50" emissiveIntensity={0.6} roughness={0} />
      </mesh>
      <mesh position={[2, 2.4, -5.68]}>
        <boxGeometry args={[3.0, 1.62, 0.01]} />
        <meshStandardMaterial color="#0d1e40" emissive="#1a5a9a" emissiveIntensity={0.4} roughness={0} />
      </mesh>
      
      {/* Wall screen dashboard charts */}
      {[
        { x: 0.8, h: 1.2, color: '#1a88ff' },
        { x: 1.6, h: 0.8, color: '#44ee88' },
        { x: 2.4, h: 1.5, color: '#ff6b6b' },
        { x: 3.2, h: 0.6, color: '#ffe066' },
      ].map((bar, i) => (
        <mesh key={`wall-bar-${i}`} position={[bar.x, 1.6 + bar.h / 2, -5.67]}>
          <boxGeometry args={[0.5, bar.h, 0.01]} />
          <meshStandardMaterial
            color={bar.color}
            emissive={bar.color}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* ─── WHITEBOARD on left wall ─── */}
      <group position={[-5.69, 2.2, -1.5]} rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[3.6, 1.8, 0.04]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[3.4, 1.6, 0.01]} />
          <meshStandardMaterial color="#f0f0f0" roughness={0.2} />
        </mesh>
        
        {/* Whiteboard Text */}
        <Text position={[-1.5, 0.6, 0.03]} fontSize={0.06} color="#1a3a6a" anchorX="left" anchorY="top" maxWidth={3}>
          WEEKLY DELIVERABLE — OVERDUE
        </Text>
        <Text position={[-1.5, 0.4, 0.03]} fontSize={0.05} color="#20aa40" anchorX="left" anchorY="top">
          ✓ Dataset loaded (50k rows)
        </Text>
        <Text position={[-1.5, 0.3, 0.03]} fontSize={0.05} color="#aa2020" anchorX="left" anchorY="top">
          ✗ Excel crashed (again)
        </Text>
        <Text position={[-1.5, 0.2, 0.03]} fontSize={0.05} color="#aa2020" anchorX="left" anchorY="top">
          ✗ Formulas not calculating
        </Text>
        <Text position={[-1.5, 0.1, 0.03]} fontSize={0.05} color="#1a3a6a" anchorX="left" anchorY="top">
          ? Switch to pandas
        </Text>

        <Text position={[-1.5, -0.1, 0.03]} fontSize={0.05} color="#aa2020" anchorX="left" anchorY="top">
          deadline: FRIDAY 5PM
        </Text>
        
        <Text position={[-1.5, -0.3, 0.03]} fontSize={0.05} color="#1a3a6a" anchorX="left" anchorY="top">
          todo:
        </Text>
        <Text position={[-1.5, -0.4, 0.03]} fontSize={0.04} color="#1a3a6a" anchorX="left" anchorY="top">
          - clean date column
        </Text>
        <Text position={[-1.5, -0.48, 0.03]} fontSize={0.04} color="#1a3a6a" anchorX="left" anchorY="top">
          - calculate profit margins
        </Text>
        <Text position={[-1.5, -0.56, 0.03]} fontSize={0.04} color="#1a3a6a" anchorX="left" anchorY="top">
          - groupby region summary
        </Text>

        {/* Faux drawing lines on whiteboard */}
        <mesh position={[1.2, 0.2, 0.03]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.8, 0.01, 0.01]} />
          <meshStandardMaterial color="#ff2222" />
        </mesh>
        <mesh position={[1.2, 0.3, 0.03]} rotation={[0, 0, -0.4]}>
          <boxGeometry args={[0.6, 0.01, 0.01]} />
          <meshStandardMaterial color="#2222ff" />
        </mesh>
        
        {/* Taped Chart */}
        <group position={[1.0, -0.3, 0.03]}>
          <mesh>
            <boxGeometry args={[0.6, 0.5, 0.01]} />
            <meshStandardMaterial color="#eeeeee" />
          </mesh>
          {/* Tape */}
          <mesh position={[0, 0.25, 0.01]} rotation={[0, 0, 0.1]}>
            <boxGeometry args={[0.15, 0.04, 0.01]} />
            <meshStandardMaterial color="#dddddd" transparent opacity={0.6} />
          </mesh>
        </group>
      </group>

      {/* ─── STICKY NOTES ─── */}
      {/* On monitor bezel */}
      <group position={[0.8, 1.15, -3.05]} rotation={[0, 0, -0.1]}>
        <mesh>
          <boxGeometry args={[0.12, 0.12, 0.01]} />
          <meshStandardMaterial color="#ffffaa" />
        </mesh>
      </group>
      <group position={[-0.9, 2.05, -3.05]} rotation={[0, 0, 0.15]}>
        <mesh>
          <boxGeometry args={[0.12, 0.12, 0.01]} />
          <meshStandardMaterial color="#ffaaaa" />
        </mesh>
      </group>
      {/* On back wall */}
      <group position={[-2.5, 2.2, -5.68]} rotation={[0, 0, -0.05]}>
        <mesh>
          <boxGeometry args={[0.15, 0.15, 0.01]} />
          <meshStandardMaterial color="#ffffaa" />
        </mesh>
        <Text position={[0, 0, 0.01]} fontSize={0.018} color="#333" anchorX="center" anchorY="middle" maxWidth={0.13}>
          ASK AMARA ABOUT pd.merge()
        </Text>
      </group>
      <group position={[-2.3, 2.1, -5.68]} rotation={[0, 0, 0.12]}>
        <mesh>
          <boxGeometry args={[0.15, 0.15, 0.01]} />
          <meshStandardMaterial color="#aaffaa" />
        </mesh>
        <Text position={[0, 0, 0.01]} fontSize={0.02} color="#333" anchorX="center" anchorY="middle" maxWidth={0.13}>
          df.info() first!!
        </Text>
      </group>
      <group position={[-2.7, 2.0, -5.68]} rotation={[0, 0, -0.15]}>
        <mesh>
          <boxGeometry args={[0.15, 0.15, 0.01]} />
          <meshStandardMaterial color="#ff6b8a" />
        </mesh>
        <Text position={[0, 0, 0.01]} fontSize={0.018} color="#333" anchorX="center" anchorY="middle" maxWidth={0.13}>
          DON'T USE EXCEL!!!
        </Text>
      </group>

      {/* ─── DESK CLUTTER ─── */}
      {/* Paper balls */}
      {[
        { x: -1.2, z: -1.8, c: "#dddddd" },
        { x: -1.4, z: -2.0, c: "#cccccc" },
        { x: 1.2, z: -2.4, c: "#e0e0e0" }
      ].map((p, i) => (
        <mesh key={`pb-${i}`} position={[p.x, 0.85, p.z]} castShadow>
          <dodecahedronGeometry args={[0.04, 0]} />
          <meshStandardMaterial color={p.c} roughness={0.9} />
        </mesh>
      ))}
      
      {/* Stack of printouts */}
      <mesh position={[1.2, 0.83, -1.8]} rotation={[0, -0.2, 0]} castShadow>
        <boxGeometry args={[0.4, 0.04, 0.5]} />
        <meshStandardMaterial color="#eeeeee" roughness={0.8} />
      </mesh>
      <mesh position={[1.22, 0.85, -1.82]} rotation={[0, -0.1, 0]} castShadow>
        <boxGeometry args={[0.4, 0.01, 0.5]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </mesh>
    </group>
  );
};

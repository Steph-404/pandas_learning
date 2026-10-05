import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '../../store/gameStore';

const wallColor = '#1a2736';
const wallTrim = '#0b1420';
const deskTop = '#6d5138';
const deskFrame = '#1a2634';

/* ── Sliding glass entrance door on the lab's east wall ─────────────────── */
const OfficeDoor = () => {
  const sequence = useGameStore((state) => state.sequence);
  const leftDoor = useRef<THREE.Mesh>(null);
  const rightDoor = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!leftDoor.current || !rightDoor.current) return;
    const isOpen = ['TRANSITION_LAB', 'IN_LAB', 'APPROACHING_SCREEN', 'QUESTION_ACTIVE'].includes(sequence);

    // Panels stack to the two sides of the 4 m opening when open.
    const targetZLeft = isOpen ? 3.9 : 2.05;
    const targetZRight = isOpen ? 0.1 : 1.95;

    leftDoor.current.position.z += (targetZLeft - leftDoor.current.position.z) * delta * 2.0;
    rightDoor.current.position.z += (targetZRight - rightDoor.current.position.z) * delta * 2.0;
  });

  return (
    <group position={[0, 1.5, 0]}>
      {/* Header beam */}
      <mesh position={[0, 1.45, 2]}>
        <boxGeometry args={[0.3, 0.3, 4.4]} />
        <meshStandardMaterial color="#20344a" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Side posts */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[0.3, 3, 0.2]} />
        <meshStandardMaterial color="#20344a" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 4.05]}>
        <boxGeometry args={[0.3, 3, 0.2]} />
        <meshStandardMaterial color="#20344a" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Left panel (slides toward front) */}
      <mesh ref={leftDoor} position={[0, 0, 3.0]}>
        <boxGeometry args={[0.08, 2.8, 1.8]} />
        <meshStandardMaterial color="#9cc8e0" transparent opacity={0.28} metalness={0.5} roughness={0.05} />
      </mesh>
      {/* Right panel (slides toward back) */}
      <mesh ref={rightDoor} position={[0, 0, 1.0]}>
        <boxGeometry args={[0.08, 2.8, 1.8]} />
        <meshStandardMaterial color="#9cc8e0" transparent opacity={0.28} metalness={0.5} roughness={0.05} />
      </mesh>
    </group>
  );
};

/* ── Glazed front facade of the lab (looks out over the forecourt) ──────── */
const WindowWall = () => (
  <group position={[0, 0, 5.9]}>
    {/* Sill */}
    <mesh position={[0, 0.18, 0]} castShadow>
      <boxGeometry args={[11.7, 0.36, 0.16]} />
      <meshStandardMaterial color={wallTrim} roughness={0.7} />
    </mesh>
    {/* Glass */}
    <mesh position={[0, 1.75, 0]}>
      <boxGeometry args={[11.7, 2.78, 0.04]} />
      <meshStandardMaterial color="#9ecfe6" transparent opacity={0.16} metalness={0.35} roughness={0.05} />
    </mesh>
    {/* Header */}
    <mesh position={[0, 3.55, 0]}>
      <boxGeometry args={[11.8, 0.9, 0.18]} />
      <meshStandardMaterial color={wallColor} roughness={0.85} />
    </mesh>
    {/* Mullions */}
    {[-5.82, -3.5, -1.17, 1.17, 3.5, 5.82].map((x, i) => (
      <mesh key={i} position={[x, 1.75, 0]}>
        <boxGeometry args={[0.1, 3.1, 0.12]} />
        <meshStandardMaterial color="#22364c" metalness={0.6} roughness={0.4} />
      </mesh>
    ))}
    {/* Horizontal rails */}
    {[0.95, 2.55].map((y, i) => (
      <mesh key={i} position={[0, y, 0]}>
        <boxGeometry args={[11.7, 0.05, 0.1]} />
        <meshStandardMaterial color="#22364c" metalness={0.6} roughness={0.4} />
      </mesh>
    ))}
  </group>
);

/* ── Main lab room ──────────────────────────────────────────────────────── */
export const OfficeLab = () => {
  const screenGlowRef = useRef<THREE.MeshStandardMaterial>(null);
  const screenLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (screenGlowRef.current) {
      screenGlowRef.current.emissiveIntensity = 0.4 + Math.sin(t * 3.1) * 0.04 + Math.random() * 0.015;
    }
    if (screenLightRef.current) {
      screenLightRef.current.intensity = 1.2 + Math.sin(t * 2.4) * 0.1;
    }
  });

  return (
    <group position={[-15, 0, -18]}>
      {/* ─── FLOOR & RUG ─── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <planeGeometry args={[11.8, 11.8]} />
        <meshStandardMaterial color="#101a25" metalness={0.35} roughness={0.3} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.2, 0.026, -2.3]} receiveShadow>
        <planeGeometry args={[5.6, 3.6]} />
        <meshStandardMaterial color="#22303f" roughness={0.95} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.2, 0.028, -2.3]}>
        <planeGeometry args={[5.2, 3.2]} />
        <meshStandardMaterial color="#2b3c4e" roughness={0.95} />
      </mesh>

      {/* ─── CEILING ─── */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4, 0]}>
        <planeGeometry args={[11.8, 11.8]} />
        <meshStandardMaterial color="#0c141f" />
      </mesh>
      {/* Light strips along the room */}
      {[-2.5, 2.5].map((x, i) => (
        <mesh key={`strip-${i}`} position={[x, 3.97, 0]}>
          <boxGeometry args={[0.18, 0.05, 9]} />
          <meshStandardMaterial color="#bcd8ff" emissive="#8fc0ff" emissiveIntensity={1.6} />
        </mesh>
      ))}
      {/* Recessed panels above the desk */}
      {[[-1.6, -2.2], [1.6, -2.2], [-1.6, 0.4], [1.6, 0.4]].map(([x, z], i) => (
        <mesh key={`panel-${i}`} position={[x, 3.94, z]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.7, 1.2]} />
          <meshStandardMaterial color="#2a3a50" emissive="#3a5a80" emissiveIntensity={0.5} side={THREE.DoubleSide} />
        </mesh>
      ))}
      <pointLight position={[-2.5, 3.55, 0]} color="#bcd4ff" intensity={2.6} distance={10} />
      <pointLight position={[2.5, 3.55, 0]} color="#bcd4ff" intensity={2.6} distance={10} />
      <pointLight position={[0, 3.4, 2.6]} color="#9fc0dd" intensity={1.4} distance={8} />
      <pointLight position={[-4.2, 2.9, 0.5]} color="#93b8dc" intensity={1.8} distance={9} />

      {/* ─── WALLS ─── */}
      {/* Back (south) wall */}
      <mesh position={[0, 2, -5.85]} receiveShadow>
        <boxGeometry args={[11.8, 4, 0.2]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>
      {/* Left (west) wall */}
      <mesh position={[-5.85, 2, 0]} receiveShadow>
        <boxGeometry args={[0.2, 4, 11.8]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>
      {/* Right (east) wall with doorway */}
      <group position={[5.85, 0, 0]}>
        <mesh position={[0, 3.5, 0]} receiveShadow>
          <boxGeometry args={[0.2, 1, 11.8]} />
          <meshStandardMaterial color={wallColor} roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.5, 5]} receiveShadow>
          <boxGeometry args={[0.2, 3, 1.9]} />
          <meshStandardMaterial color={wallColor} roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.5, -3]} receiveShadow>
          <boxGeometry args={[0.2, 3, 6]} />
          <meshStandardMaterial color={wallColor} roughness={0.9} />
        </mesh>
        <OfficeDoor />
      </group>
      <WindowWall />

      {/* Baseboards */}
      <mesh position={[0, 0.07, -5.72]}>
        <boxGeometry args={[11.8, 0.14, 0.06]} />
        <meshStandardMaterial color={wallTrim} roughness={0.6} />
      </mesh>
      <mesh position={[-5.72, 0.07, 0]}>
        <boxGeometry args={[0.06, 0.14, 11.8]} />
        <meshStandardMaterial color={wallTrim} roughness={0.6} />
      </mesh>
      <mesh position={[5.72, 0.07, -3]}>
        <boxGeometry args={[0.06, 0.14, 6]} />
        <meshStandardMaterial color={wallTrim} roughness={0.6} />
      </mesh>
      <mesh position={[5.72, 0.07, 5]}>
        <boxGeometry args={[0.06, 0.14, 1.9]} />
        <meshStandardMaterial color={wallTrim} roughness={0.6} />
      </mesh>

      {/* Wood-slat feature panel on the back wall */}
      <group position={[-4.2, 2, -5.72]}>
        <mesh>
          <boxGeometry args={[2.6, 3.4, 0.06]} />
          <meshStandardMaterial color="#0e1926" roughness={0.9} />
        </mesh>
        {[-1.2, -1.0, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2].map((x, i) => (
          <mesh key={i} position={[x, 0, 0.045]}>
            <boxGeometry args={[0.09, 3.3, 0.03]} />
            <meshStandardMaterial color={i % 3 === 0 ? '#6b4f35' : '#2c3c4c'} roughness={0.8} />
          </mesh>
        ))}
      </group>

      {/* Station sign above the dashboard */}
      <Text
        position={[1.4, 3.5, -5.7]}
        fontSize={0.12}
        color="#7fc4f0"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.1}
      >
        REDROCK FIELD STATION · DATA OPS
      </Text>

      {/* ─── DESK ─── */}
      <mesh position={[0, 0.78, -2.2]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 0.07, 1.4]} />
        <meshStandardMaterial color={deskTop} roughness={0.55} metalness={0.1} />
      </mesh>
      {/* Desk apron + legs */}
      <mesh position={[0, 0.68, -1.55]} castShadow>
        <boxGeometry args={[3.56, 0.12, 0.06]} />
        <meshStandardMaterial color={deskFrame} roughness={0.6} />
      </mesh>
      {[[-1.6, -1.8], [-1.6, -2.8], [1.6, -1.8], [1.6, -2.8]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.38, z]} castShadow>
          <boxGeometry args={[0.07, 0.76, 0.07]} />
          <meshStandardMaterial color={deskFrame} metalness={0.4} roughness={0.5} />
        </mesh>
      ))}
      {/* Cable tray */}
      <mesh position={[0, 0.62, -2.7]} castShadow>
        <boxGeometry args={[2.6, 0.06, 0.18]} />
        <meshStandardMaterial color="#101820" roughness={0.8} />
      </mesh>

      {/* ─── MAIN MONITOR ─── */}
      <mesh position={[0, 0.98, -2.8]} castShadow>
        <boxGeometry args={[0.06, 0.36, 0.06]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.16, -2.64]}>
        <boxGeometry args={[0.06, 0.06, 0.36]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.62, -3.1]} castShadow>
        <boxGeometry args={[2.1, 1.25, 0.08]} />
        <meshStandardMaterial color="#0c0c0c" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 1.62, -3.06]}>
        <boxGeometry args={[1.96, 1.12, 0.01]} />
        <meshStandardMaterial
          ref={screenGlowRef}
          color="#081a30"
          emissive="#123a66"
          emissiveIntensity={0.4}
          roughness={0}
          metalness={0.1}
        />
      </mesh>
      {/* Terminal content — code lines on the screen */}
      <mesh position={[0, 2.1, -3.045]}>
        <boxGeometry args={[1.9, 0.12, 0.005]} />
        <meshStandardMaterial color="#1e3a5f" emissive="#1e3a5f" emissiveIntensity={0.5} />
      </mesh>
      {[
        { x: -0.55, y: 1.96, w: 0.5, c: '#3fa7ff' },
        { x: -0.72, y: 1.84, w: 0.74, c: '#4ade80' },
        { x: -0.6, y: 1.72, w: 0.56, c: '#93c5fd' },
        { x: -0.35, y: 1.6, w: 0.9, c: '#facc15' },
        { x: -0.7, y: 1.48, w: 0.62, c: '#4ade80' },
        { x: -0.5, y: 1.36, w: 0.82, c: '#f472b6' },
        { x: -0.65, y: 1.24, w: 0.6, c: '#93c5fd' },
        { x: -0.4, y: 1.12, w: 0.95, c: '#3fa7ff' },
      ].map((line, i) => (
        <mesh key={`code-${i}`} position={[line.x, line.y, -3.045]}>
          <boxGeometry args={[line.w, 0.035, 0.005]} />
          <meshStandardMaterial color={line.c} emissive={line.c} emissiveIntensity={0.6} />
        </mesh>
      ))}
      <pointLight ref={screenLightRef} position={[0, 1.62, -2.7]} color="#1a88ff" intensity={1.2} distance={4} />

      {/* Secondary monitor (angled, on the desk return) */}
      <group position={[1.35, 1.32, -2.95]} rotation={[0, -0.35, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.95, 0.62, 0.05]} />
          <meshStandardMaterial color="#0c0c0c" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[0.88, 0.55, 0.01]} />
          <meshStandardMaterial color="#0e2a20" emissive="#1f7a4a" emissiveIntensity={0.5} roughness={0} />
        </mesh>
        <mesh position={[0, -0.48, 0.06]}>
          <boxGeometry args={[0.24, 0.3, 0.2]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.4} />
        </mesh>
      </group>

      {/* ─── KEYBOARD, MOUSE, MUG, CLUTTER ─── */}
      <mesh position={[0, 0.84, -1.9]} castShadow>
        <boxGeometry args={[1.1, 0.04, 0.38]} />
        <meshStandardMaterial color="#141422" metalness={0.3} roughness={0.7} />
      </mesh>
      {[0, 1, 2].map((row) => (
        <mesh key={row} position={[0, 0.875, -1.76 - row * 0.1]}>
          <boxGeometry args={[0.95, 0.005, 0.07]} />
          <meshStandardMaterial color="#242438" />
        </mesh>
      ))}
      <mesh position={[0.72, 0.84, -1.9]} castShadow>
        <boxGeometry args={[0.12, 0.04, 0.22]} />
        <meshStandardMaterial color="#141422" metalness={0.3} roughness={0.7} />
      </mesh>
      <mesh position={[-0.9, 0.96, -2.6]} castShadow>
        <cylinderGeometry args={[0.06, 0.055, 0.14, 10]} />
        <meshStandardMaterial color="#1e3a5f" roughness={0.7} />
      </mesh>
      <mesh position={[-0.9, 1.1, -2.6]}>
        <boxGeometry args={[0.02, 0.1, 0.02]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.15} />
      </mesh>
      <mesh position={[-1.3, 0.85, -2.45]} castShadow>
        <cylinderGeometry args={[0.045, 0.05, 0.1, 10]} />
        <meshStandardMaterial color="#3d6b4a" roughness={0.8} />
      </mesh>
      <mesh position={[-1.3, 0.95, -2.45]} castShadow>
        <sphereGeometry args={[0.085, 8, 6]} />
        <meshStandardMaterial color="#2f7a40" roughness={0.95} />
      </mesh>
      {[
        { x: -1.2, z: -1.8, c: '#dddddd' },
        { x: -1.4, z: -2.0, c: '#cccccc' },
        { x: 1.0, z: -1.62, c: '#e0e0e0' },
      ].map((p, i) => (
        <mesh key={`pb-${i}`} position={[p.x, 0.85, p.z]} castShadow>
          <dodecahedronGeometry args={[0.04, 0]} />
          <meshStandardMaterial color={p.c} roughness={0.9} />
        </mesh>
      ))}
      <mesh position={[-1.15, 0.83, -1.72]} rotation={[0, -0.2, 0]} castShadow>
        <boxGeometry args={[0.4, 0.04, 0.5]} />
        <meshStandardMaterial color="#eeeeee" roughness={0.8} />
      </mesh>
      <mesh position={[-1.13, 0.85, -1.74]} rotation={[0, -0.1, 0]} castShadow>
        <boxGeometry args={[0.4, 0.01, 0.5]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </mesh>

      {/* ─── BOOKCASE (west wall) ─── */}
      <group position={[-5.82, 0, -4.05]}>
        {/* Back panel */}
        <mesh position={[0.03, 1.5, 0]}>
          <boxGeometry args={[0.06, 3, 2.4]} />
          <meshStandardMaterial color="#0f1c2a" roughness={0.95} />
        </mesh>
        {/* Side panels */}
        <mesh position={[0.25, 1.5, -1.16]} castShadow>
          <boxGeometry args={[0.5, 3, 0.08]} />
          <meshStandardMaterial color="#24384a" roughness={0.8} />
        </mesh>
        <mesh position={[0.25, 1.5, 1.16]} castShadow>
          <boxGeometry args={[0.5, 3, 0.08]} />
          <meshStandardMaterial color="#24384a" roughness={0.8} />
        </mesh>
        {/* Shelves */}
        {[0.03, 1.02, 1.99, 2.94].map((y, i) => (
          <mesh key={`shelf-${i}`} position={[0.25, y, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.5, 0.06, 2.24]} />
            <meshStandardMaterial color="#3a5470" roughness={0.75} />
          </mesh>
        ))}
        {/* Books on the two middle shelves */}
        {[
          { shelf: 1.05, colors: ['#a03030', '#2a6a40', '#1a6aaa', '#8a5a20', '#5a2a8a', '#8a2a2a', '#1a5a6a'] },
          { shelf: 2.02, colors: ['#c8b060', '#2a4a8a', '#7a3050', '#2f7a40', '#b06030', '#4a4a8a'] },
        ].map((row, ri) => (
          <group key={`row-${ri}`}>
            {row.colors.map((c, i) => {
              const h = 0.24 + ((i * 7) % 5) * 0.02;
              return (
                <mesh key={i} position={[0.25, row.shelf + h / 2, -1.0 + i * 0.13 + ri * 0.04]} castShadow>
                  <boxGeometry args={[0.2, h, 0.09]} />
                  <meshStandardMaterial color={c} roughness={0.9} />
                </mesh>
              );
            })}
          </group>
        ))}
        {/* Reports + trophy on top */}
        {[0, 1, 2].map((i) => (
          <mesh key={`report-${i}`} position={[0.25, 2.98 + i * 0.02, 0.3]} rotation={[0, Math.random() * 0.1, 0]}>
            <boxGeometry args={[0.3, 0.015, 0.36]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#eeeeee' : '#333333'} />
          </mesh>
        ))}
        <mesh position={[0.25, 3.08, -0.5]}>
          <cylinderGeometry args={[0.02, 0.05, 0.1]} />
          <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.25, 3.14, -0.5]}>
          <sphereGeometry args={[0.04]} />
          <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* ─── WHITEBOARD (west wall) ─── */}
      <group position={[-5.72, 2.2, -0.9]} rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[3.6, 1.8, 0.04]} />
          <meshStandardMaterial color="#e8e8e8" roughness={0.15} />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[3.4, 1.6, 0.01]} />
          <meshStandardMaterial color="#f2f2f2" roughness={0.2} />
        </mesh>
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
        <mesh position={[1.2, 0.2, 0.03]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.8, 0.01, 0.01]} />
          <meshStandardMaterial color="#ff2222" />
        </mesh>
        <mesh position={[1.2, 0.3, 0.03]} rotation={[0, 0, -0.4]}>
          <boxGeometry args={[0.6, 0.01, 0.01]} />
          <meshStandardMaterial color="#2222ff" />
        </mesh>
        <group position={[1.0, -0.3, 0.03]}>
          <mesh>
            <boxGeometry args={[0.6, 0.5, 0.01]} />
            <meshStandardMaterial color="#eeeeee" />
          </mesh>
          <mesh position={[0, 0.25, 0.01]} rotation={[0, 0, 0.1]}>
            <boxGeometry args={[0.15, 0.04, 0.01]} />
            <meshStandardMaterial color="#dddddd" transparent opacity={0.6} />
          </mesh>
        </group>
      </group>

      {/* ─── DASHBOARD WALL (south wall) ─── */}
      <mesh position={[1.4, 2.3, -5.72]}>
        <boxGeometry args={[3.6, 1.9, 0.02]} />
        <meshStandardMaterial color="#081428" emissive="#0a2a50" emissiveIntensity={0.6} roughness={0} />
      </mesh>
      <mesh position={[1.4, 2.3, -5.7]}>
        <boxGeometry args={[3.4, 1.72, 0.01]} />
        <meshStandardMaterial color="#0d1e40" emissive="#1a5a9a" emissiveIntensity={0.4} roughness={0} />
      </mesh>
      {[
        { x: 0.1, h: 1.2, color: '#1a88ff' },
        { x: 0.85, h: 0.8, color: '#44ee88' },
        { x: 1.6, h: 1.5, color: '#ff6b6b' },
        { x: 2.35, h: 0.6, color: '#ffe066' },
      ].map((bar, i) => (
        <mesh key={`wall-bar-${i}`} position={[bar.x, 1.5 + bar.h / 2, -5.69]}>
          <boxGeometry args={[0.45, bar.h, 0.01]} />
          <meshStandardMaterial color={bar.color} emissive={bar.color} emissiveIntensity={0.5} />
        </mesh>
      ))}
      {/* Trend line */}
      <mesh position={[2.9, 2.1, -5.69]} rotation={[0, 0, -0.6]}>
        <boxGeometry args={[0.9, 0.03, 0.01]} />
        <meshStandardMaterial color="#7fd4ff" emissive="#7fd4ff" emissiveIntensity={0.6} />
      </mesh>

      {/* Framed certificates on the east wall */}
      {[[-2.2, 2.3], [-2.2, 1.3]].map(([z, y], i) => (
        <group key={`frame-${i}`} position={[5.72, y, z]} rotation={[0, -Math.PI / 2, 0]}>
          <mesh>
            <boxGeometry args={[0.8, 0.6, 0.03]} />
            <meshStandardMaterial color="#3a2c1c" metalness={0.4} roughness={0.6} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <boxGeometry args={[0.7, 0.5, 0.01]} />
            <meshStandardMaterial color="#e8e2d2" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* ─── PLANT — corner ─── */}
      <mesh position={[5.0, 0.26, -4.9]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.3, 8]} />
        <meshStandardMaterial color="#3a2a1a" roughness={0.9} />
      </mesh>
      <mesh position={[5.0, 0.72, -4.9]} castShadow>
        <sphereGeometry args={[0.4, 8, 6]} />
        <meshStandardMaterial color="#1a5a2a" roughness={0.95} />
      </mesh>
      <mesh position={[4.72, 0.9, -4.72]} castShadow>
        <sphereGeometry args={[0.22, 7, 5]} />
        <meshStandardMaterial color="#1d6030" roughness={0.95} />
      </mesh>
      {/* Plant near the window */}
      <group position={[-5.0, 0, 4.6]}>
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.26, 0.36, 8]} />
          <meshStandardMaterial color="#4a3626" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.95, 0]} castShadow>
          <sphereGeometry args={[0.5, 8, 6]} />
          <meshStandardMaterial color="#205c30" roughness={0.95} />
        </mesh>
        <mesh position={[0.25, 1.35, -0.1]} castShadow>
          <sphereGeometry args={[0.3, 7, 5]} />
          <meshStandardMaterial color="#276b38" roughness={0.95} />
        </mesh>
      </group>

      {/* ─── LUNCH CORNER (near the front windows) ─── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.1, 0.026, 3.2]} receiveShadow>
        <planeGeometry args={[4.4, 3.0]} />
        <meshStandardMaterial color="#1c2a38" roughness={0.95} />
      </mesh>
      {/* Sofa */}
      <group position={[3.4, 0, 3.9]}>
        <mesh position={[0, 0.32, 0]} castShadow>
          <boxGeometry args={[2.4, 0.5, 0.95]} />
          <meshStandardMaterial color="#2c4a66" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.62, -0.38]} castShadow>
          <boxGeometry args={[2.4, 0.55, 0.22]} />
          <meshStandardMaterial color="#335577" roughness={0.9} />
        </mesh>
        <mesh position={[-1.15, 0.55, 0]} castShadow>
          <boxGeometry args={[0.2, 0.4, 0.9]} />
          <meshStandardMaterial color="#335577" roughness={0.9} />
        </mesh>
        <mesh position={[1.15, 0.55, 0]} castShadow>
          <boxGeometry args={[0.2, 0.4, 0.9]} />
          <meshStandardMaterial color="#335577" roughness={0.9} />
        </mesh>
      </group>
      {/* Coffee table */}
      <group position={[3.0, 0, 2.4]}>
        <mesh position={[0, 0.34, 0]} castShadow>
          <boxGeometry args={[1.1, 0.06, 0.65]} />
          <meshStandardMaterial color="#6d5138" roughness={0.6} />
        </mesh>
        {[[-0.45, -0.22], [0.45, -0.22], [-0.45, 0.22], [0.45, 0.22]].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.17, z]}>
            <boxGeometry args={[0.05, 0.34, 0.05]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        ))}
        <mesh position={[0.1, 0.39, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.045, 0.1, 10]} />
          <meshStandardMaterial color="#8a8a8a" roughness={0.5} />
        </mesh>
      </group>

      {/* ─── STICKY NOTES ─── */}
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
      <group position={[-2.6, 2.2, -5.6]} rotation={[0, 0, -0.05]}>
        <mesh>
          <boxGeometry args={[0.15, 0.15, 0.01]} />
          <meshStandardMaterial color="#ffffaa" />
        </mesh>
        <Text position={[0, 0, 0.01]} fontSize={0.018} color="#333" anchorX="center" anchorY="middle" maxWidth={0.13}>
          ASK AMARA ABOUT pd.merge()
        </Text>
      </group>
      <group position={[-2.4, 2.1, -5.6]} rotation={[0, 0, 0.12]}>
        <mesh>
          <boxGeometry args={[0.15, 0.15, 0.01]} />
          <meshStandardMaterial color="#aaffaa" />
        </mesh>
        <Text position={[0, 0, 0.01]} fontSize={0.02} color="#333" anchorX="center" anchorY="middle" maxWidth={0.13}>
          df.info() first!!
        </Text>
      </group>
      <group position={[-2.8, 2.0, -5.6]} rotation={[0, 0, -0.15]}>
        <mesh>
          <boxGeometry args={[0.15, 0.15, 0.01]} />
          <meshStandardMaterial color="#ff6b8a" />
        </mesh>
        <Text position={[0, 0, 0.01]} fontSize={0.018} color="#333" anchorX="center" anchorY="middle" maxWidth={0.13}>
          DON'T USE EXCEL!!!
        </Text>
      </group>

      {/* ─── JUNIOR RESEARCHER'S DESK (front-west corner) ─── */}
      <group position={[-3.4, 0, 3.6]}>
        <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.06, 0.95]} />
          <meshStandardMaterial color="#54402e" roughness={0.6} />
        </mesh>
        {[[-0.9, -0.36], [0.9, -0.36], [-0.9, 0.36], [0.9, 0.36]].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.36, z]} castShadow>
            <boxGeometry args={[0.06, 0.72, 0.06]} />
            <meshStandardMaterial color={deskFrame} />
          </mesh>
        ))}
        {/* Laptop */}
        <group position={[-0.2, 0.79, 0]} rotation={[0, 0.25, 0]}>
          <mesh position={[0, 0.01, 0]}>
            <boxGeometry args={[0.42, 0.02, 0.3]} />
            <meshStandardMaterial color="#2a2a2e" metalness={0.5} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.15, -0.14]} rotation={[-0.25, 0, 0]}>
            <boxGeometry args={[0.42, 0.3, 0.015]} />
            <meshStandardMaterial color="#1a1a1e" metalness={0.5} roughness={0.4} />
          </mesh>
        </group>
        {/* Coffee cups + crumpled paper */}
        {[[0.5, 0.15], [0.6, 0.05]].map(([x, z], i) => (
          <mesh key={`cup-${i}`} position={[x, 0.86 + i * 0.08, z]}>
            <cylinderGeometry args={[0.04, 0.035, 0.09, 10]} />
            <meshStandardMaterial color="#e8e8e8" roughness={0.7} />
          </mesh>
        ))}
        {[[-0.7, 0.2], [-0.55, -0.15], [0.15, -0.25]].map(([x, z], i) => (
          <mesh key={`paper-${i}`} position={[x, 0.8, z]} castShadow>
            <dodecahedronGeometry args={[0.045, 0]} />
            <meshStandardMaterial color="#d8d4c8" roughness={0.9} />
          </mesh>
        ))}
        <mesh position={[0.55, 0.8, -0.2]} rotation={[0, 0.3, 0]}>
          <boxGeometry args={[0.3, 0.02, 0.4]} />
          <meshStandardMaterial color="#f0f0f0" roughness={0.85} />
        </mesh>
      </group>
    </group>
  );
};

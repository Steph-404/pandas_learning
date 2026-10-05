import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '../../store/gameStore';
import { STORYLINE } from '../../data/storyline';
import { AssistantModel } from './AssistantModel';
import type { AssistantAnim } from './AssistantModel';
import { assistantLive } from './assistantShared';

type Vec3 = [number, number, number];

/** Where Dr. Nwosu waits while the transport arrives. */
const ENTRANCE: Vec3 = [1.8, 0, -11.4];

/** Lab stations — she walks to the work area for the current day's tasks. */
const LAB_STATIONS: Record<number, Vec3> = {
  1: [-14.2, 0, -18.8],   // beside the terminal desk
  2: [-19.0, 0, -19.6],   // at the whiteboard (filtering & cleaning day)
  3: [-15.8, 0, -18.9],   // left side of the desk (text / dates day)
  4: [-13.4, 0, -22.3],   // at the dashboard wall (grouping & combining day)
};

/** Walk-in route: forecourt -> door on the lab's east wall -> lab floor. */
const DOOR_APPROACH: Vec3[] = [
  [0, 0, -15.4],
  [-6.6, 0, -16.2],
  [-10.1, 0, -16.4],
  [-12.3, 0, -17.4],
];

/** Walk-out route: lab -> door -> forecourt. */
const DOOR_EXIT: Vec3[] = [
  [-12.3, 0, -17.4],
  [-10.1, 0, -16.4],
  [-6.6, 0, -16.2],
  [0, 0, -14.6],
];

const stationForDay = (day: number): Vec3 => LAB_STATIONS[Math.min(4, Math.max(1, day))];

const dayFromStage = (stageId: number): number => {
  const title = STORYLINE.find((s) => s.id === stageId)?.title ?? '';
  const match = title.match(/Stage (\d+)\./);
  return match ? Number(match[1]) : 1;
};

const WALK_SPEED = 1.55;
const REACHED = 0.09;

export const AssistantCharacter = () => {
  const groupRef = useRef<THREE.Group>(null);
  const sequence = useGameStore((s) => s.sequence);
  const stageId = useGameStore((s) => s.currentStageId);
  const isDialogueActive = useGameStore((s) => s.isDialogueActive);
  const isQuestionActive = useGameStore((s) => s.isQuestionActive);

  const day = dayFromStage(stageId);

  const waypoints = useMemo<Vec3[]>(() => {
    switch (sequence) {
      case 'CAR_ARRIVING':
      case 'ALIGHTING':
      case 'GREETING':
        return [ENTRANCE];
      case 'TRANSITION_LAB':
      case 'IN_LAB':
      case 'APPROACHING_SCREEN':
        return [...DOOR_APPROACH, stationForDay(1)];
      case 'QUESTION_ACTIVE':
        return [stationForDay(day)];
      case 'FAREWELL_TRANSIT':
        return [...DOOR_EXIT, ENTRANCE];
      case 'FAREWELL':
      case 'COMPLETED':
        return [ENTRANCE];
      default:
        return [ENTRANCE];
    }
  }, [sequence, day]);

  const waypointIndex = useRef(0);
  const walking = useRef(false);
  const waveTime = useRef(0);
  const [animation, setAnimation] = useState<AssistantAnim>('Idle');
  const animRef = useRef<AssistantAnim>('Idle');

  // When the app is jumped straight into a question sequence (dev/testing),
  // start at that day's station instead of walking in from the entrance.
  const startPos = useMemo<Vec3>(
    () => (sequence === 'QUESTION_ACTIVE' ? stationForDay(dayFromStage(stageId)) : ENTRANCE),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    waypointIndex.current = 0;
  }, [waypoints]);

  useEffect(() => {
    if (sequence === 'GREETING' || sequence === 'FAREWELL') {
      waveTime.current = 0.0001;
    }
  }, [sequence]);

  useFrame((state, rawDelta) => {
    const group = groupRef.current;
    if (!group) return;
    const delta = Math.min(rawDelta, 0.1);
    const moveDelta = Math.min(rawDelta, 0.5);
    assistantLive.x = group.position.x;
    assistantLive.z = group.position.z;

    // --- Waypoint following ---
    let moved = false;
    const target = waypoints[waypointIndex.current];
    if (target) {
      const dx = target[0] - group.position.x;
      const dz = target[2] - group.position.z;
      const dist = Math.hypot(dx, dz);
      if (dist < REACHED) {
        waypointIndex.current += 1;
        if (waypointIndex.current >= waypoints.length) walking.current = false;
      } else {
        const step = Math.min(WALK_SPEED * moveDelta, dist);
        group.position.x += (dx / dist) * step;
        group.position.z += (dz / dist) * step;
        moved = true;
        walking.current = true;

        const targetYaw = Math.atan2(dx, dz);
        let diff = targetYaw - group.rotation.y;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        group.rotation.y += diff * Math.min(1, delta * 10);
      }
    } else {
      walking.current = false;
    }

    // --- Face the camera when standing still ---
    if (!moved && !walking.current) {
      const dx = state.camera.position.x - group.position.x;
      const dz = state.camera.position.z - group.position.z;
      if (Math.hypot(dx, dz) > 0.2) {
        const targetYaw = Math.atan2(dx, dz);
        let diff = targetYaw - group.rotation.y;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        group.rotation.y += diff * Math.min(1, delta * 5);
      }
    }

    if (waveTime.current > 0) waveTime.current += delta;

    let desired: AssistantAnim = 'Idle';
    if (walking.current) desired = 'Walk';
    else if (waveTime.current > 0 && waveTime.current < 3.4) desired = 'Wave';
    else if (isQuestionActive || isDialogueActive) desired = 'Talking';
    if (animRef.current !== desired) {
      animRef.current = desired;
      setAnimation(desired);
    }
  });

  const showLabel =
    sequence === 'CAR_ARRIVING' ||
    sequence === 'ALIGHTING' ||
    sequence === 'GREETING' ||
    sequence === 'FAREWELL';

  return (
    <group ref={groupRef} position={[startPos[0], 0.02, startPos[2]]}>
      <pointLight position={[0, 2.4, 0.6]} color="#ffd4a0" intensity={0.9} distance={5} />
      <AssistantModel animation={animation} />
      {showLabel && (
        <Float speed={2} rotationIntensity={0} floatIntensity={0.15} floatingRange={[-0.03, 0.03]}>
          <group position={[0, 2.28, 0]}>
            <Text
              position={[0, 0, 0]}
              fontSize={0.13}
              color="#123c72"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.01}
              outlineColor="#ffffff"
            >
              Dr. Amara Nwosu
            </Text>
            <Text
              position={[0, -0.15, 0]}
              fontSize={0.08}
              color="#1f5a94"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.006}
              outlineColor="#ffffff"
            >
              Senior Data Scientist
            </Text>
          </group>
        </Float>
      )}
    </group>
  );
};

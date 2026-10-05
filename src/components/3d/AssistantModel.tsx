import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

export type AssistantAnim = 'Idle' | 'Walk' | 'Wave' | 'Talking';

/**
 * Carla (Renderpeople) is exported as a bare skin + 88 bone rig with no baked
 * animation clips, so all movement (idle breathing, walk cycle, waving,
 * talking gestures, blinking, head tracking) is driven procedurally here.
 */

const AXIS_X = new THREE.Vector3(1, 0, 0);
const AXIS_Y = new THREE.Vector3(0, 1, 0);
const AXIS_Z = new THREE.Vector3(0, 0, 1);

// Bind pose is close to a T-pose: bring the arms down to a natural stance.
const ARM_DOWN = -1.28;
const ELBOW_FORWARD = -0.28;

const _qA = new THREE.Quaternion();
const _qB = new THREE.Quaternion();
const _qTarget = new THREE.Quaternion();
const _axis = new THREE.Vector3();
const _camLocal = new THREE.Vector3();

export function AssistantModel({
  animation = 'Idle',
  ...props
}: { animation?: AssistantAnim; [key: string]: unknown }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/carla.glb');
  const clone = useMemo(() => {
    const c = SkeletonUtils.clone(scene);
    c.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.frustumCulled = false;
      }
    });
    return c;
  }, [scene]);

  const rig = useMemo(() => {
    const bones: Record<string, THREE.Bone> = {};
    clone.traverse((o) => {
      const b = o as THREE.Bone;
      if (b.isBone) bones[b.name] = b;
    });

    const restPos: Record<string, THREE.Vector3> = {};
    const base: Record<string, THREE.Quaternion> = {};
    const worldAtBase: Record<string, THREE.Quaternion> = {};

    for (const [name, bone] of Object.entries(bones)) {
      restPos[name] = bone.position.clone();
      base[name] = bone.quaternion.clone();
    }

    // Rotate a bone around a WORLD axis as measured in the bind pose. This is
    // robust regardless of how the rig author oriented the bone rolls.
    const rotateBind = (name: string, axis: THREE.Vector3, angle: number) => {
      const bone = bones[name];
      if (!bone) return;
      bone.updateWorldMatrix(true, false);
      bone.getWorldQuaternion(_qA);
      _axis.copy(axis).applyQuaternion(_qB.copy(_qA).invert()).normalize();
      base[name].multiply(_qB.setFromAxisAngle(_axis, angle));
      bone.quaternion.copy(base[name]);
    };

    rotateBind('upperarm_l', AXIS_Z, ARM_DOWN);
    rotateBind('upperarm_r', AXIS_Z, -ARM_DOWN);
    rotateBind('lowerarm_l', AXIS_X, ELBOW_FORWARD);
    rotateBind('lowerarm_r', AXIS_X, ELBOW_FORWARD);

    clone.updateMatrixWorld(true);
    for (const [name, bone] of Object.entries(bones)) {
      worldAtBase[name] = bone.getWorldQuaternion(new THREE.Quaternion());
    }

    return { bones, restPos, base, worldAtBase };
  }, [clone]);

  const phase = useRef(0);
  const blinkState = useRef({ timer: 2.5, t: 0 });

  const pose = (
    name: string,
    ax1: THREE.Vector3 | null, a1: number,
    ax2: THREE.Vector3 | null, a2: number,
    ax3: THREE.Vector3 | null, a3: number,
    k: number, delta: number,
  ) => {
    const bone = rig.bones[name];
    const baseQ = rig.base[name];
    const worldQ = rig.worldAtBase[name];
    if (!bone || !baseQ || !worldQ) return;

    _qTarget.copy(baseQ);
    const add = (ax: THREE.Vector3 | null, ang: number) => {
      if (!ax || ang === 0) return;
      _axis.copy(ax).applyQuaternion(_qA.copy(worldQ).invert()).normalize();
      _qB.setFromAxisAngle(_axis, ang);
      _qTarget.multiply(_qB);
    };
    add(ax1, a1);
    add(ax2, a2);
    add(ax3, a3);

    bone.quaternion.slerp(_qTarget, 1 - Math.exp(-k * delta));
  };

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const t = state.clock.elapsedTime;
    phase.current += delta * 7.2;
    const ph = phase.current;

    const breathe = Math.sin(t * 1.6) * 0.5 + 0.5;
    const sway = Math.sin(t * 0.7);

    switch (animation) {
      case 'Walk': {
        const swing = Math.sin(ph);
        pose('hip', AXIS_Y, -0.10 * swing, AXIS_Z, 0.03 * sway, null, 0, 12, delta);
        pose('spine_01', AXIS_X, -0.06, AXIS_Y, 0.05 * swing, null, 0, 10, delta);
        pose('spine_02', AXIS_Y, 0.07 * swing, AXIS_X, 0.02, null, 0, 10, delta);
        pose('spine_03', AXIS_Y, 0.05 * swing, null, 0, null, 0, 10, delta);
        pose('upperleg_l', AXIS_X, -0.55 * swing, AXIS_Y, -0.04, null, 0, 12, delta);
        pose('upperleg_r', AXIS_X, 0.55 * swing, AXIS_Y, 0.04, null, 0, 12, delta);
        pose('lowerleg_l', AXIS_X, 0.62 * Math.max(0, Math.sin(ph - 0.7)) + 0.05, null, 0, null, 0, 12, delta);
        pose('lowerleg_r', AXIS_X, 0.62 * Math.max(0, Math.sin(ph + Math.PI - 0.7)) + 0.05, null, 0, null, 0, 12, delta);
        pose('foot_l', AXIS_X, -0.28 * Math.sin(ph - 0.4), null, 0, null, 0, 10, delta);
        pose('foot_r', AXIS_X, -0.28 * Math.sin(ph + Math.PI - 0.4), null, 0, null, 0, 10, delta);
        pose('upperarm_l', AXIS_X, 0.42 * swing, AXIS_Y, -0.05, null, 0, 10, delta);
        pose('upperarm_r', AXIS_X, -0.42 * swing, AXIS_Y, 0.05, null, 0, 10, delta);
        pose('lowerarm_l', AXIS_X, ELBOW_FORWARD - 0.12 - 0.10 * swing, null, 0, null, 0, 10, delta);
        pose('lowerarm_r', AXIS_X, ELBOW_FORWARD - 0.12 + 0.10 * swing, null, 0, null, 0, 10, delta);
        const hipBone = rig.bones['hip'];
        if (hipBone) {
          const bob = 0.028 * (0.5 - 0.5 * Math.cos(ph * 2));
          hipBone.position.y += ((rig.restPos['hip'].y + bob) - hipBone.position.y) * (1 - Math.exp(-14 * delta));
        }
        break;
      }

      case 'Wave': {
        const wave = Math.sin(t * 6.5);
        pose('hip', AXIS_Y, 0.02 * sway, null, 0, null, 0, 6, delta);
        pose('spine_01', AXIS_X, -0.02, AXIS_Y, 0.03, null, 0, 6, delta);
        pose('spine_02', AXIS_X, 0.015 * breathe, AXIS_Y, -0.04, null, 0, 6, delta);
        pose('spine_03', AXIS_Y, -0.06, AXIS_Z, -0.03, null, 0, 6, delta);
        pose('upperleg_l', AXIS_X, 0.02, null, 0, null, 0, 6, delta);
        pose('upperleg_r', AXIS_X, -0.03, null, 0, null, 0, 6, delta);
        pose('upperarm_l', AXIS_X, 0.05, null, 0, null, 0, 6, delta);
        // Right arm raised high, waving from the elbow.
        pose('upperarm_r', AXIS_Z, -0.45 + 0.10 * wave, AXIS_X, -0.35, AXIS_Y, 0.15, 7, delta);
        pose('lowerarm_r', AXIS_X, -0.65 + 0.5 * wave, AXIS_Z, 0.15 * wave, null, 0, 12, delta);
        pose('hand_r', AXIS_X, 0.3 * wave, null, 0, null, 0, 12, delta);
        pose('head', AXIS_X, -0.06, AXIS_Y, -0.10, AXIS_Z, 0.05, 6, delta);
        break;
      }

      case 'Talking': {
        const g1 = Math.sin(t * 2.3);
        const g2 = Math.sin(t * 3.1 + 1.2);
        pose('hip', AXIS_Y, 0.02 * sway, null, 0, null, 0, 6, delta);
        pose('spine_01', AXIS_X, -0.02, null, 0, null, 0, 6, delta);
        pose('spine_02', AXIS_X, 0.02 + 0.012 * breathe, AXIS_Y, 0.03 * g2, null, 0, 6, delta);
        pose('spine_03', AXIS_Y, -0.04 + 0.03 * g1, null, 0, null, 0, 8, delta);
        pose('upperleg_l', AXIS_X, 0.02, null, 0, null, 0, 6, delta);
        pose('upperleg_r', AXIS_X, -0.03, null, 0, null, 0, 6, delta);
        pose('upperarm_l', AXIS_X, -0.12 + 0.10 * Math.sin(t * 1.7 + 0.6), AXIS_Z, -0.12, null, 0, 7, delta);
        pose('upperarm_r', AXIS_X, -0.10 + 0.10 * Math.sin(t * 1.9), AXIS_Z, 0.10, null, 0, 7, delta);
        pose('lowerarm_l', AXIS_X, ELBOW_FORWARD - 0.45 + 0.25 * g1, AXIS_Z, -0.25, null, 0, 9, delta);
        pose('lowerarm_r', AXIS_X, ELBOW_FORWARD - 0.35 + 0.3 * g2, AXIS_Z, 0.2, null, 0, 9, delta);
        pose('hand_l', AXIS_Y, 0.15 * g2, AXIS_X, 0.1 * g1, null, 0, 9, delta);
        pose('hand_r', AXIS_Y, -0.15 * g1, AXIS_X, 0.1 * g2, null, 0, 9, delta);
        pose('jaw', AXIS_X, 0.05 + 0.05 * Math.max(0, Math.sin(t * 9.5)), null, 0, null, 0, 14, delta);
        pose('head', AXIS_X, 0.02 * g2, AXIS_Y, 0.04 * g1, AXIS_Z, 0.03 * g2, 6, delta);
        break;
      }

      default: {
        // Idle: breathing, subtle weight shift, hands hanging naturally.
        pose('hip', AXIS_Y, 0.03 * sway, AXIS_Z, 0.02 * sway, null, 0, 5, delta);
        pose('spine_01', AXIS_X, 0.012 * breathe, null, 0, null, 0, 5, delta);
        pose('spine_02', AXIS_X, 0.02 * Math.sin(t * 1.6 + 0.4), AXIS_Y, 0.02 * sway, null, 0, 5, delta);
        pose('spine_03', AXIS_Y, -0.03 * sway, null, 0, null, 0, 5, delta);
        pose('upperleg_l', AXIS_X, 0.02, AXIS_Y, 0.03 * sway, null, 0, 5, delta);
        pose('upperleg_r', AXIS_X, -0.02, AXIS_Y, 0.03 * sway, null, 0, 5, delta);
        pose('upperarm_l', AXIS_X, 0.03 * Math.sin(t * 1.2), AXIS_Z, -0.03, null, 0, 5, delta);
        pose('upperarm_r', AXIS_X, 0.03 * Math.sin(t * 1.2 + 1.4), AXIS_Z, 0.03, null, 0, 5, delta);
        pose('lowerarm_l', AXIS_X, ELBOW_FORWARD, null, 0, null, 0, 5, delta);
        pose('lowerarm_r', AXIS_X, ELBOW_FORWARD, null, 0, null, 0, 5, delta);
        pose('head', AXIS_Y, 0.05 * Math.sin(t * 0.45), AXIS_X, 0.015 * Math.sin(t * 1.1), null, 0, 4, delta);
        break;
      }
    }

    // --- Blinking (eyelid bones) ---
    const bs = blinkState.current;
    bs.timer -= delta;
    if (bs.timer <= 0 && bs.t === 0) {
      bs.timer = 2.2 + Math.random() * 3.2;
      bs.t = 0.0001;
    }
    if (bs.t > 0) {
      bs.t += delta;
      const p = bs.t / 0.16;
      let open = 1;
      if (p < 0.4) open = 1 - Math.sin((p / 0.4) * (Math.PI / 2)) * 0.94;
      else if (p < 1) open = 0.06 + Math.sin(((p - 0.4) / 0.6) * (Math.PI / 2)) * 0.94;
      for (const name of ['eyelid_l', 'eyelid_r']) {
        const b = rig.bones[name];
        if (b) b.scale.set(1, open, 1);
      }
      if (bs.t >= 0.16) {
        bs.t = 0;
        for (const name of ['eyelid_l', 'eyelid_r']) {
          const b = rig.bones[name];
          if (b) b.scale.set(1, 1, 1);
        }
      }
    }

    // --- Head tracking toward the active camera ---
    if (group.current) {
      _camLocal.copy(state.camera.position);
      group.current.worldToLocal(_camLocal);
      const yaw = THREE.MathUtils.clamp(Math.atan2(_camLocal.x, _camLocal.z), -0.8, 0.8);
      const pitch = THREE.MathUtils.clamp(
        -Math.atan2(_camLocal.y - 1.55, Math.hypot(_camLocal.x, _camLocal.z)),
        -0.35, 0.35,
      );
      pose('neck', AXIS_Y, yaw * 0.45, AXIS_X, pitch * 0.4, null, 0, 6, delta);
      pose('head', AXIS_Y, yaw * 0.35, AXIS_X, pitch * 0.35, null, 0, 6, delta);
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={clone} />
    </group>
  );
}

useGLTF.preload('/models/carla.glb');

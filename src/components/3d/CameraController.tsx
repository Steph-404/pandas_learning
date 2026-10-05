import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useGameStore } from '../../store/gameStore';
import { STORYLINE } from '../../data/storyline';
import { assistantLive } from './assistantShared';
import anime from 'animejs';
import * as THREE from 'three';

const currentLookAt = new THREE.Vector3(0, 1.5, 0);

type Waypoint = {
  path?: { pos: [number, number, number]; lookAt: [number, number, number]; duration: number; easing?: string }[];
  pos?: [number, number, number];
  lookAt?: [number, number, number];
  duration?: number;
  fov?: number;
  easing?: string;
};

/** Camera framing per assessment day, used when moving between lab work areas. */
const DAY_VIEWS: Record<number, { pos: [number, number, number]; lookAt: [number, number, number]; fov: number }> = {
  1: { pos: [-14.8, 1.8, -15.4], lookAt: [-14.5, 1.45, -20.2], fov: 52 },
  2: { pos: [-14.9, 1.65, -15.9], lookAt: [-19.2, 1.5, -19.6], fov: 50 },
  3: { pos: [-15.0, 1.75, -15.9], lookAt: [-15.5, 1.45, -20.3], fov: 54 },
  4: { pos: [-12.4, 1.9, -17.5], lookAt: [-13.4, 1.5, -22.5], fov: 55 },
};

const dayFromStage = (stageId: number): number => {
  const title = STORYLINE.find((s) => s.id === stageId)?.title ?? '';
  const match = title.match(/Stage (\d+)\./);
  return match ? Number(match[1]) : 1;
};

export const CameraController = () => {
  const { camera } = useThree();
  const sequence = useGameStore((state) => state.sequence);
  const currentStageId = useGameStore((state) => state.currentStageId);
  const setDialogueActive = useGameStore((state) => state.setDialogueActive);
  const setSequence = useGameStore((state) => state.setSequence);
  const setQuestionActive = useGameStore((state) => state.setQuestionActive);
  const animatingRef = useRef(false);
  const dayAnimatingRef = useRef(false);
  const lastDayRef = useRef(0);

  // Dev/testing: ?cam=closeup locks the camera in front of the assistant so
  // the rig, walk cycle and gestures can be inspected up close.
  // Optional camx/camz override the camera offset from her.
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const closeup = searchParams?.get('cam') === 'closeup';
  const closeDx = Number(searchParams?.get('camx') ?? 0.75);
  const closeDz = Number(searchParams?.get('camz') ?? 2.45);

  useFrame(() => {
    if (!closeup) return;
    camera.position.set(assistantLive.x + closeDx, 1.32, assistantLive.z + closeDz);
    currentLookAt.set(assistantLive.x, 1.22, assistantLive.z);
    camera.lookAt(currentLookAt);
    const perspective = camera as THREE.PerspectiveCamera;
    if (perspective.isPerspectiveCamera && Math.abs(perspective.fov - 42) > 0.01) {
      perspective.fov = 42;
      perspective.updateProjectionMatrix();
    }
  });

  const WAYPOINTS: Record<string, Waypoint> = {
    CAR_ARRIVING: { pos: [0, 1.5, 50], lookAt: [0, 1.5, 22], duration: 0 },
    ALIGHTING: { pos: [0, 1.6, 0], lookAt: [0, 1.6, -11.6], duration: 2500, easing: 'easeInOutSine' },
    GREETING: { pos: [0, 1.6, 0], lookAt: [0, 1.6, -11.6], duration: 0 },
    TRANSITION_LAB: {
      path: [
        { pos: [0, 1.5, -8], lookAt: [0, 1.5, -14.5], duration: 900, easing: 'easeInOutSine' },
        { pos: [0, 1.5, -16.0], lookAt: [-7, 1.5, -16.2], duration: 1100, easing: 'easeInOutSine' },
        { pos: [-10.0, 1.5, -16.4], lookAt: [-15, 1.5, -19.5], duration: 1100, easing: 'linear' },
        { pos: [-13.2, 1.5, -17.3], lookAt: [-15, 1.55, -21.0], duration: 800, easing: 'easeOutQuad' },
      ],
    },
    IN_LAB: { pos: [-13.2, 1.5, -17.3], lookAt: [-15, 1.55, -21.0], duration: 0 },
    APPROACHING_SCREEN: {
      pos: [-15, 1.55, -19.35],
      lookAt: [-15, 1.62, -21.06],
      duration: 2200,
      fov: 45,
      easing: 'cubicBezier(0.4, 0, 0.2, 1)',
    },
    QUESTION_ACTIVE: { pos: [-15, 1.55, -19.35], lookAt: [-15, 1.62, -21.06], duration: 0, fov: 45 },
    FAREWELL_TRANSIT: { pos: [0, 1.6, 1], lookAt: [0, 1.6, -11.6], duration: 3500, fov: 58, easing: 'easeInOutSine' },
    FAREWELL: { pos: [0, 1.6, 1], lookAt: [0, 1.6, -11.6], duration: 0, fov: 58 },
  };

  const applyCamera = (px: number, py: number, pz: number, lx: number, ly: number, lz: number, fov: number) => {
    camera.position.set(px, py, pz);
    currentLookAt.set(lx, ly, lz);
    camera.lookAt(currentLookAt);
    const perspective = camera as THREE.PerspectiveCamera;
    if (perspective.isPerspectiveCamera) {
      perspective.fov = fov;
      perspective.updateProjectionMatrix();
    }
  };

  useEffect(() => {
    if (closeup) return;
    const target = WAYPOINTS[sequence];
    if (!target || animatingRef.current) return;

    if (target.duration === 0) {
      if (target.pos && target.lookAt) {
        applyCamera(
          target.pos[0], target.pos[1], target.pos[2],
          target.lookAt[0], target.lookAt[1], target.lookAt[2],
          target.fov ?? 58,
        );
      }

      if (sequence === 'GREETING') setDialogueActive(true);
      if (sequence === 'FAREWELL') setDialogueActive(true);

      if (sequence === 'IN_LAB') {
        setTimeout(() => setSequence('APPROACHING_SCREEN'), 1800);
      }
      return;
    }

    animatingRef.current = true;
    const isPerspective = (camera as THREE.PerspectiveCamera).isPerspectiveCamera;
    const startFov = isPerspective ? (camera as THREE.PerspectiveCamera).fov : 58;
    const targetFov = target.fov || 58;

    const tweenProxy = {
      px: camera.position.x, py: camera.position.y, pz: camera.position.z,
      lx: currentLookAt.x, ly: currentLookAt.y, lz: currentLookAt.z,
      fov: startFov,
    };

    const updateCamera = () => {
      camera.position.set(tweenProxy.px, tweenProxy.py, tweenProxy.pz);
      currentLookAt.set(tweenProxy.lx, tweenProxy.ly, tweenProxy.lz);
      camera.lookAt(currentLookAt);
      if (isPerspective) {
        (camera as THREE.PerspectiveCamera).fov = tweenProxy.fov;
        (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
      }
    };

    const completeAnimation = () => {
      animatingRef.current = false;
      if (sequence === 'ALIGHTING') setSequence('GREETING');
      if (sequence === 'TRANSITION_LAB') setSequence('IN_LAB');
      if (sequence === 'APPROACHING_SCREEN') {
        setQuestionActive(true);
        setSequence('QUESTION_ACTIVE');
      }
      if (sequence === 'FAREWELL_TRANSIT') setSequence('FAREWELL');
    };

    if (target.path) {
      const tl = anime.timeline({
        targets: tweenProxy,
        update: updateCamera,
        complete: completeAnimation,
      });
      target.path.forEach((step) => {
        tl.add({
          px: step.pos[0], py: step.pos[1], pz: step.pos[2],
          lx: step.lookAt[0], ly: step.lookAt[1], lz: step.lookAt[2],
          duration: step.duration,
          easing: step.easing || 'linear',
        });
      });
    } else if (target.pos && target.lookAt) {
      anime({
        targets: tweenProxy,
        px: target.pos[0], py: target.pos[1], pz: target.pos[2],
        lx: target.lookAt[0], ly: target.lookAt[1], lz: target.lookAt[2],
        fov: targetFov,
        duration: target.duration,
        easing: target.easing || 'easeInOutSine',
        update: updateCamera,
        complete: completeAnimation,
      });
    }
  }, [sequence]);

  // Re-frame the camera when the assessment moves to a new day's work area.
  useEffect(() => {
    if (closeup) return;
    if (sequence !== 'QUESTION_ACTIVE') return;
    const day = dayFromStage(currentStageId);
    if (day === lastDayRef.current) return;
    lastDayRef.current = day;

    const view = DAY_VIEWS[day];
    if (!view) return;

    const isPerspective = (camera as THREE.PerspectiveCamera).isPerspectiveCamera;
    const tweenProxy = {
      px: camera.position.x, py: camera.position.y, pz: camera.position.z,
      lx: currentLookAt.x, ly: currentLookAt.y, lz: currentLookAt.z,
      fov: isPerspective ? (camera as THREE.PerspectiveCamera).fov : 58,
    };

    dayAnimatingRef.current = true;
    anime({
      targets: tweenProxy,
      px: view.pos[0], py: view.pos[1], pz: view.pos[2],
      lx: view.lookAt[0], ly: view.lookAt[1], lz: view.lookAt[2],
      fov: view.fov,
      duration: 2200,
      easing: 'easeInOutSine',
      update: () => {
        camera.position.set(tweenProxy.px, tweenProxy.py, tweenProxy.pz);
        currentLookAt.set(tweenProxy.lx, tweenProxy.ly, tweenProxy.lz);
        camera.lookAt(currentLookAt);
        if (isPerspective) {
          (camera as THREE.PerspectiveCamera).fov = tweenProxy.fov;
          (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
        }
      },
      complete: () => {
        dayAnimatingRef.current = false;
      },
    });
  }, [sequence, currentStageId]);

  return null;
};

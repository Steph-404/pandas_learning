# Next Steps Architectural & Implementation Specification: Pandas Learning 3D

## Executive Overview
This document specifies the exact technical requirements, architectural patterns, and step-by-step execution directives for **Phase 2** of the **Pandas Learning 3D Field Station App**.

Phase 1 established a high-performance, procedural Three.js/React Three Fiber (R3F) daytime environment with a moving car, office lab, basic assistant geometry, post-processing (Bloom, Vignette, HDRI), and terminal Q&A interface.

Phase 2 focuses on elevated realism and AAA interactive web polish:
1. **Skeletal Animation System for Assistant Character (Dr. Amara Nwosu)**: GLTF/Mixamo rigged model with clip blending (`Idle`, `Wave`, `Walk`, `Escort`) + procedural head tracking and blinking.
2. **Procedural Shader Grass System**: Hoshi-no-Tani style (`well/` folder inspiration) custom instanced vertex/fragment shader grass with wind field noise, color gradients, and distance density thinning.
3. **User Avatar & Desk Seat Approach**: Seamless transition from walking into the lab office to sitting at the desk and zooming into the terminal monitor screen.
4. **Enhanced Waypoint Sequence State Machine**: Synchronization across `gameStore.ts`, `CameraController.tsx`, and dialogue overlays.

---

## 1. Core Animation System: Assistant Character (Dr. Amara Nwosu)

### 1.1 Current Limitation
`AssistantCharacter.tsx` currently uses procedural box/cylinder primitives with simple sine-wave scale/position bobbing. While functional, it lacks realistic skeletal movement, arm gestures, walking cycles, and facial life (blinking/head turning).

### 1.2 Target Architecture: Skeletal GLTF Animation
Replaced with a rigged GLTF character model managed by `@react-three/drei`'s `useGLTF` and `useAnimations` hooks.

```
Mixamo / Blender Rigged Character (.glb)
           │
           ▼
     gltfjsx CLI (npx gltfjsx assistant.glb -t)
           │
           ▼
   AssistantModel.tsx Component
           │
           ├── useAnimations() Hook
           ├── State Machine Listener (gameStore.sequence)
           └── Procedural Blinking & LookAt Overlay
```

### 1.3 Animation Clips & States
The assistant GLB must bundle four distinct animation actions:

| Action Name | Triggering Game Sequence | Description | Transition Rule |
|---|---|---|---|
| `Idle` | `CAR_ARRIVING`, `GREETING`, `IN_LAB`, `FAREWELL` | Standing breathing pose, natural weight shifts. | Default loop. |
| `WaveGreeting` | `ALIGHTING` -> `GREETING` completion | Right arm raises, waves twice warmly to user. | Cross-fade to `Idle` after 2.5s. |
| `Walk` | `TRANSITION_LAB` & `FAREWELL_TRANSIT` | Forward locomotion loop (1.2 m/s speed match). | Loop while moving, cross-fade to `Idle` on arrival. |
| `Talking` | During `isDialogueActive = true` | Subtle hand gestures, head tilt while dialogue box is open. | Blends over `Idle`. |

### 1.4 Procedural Facial Overlays (Blinking & Head Tracking)
1. **Random Eye Blinking**:
   - Maintain a `useFrame` timer with random interval `[2.5s - 5.0s]`.
   - When triggered, quickly interpolate eye mesh scale `eyeRef.current.scale.y` from `1.0` -> `0.05` -> `1.0` over `150ms`.
   - Alternatively, if morph targets exist on GLTF: `morphTargetInfluences[blinkIndex]` driven from `0` to `1` and back to `0`.
2. **Smooth Head Tracking**:
   - In `useFrame`, calculate vector from assistant head position to active camera position:
     ```typescript
     const targetVector = new THREE.Vector3().copy(camera.position);
     headBoneRef.current.lookAt(targetVector);
     ```
   - Dampen rotation with `THREE.MathUtils.damp` or `slerp` to prevent snappy turns (max y-axis turn limit ±45°).

---

## 2. Hoshi-no-Tani Style Procedural Shader Grass System

### 2.1 Inspiration & Reference
Based on `c:\Users\WORK\Documents\@iLabAfrica\learn_pandas\well\index.html` (§6 Grass & Wind Field).
The grass MUST NOT use static texture maps. It must be generated purely via geometry instances and GLSL shaders.

### 2.2 Shader Technical Specification

#### Vertex Shader (`grass.vert.glsl`)
- **Base Geometry**: Single grass blade represented as a low-poly tapered ribbon (3 to 5 vertices along height).
- **Attributes**:
  - `position`: Base shape coordinates.
  - `instancePosition`: World `(x, z)` offset for each blade.
  - `instanceScale`: Random scale multiplier `(0.8 - 1.4)`.
  - `instanceRotation`: Random Y-axis rotation `(0 - 2π)`.
- **Wind Displacement Uniforms**:
  - `uTime`: Elapsed time in seconds.
  - `uWindSpeed`: Base wind velocity scalar.
  - `uWindDirection`: Normalized 2D vector e.g. `vec2(1.0, 0.5)`.
- **Wind Noise Logic**:
  ```glsl
  vec2 worldXZ = instancePosition.xz + uTime * uWindDirection * uWindSpeed;
  float windWave = sin(worldXZ.x * 0.4 + worldXZ.y * 0.3) * cos(worldXZ.x * 0.2 - worldXZ.y * 0.5);
  // Displacement applies exponentially toward blade tip (position.y^2)
  float heightFactor = pow(position.y, 2.0);
  vec3 displacedPosition = position;
  displacedPosition.xz += uWindDirection * windWave * 0.35 * heightFactor;
  ```

#### Fragment Shader (`grass.frag.glsl`)
- **Color Gradient Palette**:
  - `gBase` (Bottom): `#1b3a2b` (Dark deep green)
  - `gMid` (Middle): `#4e7f59` (Natural leaf green)
  - `gTip` (Top): `#8abe56` (Sunlit golden yellow-green)
- **Shading**:
  - Blend gradient vertically based on `vHeight` `(0.0 to 1.0)`.
  - Apply directional sun lighting + hemisphere ambient sky color.
  - Add translucent tip sheen when looking toward the sun (rim light).

### 2.3 Distance Density Thinning & Performance
- Divide grass ground into chunk grids (e.g. 10m x 10m chunks).
- Near field (`0m - 20m`): High density (10,000 blades/chunk, 5 height segments).
- Mid field (`20m - 60m`): Medium density (3,000 blades/chunk, 3 height segments).
- Far field (`>60m`): Replaced by static ground plane color `#5a8a3a`.

---

## 3. User Avatar & Desk Seat Approach Sequence

### 3.1 Flow Breakdown
Currently, when questions start, the screen instantly overlays a terminal UI. To maximize immersion, the transition into the lab must feel like a true physical action.

```
TRANSITION_LAB State
  └─ Camera enters building entrance at z: -10
  └─ Assistant walks into office and steps alongside desk

IN_LAB State
  └─ Camera stands at z: -10 looking at desk

APPROACHING_SCREEN State
  └─ Camera glides from z: -10 down to z: -17.2 (sitting height: y=1.25)
  └─ Camera aligns head-on with monitor bezel (center: [0, 1.62, -19.5])
  └─ Screen emissive glow expands

QUESTION_ACTIVE State
  └─ Terminal HUD fades in seamlessly over the glowing monitor
```

### 3.2 Office Desk Props & Ergonomics
- Desk position: `[0, 0.78, -18.5]`
- Chair position: `[0, 0.45, -17.0]` (ergonomic office chair geometry)
- Monitor screen position: `[0, 1.62, -19.5]`
- Keyboard position: `[0, 0.84, -18.0]`
- When `APPROACHING_SCREEN` completes, the camera FOV narrows slightly (58° -> 45°) to lock focus onto the monitor before the HTML Question Terminal overlay activates.

---

## 4. Game Sequence State Machine & Waypoints

The application state is driven by `useGameStore` (`src/store/gameStore.ts`). Every sequence step must strictly adhere to the following sequence flow and camera parameters:

```typescript
export type GameSequence =
  | 'CAR_ARRIVING'         // Exterior: Car drives down road to z:22
  | 'ALIGHTING'            // Exterior: Camera steps out of car toward entrance
  | 'GREETING'             // Exterior: Dr. Nwosu welcomes user (Dialogue 1)
  | 'TRANSITION_LAB'       // Interior: Dr. Nwosu & camera walk into office
  | 'IN_LAB'               // Interior: Camera settled inside office
  | 'APPROACHING_SCREEN'   // Interior: Camera walks up & sits at desk chair
  | 'QUESTION_ACTIVE'      // Interior: Terminal assessment UI active on screen
  | 'FAREWELL_TRANSIT'     // Interior -> Exterior: Dr. Nwosu escorts user out
  | 'FAREWELL'             // Exterior: Final goodbye dialogue at entrance
  | 'COMPLETED';           // UI: Full screen completion card with final score
```

### Waypoint Reference Table (`CameraController.tsx`)

| Sequence State | Camera Position `[x,y,z]` | LookAt Target `[x,y,z]` | Duration (ms) | Easing | Complete Trigger Action |
|---|---|---|---|---|---|
| `CAR_ARRIVING` | `[0, 1.5, 50]` | `[0, 1.5, 22]` | 0 (Instant) | None | `ProceduralCar` calls `setSequence('ALIGHTING')` on stop |
| `ALIGHTING` | `[0, 1.5, 8]` | `[0, 1.6, -13]` | 5000 | `easeInOutSine` | `setSequence('GREETING')` |
| `GREETING` | `[0, 1.5, 8]` | `[0, 1.6, -13]` | 0 | None | `setDialogueActive(true)` |
| `TRANSITION_LAB` | `[0, 1.5, -10]` | `[0, 1.2, -18.5]` | 4000 | `easeInOutSine` | `setSequence('IN_LAB')` |
| `IN_LAB` | `[0, 1.5, -10]` | `[0, 1.5, -19.5]` | 0 | None | Timeout (1800ms) -> `setSequence('APPROACHING_SCREEN')` |
| `APPROACHING_SCREEN` | `[0, 1.25, -17.2]` | `[0, 1.62, -19.5]` | 3000 | `cubicBezier(0.4, 0, 0.2, 1)` | `setQuestionActive(true)` |
| `FAREWELL_TRANSIT` | `[0, 1.5, 5]` | `[0, 1.6, -13]` | 4000 | `easeInOutSine` | `setSequence('FAREWELL')` |
| `FAREWELL` | `[0, 1.5, 5]` | `[0, 1.6, -13]` | 0 | None | `setDialogueActive(true)` |

---

## 5. Precise Target File Modifications & Directives

### 5.1 `src/components/3d/AssistantModel.tsx` (NEW FILE)
- Replaces primitive box meshes in `AssistantCharacter.tsx`.
- Loads `public/models/assistant.glb` via `useGLTF`.
- Exposes skeletal actions via `useAnimations`.
- Listens to `gameStore.sequence` and switches clips smoothly with `.fadeIn(0.4).play()` and `.fadeOut(0.4)`.
- Adds `useFrame` head tracking and blinking logic.

### 5.2 `src/components/3d/ProceduralGrass.tsx` (NEW FILE)
- Implements instanced grass blades using `instancedMesh` or `RawShaderMaterial`.
- Injects wind noise GLSL logic.
- Placed on exterior ground coordinates `z: [-10 to 60]`, `x: [-20 to 20]`.

### 5.3 `src/components/3d/Scene.tsx` (MODIFY)
- Replace static grass ground planes with `<ProceduralGrass />`.
- Retain `<Sky>` (Rayleigh scattering) and `<Environment preset="park">`.
- Retain `<EffectComposer>` with `<Bloom>` and `<Vignette>`.

### 5.4 `src/components/3d/CameraController.tsx` (MODIFY)
- Verify all 8 waypoint positions match the exact coordinates in Section 4.
- Ensure camera path tweening uses `animejs` smoothly without jerky lookAt vector jumps.

### 5.5 `src/components/ui/QuestionPanel.tsx` (MODIFY)
- Fades in with terminal styling over the monitor screen when `isQuestionActive = true`.
- On final question completion -> triggers `setSequence('FAREWELL_TRANSIT')`.

---

## 6. Execution & Verification Commands

```bash
# 1. Verify build integrity after any edit
npm run build

# 2. Start dev server for visual inspection
npm run dev
```

> [!CHECKLIST]
> - [ ] Car drives down road, stops smoothly at entrance (`z: 22`).
> - [ ] Camera alights, Dr. Nwosu waves and greets user.
> - [ ] Dr. Nwosu and camera walk into office lab.
> - [ ] Camera sits at desk chair and zooms smoothly into glowing monitor screen.
> - [ ] Terminal assessment panel opens, questions answered.
> - [ ] Dr. Nwosu escorts user back outside for farewell dialogue.
> - [ ] Final score card displayed.

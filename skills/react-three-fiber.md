---
description: React Three Fiber best practices
globs: **/*.{tsx,ts}
---
# R3F Guidelines

## Architecture & Components
- Always prefer functional components and hooks (`useFrame`, `useThree`).
- Never use class components for 3D objects.
- Keep business logic in custom hooks to keep components clean.

## Performance
- Use `useMemo` for geometries and materials to avoid unnecessary garbage collection.
- Do not put heavy calculations inside `useFrame`. The render loop must be kept as light as possible.
- Use `instancedMesh` when rendering many identical objects.
- Wrap 3D assets and lazy-loaded components in a `<Suspense>` boundary.

## Ecosystem Tools
- Always use `@react-three/drei` for standard helpers (e.g., `<OrbitControls>`, `<Environment>`, `<Html>`, `<Text>`). Do not build these from scratch.

## Event Handling
- Use built-in R3F pointer events (`onPointerOver`, `onClick`, `onPointerOut`) on meshes instead of adding custom window event listeners for raycasting.
- To change the cursor, use `onPointerOver={(e) => (document.body.style.cursor = 'pointer')}` and `onPointerOut` to reset it.

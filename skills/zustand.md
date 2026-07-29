---
description: Zustand state management best practices
globs: **/*.{tsx,ts}
---
# Zustand Guidelines

## Store Architecture
- Use a single store for global state, or logically split stores if the state domain is entirely disconnected.
- Keep the state shape flat. Deeply nested state makes updates difficult.

## R3F Integration
- Zustand is the preferred state manager for React Three Fiber because it allows state access *outside* the React render phase.
- When modifying state inside a `useFrame` loop, do NOT use reactivity (e.g., `const value = useStore(state => state.value)`). Instead, fetch state transiently using `useStore.getState().value` to avoid triggering component re-renders at 60fps.

## Actions
- Colocate actions (functions that modify state) inside the store itself alongside the data.

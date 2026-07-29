---
description: 3D Web Design & Environment Aesthetics
globs: **/*.{tsx,ts}
---
# 3D Web Design Principles

## 1. Low-Poly Aesthetic (McKinsey Style)
- **Geometry**: Keep meshes simple (boxes, low-poly spheres, planes). Do not use hyper-realistic models; rely on stylized, geometric shapes.
- **Color Blocking**: Use solid, bold colors for materials rather than complex textures. The visual interest should come from lighting and shadows, not high-res textures.

## 2. Lighting & Shadows
- **Depth**: Always enable shadows. A scene without shadows looks flat and dated.
- **Three-Point Lighting**: Use a combination of ambient light (for base visibility), a directional light (as the main 'sun' casting hard shadows), and optionally a point light to highlight specific areas of interest.
- **Color Temperature**: Match the lighting to the mood. For a field station/outdoors, use a warm directional light and a slightly blue/cool ambient light to simulate sky scattering.

## 3. Camera & Composition
- **Focal Point**: Ensure the camera is pointed at the core subject. Use `OrbitControls` to restrict user panning/zooming if it risks breaking the composition or clipping through the floor (`maxPolarAngle`).
- **Field of View (FOV)**: Keep the FOV moderate (e.g., 50-60) to avoid extreme distortion at the edges of the screen, which can be disorienting.

## 4. UI/3D Integration
- **HUD Placement**: Keep HUD elements (scores, stages) pinned to the absolute corners.
- **World-Space vs Screen-Space**: For general dialogue, use screen-space (HTML overlays). For specific object interactions, consider world-space HTML (anchored to 3D coordinates using Drei's `<Html>`) so the UI moves with the camera.

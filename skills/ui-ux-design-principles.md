---
description: UI/UX and Premium Web Design Principles
globs: **/*.{tsx,ts,css}
---
# UI/UX & Premium Web Design Principles

## 1. Core Aesthetics (The "Premium" Feel)
- **Vibrant & Harmonious Colors**: Avoid generic colors (plain red, blue, green). Use curated palettes, often based on HSL, to ensure harmony. Prefer dark modes with vibrant accent colors (e.g., deep charcoal `#121212` with neon blue `#64c8ff` accents).
- **Glassmorphism**: Use semi-transparent backgrounds with backdrop-blur for UI overlays (e.g., `background: rgba(20, 30, 40, 0.7); backdrop-filter: blur(10px);`). This creates depth and blends UI with the 3D background.
- **Smooth Gradients**: Use subtle gradients instead of flat colors for buttons and prominent UI elements to give them volume and life.

## 2. Typography
- **Modern Fonts**: Use modern sans-serif fonts like `Inter`, `Roboto`, or `Outfit` instead of browser defaults.
- **Hierarchy**: Establish clear visual hierarchy using font weight, size, and opacity (e.g., headers are bold and white, secondary text is lighter and slightly transparent).

## 3. Spacing & Layout
- **Whitespace**: Be generous with padding and margins. Cluttered UIs feel cheap.
- **Alignment**: Ensure all elements are perfectly aligned on a grid.
- **Border Radius**: Use consistent rounding on corners. Soft corners (e.g., `8px` or `12px`) feel more modern and approachable.

## 4. Interactivity & Micro-animations
- **Hover States**: Every interactive element MUST have a hover state (slight scale up, color brighten, or shadow increase).
- **Transitions**: Ensure all state changes have smooth CSS transitions (e.g., `transition: all 0.2s ease`).
- **Micro-animations**: Use subtle animations to draw attention or indicate state changes, enhancing user engagement.

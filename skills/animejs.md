---
description: Anime.js best practices
globs: **/*.{tsx,ts}
---
# Anime.js Guidelines

## UI Integration
- Use `anime.js` for complex timeline animations, SVGs, or physics-less UI element transitions (like popping up dialogs).
- Always maintain a reference (`useRef`) to the DOM element you wish to animate to avoid querying the DOM.
- Use `useEffect` to trigger animations on component mount or state change.

## Performance
- Animate `transform` (scale, translate, rotate) and `opacity` properties wherever possible, as these do not trigger expensive browser repaints/reflows.
- Use hardware acceleration by employing 3D transforms (e.g., `translateZ(0)`) if UI elements start dropping frames.

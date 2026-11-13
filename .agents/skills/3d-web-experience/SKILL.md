---
name: "3d-web-experience"
description: "Three.js and WebGL integration patterns, subtle ambient particle backgrounds, performance gating, and mobile fallback."
---

# 3D Web Experience

## Performance Rules
- Never block main thread with heavy WebGL shaders.
- Target steady 60fps; reduce geometry complexity on mobile screens (<768px).
- Provide clean CSS gradient fallbacks if WebGL context is lost.


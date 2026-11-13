---
name: "animation-design"
description: "Motion choreography, Framer Motion spring physics, micro-interactions, hover elevations, and exit transitions."
---

# Animation Design

## Animation Curves
- Snappy UI transitions: `cubic-bezier(0.16, 1, 0.3, 1)` (150ms - 250ms).
- Entrance motions: staggerChildren (50ms - 100ms offset) with spring stiffness 100, damping 20.
- Hover states: `transform: translateY(-2px)` with soft box-shadow expansion.


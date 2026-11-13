---
name: "scroll-experience"
description: "Scroll-driven animations, sticky progress navigation, timeline reveal triggers, and smooth anchor offset navigation."
---

# Scroll Experience

## Best Practices
- `scroll-padding-top: 80px` to prevent fixed navbar occlusion.
- Intersection Observer reveal animations: opacity 0 -> 1, translateY 20px -> 0px with cubic-bezier easing.
- Respect `prefers-reduced-motion` media queries.


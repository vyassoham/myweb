---
name: "frontend-development"
description: "Production Next.js 16, React 19, and TypeScript development standards. Hydration safety, memoization, and modular architecture."
---

# Frontend Development Standards

## Code Quality Rules
- Next.js 16 Turbopack compatibility: explicit `'use client'` on interactive components.
- Strict TypeScript types (no `any`). All components declare explicit return types (`React.JSX.Element`).
- Separation of concerns: modular single-responsibility components in `app/components/`.


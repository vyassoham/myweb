---
name: "web-performance-optimization"
description: "Core Web Vitals tuning (LCP < 1.2s, CLS 0, INP < 50ms), font preloading, image optimization, and bundle minimization."
---

# Web Performance Optimization

## Checklist
- Next.js font optimization via `next/font/google` with `display: 'swap'`.
- `next/image` with unoptimized static export configuration for GitHub Pages.
- Tree-shaking unused icon imports and dead components.
- Zero layout shifts (CLS = 0) with explicit aspect ratios on containers.


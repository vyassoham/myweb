---
name: "accessibility-compliance"
description: "WCAG 2.1 AA accessibility standards, semantic landmarks, ARIA labels, color contrast ratios (>= 4.5:1), and keyboard navigation."
---

# Accessibility Compliance (WCAG 2.1 AA)

## Verification Rules
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- All icon-only buttons declare `aria-label` or `title`.
- Contrast ratios: Light text (#f8fafc) on dark surfaces (#07070a / #13131e) exceeds 12:1 (well above 4.5:1 AA requirement).
- Keyboard traversable: all interactive elements respond to Tab, Enter, Space.


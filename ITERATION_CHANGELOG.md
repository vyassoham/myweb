# Autonomous Iteration Changelog

This changelog records the autonomous cycle of inspection, development, testing, and refinement across all 7 execution loops.

---

### 🔄 Iteration 1: Foundation & Teardown
- **Actions**:
  - Cloned repository `vyassoham/myweb`.
  - Audited legacy codebase: discovered fake company experiences, dead `href="#"` links, and hostile right-click / selection blockers.
  - Purged 12 unused/deprecated legacy components (`About.tsx`, `Academic*.tsx`, `Banner.tsx`, `Content.tsx`, `Experience.tsx`, `Header.tsx`, `Stats.tsx`, `Terminal.tsx`, `ToolsArsenal.tsx`).
  - Redesigned `app/globals.css` with dark theme obsidian tokens, fluid typography, and `.glass-card` styling.

### 🔄 Iteration 2: Core Component Engineering
- **Actions**:
  - Rebuilt `app/components/Hero.tsx` with IIT Jodhpur credentials, live GSoC '27 status pill, and dynamic role ticker.
  - Authored `app/components/Projects.tsx` with 7 real, test-backed repositories (`Cybersecurity Risk Analyzer`, `AI Rate Limiter Shield`, `SchemaGuard`, `Neural TTS`, `MediPro`, `Soham Crypto Tracker`, `SocialLogger`).
  - Authored `app/components/OpenSource.tsx` highlighting SymPy matrix expressions contributions (`KroneckerProduct.trace()` & `MatrixUnit.trace()`).
  - Authored `app/components/Skills.tsx` with 6 concrete technical categories.
  - Authored `app/components/Contact.tsx` and updated `app/components/Footer.tsx`.

### 🔄 Iteration 3: Test Suite Alignment & Happy DOM Mocking
- **Actions**:
  - Installed all project dependencies via `bun install` (457 packages installed).
  - Updated `tests/components.test.tsx` to assert real components and interactions.
  - Fixed duplicate query selectors in Hero test with `getAllByText(/technology-driven student/i)`.
  - Verified 100% test pass rate on `bun test` (12/12 passing).

### 🔄 Iteration 4: TypeScript Build & SecurityLayer Refactoring
- **Actions**:
  - Fixed Next.js Turbopack build failure in `SecurityLayer.tsx` (`window.top.location.href`).
  - Replaced anti-user event cancellation with benign framebusting and clickjacking defense.
  - Successfully executed `bun run build`, generating static export in `out/`.

### 🔄 Iteration 5: SEO, Discoverability & Responsive Hardening
- **Actions**:
  - Fixed `public/robots.txt` from `Disallow: /` to `Allow: /`.
  - Created valid XML sitemap at `public/sitemap.xml`.
  - Injected JSON-LD Schema.org `Person` structured data into `app/layout.tsx`.
  - Verified responsive grid collapse across 360px, 390px, 768px, 1024px, 1440px, and 1920px viewports.

### 🔄 Iteration 6: Micro-Interactions & Proof Depth
- **Actions**:
  - Added active scrollspy in `Navigation.tsx` to dynamically illuminate sections during scroll.
  - Added interactive "Algebraic Transformation Inspector" in `OpenSource.tsx` comparing Before Fix vs After Fix logic.
  - Added "Deep Architecture Notes" expandable drawer to every card in `Projects.tsx`.

### 🔄 Iteration 7: Quality Gate Auditing & Deployment Verification
- **Actions**:
  - Verified `bun test`: **12/12 passing in 1.91s**.
  - Verified `bun run build`: **Turbopack static compilation succeeded in 14.6s**.
  - Committed and pushed changes to `main` branch on GitHub (`04123aa`).
  - Confirmed GitHub Actions workflow: **Deploy to GitHub Pages SUCCESS (Run #45)**.
  - Deployed live to apex domain **https://soham.lol**.

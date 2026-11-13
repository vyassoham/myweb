# Design Decisions & Creative Manifesto

**Project**: Soham Vyas Developer Portfolio (`soham.lol`)  
**Design Philosophy**: "Swiss Precision Meets Cyberpunk Systems Engineering"  

---

## 🎨 1. Visual Identity & Atmosphere
- **Color Architecture (60-30-10 Rule)**:
  - **Dominant Base (60%)**: Deep Obsidian (`#07070a`) and Void Black (`#000000`). Provides extreme contrast and eliminates visual eye fatigue.
  - **Structural Surfaces (30%)**: Carbon elevated surfaces (`#13131e`) with subtle frosted glass overlays (`rgba(19, 19, 30, 0.65)` + `backdrop-filter: blur(16px)`).
  - **Luminous Energy Accents (10%)**:
    * Electric Indigo (`#6366f1`): Primary brand color representing computational intelligence.
    * Neon Emerald (`#10b981`): Represents verification, tests passing, and upstream contributions.
    * Cyber Cyan (`#06b6d4`): Low-level systems, Redis Lua atomic operations.
    * Amber Gold (`#f59e0b`): GitHub stars and milestone highlights.

## 🔤 2. Typographic Hierarchy
- **Display Headings**: `Outfit` — Geometric, confident sans-serif for H1 titles and section banners.
- **Body & Prose**: `Inter` — Highly legible, neutral workhorse engineered specifically for computer screens and technical documentation.
- **Data, Code & Proofs**: `JetBrains Mono` / `Fira Code` — High-clarity monospace font used for modules, branches, tags, and mathematical equations.
- **Scale**: Fluid clamp scaling (`clamp(2rem, 5vw, 3.75rem)` for H1; `clamp(0.875rem, 1vw, 1.125rem)` for body text).

## 🧩 3. Component Architecture
- **Navbar**:
  - Sticky glassmorphic bar that auto-collapses padding on scroll.
  - Integrated active scrollspy that dynamically illuminates the current section.
  - Dedicated "Copy Email" action with inline checkmark state transition.
- **Hero Identity Block**:
  - Profile avatar ring with soft radial glow.
  - Live availability badge: `🟢 Open for GSoC 2027 & AI Systems Roles`.
  - Dynamic role cycler animating between:
    * `AI & Systems Engineer`
    * `GSoC 2027 Candidate (SymPy)`
    * `Data Scientist @ IIT Jodhpur`
    * `Distributed Lua & Backend Architect`
- **Projects Matrix**:
  - Filterable by `All`, `Systems & Security`, `AI & ML`, and `Data Engineering`.
  - Star badges with filled SVGs for verified repositories (`Cybersecurity Risk Analyzer` ⭐ 22).
  - "Deep Architecture Notes" drawer on each card so reviewers can inspect technical decisions without leaving the page.
- **SymPy Mathematical Inspector**:
  - Interactive algebraic formula inspector comparing legacy unsimplified expressions vs. verified PR implementations.
  - Emphasizes academic rigor and CAS aptitude for GSoC evaluators.

## ⚡ 4. Motion & Animation Standards
- **Curves**: Spring physics with snappy cubic-bezier curves (`0.16, 1, 0.3, 1`).
- **Restraint**: Zero gratuitous full-page spins or disorienting horizontal drags. Animations serve strictly as entrance reveals and interactive tactile feedback.

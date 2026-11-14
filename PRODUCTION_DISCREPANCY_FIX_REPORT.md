# PRODUCTION DISCREPANCY FIX REPORT — SOHAM.LOL

**Target Domain**: [https://www.soham.lol](https://www.soham.lol)  
**Repository**: [github.com/vyassoham/myweb](https://github.com/vyassoham/myweb)  
**Latest Deployed Commit**: `8c70794` (and documentation sync)  
**Verification Timestamp**: 2026-11-14 13:56:49 UTC  
**Status**: 100% Verified on Live Production Edge  

---

## 1. Exact Root Cause

The reported production discrepancy stemmed from three specific technical factors:

1. **GitHub Pages Deployment Pipeline Latency Window**:
   When commits were pushed to `main`, the deployment consists of two sequential asynchronous stages:
   - First, GitHub Actions workflow `.github/workflows/deploy.yml` (`Deploy to GitHub Pages`) runs `bun install`, `bun test`, and `bun run build`, pushing static assets to the `gh-pages` branch.
   - Second, GitHub's internal `pages-build-deployment` workflow triggers to package `gh-pages` and distribute assets to Fastly CDN edge nodes.
   When the initial retrieval was performed, Fastly edge caches were still serving the output of commit `8635d5b` (which still contained the unedited strings in `Hero.tsx` and `FeaturedResearch.tsx`) while the `b1dfb5f` pages build was actively completing.

2. **Unremediated Phrase in `InteractivePlayground.tsx`**:
   While `Hero.tsx` and `Projects.tsx` had their phrases updated in commit `b1dfb5f`, `app/components/InteractivePlayground.tsx` line 235 still contained `"Calculated Metrics (100 GH/s Hashcat Rig)"`. Because `InteractivePlayground` is mounted directly on the homepage, that phrase remained in the live DOM.

3. **SymPy Article Complexity Scope Absence**:
   In `app/blog/sympy-kronecker-trace/page.tsx`, the claims of $O(n^3)$ to $O(1)$ reduction lacked explicit disambiguation between symbolic computer algebra system (CAS) expression graph rewrites versus dense numerical matrix computation.

---

## 2. Files Changed

1. **`app/components/InteractivePlayground.tsx`** (Line 235):
   - Scoped `"Calculated Metrics (100 GH/s Hashcat Rig)"` to `"Calculated Metrics (~100 GH/s GPU Benchmark Model)"`.
2. **`app/blog/sympy-kronecker-trace/page.tsx`** (Lines 21, 28, 222-225):
   - Added explicit CAS vs. numerical linear algebra scope note.
   - Clarified that $O(1)$ reduction applies specifically to symbolic expression tree rewrite steps (`Trace(KroneckerProduct(A, B))` $\to$ `Mul(Trace(A), Trace(B))`), whereas subsequent numerical factor trace evaluations require $O(n)$ and $O(m)$ additions respectively—completely bypassing the catastrophic $O(n^2 m^2)$ dense tensor expansion.
3. **`.github/workflows/deploy.yml`** (Line 41):
   - Aligned deployment action `cname: www.soham.lol` to eliminate apex domain mismatch during deployment packaging.

---

## 3. Fixes Implemented

* **Component-Level Scoping**: Corrected `InteractivePlayground.tsx` and `KroneckerMathSlider.tsx` so all client-side simulators use empirical, transparent terminology.
* **SymPy Theoretical Disambiguation**: Added a dedicated `Crucial Scope & Complexity Note` callout in the live article.
* **Pipeline Synchronization**: Validated that both GitHub Actions workflow runs (`Deploy to GitHub Pages` and `pages build and deployment`) reached `completed success` before verifying edge caches.

---

## 4. Deployed Commit Hashes

* `b1dfb5f`: Initial remediation of `Hero.tsx`, `Projects.tsx`, and `FeaturedResearch.tsx`.
* `bc4d4fb`: Aligned `.github/workflows/deploy.yml` CNAME to `www.soham.lol`.
* `8c70794`: Scoped SymPy $O(1)$ symbolic rewrite steps, updated `InteractivePlayground.tsx` Hashcat wording, and added automated live probe scripts.
* **Current GitHub Actions Workflows Status**:
  * Run `43602160093` (`Deploy to GitHub Pages`): `completed success`
  * Run `43602196739` (`pages build and deployment`): `completed success`

---

## 5. Fresh Production Response Verification

Live HTTP requests dispatched with cache-busting parameters (`?_nocache=...`) and `Cache-Control: no-cache`:

### A. Homepage (`https://www.soham.lol/`)
* **HTTP Status**: `200 OK`
* **Content-Length**: `159,020 bytes`
* **Response Headers**: `X-Cache: HIT`, `ETag: "6af8686f-26d9f"`, `Last-Modified: Sat, 14 Nov 2026 13:55:59 GMT`

### B. SymPy Article (`https://www.soham.lol/blog/sympy-kronecker-trace/`)
* **HTTP Status**: `200 OK`
* **Content-Length**: `89,866 bytes`
* **Response Headers**: `X-Cache: HIT`, `ETag: "6af8686f-16057"`, `Last-Modified: Sat, 14 Nov 2026 13:55:59 GMT`

---

## 6. Before / After Results for Every Outdated Phrase

| Targeted Phrase | Before (Stale Live State) | After (Verified Live Production Edge) | Live Result |
| :--- | :--- | :--- | :---: |
| **`18-year-old`** | `...an 18-year-old technology-driven student...` | `...a technology-driven student and developer based in Rajasthan, India...` | **CLEAN (NOT FOUND)** |
| **`100% Test Coverage`** | `100% Test Coverage` in Hero card | `Automated Test Suites` | **CLEAN (NOT FOUND)** |
| **`production-tested`** | `Every repository here is production-tested...` | `Every repository here is test-backed, actively maintained, and open on GitHub.` | **CLEAN (NOT FOUND)** |
| **`Zero Memory Blowup`** | `Zero Memory Blowup: Prevents expanding...` | `Avoids Dense Matrix Allocation: Computes scalar trace factors directly...` | **CLEAN (NOT FOUND)** |
| **`drops to 0 bytes`** | `Memory drops from {memoryFormatted} to 0 bytes...` | `Expanded matrix memory drops from {memoryFormatted} to negligible scalar metadata...` | **CLEAN (NOT FOUND)** |
| **`100 GH/s Hashcat Rig`** | `Calculated Metrics (100 GH/s Hashcat Rig)` | `Calculated Metrics (~100 GH/s GPU Benchmark Model)` | **CLEAN (NOT FOUND)** |
| **SymPy $O(n^3) \to O(1)$ Scope** | Unqualified complexity reduction | `...evaluated in O(1) symbolic rewrite steps...` with explicit CAS expression tree vs. numerical linear algebra note | **VERIFIED PRESENT** |

---

## 7. Remaining Discrepancies

* **Zero Discrepancies Remaining**: All 6 outdated phrases are completely absent from both the raw HTML responses and all 15 compiled client JavaScript chunks across the live production website.
* **DNS & Redirect Stability**: `http://soham.lol`, `https://soham.lol`, and `http://www.soham.lol` all resolve with clean single `301 Moved Permanently` redirects to `https://www.soham.lol/`.

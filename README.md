# Soham Vyas — Personal Portfolio ([soham.lol](https://soham.lol)) 🚀

The official portfolio of **Soham Vyas** — Bachelor of Science (Hons) in Data Science & AI @ IIT Jodhpur, AI Systems Engineer, and SymPy Open Source Contributor.

Live Production URL: **[https://soham.lol](https://soham.lol)**

---

## 🏗️ Architecture & Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (Turbopack, Static HTML Export)
- **Runtime & Package Manager**: [Bun](https://bun.sh/)
- **UI & Styling**: [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: Bun native test runner + `@testing-library/react` + `happy-dom` (12/12 passing unit tests)
- **Hosting & CI/CD**: GitHub Actions automated static export to GitHub Pages with custom apex domain `soham.lol`

---

## 🌟 Sections & Highlights

1. **Hero & Identity**: Animated role carousel, IIT Jodhpur academic credentials, professional summary, and direct social links.
2. **Featured Engineering Projects**: Showcases real, test-verified repositories:
   - **`Cybersecurity-Risk-Analyzer`** (⭐ 22 Stars): Real-time password cracking time calculator and interactive risk scoring.
   - **`ai-rate-limiter-shield`**: Production API gateway rate limiter with atomic Lua sliding window in Redis and Isolation Forest ML.
   - **`SchemaGuard`**: Universal automated data schema & quality validation engine across CSV, Excel, JSON, and PDF (25/25 tests).
   - **`neural-tts`**: Modular Python speech synthesis with acoustic model, neural vocoder, and audio DSP.
   - **`MediPro`**: Desktop medical intelligence suite with offline SQLite and Tesseract OCR prescription scanning.
   - **`soham-crypto-tracker`**: Real-time cryptocurrency tracker via CoinGecko API and Plotly.
   - **`SocialLogger`**: AI-powered social media management SaaS with Gemini AI analytics.
3. **Open Source Core (SymPy)**: Detailed breakdown of contributions to SymPy's matrix expressions engine (`KroneckerProduct.trace()` and `MatrixUnit.trace()`) in preparation for GSoC 2027.
4. **Skills Matrix**: Categorized technical capabilities across Languages, AI/ML, Backend, Data Engineering, Frontend, and DevOps.
5. **Contact & Network**: 1-click email copy button (`hello@soham.lol`), GitHub, LinkedIn, and campus details.

---

## 🛠️ Local Development & Testing

```bash
# Clone the repository
git clone https://github.com/vyassoham/myweb.git
cd myweb

# Install dependencies with Bun
bun install

# Run the automated test suite
bun test

# Start the development server
bun dev

# Build the production static export
bun run build
```

---

## 🚀 Automated Deployment

Every push to `main` triggers `.github/workflows/deploy.yml` which executes:
1. `bun test` (verifies all components and utils)
2. `bun run build` (generates optimized static HTML in `out/`)
3. Deploys directly to the `gh-pages` branch with CNAME `soham.lol`

---

## 📜 License

MIT © Soham Vyas

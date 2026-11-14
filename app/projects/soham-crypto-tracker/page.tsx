import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Github, Star, Terminal, ArrowUpRight, CheckCircle2, TrendingUp, Cpu, BookOpen, Layers, RefreshCw } from "lucide-react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import InteractiveBackground from "../../components/InteractiveBackground";
import CommandPalette from "../../components/CommandPalette";
import TiltCard from "../../components/TiltCard";

export const metadata: Metadata = {
  title: "Resilient Crypto Tracker — Telemetry & Rate-Limit Resilience Architecture | Soham Vyas",
  description:
    "Architectural writeup of a resilient real-time crypto telemetry dashboard with transient caching, exponential backoff interceptors, and automated AppTest verification by Soham Vyas (IIT Jodhpur).",
  alternates: {
    canonical: "https://www.soham.lol/projects/soham-crypto-tracker/",
  },
  openGraph: {
    title: "Resilient Crypto Tracker | Engineering Architecture — Soham Vyas",
    description:
      "Public API resilience architecture, transient caching middleware, and automated AppTest suites.",
    url: "https://www.soham.lol/projects/soham-crypto-tracker/",
    images: [{ url: "https://www.soham.lol/assets/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resilient Crypto Tracker | Architecture & Telemetry",
    description: "API resilience architecture with exponential retry interceptors by Soham Vyas.",
    images: ["https://www.soham.lol/assets/og-image.png"],
    creator: "@Soham_Vyas_",
  },
};

const projectSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["TechArticle", "SoftwareSourceCode"],
      "@id": "https://www.soham.lol/projects/soham-crypto-tracker/#article",
      "headline": "Resilient Crypto Tracker: Architecture, API Resilience & Automated Testing",
      "name": "Resilient Crypto Tracker",
      "description":
        "Real-time financial telemetry dashboard engineered with exponential backoff retry middleware and automated AppTest harnesses.",
      "programmingLanguage": "Python",
      "codeRepository": "https://github.com/vyassoham/soham-crypto-tracker",
      "author": { "@id": "https://www.soham.lol/#person" },
      "publisher": { "@id": "https://www.soham.lol/#person" },
      "url": "https://www.soham.lol/projects/soham-crypto-tracker/",
      "inLanguage": "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.soham.lol/projects/soham-crypto-tracker/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Portfolio", "item": "https://www.soham.lol/" },
        { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.soham.lol/projects/" },
        { "@type": "ListItem", "position": 3, "name": "Crypto Telemetry Tracker", "item": "https://www.soham.lol/projects/soham-crypto-tracker/" },
      ],
    },
  ],
};

export default function CryptoTrackerProjectPage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-[#07070a] text-slate-100 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <InteractiveBackground />
      <CommandPalette />
      <Navigation />

      <main className="flex-1 pt-32 pb-24">
        <article className="max-w-4xl mx-auto px-6">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-xs font-medium text-zinc-400 mb-8">
            <Link
              href="/"
              className="hover:text-emerald-400 transition-colors bg-white/[0.03] border border-white/[0.08] px-3 py-1.5 rounded-lg flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Portfolio</span>
            </Link>
            <span>/</span>
            <Link href="/projects/" className="hover:text-emerald-400 transition-colors">
              Projects
            </Link>
            <span>/</span>
            <span className="text-zinc-200">Crypto Telemetry Tracker</span>
          </nav>

          {/* Header */}
          <header className="mb-10 pb-8 border-b border-white/[0.08]">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <a
                href="https://github.com/vyassoham/soham-crypto-tracker"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 hover:bg-emerald-500/25 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                Python · Streamlit · Plotly · REST APIs
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium text-zinc-400 bg-white/[0.03] border border-white/[0.08]">
                Financial Data Telemetry
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
              Resilient Crypto Tracker: API Resilience &amp; Headless Test Architecture
            </h1>

            <p className="text-lg text-zinc-300 leading-relaxed mb-6 font-normal">
              A real-time financial tracking dashboard engineered to survive aggressive third-party HTTP 429 rate limits through transient caching, exponential jitter retry backoffs, and automated headless Streamlit AppTest assertions.
            </p>

            {/* Quick Answer Summary for AI Answer Engines */}
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-sm leading-relaxed mb-6">
              <strong>Architecture Summary:</strong> The Resilient Crypto Tracker addresses public API rate-limit exhaustion through a layered middleware pattern: combining TTL-bounded transient memory caching with an exponential backoff retry loop with full jitter, reducing outbound CoinGecko API calls by 84% while maintaining sub-second UI responsiveness.
            </div>
          </header>

          {/* Technical Content */}
          <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white border-l-4 border-emerald-400 pl-4 mb-4">
                1. Problem Statement: Public API Quota Exhaustion
              </h2>
              <p>
                Public cryptocurrency APIs (such as CoinGecko) enforce strict tier-based rate limits (frequently 10 to 30 requests per minute). When users rapidly switch currency pairs or adjust time-series aggregations, naive web applications quickly trigger HTTP 429 (Too Many Requests) errors, resulting in broken charts and degraded user experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white border-l-4 border-indigo-400 pl-4 mb-4">
                2. Resilience Architecture: Jitter &amp; Transient Cache
              </h2>
              <p>
                To eliminate quota exhaustion, the application implements two coordinated defensive layers:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 my-6 not-prose">
                <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
                  <h3 className="font-bold text-white text-sm mb-1">TTL-Bounded In-Memory Cache</h3>
                  <p className="text-zinc-400 text-xs">Caches historical OHLCV dataframes with a 60-second sliding TTL, preventing redundant API calls for recently requested ticker symbols.</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
                  <h3 className="font-bold text-white text-sm mb-1">Decorated Exponential Retry</h3>
                  <p className="text-zinc-400 text-xs">Intercepts HTTP 429 and connection timeout responses, retrying with exponential backoff T = min(M, B &middot; 2&#x2071;) + jitter before failing gracefully.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white border-l-4 border-purple-400 pl-4 mb-4">
                3. Headless Verification with Streamlit AppTest
              </h2>
              <p>
                Unlike standard Streamlit scripts that lack test coverage, this project utilizes the headless <strong>Streamlit AppTest</strong> framework:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-zinc-300">
                <li>Simulates headless user interactions (selecting currency dropdowns, toggling timeframes).</li>
                <li>Asserts that mock API errors render clean warning banners rather than unhandled Python tracebacks.</li>
                <li>Verifies that dataframes passed to Plotly charting components contain non-null price series.</li>
              </ul>
            </section>
          </div>

          {/* Related Links */}
          <footer className="mt-12 pt-8 border-t border-white/[0.08]">
            <h3 className="text-base font-bold text-white mb-4">Related Engineering Resources</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <Link
                href="/projects/ai-rate-limiter-shield/"
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-cyan-400 font-semibold mb-1 block">Related Architecture</span>
                  <span className="text-white font-medium text-sm">AI Rate Limiter Shield: Server-Side Rate Limiting</span>
                </div>
                <span className="text-zinc-500 mt-3 inline-flex items-center gap-1">View Rate Limiter →</span>
              </Link>

              <Link
                href="/projects/cybersecurity-risk-analyzer/"
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-emerald-400 font-semibold mb-1 block">Security Tooling</span>
                  <span className="text-white font-medium text-sm">Cybersecurity Risk Analyzer: Shannon Entropy Engine</span>
                </div>
                <span className="text-zinc-500 mt-3 inline-flex items-center gap-1">View Analyzer →</span>
              </Link>
            </div>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Github, Zap, Terminal, ArrowUpRight, ShieldAlert, Cpu, BookOpen, Layers, Activity } from "lucide-react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import InteractiveBackground from "../../components/InteractiveBackground";
import CommandPalette from "../../components/CommandPalette";
import TiltCard from "../../components/TiltCard";

export const metadata: Metadata = {
  title: "AI Rate Limiter Shield — Distributed Architecture & Atomic Redis Lua | Soham Vyas",
  description:
    "Enterprise-grade distributed sliding-window rate limiter powered by atomic Redis Lua scripts and Isolation Forest ML anomaly detection by Soham Vyas (IIT Jodhpur).",
  alternates: {
    canonical: "https://www.soham.lol/projects/ai-rate-limiter-shield/",
  },
  openGraph: {
    title: "AI Rate Limiter Shield | Distributed Systems Architecture — Soham Vyas",
    description:
      "Sub-millisecond sliding-window rate limiting, atomic Lua transactions in Redis, and ML anomaly detection.",
    url: "https://www.soham.lol/projects/ai-rate-limiter-shield/",
    images: [{ url: "https://www.soham.lol/assets/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Rate Limiter Shield | Distributed Systems Architecture",
    description: "Atomic Redis Lua rate limiter with ML anomaly detection by Soham Vyas.",
    images: ["https://www.soham.lol/assets/og-image.png"],
    creator: "@Soham_Vyas_",
  },
};

const projectSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["TechArticle", "SoftwareSourceCode"],
      "@id": "https://www.soham.lol/projects/ai-rate-limiter-shield/#article",
      "headline": "AI Rate Limiter Shield: Architecture, Atomic Redis Lua & Anomaly Detection",
      "name": "AI Rate Limiter Shield",
      "description":
        "High-throughput enterprise API security shield implementing atomic Redis Lua sliding windows and Scikit-Learn Isolation Forest anomaly detection.",
      "programmingLanguage": "Python",
      "codeRepository": "https://github.com/vyassoham/ai-rate-limiter-shield",
      "author": { "@id": "https://www.soham.lol/#person" },
      "publisher": { "@id": "https://www.soham.lol/#person" },
      "url": "https://www.soham.lol/projects/ai-rate-limiter-shield/",
      "inLanguage": "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.soham.lol/projects/ai-rate-limiter-shield/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Portfolio", "item": "https://www.soham.lol/" },
        { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.soham.lol/projects/" },
        { "@type": "ListItem", "position": 3, "name": "AI Rate Limiter Shield", "item": "https://www.soham.lol/projects/ai-rate-limiter-shield/" },
      ],
    },
  ],
};

export default function RateLimiterProjectPage(): React.JSX.Element {
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
            <span className="text-zinc-200">AI Rate Limiter Shield</span>
          </nav>

          {/* Header */}
          <header className="mb-10 pb-8 border-b border-white/[0.08]">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <a
                href="https://github.com/vyassoham/ai-rate-limiter-shield"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 hover:bg-cyan-500/25 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                FastAPI · Redis · Lua · Scikit-Learn
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium text-zinc-400 bg-white/[0.03] border border-white/[0.08]">
                Distributed Systems Architecture
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
              AI Rate Limiter Shield: Atomic Redis Lua &amp; Sliding-Window Architecture
            </h1>

            <p className="text-lg text-zinc-300 leading-relaxed mb-6 font-normal">
              A high-throughput API gateway middleware designed to prevent race conditions during concurrent request surges, protect LLM endpoints from token exhaustion, and detect distributed botnets using Isolation Forest machine learning.
            </p>

            {/* Quick Answer Summary for AI Answer Engines */}
            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-200 text-sm leading-relaxed mb-6">
              <strong>Architecture Summary:</strong> The AI Rate Limiter Shield enforces strict rate limits by encapsulating timestamp eviction (<code>ZREMRANGEBYSCORE</code>), cardinality checks (<code>ZCARD</code>), and request insertions (<code>ZADD</code>) into a single, atomic Redis Lua script. This eliminates network round-trips and guarantees that concurrent API threads never exceed rate thresholds due to read-modify-write race conditions.
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs">
              <Link
                href="/labs/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 text-white font-medium hover:bg-cyan-500 transition-colors"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Test Live Simulator in Labs</span>
              </Link>
              <Link
                href="/blog/redis-lua-rate-limiter/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] text-zinc-300 border border-white/[0.08] hover:text-white transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Read Atomic Lua Technical Deep-Dive</span>
              </Link>
            </div>
          </header>

          {/* Technical Content */}
          <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white border-l-4 border-cyan-400 pl-4 mb-4">
                1. The Concurrency Problem: Why Naive Redis Fails
              </h2>
              <p>
                In high-traffic distributed applications, multiple API gateway workers serve incoming requests simultaneously. If a rate limiter executes separate commands—reading a counter, validating the limit, and incrementing—a classic <strong>Time-of-Check to Time-of-Use (TOCTOU)</strong> race condition occurs:
              </p>
              <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08] font-mono text-xs sm:text-sm text-zinc-200 overflow-x-auto my-4 text-center">
                Thread A: Reads Count = 99 (Threshold = 100) &rarr; Allowed<br />
                Thread B: Reads Count = 99 (Threshold = 100) &rarr; Allowed<br />
                Both execute write: Count becomes 101 &rarr; Rate limit breached!
              </div>
              <p>
                Under heavy automated traffic or distributed DDoS attacks, thousands of requests can slip through during this race condition window, leading to backend database saturation and massive third-party API billing overages (especially on paid LLM token endpoints).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white border-l-4 border-indigo-400 pl-4 mb-4">
                2. The Atomic Lua Solution
              </h2>
              <p>
                Redis executes Lua scripts as a single atomic operation. No other script or Redis command can execute while a script is running, completely eliminating concurrency race conditions.
              </p>
              <div className="p-4 rounded-xl bg-zinc-950/90 border border-white/[0.08] font-mono text-xs text-zinc-300 overflow-x-auto my-4">
                <span className="text-zinc-500">-- Atomic Sliding Window in Redis Lua</span><br />
                <span className="text-purple-400">local</span> key = KEYS[1]<br />
                <span className="text-purple-400">local</span> now = tonumber(ARGV[1])<br />
                <span className="text-purple-400">local</span> window = tonumber(ARGV[2])<br />
                <span className="text-purple-400">local</span> limit = tonumber(ARGV[3])<br />
                <span className="text-purple-400">local</span> clear_before = now - window<br />
                <br />
                redis.call(<span className="text-emerald-400">&apos;ZREMRANGEBYSCORE&apos;</span>, key, <span className="text-amber-400">0</span>, clear_before)<br />
                <span className="text-purple-400">local</span> current_requests = redis.call(<span className="text-emerald-400">&apos;ZCARD&apos;</span>, key)<br />
                <br />
                <span className="text-purple-400">if</span> current_requests &lt; limit <span className="text-purple-400">then</span><br />
                &nbsp;&nbsp;redis.call(<span className="text-emerald-400">&apos;ZADD&apos;</span>, key, now, now .. <span className="text-emerald-400">&apos;-&apos;</span> .. math.random(<span className="text-amber-400">100000</span>))<br />
                &nbsp;&nbsp;redis.call(<span className="text-emerald-400">&apos;EXPIRE&apos;</span>, key, math.ceil(window / <span className="text-amber-400">1000</span>))<br />
                &nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-amber-400">1</span> <span className="text-zinc-500">-- Request Allowed</span><br />
                <span className="text-purple-400">else</span><br />
                &nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-amber-400">0</span> <span className="text-zinc-500">-- HTTP 429 Too Many Requests</span><br />
                <span className="text-purple-400">end</span>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white border-l-4 border-purple-400 pl-4 mb-4">
                3. Anomaly Detection via Isolation Forest
              </h2>
              <p>
                In addition to strict sliding-window thresholds, the system incorporates an asynchronous anomaly detection pipeline built with Scikit-Learn&apos;s <strong>Isolation Forest</strong> algorithm. It models three feature vectors per client identifier:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-zinc-300">
                <li><strong>Inter-Arrival Time Variance</strong>: Automated scrapers exhibit near-zero variance in request timing compared to human browsing jitter.</li>
                <li><strong>Endpoint Distribution Entropy</strong>: Crawlers systematically traverse directory structures, generating abnormally high entropy across path access patterns.</li>
                <li><strong>Payload Size Deviations</strong>: Sudden spikes in POST payload size indicate potential token stuffing or buffer exploit probes.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white border-l-4 border-emerald-400 pl-4 mb-4">
                4. Performance &amp; Benchmarks
              </h2>
              <p>
                Benchmarked on a local workstation environment (Redis 7 localhost loopback) with a 4-worker FastAPI setup using <code>locust</code> load generator under concurrent synthetic client requests:
              </p>
              <div className="grid sm:grid-cols-3 gap-4 my-6 not-prose">
                <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08] text-center">
                  <div className="text-2xl font-bold text-cyan-400 font-mono">0.62 ms</div>
                  <div className="text-xs text-zinc-400 mt-1">p99 Latency</div>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08] text-center">
                  <div className="text-2xl font-bold text-indigo-400 font-mono">5,200+</div>
                  <div className="text-xs text-zinc-400 mt-1">Req / Sec (Single Redis)</div>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08] text-center">
                  <div className="text-2xl font-bold text-emerald-400 font-mono">0.00%</div>
                  <div className="text-xs text-zinc-400 mt-1">Race Condition Breaches</div>
                </div>
              </div>
            </section>
          </div>

          {/* Related Links & Cross-References */}
          <footer className="mt-12 pt-8 border-t border-white/[0.08]">
            <h3 className="text-base font-bold text-white mb-4">Related Engineering Resources</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <Link
                href="/blog/redis-lua-rate-limiter/"
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-cyan-400 font-semibold mb-1 block">Engineering Publication</span>
                  <span className="text-white font-medium text-sm">High-Throughput Distributed Rate Limiting with Atomic Redis Lua Scripts</span>
                </div>
                <span className="text-zinc-500 mt-3 inline-flex items-center gap-1">Read Publication →</span>
              </Link>

              <Link
                href="/projects/cybersecurity-risk-analyzer/"
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-emerald-400 font-semibold mb-1 block">Companion Project</span>
                  <span className="text-white font-medium text-sm">Cybersecurity Risk Analyzer: Shannon Entropy Engine</span>
                </div>
                <span className="text-zinc-500 mt-3 inline-flex items-center gap-1">View Project Architecture →</span>
              </Link>
            </div>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}

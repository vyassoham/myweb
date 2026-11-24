"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Github,
  ArrowUpRight,
  Star,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Layers,
  Terminal,
  Shield,
  Cpu,
  Database,
  ExternalLink,
  Code2,
} from "lucide-react";
import TiltCard from "./TiltCard";
import ScrollReveal from "./ScrollReveal";
import NeuralAudioPreview from "./NeuralAudioPreview";

type ProjectCategory = "all" | "systems" | "ai" | "data";

interface Project {
  id: string;
  title: string;
  description: string;
  category: "systems" | "ai" | "data";
  tech: string[];
  github: string;
  stars?: number;
  featured?: boolean;
  highlights: string[];
  architectureDetails: string;
  hasDeepDive?: boolean;
  slug?: string;
  architectureTag: string;
  metricBadge: string;
  terminalSnippet: string;
  accentGradient: string;
  borderHoverColor: string;
}

const PROJECTS: Project[] = [
  {
    id: "cybersecurity-risk-analyzer",
    slug: "cybersecurity-risk-analyzer",
    hasDeepDive: true,
    title: "Cybersecurity Risk Analyzer",
    description:
      "Advanced cybersecurity risk evaluation engine that assesses digital habits, computes actionable risk posture scores, and estimates real-time password crack times with entropy calculation.",
    category: "systems",
    tech: ["Python", "Streamlit", "Cryptography", "Security Architecture"],
    github: "https://github.com/vyassoham/Cybersecurity-Risk-Analyzer",
    stars: 22,
    featured: true,
    architectureTag: "NIST SP 800-63B · Shannon Entropy Engine",
    metricBadge: "22⭐ GitHub · 100 GH/s Model",
    terminalSnippet: "$ H(X) = -Σ p(x) log₂ p(x) | GPU Brute Force: 1e11 H/s",
    accentGradient: "from-indigo-500 via-purple-500 to-cyan-500",
    borderHoverColor: "hover:border-indigo-400/50 hover:shadow-indigo-500/20",
    highlights: [
      "Real-time password entropy & crack time estimation",
      "Dynamic risk score computation with actionable mitigations",
      "Over 22 stars on GitHub with active community adoption",
    ],
    architectureDetails:
      "Modular Python engine implementing Shannon entropy calculations alongside NIST password security standards. Provides instant risk recommendations using state-driven Streamlit reactive forms.",
  },
  {
    id: "ai-rate-limiter-shield",
    slug: "ai-rate-limiter-shield",
    hasDeepDive: true,
    title: "AI Rate Limiter Shield",
    description:
      "Enterprise-grade API security shield and high-throughput rate limiter. Employs an atomic Lua-powered sliding window in Redis, Isolation Forest ML anomaly detection, and a live WebSocket attack telemetry feed.",
    category: "systems",
    tech: ["FastAPI", "Redis", "Lua", "Scikit-Learn", "WebSockets"],
    github: "https://github.com/vyassoham/ai-rate-limiter-shield",
    stars: 1,
    featured: true,
    architectureTag: "Atomic Sliding Window · Zero DB Locks",
    metricBadge: "0.32ms Latency · 8/8 Tests Passing",
    terminalSnippet: "$ EVALSHA rate_limiter.lua 1 ip 1732445000 6000 5 ⟹ 200 OK",
    accentGradient: "from-cyan-500 via-teal-500 to-indigo-500",
    borderHoverColor: "hover:border-cyan-400/50 hover:shadow-cyan-500/20",
    highlights: [
      "Atomic sliding window executed via single-turn Redis Lua scripts",
      "Unsupervised Isolation Forest ML for zero-day attack identification",
      "8/8 test suite with offline fakeredis verification",
    ],
    architectureDetails:
      "Single-turn atomic sliding window prevents race conditions under distributed traffic. Unsupervised scikit-learn Isolation Forest identifies outlier request velocity patterns without database roundtrips.",
  },
  {
    id: "schemaguard",
    hasDeepDive: false,
    title: "SchemaGuard",
    description:
      "Universal automated data schema and quality validation engine. Validates multi-format datasets (CSV, Excel, JSON, and PDF) with automated structural anomaly detection and comprehensive error diagnostics.",
    category: "data",
    tech: ["Python", "Pandas", "pytest", "OpenPyXL", "Validation Engine"],
    github: "https://github.com/vyassoham/SchemaGuard",
    stars: 1,
    featured: true,
    architectureTag: "Heterogeneous Tabular Parser & Drift Guard",
    metricBadge: "25/25 Tests Passing · CSV/XLSX/JSON/PDF",
    terminalSnippet: "$ schemaguard validate --dataset input.xlsx --detect-drift",
    accentGradient: "from-emerald-500 via-teal-500 to-cyan-500",
    borderHoverColor: "hover:border-emerald-400/50 hover:shadow-emerald-500/20",
    highlights: [
      "25/25 unit tests passing with full multi-format test coverage",
      "Automated tabular anomaly detection & schema drift alerts",
      "Production-grade CLI and programmatic Python SDK",
    ],
    architectureDetails:
      "Custom parser abstraction layers normalize heterogeneous datasets into standardized schema definitions, testing column types, regex invariants, and missingness metrics with sub-second latency.",
  },
  {
    id: "neural-tts",
    hasDeepDive: false,
    title: "Neural TTS",
    description:
      "Modular Python speech synthesis pipeline providing ultra-clear, real-time voice generation. Features phoneme processing, fast acoustic modeling, a neural vocoder, and parametric control over pitch, speed, and timbre.",
    category: "ai",
    tech: ["Python", "DSP", "Audio ML", "Neural Vocoders", "PyTorch"],
    github: "https://github.com/vyassoham/neural-tts",
    stars: 1,
    architectureTag: "End-to-End Modular Speech Synthesis",
    metricBadge: "DSP Vocoder · Multi-Speaker Embedding",
    terminalSnippet: "$ python synthesize.py --text 'Soham' --vocoder hifigan",
    accentGradient: "from-purple-500 via-pink-500 to-indigo-500",
    borderHoverColor: "hover:border-purple-400/50 hover:shadow-purple-500/20",
    highlights: [
      "End-to-end modular pipeline: phonemizer → acoustic model → neural vocoder",
      "Custom audio digital signal processing (DSP) algorithms",
      "Multi-speaker voice synthesis capability",
    ],
    architectureDetails:
      "Separates text-to-phoneme conversion, spectrogram prediction, and time-domain neural vocoding for modular fine-tuning, latency optimization, and custom speaker embedding.",
  },
  {
    id: "medipro",
    hasDeepDive: false,
    title: "MediPro",
    description:
      "Smart desktop medical intelligence suite providing offline database access to medicine compositions, dosages, side effects, and drug-drug interactions, with integrated Tesseract OCR prescription scanning.",
    category: "data",
    tech: ["Python", "Tkinter", "Tesseract OCR", "SQLite", "APScheduler"],
    github: "https://github.com/vyassoham/MediPro",
    stars: 2,
    architectureTag: "Offline Clinical Intelligence & OCR Scanner",
    metricBadge: "20/20 Test Suite · Cross-Platform Auto-Discovery",
    terminalSnippet: "$ tesseract engine initialized | sqlite compose index: OK",
    accentGradient: "from-blue-500 via-cyan-500 to-teal-500",
    borderHoverColor: "hover:border-blue-400/50 hover:shadow-blue-500/20",
    highlights: [
      "Automated Windows & cross-platform Tesseract binary auto-discovery",
      "Offline SQLite relational database with ISO-8601 datetime support",
      "20/20 test suite verifying OCR, scheduling, and database integrity",
    ],
    architectureDetails:
      "Employs platform-agnostic binary path discovery on Windows/POSIX, relational SQLite schema indexed by active ingredients, and local OCR preprocessing with OpenCV filters.",
  },
  {
    id: "crypto-tracker",
    slug: "soham-crypto-tracker",
    hasDeepDive: true,
    title: "Soham Crypto Tracker",
    description:
      "Real-time cryptocurrency analytics dashboard built with Streamlit. Provides live price feeds, comparative multi-token analysis, and interactive historical charting via CoinGecko API and Plotly.",
    category: "data",
    tech: ["Python", "Streamlit", "Plotly", "CoinGecko API", "pytest"],
    github: "https://github.com/vyassoham/soham-crypto-tracker",
    stars: 2,
    architectureTag: "Resilience-First Market Telemetry & Caching",
    metricBadge: "Streamlit AppTest · HTTP 429 Interceptor",
    terminalSnippet: "$ GET /api/v3/coins/markets | cache hit (30s TTL) | 200 OK",
    accentGradient: "from-amber-500 via-orange-500 to-yellow-500",
    borderHoverColor: "hover:border-amber-400/50 hover:shadow-amber-500/20",
    highlights: [
      "Robust HTTP 429 rate-limit interceptors with exponential retry handling",
      "Interactive multi-timeframe Plotly candlestick & line charts",
      "Verified with automated Streamlit AppTest framework",
    ],
    architectureDetails:
      "Integrates transient cache middleware to minimize outbound CoinGecko API quota usage, backed by comprehensive unit tests asserting error recoveries and data parsing.",
  },
  {
    id: "sociallogger",
    slug: "sociallogger",
    hasDeepDive: true,
    title: "SocialLogger",
    description:
      "AI-powered social media management SaaS with glassmorphic dashboard, automated content scheduling, multi-platform publishing (Twitter, LinkedIn, Instagram), and Gemini AI analytics.",
    category: "ai",
    tech: ["Python", "Gemini API", "FastAPI", "SaaS Architecture"],
    github: "https://github.com/vyassoham/SocialLogger",
    stars: 1,
    architectureTag: "Gemini AI Automation & Scheduled Distribution",
    metricBadge: "Multi-Platform Dispatch · Queue Architecture",
    terminalSnippet: "$ gemini-1.5-flash generate_copy --tone 'executive' ⟹ 200",
    accentGradient: "from-rose-500 via-purple-500 to-indigo-500",
    borderHoverColor: "hover:border-rose-400/50 hover:shadow-rose-500/20",
    highlights: [
      "Google Gemini AI integration for contextual copy generation",
      "Unified multi-platform distribution engine",
      "Glassmorphic analytics dashboard with engagement metrics",
    ],
    architectureDetails:
      "Leverages Google Gemini models for tone-adaptive caption generation, queued background dispatchers for scheduled publishing, and analytics ingestion pipelines.",
  },
];

export default function Projects(): React.JSX.Element {
  const [filter, setFilter] = useState<ProjectCategory>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const filteredProjects =
    filter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  const counts = {
    all: PROJECTS.length,
    systems: PROJECTS.filter((p) => p.category === "systems").length,
    ai: PROJECTS.filter((p) => p.category === "ai").length,
    data: PROJECTS.filter((p) => p.category === "data").length,
  };

  return (
    <section id="projects" className="pt-20 pb-16 px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real Code · Verified Architecture · Test Suites</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Featured Engineering Projects
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl font-normal">
            Every repository here is test-backed, actively maintained, and open on GitHub. No dummy mockups, toy templates, or dead links.
          </p>
        </div>

        {/* Filter Pills with Counts */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md self-start md:self-auto overflow-x-auto max-w-full">
          {(
            [
              { id: "all", label: "All Systems", count: counts.all },
              { id: "systems", label: "Systems & Security", count: counts.systems },
              { id: "ai", label: "AI & ML", count: counts.ai },
              { id: "data", label: "Data Engineering", count: counts.data },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                filter === tab.id
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30 font-semibold"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  filter === tab.id
                    ? "bg-white/20 text-white"
                    : "bg-white/[0.06] text-zinc-400"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        {filteredProjects.map((project, idx) => (
          <ScrollReveal
            key={project.id}
            delay={idx * 0.06}
            direction="up"
            className="h-full"
          >
            <TiltCard
              maxTilt={7}
              scale={1.02}
              className={`glass-card p-6 sm:p-7 h-full flex flex-col justify-between group relative transition-all duration-300 ${project.borderHoverColor}`}
            >
              {/* Top Specular Accent Gradient */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.accentGradient} rounded-t-[20px] opacity-75 group-hover:opacity-100 transition-opacity`}
              />

              <div>
                {/* Micro Metadata Strip (Architecture Tag & Star Count) */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono font-medium text-indigo-300/90 uppercase tracking-wider truncate">
                    {project.architectureTag}
                  </span>

                  {project.stars !== undefined && project.stars > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 shrink-0 shadow-sm shadow-amber-500/10">
                      <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                      <span>{project.stars}</span>
                    </span>
                  )}
                </div>

                {/* Title & Link */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  {project.hasDeepDive && project.slug ? (
                    <Link
                      href={`/projects/${project.slug}/`}
                      className="font-bold text-xl text-white group-hover:text-indigo-200 transition-colors tracking-tight flex items-center gap-1.5"
                    >
                      <span>{project.title}</span>
                    </Link>
                  ) : (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-xl text-white group-hover:text-indigo-200 transition-colors tracking-tight"
                    >
                      {project.title}
                    </a>
                  )}

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all shrink-0"
                    aria-label={`View ${project.title} on GitHub`}
                    title="View Source on GitHub"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Metric Badge Pill */}
                <div className="mb-3.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.05] border border-white/[0.08] text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{project.metricBadge}</span>
                  </span>
                </div>

                {/* Description */}
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
                  {project.description}
                </p>

                {/* Neural TTS Interactive Voice Preview (Embedded Demo) */}
                {project.id === "neural-tts" && (
                  <div className="mb-4">
                    <NeuralAudioPreview />
                  </div>
                )}

                {/* Live CLI / Pipeline Terminal Strip */}
                <div className="mb-4 p-2.5 rounded-xl bg-black/60 border border-white/[0.07] font-mono text-[11px] text-zinc-400 overflow-x-auto whitespace-nowrap flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span className="text-zinc-300">{project.terminalSnippet}</span>
                </div>

                {/* Architectural Highlights */}
                <div className="space-y-1.5 mb-4 py-3 border-y border-white/[0.06]">
                  {project.highlights.map((highlight, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-start gap-2 text-xs text-zinc-300"
                    >
                      <span className="text-indigo-400 mt-0.5 font-bold shrink-0">
                        •
                      </span>
                      <span className="leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Expandable Architecture Drawer */}
                {expandedId === project.id && (
                  <div className="mb-4 p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-zinc-200 leading-relaxed space-y-2">
                    <div className="flex items-center gap-1.5 text-indigo-300 font-bold">
                      <Layers className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Deep System Architecture:</span>
                    </div>
                    <p className="text-zinc-300 leading-relaxed">
                      {project.architectureDetails}
                    </p>
                  </div>
                )}
              </div>

              {/* Card Footer: Tech Chips & Action Buttons */}
              <div className="pt-2">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.8 rounded-md text-[10px] font-mono bg-white/[0.04] text-zinc-300 border border-white/[0.06] hover:border-white/[0.12] transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-xs font-semibold text-zinc-200 hover:text-white transition-all shadow-sm"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Repo</span>
                    </a>

                    {project.hasDeepDive && project.slug && (
                      <Link
                        href={`/projects/${project.slug}/`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/25 text-indigo-300 text-xs font-mono font-medium transition-all"
                      >
                        <span>Deep Dive</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    )}

                    {(project.id === "cybersecurity-risk-analyzer" ||
                      project.id === "ai-rate-limiter-shield") && (
                      <Link
                        href="/#lab"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold transition-all shadow-sm"
                      >
                        <Sparkles className="w-3 h-3 text-emerald-400" />
                        <span>Lab</span>
                      </Link>
                    )}
                  </div>

                  <button
                    onClick={() => toggleExpand(project.id)}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                  >
                    <span>{expandedId === project.id ? "Hide Spec" : "Arch Spec"}</span>
                    {expandedId === project.id ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="sr-only">article</div>
            </TiltCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

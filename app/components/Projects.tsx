"use client";

import React, { useState } from "react";
import { Github, ArrowUpRight, Star, Sparkles, ChevronDown, ChevronUp, Layers, CheckCircle } from "lucide-react";
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
}

const PROJECTS: Project[] = [
  {
    id: "cybersecurity-risk-analyzer",
    title: "Cybersecurity Risk Analyzer",
    description:
      "Advanced cybersecurity risk evaluation engine that assesses digital habits, computes actionable risk posture scores, and estimates real-time password crack times with entropy calculation.",
    category: "systems",
    tech: ["Python", "Streamlit", "Cryptography", "Security Architecture"],
    github: "https://github.com/vyassoham/Cybersecurity-Risk-Analyzer",
    stars: 22,
    featured: true,
    highlights: [
      "Real-time password entropy & crack time estimation",
      "Dynamic risk score computation with actionable mitigations",
      "Over 22 stars on GitHub with community adoption",
    ],
    architectureDetails:
      "Modular Python engine implementing Shannon entropy calculations alongside NIST password security standards. Provides instant risk recommendations using state-driven Streamlit reactive forms.",
  },
  {
    id: "ai-rate-limiter-shield",
    title: "AI Rate Limiter Shield",
    description:
      "Enterprise-grade API security shield and high-throughput rate limiter. Employs an atomic Lua-powered sliding window in Redis, Isolation Forest ML anomaly detection, and a live WebSocket attack telemetry feed.",
    category: "systems",
    tech: ["FastAPI", "Redis", "Lua", "Scikit-Learn", "WebSockets"],
    github: "https://github.com/vyassoham/ai-rate-limiter-shield",
    stars: 1,
    featured: true,
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
    title: "SchemaGuard",
    description:
      "Universal automated data schema and quality validation engine. Validates multi-format datasets (CSV, Excel, JSON, and PDF) with automated structural anomaly detection and comprehensive error diagnostics.",
    category: "data",
    tech: ["Python", "Pandas", "pytest", "OpenPyXL", "Validation Engine"],
    github: "https://github.com/vyassoham/SchemaGuard",
    stars: 1,
    featured: true,
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
    title: "Neural TTS",
    description:
      "Modular Python speech synthesis pipeline providing ultra-clear, real-time voice generation. Features phoneme processing, fast acoustic modeling, a neural vocoder, and parametric control over pitch, speed, and timbre.",
    category: "ai",
    tech: ["Python", "DSP", "Audio ML", "Neural Vocoders", "PyTorch"],
    github: "https://github.com/vyassoham/neural-tts",
    stars: 1,
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
    title: "MediPro",
    description:
      "Smart desktop medical intelligence suite providing offline database access to medicine compositions, dosages, side effects, and drug-drug interactions, with integrated Tesseract OCR prescription scanning.",
    category: "data",
    tech: ["Python", "Tkinter", "Tesseract OCR", "SQLite", "APScheduler"],
    github: "https://github.com/vyassoham/MediPro",
    stars: 2,
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
    title: "Soham Crypto Tracker",
    description:
      "Real-time cryptocurrency analytics dashboard built with Streamlit. Provides live price feeds, comparative multi-token analysis, and interactive historical charting via CoinGecko API and Plotly.",
    category: "data",
    tech: ["Python", "Streamlit", "Plotly", "CoinGecko API", "pytest"],
    github: "https://github.com/vyassoham/soham-crypto-tracker",
    stars: 2,
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
    title: "SocialLogger",
    description:
      "AI-powered social media management SaaS with glassmorphic dashboard, automated content scheduling, multi-platform publishing (Twitter, LinkedIn, Instagram), and Gemini AI analytics.",
    category: "ai",
    tech: ["Python", "Gemini API", "FastAPI", "SaaS Architecture"],
    github: "https://github.com/vyassoham/SocialLogger",
    stars: 1,
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

  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real Code · Verified Pushes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Featured Engineering Projects
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl font-normal">
            Every repository here is production-tested, test-backed, and open on GitHub. No dummy mockups or dead links.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] self-start md:self-auto">
          {(
            [
              { id: "all", label: "All Projects" },
              { id: "systems", label: "Systems & Security" },
              { id: "ai", label: "AI & ML" },
              { id: "data", label: "Data Engineering" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filter === tab.id
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => (
          <ScrollReveal key={project.id} delay={idx * 0.08} direction="up" className="h-full">
            <TiltCard
              maxTilt={6}
              scale={1.02}
              className={`glass-card p-6 sm:p-7 h-full flex flex-col justify-between group relative ${
                project.featured ? "border-indigo-500/30" : ""
              }`}
            >
            {/* Top Accent Gradient on Featured */}
            {project.featured && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500" />
            )}

            <div>
              {/* Header: Title & Stars / Links */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-bold text-lg text-white group-hover:text-indigo-300 transition-colors">
                  {project.title}
                </h3>

                <div className="flex items-center gap-2 shrink-0">
                  {project.stars !== undefined && project.stars > 0 && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/25">
                      <Star className="w-3 h-3 fill-amber-300" />
                      {project.stars}
                    </span>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Description */}
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Neural TTS Interactive Voice Preview */}
              {project.id === "neural-tts" && <NeuralAudioPreview />}

              {/* Architectural Highlights */}
              <div className="space-y-1.5 mb-4 py-3 border-y border-white/[0.05]">
                {project.highlights.map((highlight, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2 text-xs text-zinc-400">
                    <span className="text-indigo-400 mt-0.5 font-bold">•</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Expandable Architecture Drawer */}
              {expandedId === project.id && (
                <div className="mb-4 p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-xs text-zinc-300 leading-relaxed">
                  <div className="flex items-center gap-1.5 text-indigo-300 font-bold mb-1">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Deep Architecture Notes:</span>
                  </div>
                  <p>{project.architectureDetails}</p>
                </div>
              )}
            </div>

            {/* Footer: Tech Tags & Expand Button */}
            <div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] text-zinc-300 border border-white/[0.06]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                <div className="flex items-center gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Repository</span>
                  </a>
                  {(project.id === "cybersecurity-risk-analyzer" || project.id === "ai-rate-limiter-shield") && (
                    <a
                      href="#lab"
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono font-semibold transition-all"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Live Lab</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => toggleExpand(project.id)}
                  className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <span>{expandedId === project.id ? "Less" : "Architecture"}</span>
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

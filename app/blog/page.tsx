import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Calendar, ArrowUpRight, Sparkles, GitPullRequest, ShieldCheck, Zap, Database } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import InteractiveBackground from "../components/InteractiveBackground";
import CommandPalette from "../components/CommandPalette";
import ScrollProgress from "../components/ScrollProgress";
import TiltCard from "../components/TiltCard";
import ScrollReveal from "../components/ScrollReveal";

export const metadata: Metadata = {
  title: "Engineering Blog & Technical Deep-Dives | Soham Vyas — IIT Jodhpur",
  description:
    "In-depth engineering articles on computer algebra optimization, SymPy Kronecker traces, distributed Redis Lua rate limiters, and cryptographic Shannon entropy by Soham Vyas.",
  alternates: {
    canonical: "https://soham.lol/blog/",
  },
  openGraph: {
    title: "Engineering Blog | Soham Vyas — IIT Jodhpur",
    description:
      "Mathematical and systems engineering deep dives by Soham Vyas at IIT Jodhpur.",
    url: "https://soham.lol/blog/",
    images: [{ url: "https://soham.lol/assets/thumbnail.png", width: 1200, height: 630 }],
  },
};

interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  featured?: boolean;
  hasInteractiveSlider?: boolean;
  icon: React.ElementType;
}

const ARTICLES: Article[] = [
  {
    slug: "sympy-kronecker-trace",
    title: "How I Eliminated O(n³) Matrix Expansion in SymPy Kronecker Traces",
    description:
      "A deep dive into symbolic matrix expressions, Kronecker product tensor algebra, and implementing an exact scalar property in SymPy that avoids catastrophic memory allocation ahead of GSoC 2027.",
    category: "Computer Algebra & Math",
    readTime: "7 min read",
    date: "Nov 2026",
    featured: true,
    hasInteractiveSlider: true,
    icon: GitPullRequest,
  },
  {
    slug: "redis-lua-rate-limiter",
    title: "High-Throughput Distributed Rate Limiting with Atomic Redis Lua Scripts",
    description:
      "Why traditional multi-step Redis rate limiting fails under concurrent load, and how we engineered an atomic sliding-window algorithm that executes in sub-millisecond latency.",
    category: "Distributed Systems",
    readTime: "6 min read",
    date: "Nov 2026",
    icon: Zap,
  },
  {
    slug: "shannon-entropy-cybersecurity",
    title: "Quantifying Cryptographic Strength: Shannon Entropy & NIST 800-63B Defense",
    description:
      "How we combined Claude Shannon's 1948 mathematical information theory with NIST password guidelines to detect hardcoded secrets and estimate brute-force resistance against 100 GH/s GPU clusters.",
    category: "Cybersecurity",
    readTime: "5 min read",
    date: "Nov 2026",
    icon: ShieldCheck,
  },
];

export default function BlogIndex(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-[#07070a] text-slate-100 relative">
      <ScrollProgress />
      <InteractiveBackground />
      <CommandPalette />
      <Navigation />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mb-8">
            <Link
              href="/"
              className="hover:text-emerald-400 transition-colors bg-white/[0.03] border border-white/[0.08] px-3 py-1.5 rounded-lg flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Return to Full Portfolio</span>
            </Link>
          </div>

          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-semibold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Technical Publications &amp; Mathematical Notes</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Engineering Deep-Dives
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
              Exhaustive architectural writeups on computer algebra optimization, distributed systems concurrency, and cryptographic entropy written by <strong>Soham Vyas</strong> (IIT Jodhpur).
            </p>
          </div>

          {/* Featured Article Banner */}
          {ARTICLES.filter((a) => a.featured).map((article) => (
            <ScrollReveal key={article.slug} direction="up" className="mb-12">
              <TiltCard maxTilt={4} scale={1.01} className="block group p-8 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-zinc-900/90 to-zinc-950 border border-indigo-500/30 hover:border-indigo-400/60 shadow-2xl shadow-indigo-950/40">
                <Link href={`/blog/${article.slug}/`} className="block">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        FEATURED PUBLICATION
                      </span>
                      {article.hasInteractiveSlider && (
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3" />
                          Interactive Math Slider Inside
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {article.readTime}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-indigo-300 transition-colors tracking-tight mb-3">
                    {article.title}
                  </h2>

                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
                    {article.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform">
                    <span>Read Full Article &amp; Launch Interactive Simulator</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </Link>
              </TiltCard>
            </ScrollReveal>
          ))}

          {/* Remaining Articles Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {ARTICLES.filter((a) => !a.featured).map((article, idx) => {
              const Icon = article.icon;
              return (
                <ScrollReveal key={article.slug} delay={idx * 0.1} direction="up" className="h-full">
                  <TiltCard maxTilt={5} scale={1.02} className="h-full p-6 rounded-2xl bg-zinc-900/60 border border-white/[0.08] hover:border-indigo-500/40 hover:bg-zinc-900/90 flex flex-col justify-between group">
                    <Link
                      href={`/blog/${article.slug}/`}
                      className="flex flex-col justify-between h-full"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 font-semibold">
                            {article.category}
                          </span>
                          <span>{article.readTime}</span>
                        </div>

                        <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors mb-2">
                          {article.title}
                        </h3>

                        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 mb-6">
                          {article.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] text-xs font-mono">
                        <span className="text-zinc-500">{article.date}</span>
                        <span className="text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          <span>Read deep dive</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  </TiltCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

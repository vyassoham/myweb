"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowUpRight,
  GitPullRequest,
  Zap,
  ShieldCheck,
  Calendar,
  Clock,
  Sparkles,
  Calculator,
} from "lucide-react";
import TiltCard from "./TiltCard";
import ScrollReveal from "./ScrollReveal";

export default function FeaturedResearch(): React.JSX.Element {
  return (
    <section id="research" className="pt-10 pb-10 px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Technical Publications &amp; Deep Dives</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Latest Engineering Research
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
            In-depth architectural writeups on computational algebra, distributed systems concurrency, and cryptographic entropy written by <strong>Soham Vyas</strong>.
          </p>
        </div>

        <Link
          href="/blog/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-indigo-500/30 text-xs font-medium text-zinc-300 hover:text-white transition-all shrink-0 w-fit"
        >
          <span>Explore All Articles</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-indigo-400" />
        </Link>
      </div>

      {/* Main Spotlight Card: SymPy Kronecker Trace Optimization */}
      <ScrollReveal direction="up" className="mb-8">
        <TiltCard
          maxTilt={4}
          scale={1.012}
          className="glass-card p-7 sm:p-9 relative rounded-3xl border-indigo-500/30 hover:border-indigo-400/60 shadow-2xl shadow-indigo-950/30 overflow-hidden group"
        >
          {/* Top Accent Gradient */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-indigo-500 to-cyan-500" />

          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://github.com/sympy/sympy/pull/31011"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/15 text-purple-300 border border-purple-500/25 hover:bg-purple-500/25 transition-colors group/link"
              >
                <GitPullRequest className="w-3.5 h-3.5" />
                <span>SymPy PR #31011 · Merged Upstream</span>
                <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
              </a>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                <Sparkles className="w-3 h-3" />
                Interactive Math Slider
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-normal text-zinc-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Nov 2026
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> 7 min read
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-indigo-300 transition-colors tracking-tight mb-3">
                How I Eliminated O(n³) Matrix Expansion in SymPy Kronecker Traces
              </h3>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
                A rigorous mathematical deep dive into symbolic matrix expressions. Discover how we eliminated catastrophic $O(n^3)$ explicit matrix tensor expansions down to an exact $O(1)$ scalar property:
              </p>

              {/* Math Formula Card (keeps code styling for actual algebraic syntax) */}
              <div className="p-4 rounded-xl bg-black/40 border border-indigo-500/25 font-mono text-xs sm:text-sm text-indigo-200 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>tr(A ⊗ B) = tr(A) · tr(B)</span>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-300 text-xs font-medium w-fit">
                  Complexity: O(n³) → O(1)
                </span>
              </div>

              <Link
                href="/blog/sympy-kronecker-trace/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm transition-all shadow-lg shadow-indigo-600/30 group-hover:scale-[1.01]"
              >
                <span>Read Full Research Paper &amp; Test Interactive Slider</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right Side: Key PR Highlights Box */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3.5">
              <div className="text-xs font-semibold text-zinc-300 border-b border-white/[0.06] pb-2">
                Engineering Impact Metrics
              </div>

              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <p className="text-xs text-zinc-300">
                  <strong className="text-white">Zero Memory Blowup:</strong> Prevents expanding millions of matrix elements into RAM when taking traces of Kronecker tensor products.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <p className="text-xs text-zinc-300">
                  <strong className="text-white">Upstream GSoC 2027:</strong> Officially merged into SymPy master in <a href="https://github.com/sympy/sympy/pull/31011" target="_blank" rel="noopener noreferrer" className="text-emerald-300 underline font-medium">PR #31011</a>.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                <p className="text-xs text-zinc-300">
                  <strong className="text-white">Interactive Math Slider:</strong> Client-side simulator lets you visually observe $O(n^3)$ vs $O(1)$ scaling in real time.
                </p>
              </div>
            </div>
          </div>
        </TiltCard>
      </ScrollReveal>

      {/* Secondary Articles Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Article 2: Redis Lua Rate Limiter */}
        <ScrollReveal delay={0.08} direction="up" className="h-full">
          <TiltCard
            maxTilt={5}
            scale={1.018}
            className="glass-card p-6 sm:p-7 flex flex-col justify-between h-full group"
          >
            <div>
              <div className="flex items-center justify-between gap-3 text-xs text-zinc-400 mb-4 font-normal">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 font-medium">
                  <Zap className="w-3 h-3" />
                  Distributed Systems
                </span>
                <span>6 min read</span>
              </div>

              <h4 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                High-Throughput Distributed Rate Limiting via Atomic Redis Lua
              </h4>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                Why traditional multi-step Redis rate limiters fail under concurrent traffic, and how single-turn atomic Lua scripts eliminate race conditions with sub-millisecond execution.
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-zinc-500 font-medium">Atomic Sliding Window</span>
              <Link
                href="/blog/redis-lua-rate-limiter/"
                className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium transition-colors"
              >
                <span>Read paper</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </TiltCard>
        </ScrollReveal>

        {/* Article 3: Shannon Entropy */}
        <ScrollReveal delay={0.16} direction="up" className="h-full">
          <TiltCard
            maxTilt={5}
            scale={1.018}
            className="glass-card p-6 sm:p-7 flex flex-col justify-between h-full group"
          >
            <div>
              <div className="flex items-center justify-between gap-3 text-xs text-zinc-400 mb-4 font-normal">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-medium">
                  <ShieldCheck className="w-3 h-3" />
                  Cybersecurity Theory
                </span>
                <span>5 min read</span>
              </div>

              <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                Quantifying Cryptographic Strength: Shannon Entropy &amp; NIST 800-63B
              </h4>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                Combining Claude Shannon&apos;s 1948 mathematical information theory with NIST password guidelines to detect hardcoded secrets and estimate brute-force recovery against 100 GH/s GPU clusters.
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-zinc-500 font-mono text-[11px]">E = L · log₂(R)</span>
              <Link
                href="/blog/shannon-entropy-cybersecurity/"
                className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
              >
                <span>Read paper</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </TiltCard>
        </ScrollReveal>
      </div>
    </section>
  );
}

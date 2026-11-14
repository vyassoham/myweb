"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Mail, ArrowUpRight, GraduationCap, Briefcase, GitPullRequest, ShieldCheck, Sparkles, Code2 } from "lucide-react";
import TiltCard from "./TiltCard";

// Social Icons
const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const XIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TAGLINES = [
  "AI & Systems Engineer",
  "GSoC 2027 Candidate (SymPy)",
  "Data Scientist @ IIT Jodhpur",
  "Distributed Lua & Backend Architect",
];

function AnimatedTagline(): React.JSX.Element {
  const [tagIndex, setTagIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTagIndex((prev) => (prev + 1) % TAGLINES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-8 flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={TAGLINES[tagIndex]}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="text-lg sm:text-xl font-semibold gradient-accent-text"
        >
          {TAGLINES[tagIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function Hero(): React.JSX.Element {
  return (
    <section id="about" className="relative min-h-[92vh] pt-32 pb-20 flex items-center overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-indigo-600/15 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-violet-600/15 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 absolute" />
            <span>Open for GSoC 2027 &amp; AI Systems Roles</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 text-xs">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
            <span>IIT Jodhpur · BS Data Science &amp; AI</span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (Identity & Highlights) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center gap-6 mb-6">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-indigo-500/40 shadow-xl shadow-indigo-500/10 shrink-0">
                <Image
                  src="/assets/hero.png"
                  alt="Soham Vyas"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-2">
                  Soham Vyas
                </h1>
                <AnimatedTagline />
              </div>
            </div>

            {/* Narrative Summary */}
            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-6">
              I&apos;m <strong>Soham Vyas</strong>, a technology-driven student and developer based in Rajasthan, India, pursuing a Bachelor of Science in Data Science &amp; AI at the <strong>Indian Institute of Technology (IIT) Jodhpur</strong>. I build production-grade systems — atomic Lua rate limiters, ML anomaly detection pipelines, neural TTS engines, and desktop medical intelligence — and contribute to mathematical algorithms in <strong>SymPy</strong>.
            </p>

            {/* Key CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
              >
                <span>Explore Featured Projects</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#opensource"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12] text-zinc-200 font-semibold text-sm transition-all hover:scale-[1.02]"
              >
                <GitPullRequest className="w-4 h-4 text-emerald-400" />
                <span>SymPy GSoC &apos;27</span>
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 text-sm font-medium transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </a>
            </div>

            {/* Social Links Row */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/vyassoham"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:text-white hover:border-indigo-500/40 hover:bg-white/[0.08] transition-all"
                aria-label="GitHub Profile"
              >
                <GithubIcon />
              </a>
              <a
                href="https://linkedin.com/in/vyassoham"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:text-white hover:border-indigo-500/40 hover:bg-white/[0.08] transition-all"
                aria-label="LinkedIn Profile"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://twitter.com/vyassoham"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:text-white hover:border-indigo-500/40 hover:bg-white/[0.08] transition-all"
                aria-label="Twitter Profile"
              >
                <XIcon />
              </a>
              <a
                href="mailto:hello@soham.lol"
                className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:text-white hover:border-indigo-500/40 hover:bg-white/[0.08] transition-all"
                aria-label="Email Soham"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Cards (Professional Summary & Education) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Professional Summary Card */}
            <TiltCard maxTilt={5} scale={1.015} className="glass-card p-6 sm:p-7 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Professional Summary</h3>
                  <p className="text-xs text-zinc-400">Core Engineering Philosophy</p>
                </div>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                I am a technology-driven student focused on computational rigor, system architecture, and machine intelligence. I specialize in <strong>Python, C, C++, SQL, and modern backend infrastructure</strong>, crafting test-verified software that scales reliably under production conditions.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/[0.06] text-xs">
                <div className="flex items-center gap-2 text-zinc-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Automated Test Suites</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <Code2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Atomic Systems (Lua)</span>
                </div>
              </div>
            </TiltCard>

            {/* Education Card */}
            <TiltCard maxTilt={5} scale={1.015} className="glass-card p-6 sm:p-7 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center text-violet-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-violet-500/15 text-violet-300 mb-1">
                    Ongoing
                  </div>
                  <h3 className="text-base font-bold text-white">
                    Bachelor of Science – Data Science
                  </h3>
                  <p className="text-xs text-indigo-300 font-medium">
                    Indian Institute of Technology (IIT) Jodhpur
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-white/[0.06] text-xs">
                <div>
                  <span className="font-medium text-zinc-400 block mb-1.5 text-xs">
                    Core Rigor &amp; Coursework
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-300">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      <span>Programming &amp; Computational Thinking</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      <span>Statistics &amp; Mathematics</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      <span>Data Analysis &amp; Modeling</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      <span>Machine Learning Foundations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}

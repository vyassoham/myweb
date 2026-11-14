"use client";

import React from "react";
import { Code2, Cpu, Server, Database, Layout, Terminal, CheckCircle } from "lucide-react";
import TiltCard from "./TiltCard";
import ScrollReveal from "./ScrollReveal";

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  description: string;
  skills: string[];
  color: string;
  badgeColor: string;
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: Code2,
    description: "Multi-paradigm languages for low-level systems, data science, and scripting.",
    skills: ["Python", "C", "C++", "JavaScript", "R", "SQL", "Bash / Shell"],
    color: "from-blue-500/20 to-indigo-500/20",
    badgeColor: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  },
  {
    title: "AI & Machine Learning",
    icon: Cpu,
    description: "Statistical modeling, anomaly detection algorithms, audio DSP, and deep learning.",
    skills: ["Scikit-learn", "PyTorch", "Isolation Forest", "NLP", "Audio DSP", "Neural Vocoders"],
    color: "from-violet-500/20 to-purple-500/20",
    badgeColor: "bg-violet-500/10 text-violet-300 border-violet-500/20",
  },
  {
    title: "Backend & Systems",
    icon: Server,
    description: "High-throughput, asynchronous backend services with atomic transaction primitives.",
    skills: ["FastAPI", "Flask", "Redis", "Atomic Lua Scripting", "WebSockets", "RESTful APIs"],
    color: "from-cyan-500/20 to-teal-500/20",
    badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  },
  {
    title: "Data Engineering",
    icon: Database,
    description: "Data validation, transformation pipelines, schema enforcement, and OCR extraction.",
    skills: ["Pandas", "NumPy", "SQLite", "MySQL", "Plotly", "Tesseract OCR"],
    color: "from-emerald-500/20 to-teal-500/20",
    badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  },
  {
    title: "Frontend & UI",
    icon: Layout,
    description: "Modern, responsive, and data-dense web and desktop user interfaces.",
    skills: ["Next.js", "React", "Tailwind CSS", "Streamlit", "Tkinter", "Framer Motion"],
    color: "from-amber-500/20 to-orange-500/20",
    badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  },
  {
    title: "DevOps & Quality",
    icon: Terminal,
    description: "Continuous integration, automated testing harnesses, containerization, and Linux.",
    skills: ["Git", "GitHub Actions", "Linux", "Docker", "pytest", "bun"],
    color: "from-pink-500/20 to-rose-500/20",
    badgeColor: "bg-pink-500/10 text-pink-300 border-pink-500/20",
  },
];

export default function Skills(): React.JSX.Element {
  return (
    <section id="skills" className="pt-10 pb-20 px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>Technical Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Tools, Languages &amp; Frameworks
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
          Grounded in mathematical foundations and systems engineering. Every tool listed is actively used in real codebases.
        </p>
      </div>

      {/* Skills Matrix */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILL_CATEGORIES.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <ScrollReveal key={idx} delay={idx * 0.08} direction="up" className="h-full">
              <TiltCard
                maxTilt={6}
                scale={1.02}
                className="glass-card p-6 sm:p-7 flex flex-col justify-between group h-full"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors">
                        {cat.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 mb-5 leading-relaxed font-normal">
                    {cat.description}
                  </p>
                </div>

                {/* Skills Pills */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.05]">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/[0.04] text-zinc-300 border border-white/[0.06] hover:border-indigo-500/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}

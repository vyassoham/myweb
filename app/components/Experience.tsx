"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const EXPERIENCES = [
  {
    type: "work",
    title: "Senior Software Architect",
    company: "Loom Dynamics",
    period: "2023 - Present",
    desc: "Spearheading the core infrastructure design for AI-driven automation platforms. Improved system reliability by 99.9% through distributed architecture.",
    skills: ["Architecture", "System Design", "Kubernetes"],
  },
  {
    type: "work",
    title: "Lead Frontend Engineer",
    company: "Stripe Flow (Contract)",
    period: "2022 - 2023",
    desc: "Developed a mission-critical billing dashboard using Next.js and high-frequency real-time charts. Focused on accessibility and pixel-perfection.",
    skills: ["React", "Motion", "D3.js"],
  },
  {
    type: "work",
    title: "Full Stack Developer",
    company: "Startup Lab",
    period: "2020 - 2022",
    desc: "First engineering hire. Scaled the platform from 0 to 50k monthly active users. Integrated payment systems and ML features.",
    skills: ["Node.js", "PostgreSQL", "AWS"],
  }
];

export default function Experience(): React.JSX.Element {
  return (
    <section id="experience" className="section-padding relative">
      <div className="container mx-auto max-w-4xl px-6">
        <div className="flex flex-col items-center text-center mb-24 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-purple font-black text-sm uppercase tracking-[0.3em]"
          >
            The Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black font-display tracking-tight"
          >
            Evolution of <span className="text-white/40">Mindset</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-purple/50 via-brand-blue/50 to-transparent -translate-x-1/2 hidden md:block" />

          <div className="space-y-16 md:space-y-24">
            {EXPERIENCES.map((exp, idx) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={cn(
                  "relative flex flex-col md:flex-row items-center gap-8 md:gap-0",
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-brand-purple border-4 border-brand-dark -translate-x-1/2 z-10 hidden md:block" />

                {/* Content Card */}
                <div className={cn(
                  "w-full md:w-[45%] group",
                  idx % 2 === 0 ? "md:pr-12" : "md:pl-12"
                )}>
                  <div className="glass p-8 rounded-[2rem] border-white/5 group-hover:border-brand-purple/50 transition-all shadow-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-brand-purple font-black text-[10px] uppercase tracking-widest">{exp.period}</span>
                      <Briefcase className="w-4 h-4 text-white/20" />
                    </div>

                    <h3 className="text-2xl font-black text-white mb-2">{exp.title}</h3>
                    <p className="text-brand-blue font-bold text-sm mb-6 uppercase tracking-widest">{exp.company}</p>

                    <p className="text-white/60 text-sm leading-relaxed mb-6">
                      {exp.desc}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-black text-white/40 uppercase tracking-tighter">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="hidden md:block w-[10%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

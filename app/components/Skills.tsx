"use client";

import { motion } from "framer-motion";
import { Code2, Globe, Cpu, Database, Layout, Smartphone, PenTool, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const SKILL_CATEGORIES = [
    {
        title: "Frontend Architecture",
        icon: <Layout className="w-6 h-6" />,
        skills: ["React 19", "Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion"],
        color: "from-blue-500/20 to-cyan-500/20",
        border: "border-blue-500/30",
    },
    {
        title: "Backend & Scale",
        icon: <Database className="w-6 h-6" />,
        skills: ["Node.js", "PostgreSQL", "Supabase", "Redis", "Docker"],
        color: "from-purple-500/20 to-indigo-500/20",
        border: "border-purple-500/30",
    },
    {
        title: "AI & Data Science",
        icon: <Cpu className="w-6 h-6" />,
        skills: ["OpenAI API", "LangChain", "Python", "Vector Databases", "Model Fine-tuning"],
        color: "from-emerald-500/20 to-teal-500/20",
        border: "border-emerald-500/30",
    },
    {
        title: "Tools & Workflow",
        icon: <Terminal className="w-6 h-6" />,
        skills: ["Git", "CI/CD", "AWS", "Figma", "Vercel"],
        color: "from-orange-500/20 to-pink-500/20",
        border: "border-orange-500/30",
    },
];

export default function Skills(): React.JSX.Element {
    return (
        <section id="skills" className="section-padding relative w-full">
            <div className="container px-6">
                <div className="flex flex-col items-center text-center mb-16 space-y-4">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-violet-400 font-bold text-sm uppercase tracking-[0.3em]"
                    >
                        Technical Arsenal
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl lg:text-6xl font-black font-display tracking-tight leading-tight"
                    >
                        Crafting with <span className="text-white/40">Next-Gen</span> Stack
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {SKILL_CATEGORIES.map((cat, idx) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={cn(
                                "glass p-10 rounded-[2.5rem] border relative group transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/10",
                                cat.border
                            )}
                        >
                            <div className={cn("absolute inset-0 bg-gradient-to-br transition-opacity duration-500 opacity-0 group-hover:opacity-100 rounded-[2.5rem]", cat.color)} />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-black transition-all duration-300">
                                    {cat.icon}
                                </div>

                                <h3 className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight">{cat.title}</h3>

                                <div className="flex flex-wrap gap-3 mt-auto">
                                    {cat.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-4 py-2.5 rounded-xl bg-white/5 text-white/80 text-sm font-semibold border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all cursor-default whitespace-nowrap"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

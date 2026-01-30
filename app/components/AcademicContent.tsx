"use client";

import { motion } from "framer-motion";
import { Calendar, Building, ArrowUpRight } from "lucide-react";

export default function AcademicContent(): React.JSX.Element {
    return (
        <div className="max-w-6xl mx-auto px-6 py-16 space-y-24">

            {/* Experience Section */}
            <section id="experience">
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12">
                    Experience
                </h2>
                <div className="space-y-8">
                    {[
                        {
                            role: "Senior Software Architect",
                            company: "Loom Dynamics",
                            period: "2023 - Present",
                            desc: "Spearheading the core infrastructure design for AI-driven automation platforms. Improved system reliability by 99.9% through distributed architecture.",
                            tags: ["System Architecture", "AI", "Leadership"]
                        },
                        {
                            role: "Lead Frontend Engineer",
                            company: "Stripe Flow (Contract)",
                            period: "2022 - 2023",
                            desc: "Developed a mission-critical billing dashboard using Next.js and high-frequency real-time charts. Focused on accessibility and pixel-perfection.",
                            tags: ["React", "Performance", "D3.js"]
                        },
                        {
                            role: "Full Stack Developer",
                            company: "Startup Lab",
                            period: "2020 - 2022",
                            desc: "First engineering hire. Scaled the platform from 0 to 50k monthly active users. Integrated payment systems and ML features.",
                            tags: ["Growth", "Full Stack", "AWS"]
                        }
                    ].map((job, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="professional-card p-8"
                        >
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="md:w-1/3 space-y-3">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-bold rounded-lg">
                                        <Calendar className="w-4 h-4" />
                                        {job.period}
                                    </div>
                                    <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                                        <Building className="w-5 h-5" />
                                        {job.company}
                                    </h4>
                                </div>

                                <div className="md:w-2/3 md:border-l md:border-slate-200 dark:md:border-slate-700 md:pl-8">
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                        {job.role}
                                    </h3>
                                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                                        {job.desc}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {job.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-md"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects">
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12">
                    Featured Projects
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {[
                        {
                            title: "Quantum Dashboard",
                            desc: "Real-time high-frequency trading analytics dashboard handling 10k events/sec.",
                            stack: "Next.js, Kafka, Redis",
                            link: "#"
                        },
                        {
                            title: "CyberLink Platform",
                            desc: "End-to-end encrypted messaging platform with double-ratchet algorithm.",
                            stack: "TypeScript, WebRTC, PostgreSQL",
                            link: "#"
                        },
                        {
                            title: "AI Resume Scanner",
                            desc: "Natural Language Processing tool to match resumes with job descriptions automatically.",
                            stack: "Python, OpenAI, React",
                            link: "#"
                        },
                        {
                            title: "Distributed File System",
                            desc: "A fault-tolerant distributed file system implementation based on GFS architecture.",
                            stack: "Go, gRPC",
                            link: "#"
                        }
                    ].map((project, idx) => (
                        <a
                            href={project.link}
                            key={idx}
                            className="block professional-card p-8 group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {project.title}
                                </h3>
                                <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                                {project.desc}
                            </p>
                            <div className="text-sm font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 inline-block px-3 py-1.5 rounded-md">
                                {project.stack}
                            </div>
                        </a>
                    ))}
                </div>
            </section>

        </div>
    );
}

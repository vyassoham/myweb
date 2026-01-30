"use client";

import { motion } from "framer-motion";
import { Calendar, Building, ArrowUpRight } from "lucide-react";

export default function AcademicContent(): React.JSX.Element {
    return (
        <main className="space-y-40 pb-20">

            {/* Biography moved to Hero */}

            {/* 2. Experience Section */}
            <section id="experience" className="scroll-mt-24">
                <h2 className="text-4xl font-bold mb-12 pb-4 border-b border-gray-200 dark:border-gray-800">Experience</h2>
                <div className="space-y-12">
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
                            className="academic-card group relative overflow-hidden"
                        >
                            {/* Accent Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-colors" />

                            <div className="flex flex-col md:flex-row gap-8 relative z-10">
                                <div className="md:w-1/3">
                                    <div className="space-y-3">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700">
                                            <Calendar className="w-3 h-3" />
                                            {job.period}
                                        </div>
                                        <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                                            <Building className="w-4 h-4" />
                                            {job.company}
                                        </h4>
                                    </div>
                                </div>

                                <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-6 md:pt-0 md:pl-8">
                                    <h3 className="text-2xl font-black mb-4 group-hover:text-blue-600 transition-colors tracking-tight">
                                        {job.role}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed text-lg">
                                        {job.desc}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {job.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 text-xs font-bold rounded-md border border-slate-200 dark:border-slate-700 uppercase tracking-tighter">
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

            {/* 3. Projects Section */}
            <section id="projects" className="scroll-mt-24">
                <h2 className="text-4xl font-bold mb-12 pb-4 border-b border-gray-200 dark:border-gray-800">Featured Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                            stack: "TypeScript, WebRTC, PostageSQL",
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
                        <a href={project.link} key={idx} className="block group">
                            <div className="academic-card h-full hover:border-blue-500 transition-colors p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">{project.title}</h3>
                                    <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 text-base mb-6 leading-relaxed">
                                    {project.desc}
                                </p>
                                <div className="text-sm font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 inline-block px-3 py-1 rounded">
                                    {project.stack}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* 4. Publications / Writing */}
            <section id="writing" className="scroll-mt-24">
                <h2 className="text-4xl font-bold mb-12 pb-4 border-b border-gray-200 dark:border-gray-800">Recent Posts</h2>
                <div className="space-y-10">
                    {[
                        {
                            title: "Optimizing React Rendering Performance",
                            date: "Oct 24, 2026",
                            readTime: "5 min read",
                            summary: "A deep dive into React concurrent mode and how to optimize large component trees."
                        },
                        {
                            title: "Building Resilient Microservices",
                            date: "Sep 15, 2026",
                            readTime: "8 min read",
                            summary: "Patterns and practices for building fault-tolerant distributed systems using Go."
                        }
                    ].map((post, idx) => (
                        <div key={idx} className="group cursor-pointer">
                            <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-slate-500 mb-4 font-medium">
                                <span>{post.date}</span>
                                <span>•</span>
                                <span>{post.readTime}</span>
                            </div>
                            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                                {post.summary}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

        </main>
    );
}

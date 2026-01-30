"use client";

import { motion } from "framer-motion";
import { Calendar, Building, ArrowUpRight } from "lucide-react";

export default function AcademicContent(): React.JSX.Element {
    return (
        <main className="space-y-12">

            {/* 1. About Section */}
            <section id="about">
                <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-gray-800">Biography</h2>
                <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed">
                    <p className="mb-4">
                        I am a Senior Software Architect with a passion for building scalable, high-performance web applications.
                        Currently, I focus on distributed systems and AI-driven automation platforms.
                    </p>
                    <p>
                        My research interests include distributed computing, machine learning infrastructure, and human-computer interaction.
                        I advocate for clean code, accessible design, and open-source contribution.
                    </p>
                </div>
            </section>

            {/* 2. Experience Section */}
            <section id="experience">
                <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-gray-200 dark:border-gray-800">Experience</h2>
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
                        <div key={idx} className="group flex flex-col md:flex-row gap-4 md:gap-8">
                            <div className="md:w-1/4 pt-1">
                                <span className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {job.period}
                                </span>
                                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2 mt-1">
                                    <Building className="w-4 h-4" />
                                    {job.company}
                                </span>
                            </div>
                            <div className="md:w-3/4">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{job.role}</h3>
                                <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                                    {job.desc}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {job.tags.map(tag => (
                                        <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs rounded border border-gray-200 dark:border-gray-700">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Projects Section */}
            <section id="projects">
                <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-gray-200 dark:border-gray-800">Featured Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            <div className="academic-card h-full hover:border-blue-500 transition-colors">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg font-bold group-hover:text-blue-600 transition-colors">{project.title}</h3>
                                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">
                                    {project.desc}
                                </p>
                                <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                                    {project.stack}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* 4. Publications / Writing */}
            <section id="writing">
                <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-gray-200 dark:border-gray-800">Recent Posts</h2>
                <div className="space-y-6">
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
                            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                            <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                                <span>{post.date}</span>
                                <span>•</span>
                                <span>{post.readTime}</span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                {post.summary}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

        </main>
    );
}

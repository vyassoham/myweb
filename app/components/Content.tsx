"use client";

import { motion } from "framer-motion";
import { Calendar, Building, ArrowUpRight } from "lucide-react";

const EXPERIENCES = [
    {
        role: "Senior Software Architect",
        company: "Loom Dynamics",
        period: "2023 - Present",
        description: "Spearheading the core infrastructure design for AI-driven automation platforms. Improved system reliability by 99.9% through distributed architecture.",
        tags: ["System Architecture", "AI", "Leadership"]
    },
    {
        role: "Lead Frontend Engineer",
        company: "Stripe Flow (Contract)",
        period: "2022 - 2023",
        description: "Developed a mission-critical billing dashboard using Next.js and high-frequency real-time charts. Focused on accessibility and pixel-perfection.",
        tags: ["React", "Performance", "D3.js"]
    },
    {
        role: "Full Stack Developer",
        company: "Startup Lab",
        period: "2020 - 2022",
        description: "First engineering hire. Scaled the platform from 0 to 50k monthly active users. Integrated payment systems and ML features.",
        tags: ["Growth", "Full Stack", "AWS"]
    }
];

const PROJECTS = [
    {
        title: "Quantum Dashboard",
        description: "Real-time high-frequency trading analytics dashboard handling 10k events/sec.",
        stack: "Next.js, Kafka, Redis",
        href: "#"
    },
    {
        title: "CyberLink Platform",
        description: "End-to-end encrypted messaging platform with double-ratchet algorithm.",
        stack: "TypeScript, WebRTC, PostgreSQL",
        href: "#"
    },
    {
        title: "AI Resume Scanner",
        description: "Natural Language Processing tool to match resumes with job descriptions automatically.",
        stack: "Python, OpenAI, React",
        href: "#"
    },
    {
        title: "Distributed File System",
        description: "A fault-tolerant distributed file system implementation based on GFS architecture.",
        stack: "Go, gRPC",
        href: "#"
    }
];

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0, 0, 0.2, 1]
        }
    }
};

export default function Content(): React.JSX.Element {
    return (
        <>
            {/* Experience Section */}
            <section id="experience" className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-header__title">Experience</h2>
                    </div>

                    <motion.div
                        className="flex flex-col gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        {EXPERIENCES.map((job, idx) => (
                            <motion.article
                                key={idx}
                                className="card card--accent"
                                variants={itemVariants}
                            >
                                <div className="grid md:grid-cols-3 gap-8">
                                    {/* Meta */}
                                    <div className="flex flex-col gap-3">
                                        <div className="badge badge--accent">
                                            <Calendar className="w-3 h-3" />
                                            {job.period}
                                        </div>
                                        <div className="flex items-center gap-2 text-accent font-semibold">
                                            <Building className="w-4 h-4" />
                                            {job.company}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="md:col-span-2 md:border-l md:border-[var(--border-subtle)] md:pl-8">
                                        <h3 className="text-2xl font-bold mb-4">{job.role}</h3>
                                        <p className="text-lg leading-relaxed mb-6">{job.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {job.tags.map((tag) => (
                                                <span key={tag} className="tag">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-header__title">Featured Projects</h2>
                    </div>

                    <motion.div
                        className="grid grid--2 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        {PROJECTS.map((project, idx) => (
                            <motion.a
                                key={idx}
                                href={project.href}
                                className="card card--accent group"
                                variants={itemVariants}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <h3 className="text-xl font-bold group-hover:text-[var(--accent)] transition-colors">
                                        {project.title}
                                    </h3>
                                    <ArrowUpRight className="w-5 h-5 text-muted group-hover:text-[var(--accent)] transition-colors" />
                                </div>
                                <p className="leading-relaxed mb-6">{project.description}</p>
                                <code className="text-sm">{project.stack}</code>
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </section>
        </>
    );
}

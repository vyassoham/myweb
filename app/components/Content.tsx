"use client";

import { Calendar, Building, ArrowUpRight } from "lucide-react";

const EXPERIENCES = [
    {
        role: "Student & Developer",
        company: "IIT Jodhpur — Data Science Focus",
        period: "2024 - Present",
        description: "Pursuing rigorous technical coursework in data science, programming, and system design. Built real-world tools using Python, C, R, and SQL, focusing on automation, Discord bots, and scalable logic flows.",
        tags: ["Python", "C", "SQL", "Automation"]
    },
    {
        role: "Self-Directed Technical Projects",
        company: "Independent Research & Development",
        period: "Ongoing",
        description: "Built multi-phase software systems with modular architecture and real-time data processing. Developed Streamlit-based interfaces for data visualization and practiced rigorous system thinking.",
        tags: ["System Thinking", "Streamlit", "Data Pipelines"]
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

export default function Content(): React.JSX.Element {
    return (
        <>
            {/* Experience Section */}
            <section id="experience" className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-header__title">Experience</h2>
                    </div>

                    <div className="flex flex-col gap-8">
                        {EXPERIENCES.map((job, idx) => (
                            <article
                                key={idx}
                                className="card card--accent animate-fade-in-up"
                                style={{ animationDelay: `${idx * 0.1}s` }}
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
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-header__title">Featured Projects</h2>
                    </div>

                    <div className="grid grid--2 gap-6">
                        {PROJECTS.map((project, idx) => (
                            <a
                                key={idx}
                                href={project.href}
                                className="card card--accent group animate-fade-in-up"
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <h3 className="text-xl font-bold group-hover:text-[var(--accent)] transition-colors">
                                        {project.title}
                                    </h3>
                                    <ArrowUpRight className="w-5 h-5 text-muted group-hover:text-[var(--accent)] transition-colors" />
                                </div>
                                <p className="leading-relaxed mb-6">{project.description}</p>
                                <code className="text-sm">{project.stack}</code>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

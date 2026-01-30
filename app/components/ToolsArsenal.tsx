"use client";

import { motion } from "framer-motion";
import { Shield, Code, Database, Server, Cloud, Lock } from "lucide-react";

const TOOLS = [
    {
        id: 1,
        name: "Full Stack Development",
        icon: <Code className="w-6 h-6" />,
        description: "React, Next.js, Node.js, TypeScript - Building modern, performant web applications",
        skills: ["React 19", "Next.js 15", "Node.js", "TypeScript", "PostgreSQL"]
    },
    {
        id: 2,
        name: "Backend Architecture",
        icon: <Server className="w-6 h-6" />,
        description: "Scalable server-side solutions with microservices and API design",
        skills: ["REST APIs", "GraphQL", "Microservices", "Redis", "Docker"]
    },
    {
        id: 3,
        name: "Database Management",
        icon: <Database className="w-6 h-6" />,
        description: "SQL and NoSQL databases, optimization, and data modeling",
        skills: ["PostgreSQL", "MongoDB", "Prisma", "Supabase", "Redis"]
    },
    {
        id: 4,
        name: "Cloud Infrastructure",
        icon: <Cloud className="w-6 h-6" />,
        description: "AWS, Vercel, and cloud-native application deployment",
        skills: ["AWS", "Vercel", "CI/CD", "Docker", "Kubernetes"]
    },
    {
        id: 5,
        name: "Web Security",
        icon: <Shield className="w-6 h-6" />,
        description: "Security best practices, authentication, and vulnerability prevention",
        skills: ["OWASP", "JWT", "OAuth", "XSS Prevention", "CSRF Protection"]
    },
    {
        id: 6,
        name: "Performance Optimization",
        icon: <Lock className="w-6 h-6" />,
        description: "Code optimization, caching strategies, and monitoring",
        skills: ["Lighthouse", "Web Vitals", "Caching", "Lazy Loading", "Code Splitting"]
    }
];

export default function ToolsArsenal(): React.JSX.Element {
    return (
        <section id="tools" className="section-padding relative">
            <div className="container mx-auto max-w-6xl px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-violet-400 font-bold text-sm uppercase tracking-widest mb-4 block">
                        Technical Stack
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black font-display tracking-tight mb-6">
                        Tools & <span className="text-gradient">Expertise</span>
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg">
                        Modern technologies and frameworks I work with to build exceptional digital experiences
                    </p>
                </motion.div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {TOOLS.map((tool, idx) => (
                        <motion.div
                            key={tool.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className="glass-card p-6 rounded-2xl group"
                        >
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                                {tool.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-white mb-2">
                                {tool.name}
                            </h3>

                            {/* Description */}
                            <p className="text-white/60 text-sm leading-relaxed mb-4">
                                {tool.description}
                            </p>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-2">
                                {tool.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-white/70 font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

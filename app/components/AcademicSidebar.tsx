"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Mail, Github, Linkedin, FileText, Download, Briefcase, GraduationCap } from "lucide-react";

export default function Sidebar(): React.JSX.Element {
    return (
        <aside className="sidebar space-y-6">
            {/* Profile Card */}
            <div className="academic-card text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                        src="/assets/hero.png" // Using existing image
                        alt="Profile"
                        fill
                        className="object-cover rounded-full border-4 border-slate-100 dark:border-slate-800 shadow-md"
                    />
                    <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900" title="Available for hire" />
                </div>

                <h1 className="text-2xl font-bold mb-1">Soham Vyas</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 font-medium">Full Stack Engineer & AI Specialist</p>

                <div className="flex items-center justify-center gap-2 mb-6">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full">
                        OPEN TO WORK
                    </span>
                </div>

                {/* Quick Contacts */}
                <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <Briefcase className="w-4 h-4" />
                        <span>Senior Software Architect</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <MapPin className="w-4 h-4" />
                        <span>San Francisco, CA</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <GraduationCap className="w-4 h-4" />
                        <span>M.S. Computer Science</span>
                    </div>
                </div>

                <div className="mt-8 flex justify-center gap-4">
                    <a href="https://github.com/vyassoham" target="_blank" className="p-2 text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white transition-colors">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="https://linkedin.com/in/vyassoham" target="_blank" className="p-2 text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="mailto:hello@soham.lol" className="p-2 text-slate-600 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 transition-colors">
                        <Mail className="w-5 h-5" />
                    </a>
                </div>

                <div className="mt-6">
                    <a
                        href="/resume.pdf"
                        className="w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-black py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
                    >
                        <Download className="w-4 h-4" />
                        Download CV
                    </a>
                </div>
            </div>

            {/* Skills Widget */}
            <div className="academic-card">
                <h3 className="font-bold text-sm uppercase tracking-wider mb-4 border-b pb-2 dark:border-slate-800">Core Skills</h3>
                <div className="flex flex-wrap gap-2">
                    {['React', 'Next.js', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker', 'PostgreSQL', 'GraphQL'].map(skill => (
                        <span key={skill} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded-md font-medium">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </aside>
    );
}

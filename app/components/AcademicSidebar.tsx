"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Mail, Github, Linkedin, FileText, Download, Briefcase, GraduationCap } from "lucide-react";

export default function Sidebar(): React.JSX.Element {
    return (
        <aside className="sidebar space-y-8"> {/* Increased spacing */}
            {/* Profile Card */}
            <div className="academic-card text-center p-8"> {/* Increased padding */}
                <div className="relative w-40 h-40 mx-auto mb-6"> {/* Larger image */}
                    <Image
                        src="/assets/hero.png" // Using existing image
                        alt="Profile"
                        fill
                        className="object-cover rounded-full border-4 border-slate-100 dark:border-slate-800 shadow-lg"
                    />
                    <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-4 border-white dark:border-slate-900" title="Available for hire" />
                </div>

                <h1 className="text-3xl font-bold mb-2">Soham Vyas</h1>
                <p className="text-base text-slate-500 dark:text-slate-400 mb-6 font-medium">Full Stack Engineer & AI Specialist</p>

                <div className="flex items-center justify-center gap-2 mb-8">
                    <span className="px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full tracking-wide">
                        OPEN TO WORK
                    </span>
                </div>

                {/* Quick Contacts */}
                <div className="space-y-4 text-left px-2">
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 group">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                            <Briefcase className="w-4 h-4" />
                        </div>
                        <span>Senior Software Architect</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                            <MapPin className="w-4 h-4" />
                        </div>
                        <span>San Francisco, CA</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                            <GraduationCap className="w-4 h-4" />
                        </div>
                        <span>M.S. Computer Science</span>
                    </div>
                </div>

                <div className="mt-10 flex justify-center gap-4">
                    <a href="https://github.com/vyassoham" target="_blank" className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white transition-all hover:scale-110">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="https://linkedin.com/in/vyassoham" target="_blank" className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-all hover:scale-110">
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="mailto:hello@soham.lol" className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 transition-all hover:scale-110">
                        <Mail className="w-5 h-5" />
                    </a>
                </div>

                <div className="mt-8">
                    <a
                        href="/resume.pdf"
                        className="w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-black py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-lg"
                    >
                        <Download className="w-4 h-4" />
                        Download CV
                    </a>
                </div>
            </div>

            {/* Skills Widget */}
            <div className="academic-card p-8">
                <h3 className="font-bold text-xs uppercase tracking-widest mb-6 border-b pb-4 dark:border-slate-800 text-slate-400">Core Skills</h3>
                <div className="flex flex-wrap gap-2.5">
                    {['React', 'Next.js', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker', 'PostgreSQL', 'GraphQL'].map(skill => (
                        <span key={skill} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-lg font-medium">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </aside>
    );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Mail, Github, Linkedin, FileText, Download, Briefcase, GraduationCap } from "lucide-react";

export default function Sidebar(): React.JSX.Element {
    return (
        <aside className="sidebar space-y-8"> {/* Increased spacing */}
            {/* Profile Card */}
            <div className="academic-card text-center p-10"> {/* More padding */}
                <div className="relative w-44 h-44 mx-auto mb-8"> {/* Larger image and more bottom margin */}
                    <Image
                        src="/assets/hero.png" // Using existing image
                        alt="Profile"
                        fill
                        className="object-cover rounded-full border-4 border-slate-100 dark:border-slate-800 shadow-xl"
                    />
                    <div className="absolute bottom-3 right-3 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-slate-900" title="Available for hire" />
                </div>

                <h1 className="text-4xl font-extrabold mb-4">Soham Vyas</h1> {/* More bottom margin and bolder */}
                <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 font-medium">Full Stack Engineer & AI Specialist</p> {/* More bottom margin */}

                <div className="flex items-center justify-center gap-2 mb-12"> {/* Significant gap before contacts */}
                    <span className="px-5 py-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-black rounded-full tracking-widest uppercase">
                        OPEN TO WORK
                    </span>
                </div>

                {/* Quick Contacts */}
                <div className="space-y-5 text-left px-2"> {/* More vertical gap between items */}
                    <div className="flex items-center gap-5 text-sm text-slate-600 dark:text-slate-400 group">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                            <Briefcase className="w-5 h-5" />
                        </div>
                        <span className="font-semibold">Senior Software Architect</span>
                    </div>
                    <div className="flex items-center gap-5 text-sm text-slate-600 dark:text-slate-400 group">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <span className="font-semibold">San Francisco, CA</span>
                    </div>
                    <div className="flex items-center gap-5 text-sm text-slate-600 dark:text-slate-400 group">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                            <GraduationCap className="w-5 h-5" />
                        </div>
                        <span className="font-semibold">M.S. Computer Science</span>
                    </div>
                </div>

                <div className="mt-14 flex justify-center gap-6"> {/* More gap and space before icons */}
                    <a href="https://github.com/vyassoham" target="_blank" className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white transition-all hover:scale-110 shadow-sm">
                        <Github className="w-6 h-6" />
                    </a>
                    <a href="https://linkedin.com/in/vyassoham" target="_blank" className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-all hover:scale-110 shadow-sm">
                        <Linkedin className="w-6 h-6" />
                    </a>
                    <a href="mailto:hello@soham.lol" className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-600 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 transition-all hover:scale-110 shadow-sm">
                        <Mail className="w-6 h-6" />
                    </a>
                </div>

                <div className="mt-12"> {/* More space before CV button */}
                    <a
                        href="/resume.pdf"
                        className="w-full flex items-center justify-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-black py-4 rounded-2xl font-black text-sm hover:opacity-90 transition-all shadow-xl hover:-translate-y-1 active:scale-95"
                    >
                        <Download className="w-5 h-5" />
                        DOWNLOAD CV
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

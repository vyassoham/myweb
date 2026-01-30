"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Download, GraduationCap, Briefcase, MapPin } from "lucide-react";

export default function AcademicHero(): React.JSX.Element {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-12 px-8">
            {/* Left: Profile Info */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
                <div className="relative w-48 h-48 mb-8">
                    <Image
                        src="/assets/hero.png"
                        alt="Soham Vyas"
                        fill
                        className="object-cover rounded-full border-8 border-slate-50 dark:border-slate-800 shadow-2xl"
                    />
                    <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg" />
                </div>

                <h1 className="text-4xl font-black mb-2 tracking-tight">Soham Vyas</h1>
                <p className="text-sm text-slate-400 font-bold mb-4 uppercase tracking-widest">(he/him)</p>

                <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">Senior Software Architect</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">Loom Dynamics</p>

                {/* Social Icons Row */}
                <div className="flex gap-3 mb-8">
                    {[
                        { icon: <Mail className="w-4 h-4" />, href: "mailto:hello@soham.lol" },
                        { icon: <Briefcase className="w-4 h-4" />, href: "#" },
                        { icon: <Github className="w-4 h-4" />, href: "https://github.com/vyassoham" },
                        { icon: <Linkedin className="w-4 h-4" />, href: "https://linkedin.com/in/vyassoham" },
                    ].map((item, idx) => (
                        <a
                            key={idx}
                            href={item.href}
                            className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 shadow-sm border border-slate-100 dark:border-slate-700 transition-all hover:scale-110"
                        >
                            {item.icon}
                        </a>
                    ))}
                </div>
            </div>

            {/* Right: Summary & Bio */}
            <div className="lg:col-span-7 space-y-8">
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <Briefcase className="w-5 h-5" />
                        </div>
                        <h3 className="text-2xl font-black">Professional Summary</h3>
                    </div>
                    <div className="prose dark:prose-invert max-w-none text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                        <p className="mb-6">
                            I am a Senior Software Architect specializing in building robust, AI-driven automation systems. With over a decade of experience in distributed computing and high-performance infrastructure, I lead teams to deliver scalable solutions that solve real-world complexities.
                        </p>
                        <p>
                            Outside of work, I am passionate about open-source contribution and mentoring the next generation of engineers. I believe in the power of simple, elegant code to transform businesses and lives.
                        </p>
                    </div>
                </div>

                <button className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-1 active:scale-95">
                    <Download className="w-5 h-5" />
                    Download CV
                </button>

                {/* Education Preview Row as seen in image */}
                <div className="pt-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <GraduationCap className="w-5 h-5" />
                        </div>
                        <h3 className="text-2xl font-black">Education</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4 font-bold text-xs uppercase tracking-tighter">PHD</div>
                            <h4 className="font-bold mb-1">PhD Computer Science</h4>
                            <p className="text-sm text-slate-500">Stanford University</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4 font-bold text-xs uppercase tracking-tighter">MS</div>
                            <h4 className="font-bold mb-1">MS Computer Science</h4>
                            <p className="text-sm text-slate-500">Carnegie Mellon</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

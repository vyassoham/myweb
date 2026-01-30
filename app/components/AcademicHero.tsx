"use client";

import Image from "next/image";
import { Mail, Github, Linkedin, Download, Briefcase, GraduationCap } from "lucide-react";

export default function AcademicHero(): React.JSX.Element {
    return (
        <section className="py-16">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Left: Profile */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
                        <div className="relative">
                            <div className="w-48 h-48 relative">
                                <Image
                                    src="/assets/hero.png"
                                    alt="Soham Vyas"
                                    fill
                                    className="object-cover rounded-full shadow-xl border-4 border-slate-700"
                                    priority
                                />
                                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-slate-900" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h1 className="text-5xl font-black text-white">
                                Soham Vyas
                            </h1>
                            <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">
                                (he/him)
                            </p>
                            <div className="pt-2">
                                <h2 className="text-xl font-bold text-blue-400 mb-1">
                                    Senior Software Architect
                                </h2>
                                <p className="text-slate-300 font-medium">
                                    Loom Dynamics
                                </p>
                            </div>
                        </div>

                        {/* Social Links - Vibrant Brand Colors */}
                        <div className="flex gap-3 pt-4">
                            <a
                                href="mailto:hello@soham.lol"
                                className="w-11 h-11 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white transition-all hover:scale-110 shadow-md"
                                title="Email"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                            <a
                                href="https://github.com/vyassoham"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-gray-900 transition-all hover:scale-110 shadow-md"
                                title="GitHub"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a
                                href="https://linkedin.com/in/vyassoham"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-all hover:scale-110 shadow-md"
                                title="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a
                                href="https://twitter.com/vyassoham"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-full bg-black hover:bg-gray-800 flex items-center justify-center text-white transition-all hover:scale-110 shadow-md border border-slate-700"
                                title="Twitter/X"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                        </div>

                        <a
                            href="/resume.pdf"
                            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all hover:scale-105 active:scale-95"
                        >
                            <Download className="w-5 h-5" />
                            Download CV
                        </a>
                    </div>

                    {/* Right: Summary & Education */}
                    <div className="space-y-10">
                        {/* Professional Summary */}
                        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-lg">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
                                    <Briefcase className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">
                                    Professional Summary
                                </h3>
                            </div>
                            <div>
                                <p className="text-lg text-slate-300 leading-relaxed mb-4">
                                    I am a <strong className="text-white">Senior Software Architect</strong> specializing in building robust, AI-driven automation systems. With over a decade of experience in distributed computing and high-performance infrastructure, I lead teams to deliver scalable solutions.
                                </p>
                                <p className="text-lg text-slate-300 leading-relaxed">
                                    Outside of work, I&apos;m passionate about open-source contribution and mentoring the next generation of engineers.
                                </p>
                            </div>
                        </div>

                        {/* Education */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
                                    <GraduationCap className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">
                                    Education
                                </h3>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
                                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4 font-bold text-sm">
                                        PhD
                                    </div>
                                    <h4 className="font-bold text-white mb-1">
                                        PhD Computer Science
                                    </h4>
                                    <p className="text-sm text-slate-400">
                                        Stanford University
                                    </p>
                                </div>
                                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
                                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4 font-bold text-sm">
                                        MS
                                    </div>
                                    <h4 className="font-bold text-white mb-1">
                                        MS Computer Science
                                    </h4>
                                    <p className="text-sm text-slate-400">
                                        Carnegie Mellon
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

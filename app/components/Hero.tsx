"use client";

import Image from "next/image";
import { Download, Mail, Briefcase, GraduationCap } from "lucide-react";

// SVG Icons for brand accuracy
const GithubIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const XIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

export default function Hero(): React.JSX.Element {
    return (
        <section className="section section--hero">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Left Column: Profile */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-8">
                        {/* Avatar */}
                        <div className="avatar avatar--hero animate-fade-in-up">
                            <Image
                                src="/assets/hero.png"
                                alt="Soham Vyas"
                                width={192}
                                height={192}
                                className="avatar__image"
                                priority
                            />
                            <div className="avatar__status" />
                        </div>

                        {/* Identity */}
                        <div className="animate-fade-in-up delay-1">
                            <h1 className="mb-2">Soham Vyas</h1>
                            <p className="text-sm text-muted uppercase tracking-wider font-medium mb-4">
                                (he/him)
                            </p>
                            <h2 className="text-xl text-accent font-bold mb-1">
                                Tech-Driven Student & Developer
                            </h2>
                            <p className="text-secondary font-medium">
                                Python • C • Security • Data Science
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-3 animate-fade-in-up delay-2">
                            <a href="mailto:hello@soham.lol" className="social-link social-link--email" aria-label="Email">
                                <Mail className="w-5 h-5" />
                            </a>
                            <a href="https://github.com/vyassoham" target="_blank" rel="noopener noreferrer" className="social-link social-link--github" aria-label="GitHub">
                                <GithubIcon />
                            </a>
                            <a href="https://linkedin.com/in/vyassoham" target="_blank" rel="noopener noreferrer" className="social-link social-link--linkedin" aria-label="LinkedIn">
                                <LinkedInIcon />
                            </a>
                            <a href="https://twitter.com/vyassoham" target="_blank" rel="noopener noreferrer" className="social-link social-link--twitter" aria-label="Twitter">
                                <XIcon />
                            </a>
                        </div>

                        {/* CTA */}
                        <a href="/resume.pdf" className="btn btn--primary btn--lg animate-fade-in-up delay-3">
                            <Download className="w-5 h-5" />
                            Download CV
                        </a>
                    </div>

                    {/* Right Column: Summary & Education */}
                    <div className="flex flex-col gap-10">
                        {/* Professional Summary */}
                        <div className="card animate-fade-in-up delay-2">
                            <div className="section-header__icon mb-4">
                                <Briefcase className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Professional Summary</h3>
                            <p className="text-lg leading-relaxed">
                                I&apos;m <strong>Soham Vyas</strong>, a technology-driven student with a strong foundation in programming, data science, and systems thinking. I work primarily with <strong>Python, C, R, and SQL</strong>, and enjoy building logic-heavy projects ranging from automation and bots to data-centric applications. My interests span artificial intelligence, cybersecurity, and low-level system understanding, with a focus on learning how complex technologies work from the inside out. I&apos;m continuously experimenting, learning, and shipping projects that strengthen both theoretical depth and practical impact.
                            </p>
                        </div>


                        {/* Education */}
                        <div className="animate-fade-in-up delay-3">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="section-header__icon">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold">Education</h3>
                            </div>

                            <div className="card card--subtle">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="badge badge--accent mb-2">Ongoing</div>
                                        <h4 className="text-xl font-bold">Bachelor of Science – Data Science</h4>
                                        <p className="text-accent font-medium">Indian Institute of Technology (IIT) Jodhpur</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 mt-6">
                                    <div>
                                        <h5 className="text-sm font-bold uppercase tracking-wider text-muted mb-3">Key Focus Areas</h5>
                                        <ul className="text-sm space-y-2 text-secondary">
                                            <li className="flex items-center gap-2">• Programming & Computational Thinking</li>
                                            <li className="flex items-center gap-2">• Statistics & Mathematics</li>
                                            <li className="flex items-center gap-2">• Data Analysis & Modeling</li>
                                            <li className="flex items-center gap-2">• Foundations of AI & ML</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h5 className="text-sm font-bold uppercase tracking-wider text-muted mb-3">Highlights</h5>
                                        <ul className="text-sm space-y-2 text-secondary">
                                            <li className="flex items-center gap-2">• Rigorous industry-aligned curriculum</li>
                                            <li className="flex items-center gap-2">• Emphasis on problem-solving</li>
                                            <li className="flex items-center gap-2">• Parallel project development</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Github, Check, Copy } from "lucide-react";

const NAV_LINKS = [
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Stats", href: "#stats" },
];

export default function Navigation(): React.JSX.Element {
    const [copied, setCopied] = useState(false);

    const copyEmail = () => {
        navigator.clipboard.writeText("hello@soham.lol");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <nav className="nav">
            <div className="container">
                <div className="nav__inner">
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[var(--border-default)]">
                            <Image
                                src="/assets/logo.png"
                                alt="Logo"
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="nav__logo">Soham Vyas</span>
                    </a>

                    {/* Desktop Links */}
                    <ul className="nav__links hidden md:flex">
                        {NAV_LINKS.map((link) => (
                            <li key={link.name}>
                                <a href={link.href} className="nav__link">
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Actions - Useful things only */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={copyEmail}
                            className="btn btn--secondary btn--sm hidden lg:flex items-center gap-2"
                            title="Copy Email"
                        >
                            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                            <span>{copied ? "Copied!" : "Email"}</span>
                        </button>
                        <a
                            href="/resume.pdf"
                            className="btn btn--primary btn--sm flex items-center gap-2"
                            target="_blank"
                        >
                            <span>Resume</span>
                        </a>
                        <a
                            href="https://github.com/vyassoham/myweb"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn--icon btn--ghost"
                            aria-label="GitHub Repo"
                            title="Source Code"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

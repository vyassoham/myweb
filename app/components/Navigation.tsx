"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Menu, X } from "lucide-react";

const NAV_LINKS = [
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Stats", href: "#stats" },
];

export default function Navigation(): React.JSX.Element {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
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

                        {/* Actions */}
                        <div className="nav__actions">
                            <button
                                className="btn btn--icon btn--ghost"
                                aria-label="Search"
                                onClick={() => setIsSearchOpen(true)}
                            >
                                <Search className="w-5 h-5" />
                            </button>
                            <button
                                className="btn btn--icon btn--ghost md:hidden"
                                aria-label="Menu"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-0 h-full w-64 bg-[var(--bg-secondary)] border-l border-[var(--border-subtle)] p-6">
                        <div className="flex justify-end mb-8">
                            <button
                                className="btn btn--icon btn--ghost"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <ul className="flex flex-col gap-4">
                            {NAV_LINKS.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-lg font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Search Modal */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-24">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsSearchOpen(false)}
                    />
                    <div className="relative w-full max-w-xl mx-4 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
                        <div className="flex items-center gap-3 p-4 border-b border-[var(--border-subtle)]">
                            <Search className="w-5 h-5 text-[var(--text-muted)]" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="flex-1 bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none text-lg"
                                autoFocus
                            />
                            <button
                                className="btn btn--icon btn--ghost text-xs"
                                onClick={() => setIsSearchOpen(false)}
                            >
                                ESC
                            </button>
                        </div>
                        <div className="p-6 text-center text-[var(--text-muted)]">
                            <p className="text-sm">Start typing to search...</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

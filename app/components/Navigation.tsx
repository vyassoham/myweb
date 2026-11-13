"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Mail, Github, Check, Copy, Menu, X, FileText, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Labs", href: "#lab" },
  { name: "Open Source", href: "#opensource" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation(): React.JSX.Element {
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scrollspy calculation
      const sections = ["about", "projects", "lab", "opensource", "skills", "contact"];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@soham.lol");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#07070a]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/40 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-indigo-500/30 ring-2 ring-indigo-500/10 group-hover:border-indigo-400 transition-all">
            <Image
              src="/assets/logo.png"
              alt="Soham Vyas"
              width={40}
              height={40}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-white group-hover:text-indigo-400 transition-colors">
              Soham Vyas
            </span>
            <span className="text-[11px] text-zinc-400 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              soham.lol
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links with Active Scrollspy Glow */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-3.5 py-1.5 backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const sectionKey = link.href.replace("#", "");
            const isActive = activeSection === sectionKey;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-full transition-all ${
                  isActive
                    ? "bg-indigo-600/90 text-white shadow-sm shadow-indigo-600/30"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2.5">
          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-white/[0.05] border border-white/[0.1] text-zinc-200 hover:bg-white/[0.1] hover:text-white transition-all cursor-pointer"
            title="Copy Email"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-zinc-400" />
            )}
            <span>{copied ? "Copied!" : "Email"}</span>
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          <a
            href="https://github.com/vyassoham"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all"
            aria-label="GitHub Profile"
            title="Source & GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-300 hover:text-white"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#07070a]/98 border-b border-white/[0.1] backdrop-blur-2xl px-6 py-6 flex flex-col gap-4">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="py-2.5 text-base font-medium text-zinc-200 hover:text-indigo-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
            <button
              onClick={copyEmail}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-white/[0.05] border border-white/[0.1] text-zinc-200"
              title="Copy Email"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied!" : "Copy Email"}</span>
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white"
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </a>
            <a
              href="https://github.com/vyassoham"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-white/[0.05] text-zinc-300"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

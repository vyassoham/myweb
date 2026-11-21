"use client";

import React from "react";
import Link from "next/link";

export default function Footer(): React.JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.08] bg-[#07070a] mt-auto py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 text-xs text-zinc-400">
        {/* Internal Navigation Directory */}
        <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-2 border-b border-white/[0.06] text-xs font-medium text-zinc-300">
          <Link href="/about/" className="hover:text-indigo-400 transition-colors">
            About Profile
          </Link>
          <span className="text-zinc-700 hidden sm:inline">•</span>
          <Link href="/projects/" className="hover:text-indigo-400 transition-colors">
            Featured Projects
          </Link>
          <span className="text-zinc-700 hidden sm:inline">•</span>
          <Link href="/blog/" className="hover:text-indigo-400 transition-colors">
            Engineering Blog
          </Link>
          <span className="text-zinc-700 hidden sm:inline">•</span>
          <Link href="/opensource/" className="hover:text-indigo-400 transition-colors">
            Open Source (SymPy)
          </Link>
          <span className="text-zinc-700 hidden sm:inline">•</span>
          <Link href="/labs/" className="hover:text-indigo-400 transition-colors">
            Interactive Labs
          </Link>
          <span className="text-zinc-700 hidden sm:inline">•</span>
          <Link href="/contact/" className="hover:text-indigo-400 transition-colors">
            Contact Channels
          </Link>
        </nav>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
          {/* Brand & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-semibold text-white tracking-tight">Soham Vyas</span>
            <span className="hidden sm:inline text-zinc-600">•</span>
            <span>
              © {currentYear} Soham Vyas. Built with Next.js &amp; Tailwind CSS.
            </span>
          </div>

          {/* External Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/vyassoham/myweb"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Source Code
            </a>
            <a
              href="https://github.com/vyassoham"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/vyassoham"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:hello@soham.lol"
              className="hover:text-white transition-colors"
            >
              hello@soham.lol
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React from "react";
import { Github, Linkedin, Mail, Heart, Sparkles } from "lucide-react";

export default function Footer(): React.JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.08] bg-[#07070a] mt-auto py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-400">
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-semibold text-white tracking-tight">Soham Vyas</span>
          <span className="hidden sm:inline text-zinc-600">•</span>
          <span>
            © {currentYear} Soham Vyas. Built with Next.js &amp; Tailwind CSS.
          </span>
        </div>

        {/* Links */}
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
    </footer>
  );
}

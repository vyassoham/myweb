"use client";

import Link from "next/link";
import { Terminal } from "lucide-react";

export default function Header(): React.JSX.Element {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
      <nav className="cyber-glass py-4 px-8 rounded-none flex items-center justify-between border-cyber-green/20 shadow-2xl">
        <Link
          href="/"
          className="group flex items-center gap-2"
        >
          <Terminal className="w-6 h-6 text-cyber-green animate-pulse" />
          <span className="text-2xl font-black font-mono text-cyber-glow tracking-tighter glitch" data-text="SOHAM">
            SOHAM
          </span>
        </Link>
        <ul className="flex items-center gap-8 list-none m-0 p-0">
          <li>
            <Link
              href="#home"
              className="text-cyber-green/70 hover:text-cyber-green transition-colors text-xs font-mono font-bold uppercase tracking-widest"
            >
              [HOME]
            </Link>
          </li>
          <li>
            <Link
              href="#tools"
              className="text-cyber-blue/70 hover:text-cyber-blue transition-colors text-xs font-mono font-bold uppercase tracking-widest"
            >
              [ARSENAL]
            </Link>
          </li>
          <li>
            <Link
              href="#experience"
              className="text-cyber-green/70 hover:text-cyber-green transition-colors text-xs font-mono font-bold uppercase tracking-widest"
            >
              [WORK]
            </Link>
          </li>
          <li>
            <Link
              href="#lab"
              className="text-cyber-green/70 hover:text-cyber-green transition-colors text-xs font-mono font-bold uppercase tracking-widest"
            >
              [PROJECTS]
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="px-4 py-2 bg-black border border-cyber-green text-cyber-green rounded-none text-xs font-mono font-black uppercase hover:bg-cyber-green hover:text-black transition-all"
            >
              {'>'} CONTACT
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

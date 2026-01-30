"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Header(): React.JSX.Element {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
      <nav className="glass py-4 px-8 rounded-2xl flex items-center justify-between shadow-2xl">
        <Link
          href="/"
          className="group"
        >
          <span className="text-2xl font-black font-display bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent tracking-tighter">
            SOHAM
          </span>
        </Link>
        <ul className="flex items-center gap-8 list-none m-0 p-0">
          <li>
            <Link
              href="#home"
              className="text-white/70 hover:text-white transition-colors text-sm font-semibold"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="#tools"
              className="text-white/70 hover:text-white transition-colors text-sm font-semibold"
            >
              Tools
            </Link>
          </li>
          <li>
            <Link
              href="#experience"
              className="text-white/70 hover:text-white transition-colors text-sm font-semibold"
            >
              Work
            </Link>
          </li>
          <li>
            <Link
              href="#lab"
              className="text-white/70 hover:text-white transition-colors text-sm font-semibold"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-violet-500/50 transition-all transform hover:-translate-y-0.5"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

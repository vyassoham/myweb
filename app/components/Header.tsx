"use client";

import Link from "next/link";

export default function Header(): React.JSX.Element {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
      <nav className="glass py-4 px-8 rounded-2xl flex items-center justify-between border border-white/10 shadow-2xl">
        <Link
          href="/"
          className="group"
        >
          <span className="text-2xl font-black bg-gradient-to-r from-violet-400 to-white bg-clip-text text-transparent italic tracking-tighter">
            SOHAM
          </span>
        </Link>
        <ul className="flex items-center gap-8 list-none m-0 p-0">
          <li>
            <Link
              href="#home"
              className="text-white/70 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="#experience"
              className="text-white/70 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
            >
              Work
            </Link>
          </li>
          <li>
            <Link
              href="#lab"
              className="text-white/70 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="px-4 py-2 bg-white text-black rounded-lg text-xs font-black uppercase hover:bg-purple-400 hover:text-white transition-all transform hover:scale-105"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

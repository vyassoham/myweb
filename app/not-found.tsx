"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Terminal, Home, Sparkles, BookOpen, Quote, ShieldAlert } from "lucide-react";
import InteractiveBackground from "./components/InteractiveBackground";
import CommandPalette from "./components/CommandPalette";
import InteractiveCoffee from "./components/InteractiveCoffee";

interface CoderQuote {
  quote: string;
  author: string;
  role: string;
}

const CODER_QUOTES: CoderQuote[] = [
  {
    quote: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
    role: "Creator of Linux & Git",
  },
  {
    quote: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    author: "Brian W. Kernighan",
    role: "Co-creator of Unix, AWK & The C Programming Language",
  },
  {
    quote: "Premature optimization is the root of all evil.",
    author: "Donald E. Knuth",
    role: "Turing Award Laureate, The Art of Computer Programming",
  },
  {
    quote: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
    role: "Pioneer of Distributed Computing & Turing Award Laureate",
  },
  {
    quote: "There are only two hard things in Computer Science: cache invalidation and naming things.",
    author: "Phil Karlton",
    role: "Principal Architect, Netscape",
  },
  {
    quote: "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.",
    author: "Bill Gates",
    role: "Co-founder of Microsoft",
  },
  {
    quote: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
    role: "Turing Award Laureate, Pioneer of OOP & Graphical UI",
  },
  {
    quote: "You can't trust code that you did not totally create yourself.",
    author: "Ken Thompson",
    role: "Turing Award Laureate, Co-creator of Unix, B & Go",
  },
];

export default function NotFound(): React.JSX.Element {
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const cycleQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % CODER_QUOTES.length);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    setTerminalInput("");

    if (!cmd) return;

    if (cmd === "home" || cmd === "cd ~" || cmd === "cd") {
      window.location.href = "/";
    } else if (cmd === "projects" || cmd === "cd projects") {
      window.location.href = "/projects/";
    } else if (cmd === "labs" || cmd === "cd labs") {
      window.location.href = "/labs/";
    } else if (cmd === "blog" || cmd === "cd blog") {
      window.location.href = "/blog/";
    } else if (cmd === "coffee" || cmd === "sip") {
      setTerminalOutput((prev) => [
        ...prev,
        `$ ${cmd}`,
        "☕ Gulp! +65mg Caffeine added. Coffee pipeline optimal.",
      ]);
    } else if (cmd === "quote") {
      cycleQuote();
      const nextQ = CODER_QUOTES[(quoteIndex + 1) % CODER_QUOTES.length];
      setTerminalOutput((prev) => [
        ...prev,
        `$ ${cmd}`,
        `"${nextQ.quote}" — ${nextQ.author} (${nextQ.role})`,
      ]);
    } else if (cmd === "clear") {
      setTerminalOutput([]);
    } else if (cmd === "help") {
      setTerminalOutput((prev) => [
        ...prev,
        `$ ${cmd}`,
        "Available commands:",
        "  home       - Return to portfolio homepage",
        "  projects   - View featured engineering systems",
        "  labs       - Launch interactive engineering simulators",
        "  blog       - Read mathematical deep-dives & SymPy PRs",
        "  coffee     - Take a virtual sip of coffee",
        "  quote      - Shuffle famous coder quotes",
        "  clear      - Clear terminal screen",
      ]);
    } else {
      setTerminalOutput((prev) => [
        ...prev,
        `$ ${cmd}`,
        `zsh: command not found: ${cmd}. Type 'help' for available commands.`,
      ]);
    }
  };

  const currentQuoteObj = CODER_QUOTES[quoteIndex];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#07070a] text-slate-100 relative px-6 py-16 overflow-hidden">
      {/* 60 FPS Ambient Background */}
      <InteractiveBackground />

      {/* Global Command Palette */}
      <CommandPalette />

      <div className="max-w-2xl w-full z-10 flex flex-col items-center text-center">
        {/* Error Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium mb-4">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>HTTP 404 · ROUTE_UNDEFINED</span>
        </div>

        {/* Big Code Heading */}
        <h1 className="text-6xl sm:text-7xl font-bold font-mono tracking-tight text-white mb-2">
          4<span className="text-amber-400">0</span>4
        </h1>

        {/* Iconic Top Coder Quote Card */}
        <div
          onClick={cycleQuote}
          className="my-3 p-5 rounded-2xl bg-zinc-900/80 border border-white/[0.08] hover:border-amber-500/40 cursor-pointer transition-all hover:scale-[1.01] group relative"
          title="Click to switch quote"
        >
          <Quote className="w-5 h-5 text-amber-400 mb-2 mx-auto opacity-70 group-hover:scale-110 transition-transform" />
          <p className="text-sm sm:text-base font-medium text-zinc-200 italic leading-relaxed">
            &ldquo;{currentQuoteObj.quote}&rdquo;
          </p>
          <div className="mt-2.5 flex flex-col items-center justify-center">
            <span className="text-xs text-amber-400 font-medium">
              — {currentQuoteObj.author}
            </span>
            <span className="text-xs text-zinc-400 mt-0.5 font-normal">
              {currentQuoteObj.role}
            </span>
          </div>
          <span className="text-xs text-zinc-500 block mt-2 opacity-70 font-normal">
            (click card to cycle famous coder quotes ↻)
          </span>
        </div>

        {/* Interactive Animated Coffee Cup Component */}
        <InteractiveCoffee />

        {/* Interactive Terminal Window */}
        <div className="w-full rounded-2xl bg-zinc-950/90 border border-white/[0.1] shadow-2xl shadow-amber-950/20 text-left overflow-hidden mb-6">
          {/* Terminal Titlebar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-amber-400" />
              soham@iitj-gateway: ~ (zsh)
            </span>
            <div className="w-10" />
          </div>

          {/* Terminal Console */}
          <div className="p-4 font-mono text-xs text-zinc-300 space-y-1.5 max-h-48 overflow-y-auto">
            <p className="text-zinc-500">$ curl -I https://soham.lol/missing-path</p>
            <p className="text-amber-400">HTTP/2 404 Route Not Registered</p>
            <p className="text-zinc-400">status: coffee_hot, brain_active</p>
            <p className="text-zinc-400">tip: type &apos;home&apos; or &apos;projects&apos; below</p>

            {terminalOutput.map((line, idx) => (
              <p
                key={idx}
                className={
                  line.startsWith("$")
                    ? "text-indigo-400 pt-1"
                    : line.includes("command not found")
                    ? "text-rose-400"
                    : "text-emerald-300"
                }
              >
                {line}
              </p>
            ))}

            {/* Terminal CLI prompt */}
            <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2 text-emerald-400">
              <span className="text-zinc-500">soham@iitj:~$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="type 'home', 'projects', 'coffee', or 'help'..."
                className="flex-1 bg-transparent border-none outline-none text-emerald-400 placeholder:text-zinc-600 font-mono text-xs"
              />
            </form>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Portfolio (Home)</span>
          </Link>

          <Link
            href="/projects/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-zinc-300 font-semibold text-xs transition-all"
          >
            <span>Explore Projects</span>
          </Link>

          <Link
            href="/labs/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-zinc-300 font-semibold text-xs transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Live Labs</span>
          </Link>

          <Link
            href="/blog/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-zinc-300 font-semibold text-xs transition-all"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>Publications</span>
          </Link>
        </div>

        <p className="text-[11px] font-mono text-zinc-500 mt-6">
          Pro-tip: Press <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-zinc-300">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-zinc-300">K</kbd> anywhere for Spotlight navigation.
        </p>
      </div>
    </div>
  );
}

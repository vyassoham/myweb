"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Terminal, Home, Sparkles, BookOpen, Search, ShieldAlert } from "lucide-react";
import InteractiveBackground from "./components/InteractiveBackground";
import CommandPalette from "./components/CommandPalette";

export default function NotFound(): React.JSX.Element {
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

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

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#07070a] text-slate-100 relative px-6 py-16 overflow-hidden">
      {/* 60 FPS Ambient Background */}
      <InteractiveBackground />

      {/* Global Command Palette */}
      <CommandPalette />

      <div className="max-w-2xl w-full z-10 flex flex-col items-center text-center">
        {/* Error Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono font-semibold mb-6">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>HTTP 404 · ERR_ROUTE_NOT_FOUND</span>
        </div>

        {/* Big Code Heading */}
        <h1 className="text-7xl sm:text-8xl font-extrabold font-mono tracking-tight text-white mb-2">
          4<span className="text-rose-500">0</span>4
        </h1>

        <p className="text-xl font-bold text-zinc-200 mb-2">
          Packet Dropped in IIT Jodhpur Gateway
        </p>

        <p className="text-sm text-zinc-400 max-w-md mb-8 leading-relaxed">
          The requested coordinate does not exist in the canonical mesh. Either the path was moved, or an invalid pointer was dispatched.
        </p>

        {/* Interactive Terminal Window */}
        <div className="w-full rounded-2xl bg-zinc-950/90 border border-white/[0.1] shadow-2xl shadow-rose-950/20 text-left overflow-hidden mb-8">
          {/* Terminal Titlebar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1.5">
              <Terminal className="w-3 h-3" />
              soham@iitj-gateway: ~ (zsh)
            </span>
            <div className="w-10" />
          </div>

          {/* Terminal Console */}
          <div className="p-4 font-mono text-xs text-zinc-300 space-y-1.5 max-h-56 overflow-y-auto">
            <p className="text-zinc-500">$ curl -I https://soham.lol/unknown-route</p>
            <p className="text-rose-400">HTTP/2 404 Not Found</p>
            <p className="text-zinc-400">server: soham.lol/gateway-v2.6</p>
            <p className="text-zinc-400">x-mesh-status: PACKET_DROPPED</p>
            <p className="text-zinc-400">x-suggestion: return to root index (/)</p>

            {terminalOutput.map((line, idx) => (
              <p
                key={idx}
                className={
                  line.startsWith("$")
                    ? "text-indigo-400 pt-1"
                    : line.includes("command not found")
                    ? "text-rose-400"
                    : "text-zinc-300"
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
                placeholder="type 'help', 'home', or 'projects'..."
                className="flex-1 bg-transparent border-none outline-none text-emerald-400 placeholder:text-zinc-600 font-mono text-xs"
                autoFocus
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
            <span>Return to Safety (Home)</span>
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
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Engineering Labs</span>
          </Link>

          <Link
            href="/blog/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-zinc-300 font-semibold text-xs transition-all"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Publications</span>
          </Link>
        </div>

        <p className="text-[11px] font-mono text-zinc-500 mt-8">
          Pro-tip: Press <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-zinc-300">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-zinc-300">K</kbd> anywhere to trigger the global Command Palette.
        </p>
      </div>
    </div>
  );
}

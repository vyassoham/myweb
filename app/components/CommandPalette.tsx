"use client";

import React, { useState, useEffect } from "react";
import { Search, X, ArrowRight, ExternalLink, FileText, Mail, Github, Terminal, Calculator, ShieldCheck, Sparkles, Code2 } from "lucide-react";

interface CommandItem {
  id: string;
  category: "Navigation" | "Interactive Labs" | "Quick Actions";
  title: string;
  subtitle: string;
  icon: React.ElementType;
  action: () => void;
}

export default function CommandPalette(): React.JSX.Element | null {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Global keydown listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  const copyEmail = () => {
    setIsOpen(false);
    navigator.clipboard.writeText("hello@soham.lol");
    alert("Email copied to clipboard: hello@soham.lol");
  };

  const commands: CommandItem[] = [
    {
      id: "nav-about",
      category: "Navigation",
      title: "About Soham Vyas",
      subtitle: "Academic background @ IIT Jodhpur & engineering philosophy",
      icon: Terminal,
      action: () => scrollToSection("about"),
    },
    {
      id: "nav-projects",
      category: "Navigation",
      title: "Featured Projects",
      subtitle: "Cybersecurity Analyzer, AI Rate Limiter, SchemaGuard, Neural TTS",
      icon: Code2,
      action: () => scrollToSection("projects"),
    },
    {
      id: "nav-lab",
      category: "Interactive Labs",
      title: "Interactive Engineering Labs",
      subtitle: "Live in-browser simulations for Cybersecurity & Rate Limiter",
      icon: Sparkles,
      action: () => scrollToSection("lab"),
    },
    {
      id: "nav-opensource",
      category: "Navigation",
      title: "SymPy Contributions (GSoC '27)",
      subtitle: "Kronecker product trace and MatrixUnit symbolic math fixes",
      icon: Calculator,
      action: () => scrollToSection("opensource"),
    },
    {
      id: "nav-skills",
      category: "Navigation",
      title: "Technical Skills Matrix",
      subtitle: "Languages, AI/ML, backend, databases, and DevOps tools",
      icon: ShieldCheck,
      action: () => scrollToSection("skills"),
    },
    {
      id: "nav-contact",
      category: "Navigation",
      title: "Get in Touch",
      subtitle: "Direct email, GitHub, LinkedIn, and campus details",
      icon: Mail,
      action: () => scrollToSection("contact"),
    },
    {
      id: "action-copy-email",
      category: "Quick Actions",
      title: "Copy Direct Email Address",
      subtitle: "hello@soham.lol",
      icon: Mail,
      action: copyEmail,
    },
    {
      id: "action-resume",
      category: "Quick Actions",
      title: "Download Technical Resume",
      subtitle: "PDF document with academic and project history",
      icon: FileText,
      action: () => {
        setIsOpen(false);
        window.open("/resume.pdf", "_blank");
      },
    },
    {
      id: "action-github",
      category: "Quick Actions",
      title: "Visit GitHub Profile",
      subtitle: "github.com/vyassoham",
      icon: Github,
      action: () => {
        setIsOpen(false);
        window.open("https://github.com/vyassoham", "_blank");
      },
    },
  ];

  const filteredCommands = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Floating Action Trigger Button on bottom-right */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#13131e]/90 hover:bg-[#1a1a28] border border-white/10 hover:border-indigo-500/40 text-xs font-mono text-zinc-300 shadow-xl shadow-black/50 backdrop-blur-md transition-all group cursor-pointer"
        title="Open Command Palette (Ctrl+K)"
        aria-label="Open Command Palette"
      >
        <Search className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline font-sans font-medium text-xs">Quick Search</span>
        <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-zinc-400 group-hover:text-white">
          ⌘K
        </kbd>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-sm animate-fade-in-up"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-2xl bg-[#0d0d14] border border-white/15 shadow-2xl shadow-indigo-500/10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08] bg-white/[0.02]">
              <Search className="w-4 h-4 text-indigo-400 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type a command, project, or section (or Esc to close)..."
                className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-zinc-400 hover:text-white"
                aria-label="Close Command Palette"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Commands List */}
            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-white/[0.03]">
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center text-xs text-zinc-500">
                  No matching commands found.
                </div>
              ) : (
                filteredCommands.map((cmd) => {
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.06] text-left transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-white group-hover:text-indigo-300">
                              {cmd.title}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/[0.05] text-zinc-400 font-mono">
                              {cmd.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">
                            {cmd.subtitle}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer shortcuts */}
            <div className="px-4 py-2.5 bg-white/[0.02] border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-500">
              <span className="flex items-center gap-1.5">
                <kbd className="px-1 py-0.5 rounded bg-white/10 text-[9px] text-zinc-400">Esc</kbd> to close
              </span>
              <span>Soham Vyas · soham.lol</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

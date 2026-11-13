"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function getInitialTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  } catch {
    return "dark";
  }
}

export function applyTheme(theme: "dark" | "light"): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (theme === "light") {
    root.classList.remove("dark");
    root.classList.add("light");
    root.setAttribute("data-theme", "light");
  } else {
    root.classList.remove("light");
    root.classList.add("dark");
    root.setAttribute("data-theme", "dark");
  }

  try {
    localStorage.setItem("theme", theme);
  } catch {}

  if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
    try {
      const CustomEventCtor = (window as any).CustomEvent || CustomEvent;
      window.dispatchEvent(new CustomEventCtor("theme-change", { detail: { theme } }));
    } catch {}
  }
}

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps): React.JSX.Element {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const initial = document.documentElement.classList.contains("light") ? "light" : "dark";
    setTheme(initial);

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: "dark" | "light" }>;
      if (customEvent.detail?.theme) {
        setTheme(customEvent.detail.theme);
      }
    };

    window.addEventListener("theme-change", handleThemeChange);
    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  // Safe placeholder during SSR to prevent hydration discrepancy
  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-xl border border-white/10 bg-white/[0.04] animate-pulse ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
        theme === "dark"
          ? "bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-amber-300 hover:text-amber-200 hover:border-amber-400/40"
          : "bg-slate-100 hover:bg-slate-200 border border-slate-300 text-indigo-600 hover:text-indigo-700 shadow-sm hover:border-indigo-400"
      } ${className}`}
      aria-label={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode (currently ${theme} mode)`}
      title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {theme === "dark" ? (
          <Moon className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500 transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110" />
        )}
      </div>
    </button>
  );
}

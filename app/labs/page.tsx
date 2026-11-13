import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navigation from "../components/Navigation";
import InteractivePlayground from "../components/InteractivePlayground";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import InteractiveBackground from "../components/InteractiveBackground";
import CommandPalette from "../components/CommandPalette";

export const metadata: Metadata = {
  title: "Interactive Engineering Labs",
  description:
    "Live client-side engineering simulators: Shannon Information Entropy & NIST crack-time calculator, and atomic Lua sliding-window rate limiter by Soham Vyas.",
  alternates: {
    canonical: "https://soham.lol/labs/",
  },
  openGraph: {
    title: "Interactive Engineering Labs | Soham Vyas — IIT Jodhpur",
    description:
      "Live client-side engineering simulators for Cybersecurity and Distributed Rate Limiting by Soham Vyas.",
    url: "https://soham.lol/labs/",
  },
};

export default function LabsPage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-[#07070a] text-slate-100 relative">
      <InteractiveBackground />
      <CommandPalette />
      <Navigation />
      <main className="flex-1 pt-28">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-emerald-400 transition-colors bg-white/[0.03] border border-white/[0.08] px-3.5 py-1.5 rounded-lg"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Return to Full Portfolio</span>
          </Link>
        </div>
        <InteractivePlayground />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

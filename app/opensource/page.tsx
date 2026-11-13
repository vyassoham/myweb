import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navigation from "../components/Navigation";
import OpenSource from "../components/OpenSource";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import InteractiveBackground from "../components/InteractiveBackground";
import CommandPalette from "../components/CommandPalette";

export const metadata: Metadata = {
  title: "SymPy Open Source & GSoC 2027",
  description:
    "Upstream contributions to SymPy computer algebra system by Soham Vyas at IIT Jodhpur. KroneckerProduct and MatrixUnit trace symbolic logic optimizations.",
  alternates: {
    canonical: "https://soham.lol/opensource/",
  },
  openGraph: {
    title: "SymPy Open Source & GSoC 2027 | Soham Vyas — IIT Jodhpur",
    description:
      "Upstream contributions to SymPy computer algebra system by Soham Vyas at IIT Jodhpur.",
    url: "https://soham.lol/opensource/",
  },
};

export default function OpenSourcePage(): React.JSX.Element {
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
        <OpenSource />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

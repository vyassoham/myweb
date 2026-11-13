import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import InteractiveBackground from "../components/InteractiveBackground";
import CommandPalette from "../components/CommandPalette";

export const metadata: Metadata = {
  title: "About Soham Vyas — IIT Jodhpur",
  description:
    "Learn more about Soham Vyas, an 18-year-old student pursuing BS in Data Science & Artificial Intelligence at IIT Jodhpur, systems engineer, and SymPy contributor.",
  alternates: {
    canonical: "https://soham.lol/about/",
  },
  openGraph: {
    title: "About Soham Vyas — IIT Jodhpur | Data Science & AI",
    description:
      "Academic background, engineering philosophy, and open-source contributions of Soham Vyas at IIT Jodhpur.",
    url: "https://soham.lol/about/",
  },
};

export default function AboutPage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-[#07070a] text-slate-100 relative">
      <InteractiveBackground />
      <CommandPalette />
      <Navigation />
      <main className="flex-1 pt-24">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-emerald-400 transition-colors bg-white/[0.03] border border-white/[0.08] px-3.5 py-1.5 rounded-lg"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Return to Full Portfolio</span>
          </Link>
        </div>
        <Hero />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

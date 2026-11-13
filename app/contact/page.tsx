import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navigation from "../components/Navigation";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import InteractiveBackground from "../components/InteractiveBackground";
import CommandPalette from "../components/CommandPalette";

export const metadata: Metadata = {
  title: "Contact & Connect",
  description:
    "Get in touch with Soham Vyas for AI systems roles, open source collaboration, and research discussions. Direct email, GitHub, LinkedIn, and Twitter.",
  alternates: {
    canonical: "https://soham.lol/contact/",
  },
  openGraph: {
    title: "Contact Soham Vyas | AI Systems Engineer @ IIT Jodhpur",
    description:
      "Direct channels to reach Soham Vyas at IIT Jodhpur for systems roles and open source projects.",
    url: "https://soham.lol/contact/",
  },
};

export default function ContactPage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-[#07070a] text-slate-100 relative">
      <InteractiveBackground />
      <CommandPalette />
      <Navigation />
      <main className="flex-1 pt-32">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-emerald-400 transition-colors bg-white/[0.03] border border-white/[0.08] px-3.5 py-1.5 rounded-lg"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Return to Full Portfolio</span>
          </Link>
        </div>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

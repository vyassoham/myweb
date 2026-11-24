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
  title: "Interactive Engineering Labs | SymPy & Systems Simulators",
  description:
    "Live client-side computational engineering laboratories: SymPy Kronecker tensor product & power proof engine, atomic Lua sliding-window rate limiter, and Shannon cryptographic entropy calculator by Soham Vyas at IIT Jodhpur.",
  alternates: {
    canonical: "https://www.soham.lol/labs/",
  },
  openGraph: {
    title: "Interactive Engineering Labs | Soham Vyas — IIT Jodhpur",
    description:
      "Interactive scientific simulators: SymPy symbolic tensor engine, atomic Redis sliding window, and NIST 800-63B cryptographic crack-time physics by Soham Vyas.",
    url: "https://www.soham.lol/labs/",
    images: [{ url: "https://www.soham.lol/assets/og/og-labs.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interactive Engineering Labs | Soham Vyas — IIT Jodhpur",
    description: "In-browser research simulators for symbolic algebra, distributed rate limiting, and cryptographic entropy.",
    images: ["https://www.soham.lol/assets/og/og-labs.png"],
    creator: "@Soham_Vyas_",
  },
};

const labsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemPage",
      "@id": "https://www.soham.lol/labs/#webpage",
      "url": "https://www.soham.lol/labs/",
      "name": "Interactive Engineering Labs | Soham Vyas",
      "description":
        "Live client-side engineering simulators for Cybersecurity and Distributed Rate Limiting by Soham Vyas.",
      "isPartOf": { "@id": "https://www.soham.lol/#website" },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "@id": "https://www.soham.lol/labs/#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Portfolio", "item": "https://www.soham.lol/" },
          { "@type": "ListItem", "position": 2, "name": "Labs", "item": "https://www.soham.lol/labs/" },
        ],
      },
    },
  ],
};

export default function LabsPage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-[#07070a] text-slate-100 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(labsSchema) }}
      />
      <InteractiveBackground />
      <CommandPalette />
      <Navigation />
      <main className="flex-1 pt-28">
        <h1 className="sr-only">Interactive Engineering Labs — Cybersecurity &amp; Rate Limiting Simulators</h1>
        <div className="max-w-7xl mx-auto px-6 py-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-xs font-medium text-zinc-400">
            <Link
              href="/"
              className="hover:text-emerald-400 transition-colors bg-white/[0.03] border border-white/[0.08] px-3.5 py-1.5 rounded-lg flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Return to Full Portfolio</span>
            </Link>
            <span>/</span>
            <span className="text-zinc-200">Interactive Simulators</span>
          </nav>
        </div>
        <InteractivePlayground />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

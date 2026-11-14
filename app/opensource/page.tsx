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
  title: "SymPy Open Source & GSoC 2027 | Soham Vyas — IIT Jodhpur",
  description:
    "Upstream contributions to SymPy computer algebra system by Soham Vyas at IIT Jodhpur. KroneckerProduct and MatrixUnit trace symbolic logic optimizations.",
  alternates: {
    canonical: "https://www.soham.lol/opensource/",
  },
  openGraph: {
    title: "SymPy Open Source & GSoC 2027 | Soham Vyas — IIT Jodhpur",
    description:
      "Upstream contributions to SymPy computer algebra system by Soham Vyas at IIT Jodhpur. Officially merged PRs #31010 and #31011.",
    url: "https://www.soham.lol/opensource/",
    images: [{ url: "https://www.soham.lol/assets/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SymPy Open Source & GSoC 2027 | Soham Vyas — IIT Jodhpur",
    description: "Upstream SymPy symbolic mathematics contributions by Soham Vyas.",
    images: ["https://www.soham.lol/assets/og-image.png"],
    creator: "@Soham_Vyas_",
  },
};

const openSourceSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemPage",
      "@id": "https://www.soham.lol/opensource/#webpage",
      "url": "https://www.soham.lol/opensource/",
      "name": "SymPy Open Source & GSoC 2027 | Soham Vyas",
      "description":
        "Upstream contributions to SymPy computer algebra system by Soham Vyas at IIT Jodhpur.",
      "isPartOf": { "@id": "https://www.soham.lol/#website" },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "@id": "https://www.soham.lol/opensource/#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Portfolio", "item": "https://www.soham.lol/" },
          { "@type": "ListItem", "position": 2, "name": "Open Source", "item": "https://www.soham.lol/opensource/" },
        ],
      },
    },
  ],
};

export default function OpenSourcePage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-[#07070a] text-slate-100 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(openSourceSchema) }}
      />
      <InteractiveBackground />
      <CommandPalette />
      <Navigation />
      <main className="flex-1 pt-28">
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
            <span className="text-zinc-200">Open Source (SymPy)</span>
          </nav>
        </div>
        <OpenSource />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

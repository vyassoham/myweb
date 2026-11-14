import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navigation from "../components/Navigation";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import InteractiveBackground from "../components/InteractiveBackground";
import CommandPalette from "../components/CommandPalette";

export const metadata: Metadata = {
  title: "Featured Engineering Projects | Soham Vyas — IIT Jodhpur",
  description:
    "Explore production-grade AI systems, atomic Lua rate limiters, cybersecurity analyzers, and resilient financial telemetry dashboards built by Soham Vyas at IIT Jodhpur.",
  alternates: {
    canonical: "https://www.soham.lol/projects/",
  },
  openGraph: {
    title: "Featured Engineering Projects | Soham Vyas — IIT Jodhpur",
    description:
      "Explore production-grade AI systems, atomic Lua rate limiters, and cybersecurity analyzers built by Soham Vyas.",
    url: "https://www.soham.lol/projects/",
    images: [{ url: "https://www.soham.lol/assets/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Featured Engineering Projects | Soham Vyas — IIT Jodhpur",
    description:
      "Production-grade systems, rate limiters, and cybersecurity tools by Soham Vyas.",
    images: ["https://www.soham.lol/assets/og-image.png"],
    creator: "@Soham_Vyas_",
  },
};

const projectsCollectionSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://www.soham.lol/projects/#webpage",
      "url": "https://www.soham.lol/projects/",
      "name": "Featured Engineering Projects | Soham Vyas",
      "description":
        "Technical portfolio of open-source and systems engineering projects by Soham Vyas at IIT Jodhpur.",
      "isPartOf": { "@id": "https://www.soham.lol/#website" },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "@id": "https://www.soham.lol/projects/#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Portfolio", "item": "https://www.soham.lol/" },
          { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.soham.lol/projects/" },
        ],
      },
    },
  ],
};

export default function ProjectsPage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-[#07070a] text-slate-100 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsCollectionSchema) }}
      />
      <InteractiveBackground />
      <CommandPalette />
      <Navigation />
      <main className="flex-1 pt-28">
        <div className="max-w-7xl mx-auto px-6 py-2">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-xs font-medium text-zinc-400">
            <Link
              href="/"
              className="hover:text-emerald-400 transition-colors bg-white/[0.03] border border-white/[0.08] px-3.5 py-1.5 rounded-lg flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Return to Full Portfolio</span>
            </Link>
            <span>/</span>
            <span className="text-zinc-200">Projects Directory</span>
          </nav>
        </div>
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

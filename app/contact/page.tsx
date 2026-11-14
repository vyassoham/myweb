import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navigation from "../components/Navigation";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import InteractiveBackground from "../components/InteractiveBackground";
import CommandPalette from "../components/CommandPalette";

export const metadata: Metadata = {
  title: "Contact & Connect | Soham Vyas — IIT Jodhpur",
  description:
    "Get in touch with Soham Vyas for AI systems roles, open source collaboration, and research discussions. Direct email, GitHub, LinkedIn, and X.",
  alternates: {
    canonical: "https://www.soham.lol/contact/",
  },
  openGraph: {
    title: "Contact Soham Vyas | AI Systems Engineer @ IIT Jodhpur",
    description:
      "Direct communication channels to reach Soham Vyas at IIT Jodhpur for systems engineering, GSoC 2027 collaboration, and AI research.",
    url: "https://www.soham.lol/contact/",
    images: [{ url: "https://www.soham.lol/assets/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Soham Vyas | AI Systems Engineer @ IIT Jodhpur",
    description: "Get in touch with Soham Vyas at IIT Jodhpur.",
    images: ["https://www.soham.lol/assets/og-image.png"],
    creator: "@Soham_Vyas_",
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://www.soham.lol/contact/#webpage",
      "url": "https://www.soham.lol/contact/",
      "name": "Contact & Connect | Soham Vyas",
      "description":
        "Contact channels to reach Soham Vyas for engineering roles, open source collaboration, and research.",
      "isPartOf": { "@id": "https://www.soham.lol/#website" },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "@id": "https://www.soham.lol/contact/#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Portfolio", "item": "https://www.soham.lol/" },
          { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://www.soham.lol/contact/" },
        ],
      },
    },
  ],
};

export default function ContactPage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-[#07070a] text-slate-100 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <InteractiveBackground />
      <CommandPalette />
      <Navigation />
      <main className="flex-1 pt-32">
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
            <span className="text-zinc-200">Contact Channels</span>
          </nav>
        </div>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

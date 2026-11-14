import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Calendar, ArrowUpRight, Sparkles, GitPullRequest, ShieldCheck, Zap, Database } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import InteractiveBackground from "../components/InteractiveBackground";
import CommandPalette from "../components/CommandPalette";
import TiltCard from "../components/TiltCard";
import ScrollReveal from "../components/ScrollReveal";

export const metadata: Metadata = {
  title: "Engineering Blog & Technical Deep-Dives | Soham Vyas — IIT Jodhpur",
  description:
    "In-depth engineering articles on computer algebra optimization, SymPy Kronecker traces, distributed Redis Lua rate limiters, and cryptographic Shannon entropy by Soham Vyas.",
  alternates: {
    canonical: "https://www.soham.lol/blog/",
  },
  openGraph: {
    title: "Engineering Blog | Soham Vyas — IIT Jodhpur",
    description:
      "Mathematical and systems engineering deep dives by Soham Vyas at IIT Jodhpur.",
    url: "https://www.soham.lol/blog/",
    images: [{ url: "https://www.soham.lol/assets/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Blog | Soham Vyas — IIT Jodhpur",
    description: "Mathematical and systems engineering deep dives by Soham Vyas.",
    images: ["https://www.soham.lol/assets/og-image.png"],
    creator: "@Soham_Vyas_",
  },
};

const blogIndexSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://www.soham.lol/blog/#webpage",
      "url": "https://www.soham.lol/blog/",
      "name": "Engineering Blog & Technical Publications | Soham Vyas",
      "description":
        "In-depth technical publications on computational algebra, distributed systems, and cryptographic entropy by Soham Vyas at IIT Jodhpur.",
      "isPartOf": { "@id": "https://www.soham.lol/#website" },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "@id": "https://www.soham.lol/blog/#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Portfolio", "item": "https://www.soham.lol/" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.soham.lol/blog/" },
        ],
      },
    },
  ],
};

interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  featured?: boolean;
  hasInteractiveSlider?: boolean;
  icon: React.ElementType;
}

const ARTICLES: Article[] = [
  {
    slug: "sympy-kronecker-trace",
    title: "How I Eliminated O(n³) Matrix Expansion in SymPy Kronecker Traces",
    description:
      "A deep dive into symbolic matrix expressions, Kronecker product tensor algebra, and implementing an exact scalar property in SymPy that avoids catastrophic memory allocation ahead of GSoC 2027.",
    category: "Computer Algebra & Math",
    readTime: "7 min read",
    date: "Nov 2026",
    featured: true,
    hasInteractiveSlider: true,
    icon: GitPullRequest,
  },
  {
    slug: "redis-lua-rate-limiter",
    title: "High-Throughput Distributed Rate Limiting with Atomic Redis Lua Scripts",
    description:
      "Why traditional multi-step Redis rate limiting fails under concurrent load, and how we engineered an atomic sliding-window algorithm that executes in sub-millisecond latency.",
    category: "Distributed Systems",
    readTime: "6 min read",
    date: "Nov 2026",
    icon: Zap,
  },
  {
    slug: "shannon-entropy-cybersecurity",
    title: "Quantifying Cryptographic Strength: Shannon Entropy & NIST 800-63B Defense",
    description:
      "How we combined Claude Shannon's 1948 mathematical information theory with NIST password guidelines to detect hardcoded secrets and estimate brute-force resistance against 100 GH/s GPU clusters.",
    category: "Cybersecurity",
    readTime: "5 min read",
    date: "Nov 2026",
    icon: ShieldCheck,
  },
];

export default function BlogIndex(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-[#07070a] text-slate-100 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexSchema) }}
      />
      <InteractiveBackground />
      <CommandPalette />
      <Navigation />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          {/* Header */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-xs font-medium text-zinc-400 mb-8">
            <Link
              href="/"
              className="hover:text-emerald-400 transition-colors bg-white/[0.03] border border-white/[0.08] px-3 py-1.5 rounded-lg flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Return to Full Portfolio</span>
            </Link>
            <span>/</span>
            <span className="text-zinc-200">Engineering Publications</span>
          </nav>

          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Technical Publications &amp; Mathematical Notes</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              Engineering Deep-Dives
            </h1>
            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl leading-relaxed">
              Rigorous writeups on algorithmic complexity optimizations, distributed systems concurrency primitives, and cryptographic defense authored by <strong>Soham Vyas</strong> (IIT Jodhpur).
            </p>
          </div>

          {/* Articles List */}
          <div className="space-y-6">
            {ARTICLES.map((article, idx) => {
              const Icon = article.icon;
              return (
                <ScrollReveal key={article.slug} delay={idx * 0.08} direction="up">
                  <Link href={`/blog/${article.slug}/`} className="block group">
                    <TiltCard
                      maxTilt={4}
                      scale={1.01}
                      className="glass-card p-6 sm:p-8 transition-all hover:border-indigo-500/40 relative overflow-hidden"
                    >
                      {article.featured && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
                          <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 flex items-center gap-1.5">
                            <Icon className="w-3.5 h-3.5" />
                            {article.category}
                          </span>
                          {article.hasInteractiveSlider && (
                            <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[11px] font-mono">
                              Interactive Simulator Included
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-xs text-zinc-500 shrink-0 font-normal">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{article.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors tracking-tight mb-3">
                        {article.title}
                      </h2>

                      <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-normal">
                        {article.description}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
                        <span className="inline-flex items-center gap-1">
                          Read Technical Publication
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                        <span className="text-[11px] font-mono text-zinc-500">
                          Soham Vyas · IIT Jodhpur
                        </span>
                      </div>
                    </TiltCard>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

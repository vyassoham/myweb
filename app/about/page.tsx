import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, GraduationCap, Code2, GitPullRequest, ShieldCheck, Cpu, ArrowUpRight, BookOpen, Terminal, Sparkles } from "lucide-react";
import Navigation from "../components/Navigation";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import InteractiveBackground from "../components/InteractiveBackground";
import CommandPalette from "../components/CommandPalette";
import TiltCard from "../components/TiltCard";
import ScrollReveal from "../components/ScrollReveal";

export const metadata: Metadata = {
  title: "About Soham Vyas — IIT Jodhpur | Academic & Engineering Profile",
  description:
    "Undergraduate profile of Soham Vyas studying Data Science & Artificial Intelligence at the Indian Institute of Technology (IIT) Jodhpur. Researching symbolic computing, SymPy matrix algebra, and distributed systems.",
  alternates: {
    canonical: "https://www.soham.lol/about/",
  },
  openGraph: {
    title: "About Soham Vyas — IIT Jodhpur | Data Science & AI",
    description:
      "Academic background, engineering philosophy, and open-source contributions of Soham Vyas at IIT Jodhpur.",
    url: "https://www.soham.lol/about/",
    siteName: "Soham Vyas | IIT Jodhpur",
    images: [
      {
        url: "https://www.soham.lol/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Soham Vyas — IIT Jodhpur | Academic & Engineering Profile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Soham Vyas — IIT Jodhpur | Academic & Engineering Profile",
    description:
      "Undergraduate researcher in Data Science & AI at IIT Jodhpur. Contributing to SymPy ahead of GSoC 2027.",
    images: ["https://www.soham.lol/assets/og-image.png"],
    creator: "@Soham_Vyas_",
  },
};

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://www.soham.lol/about#webpage",
  "url": "https://www.soham.lol/about/",
  "name": "About Soham Vyas — IIT Jodhpur",
  "isPartOf": { "@id": "https://www.soham.lol/#website" },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "@id": "https://www.soham.lol/about#breadcrumb",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Portfolio",
        "item": "https://www.soham.lol/",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": "https://www.soham.lol/about/",
      },
    ],
  },
  "mainEntity": {
    "@type": "Person",
    "@id": "https://www.soham.lol/#person",
    "name": "Soham Vyas",
    "affiliation": {
      "@type": "CollegeOrUniversity",
      "name": "Indian Institute of Technology Jodhpur",
      "alternateName": "IIT Jodhpur",
      "url": "https://www.iitj.ac.in/",
    },
    "jobTitle": "Undergraduate Researcher & Systems Engineer",
    "url": "https://www.soham.lol/",
    "sameAs": [
      "https://github.com/vyassoham",
      "https://www.linkedin.com/in/vyassoham/",
      "https://x.com/Soham_Vyas_",
      "https://leetcode.com/u/vyassoham/",
    ],
  },
};

export default function AboutPage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-[#07070a] text-slate-100 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />
      <InteractiveBackground />
      <CommandPalette />
      <Navigation />

      <main className="flex-1 pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-xs font-medium text-zinc-400 mb-8">
            <Link
              href="/"
              className="hover:text-emerald-400 transition-colors bg-white/[0.03] border border-white/[0.08] px-3 py-1.5 rounded-lg flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Portfolio</span>
            </Link>
            <span>/</span>
            <span className="text-zinc-200">About Soham Vyas</span>
          </nav>

          {/* Academic & Identity Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-4">
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              <span>Indian Institute of Technology (IIT) Jodhpur</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              Engineering Foundations &amp; Research Focus
            </h1>
            <p className="text-zinc-400 text-base sm:text-lg max-w-3xl leading-relaxed">
              I am an undergraduate studying <strong>Data Science &amp; Artificial Intelligence</strong> at the <strong>Indian Institute of Technology Jodhpur</strong>. My technical focus lies at the intersection of symbolic computational algebra, high-throughput distributed systems, and reproducible software engineering.
            </p>
          </div>

          {/* Core Pillars Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <TiltCard maxTilt={6} className="glass-card p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center text-purple-400 mb-4">
                  <GitPullRequest className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-white mb-2">Symbolic Algebra</h2>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  Active contributor to <strong>SymPy</strong>. Authored matrix trace optimizations for Kronecker products (PR #31011) and canonical elementary matrix delta formulations (PR #31010) ahead of GSoC 2027.
                </p>
              </div>
              <Link href="/opensource/" className="mt-4 inline-flex items-center gap-1.5 text-xs text-purple-300 hover:text-purple-200">
                <span>View SymPy Work</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </TiltCard>

            <TiltCard maxTilt={6} className="glass-card p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center text-cyan-400 mb-4">
                  <Cpu className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-white mb-2">Distributed Systems</h2>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  Designing microsecond-latency infrastructure using atomic Redis Lua scripts, concurrency-safe sliding windows, and machine-learning driven request anomaly classification.
                </p>
              </div>
              <Link href="/projects/ai-rate-limiter-shield/" className="mt-4 inline-flex items-center gap-1.5 text-xs text-cyan-300 hover:text-cyan-200">
                <span>Rate Limiter Architecture</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </TiltCard>

            <TiltCard maxTilt={6} className="glass-card p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-white mb-2">Information Security</h2>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  Applying Claude Shannon&apos;s mathematical entropy theory and NIST SP 800-63B standards to evaluate password strength against 100 GH/s GPU cluster attacks.
                </p>
              </div>
              <Link href="/projects/cybersecurity-risk-analyzer/" className="mt-4 inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-emerald-200">
                <span>Cybersecurity Analyzer</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </TiltCard>
          </div>

          {/* Academic Journey Section */}
          <div className="glass-card p-8 mb-16">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-indigo-400" />
              <span>Curriculum &amp; Technical Coursework at IIT Jodhpur</span>
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed mb-6">
              As an undergraduate at IIT Jodhpur, my curriculum bridges rigorous mathematical foundations with practical, systems-level computing:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="font-semibold text-white mb-1">Mathematical Foundations</h3>
                <p className="text-zinc-400">Linear Algebra, Multivariable Calculus, Discrete Mathematics, Probability &amp; Statistics, Information Theory.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="font-semibold text-white mb-1">Computer Science Core</h3>
                <p className="text-zinc-400">Data Structures &amp; Algorithms, Operating Systems, Database Management Systems, Computer Networks.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="font-semibold text-white mb-1">Machine Learning &amp; AI</h3>
                <p className="text-zinc-400">Statistical Machine Learning, Deep Learning Architectures, Anomaly Detection, Neural Signal Processing.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="font-semibold text-white mb-1">Systems &amp; Engineering</h3>
                <p className="text-zinc-400">Distributed Architecture, Redis Concurrency, Linux Internals, Automated Testing Harnesses.</p>
              </div>
            </div>
          </div>
        </div>

        <Skills />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

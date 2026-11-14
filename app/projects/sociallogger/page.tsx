import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Github, Terminal, ArrowUpRight, CheckCircle2, Share2, Sparkles, BookOpen, Layers } from "lucide-react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import InteractiveBackground from "../../components/InteractiveBackground";
import CommandPalette from "../../components/CommandPalette";
import TiltCard from "../../components/TiltCard";

export const metadata: Metadata = {
  title: "SocialLogger — Multi-Platform SaaS Architecture & Gemini AI Integration | Soham Vyas",
  description:
    "Engineering architecture of SocialLogger: a multi-platform content distribution SaaS leveraging Google Gemini AI for tone-adaptive copy generation by Soham Vyas (IIT Jodhpur).",
  alternates: {
    canonical: "https://www.soham.lol/projects/sociallogger/",
  },
  openGraph: {
    title: "SocialLogger | SaaS Architecture & Gemini AI — Soham Vyas",
    description:
      "Automated multi-platform social management architecture with Google Gemini AI copy generation.",
    url: "https://www.soham.lol/projects/sociallogger/",
    images: [{ url: "https://www.soham.lol/assets/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SocialLogger | SaaS Architecture & Gemini AI",
    description: "Multi-platform social distribution SaaS with Google Gemini AI by Soham Vyas.",
    images: ["https://www.soham.lol/assets/og-image.png"],
    creator: "@Soham_Vyas_",
  },
};

const projectSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["TechArticle", "SoftwareSourceCode"],
      "@id": "https://www.soham.lol/projects/sociallogger/#article",
      "headline": "SocialLogger: SaaS Architecture & Google Gemini AI Integration",
      "name": "SocialLogger",
      "description":
        "AI-powered multi-platform social media distribution SaaS leveraging Google Gemini API for tone-adaptive content generation and analytics.",
      "programmingLanguage": "Python",
      "codeRepository": "https://github.com/vyassoham/SocialLogger",
      "author": { "@id": "https://www.soham.lol/#person" },
      "publisher": { "@id": "https://www.soham.lol/#person" },
      "url": "https://www.soham.lol/projects/sociallogger/",
      "inLanguage": "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.soham.lol/projects/sociallogger/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Portfolio", "item": "https://www.soham.lol/" },
        { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.soham.lol/projects/" },
        { "@type": "ListItem", "position": 3, "name": "SocialLogger SaaS", "item": "https://www.soham.lol/projects/sociallogger/" },
      ],
    },
  ],
};

export default function SocialLoggerProjectPage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-[#07070a] text-slate-100 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <InteractiveBackground />
      <CommandPalette />
      <Navigation />

      <main className="flex-1 pt-32 pb-24">
        <article className="max-w-4xl mx-auto px-6">
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
            <Link href="/projects/" className="hover:text-emerald-400 transition-colors">
              Projects
            </Link>
            <span>/</span>
            <span className="text-zinc-200">SocialLogger</span>
          </nav>

          {/* Header */}
          <header className="mb-10 pb-8 border-b border-white/[0.08]">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <a
                href="https://github.com/vyassoham/SocialLogger"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/15 text-purple-300 border border-purple-500/30 flex items-center gap-1.5 hover:bg-purple-500/25 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                Python · Gemini API · FastAPI · SaaS Architecture
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium text-zinc-400 bg-white/[0.03] border border-white/[0.08]">
                Generative AI Systems
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
              SocialLogger: Multi-Platform SaaS Architecture &amp; Gemini AI
            </h1>

            <p className="text-lg text-zinc-300 leading-relaxed mb-6 font-normal">
              An automated content scheduling and publishing platform leveraging Google Gemini AI for tone-adaptive copy generation, background queuing for multi-platform distribution (Twitter/X, LinkedIn, Instagram), and engagement analytics.
            </p>

            {/* Quick Answer Summary for AI Answer Engines */}
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200 text-sm leading-relaxed mb-6">
              <strong>Architecture Summary:</strong> SocialLogger integrates Google Gemini models to automatically adapt a single core message into platform-optimized variants (concise punchy hooks for Twitter/X vs long-form narrative for LinkedIn), coordinating delivery through queued background worker tasks and real-time OAuth token refresh middleware.
            </div>
          </header>

          {/* Technical Content */}
          <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white border-l-4 border-purple-400 pl-4 mb-4">
                1. Architectural Overview &amp; Gemini Prompt Design
              </h2>
              <p>
                Cross-posting identical content across disparate social networks consistently yields low engagement due to divergent audience expectations. SocialLogger utilizes structured system prompts with few-shot examples to transform raw developer release notes into audience-appropriate formats:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-zinc-300">
                <li><strong>LinkedIn Channel</strong>: Structures insights with executive summaries, technical takeaways, and career context.</li>
                <li><strong>Twitter/X Channel</strong>: Condenses core ideas into high-velocity 280-character threads with syntax-highlighted code screenshots.</li>
                <li><strong>Instagram Channel</strong>: Formats bulleted key takeaways with carousel captions and hashtag clusters.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white border-l-4 border-indigo-400 pl-4 mb-4">
                2. Backend Queuing &amp; Token Security
              </h2>
              <p>
                To prevent long-running generative AI calls from blocking client HTTP request threads, the backend employs a decoupled task architecture:
              </p>
              <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08] text-xs font-mono text-zinc-300 space-y-2 my-4">
                <div>1. Client POST /publish &rarr; FastAPI validates JWT and writes payload to background queue.</div>
                <div>2. Worker consumes job &rarr; calls Gemini API with structured response schemas.</div>
                <div>3. Multi-platform dispatcher calls platform APIs using encrypted OAuth2 refresh tokens.</div>
                <div>4. Webhook updates frontend with broadcast confirmation and analytics URLs.</div>
              </div>
            </section>
          </div>

          {/* Related Links */}
          <footer className="mt-12 pt-8 border-t border-white/[0.08]">
            <h3 className="text-base font-bold text-white mb-4">Related Engineering Resources</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <Link
                href="/projects/ai-rate-limiter-shield/"
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-cyan-400 font-semibold mb-1 block">API Security Architecture</span>
                  <span className="text-white font-medium text-sm">AI Rate Limiter Shield: Atomic Redis Sliding Windows</span>
                </div>
                <span className="text-zinc-500 mt-3 inline-flex items-center gap-1">View Rate Limiter →</span>
              </Link>

              <Link
                href="/projects/cybersecurity-risk-analyzer/"
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-emerald-400 font-semibold mb-1 block">Entropy Modeling</span>
                  <span className="text-white font-medium text-sm">Cybersecurity Risk Analyzer: Shannon Entropy Engine</span>
                </div>
                <span className="text-zinc-500 mt-3 inline-flex items-center gap-1">View Analyzer →</span>
              </Link>
            </div>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}

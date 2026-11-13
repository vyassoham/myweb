import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, BookOpen, CheckCircle2, ShieldCheck, Cpu, ExternalLink } from "lucide-react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import InteractiveBackground from "../../components/InteractiveBackground";
import CommandPalette from "../../components/CommandPalette";
import ArticleShareAndCite from "../../components/ArticleShareAndCite";

export const metadata: Metadata = {
  title: "Shannon Information Entropy & NIST 800-63B Defense | Soham Vyas",
  description:
    "Mathematical and cryptographic deep dive into calculating information entropy, estimating GPU cluster brute-force time, and automated secret auditing by Soham Vyas.",
  alternates: {
    canonical: "https://soham.lol/blog/shannon-entropy-cybersecurity/",
  },
};

export default function ShannonEntropyBlog(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-[#07070a] text-slate-100 relative">
      <InteractiveBackground />
      <CommandPalette />
      <Navigation />

      <main className="flex-1 pt-32 pb-24">
        <article className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 text-xs font-medium text-zinc-400 mb-8">
            <Link
              href="/"
              className="hover:text-emerald-400 transition-colors bg-white/[0.03] border border-white/[0.08] px-3 py-1.5 rounded-lg flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Portfolio</span>
            </Link>
            <span>/</span>
            <Link href="/blog/" className="hover:text-emerald-400 transition-colors">
              Engineering Blog
            </Link>
            <span>/</span>
            <span className="text-zinc-200 truncate">Shannon Entropy &amp; NIST Defense</span>
          </div>

          <header className="mb-10 pb-8 border-b border-white/[0.08]">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Cybersecurity &amp; Cryptography
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium text-cyan-300 bg-cyan-500/10 border border-cyan-500/20">
                Information Theory
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium text-zinc-400 bg-white/[0.03] border border-white/[0.08]">
                ⭐ 22 Stars Project
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
              Quantifying Cryptographic Strength: Shannon Entropy &amp; NIST 800-63B Defense
            </h1>

            <p className="text-lg text-zinc-300 leading-relaxed mb-6 font-normal">
              How we combined Claude Shannon&apos;s 1948 mathematical information theory with NIST password guidelines to detect hardcoded secrets and estimate brute-force resistance against 100 GH/s GPU clusters.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-400 font-normal">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-[10px]">
                  SV
                </div>
                <span className="text-zinc-200 font-medium">Soham Vyas</span>
                <span>· IIT Jodhpur</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                <span>November 2026</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-zinc-500" />
                <span>5 min read</span>
              </div>
            </div>
          </header>

          <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-6">
            <h2 className="text-2xl font-bold text-white border-l-4 border-emerald-400 pl-4 my-6">
              1. The Mathematics of Information Entropy
            </h2>
            <p>
              Claude Shannon defined information entropy as the average rate at which information is produced by a stochastic source of data. For a string of length $L$ drawn from an alphabet of size $R$:
            </p>

            <div className="p-5 rounded-xl bg-zinc-950/90 border border-emerald-500/30 text-emerald-300 text-center text-lg font-mono my-4">
              E = L · log₂(R)
            </div>

            <p>
              In practical vulnerability analysis, we classify the character pool R dynamically:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm font-mono text-zinc-300">
              <li>Numeric only: R = 10 (log₂(10) ≈ 3.32 bits/char)</li>
              <li>Alphanumeric lower: R = 36 (log₂(36) ≈ 5.17 bits/char)</li>
              <li>Full mixed case + numbers: R = 62 (log₂(62) ≈ 5.95 bits/char)</li>
              <li>Base64 / Symbols: R = 94 (log₂(94) ≈ 6.55 bits/char)</li>
            </ul>

            <h2 className="text-2xl font-bold text-white border-l-4 border-cyan-400 pl-4 my-6">
              2. GPU Cluster Brute-Force Estimation
            </h2>
            <p>
              Modern distributed password-cracking rigs equipped with multiple NVIDIA RTX 4090 GPUs can compute approximately <strong>100 Billion hashes per second</strong> (100 × 10⁹ hashes/sec for NTLM/MD5).
            </p>
            <p>
              The expected time to recover a secret with total combination space S = R^L is given by:
            </p>

            <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08] font-mono text-sm text-center my-4 text-emerald-400">
              T(seconds) = (R^L / 2) / (100 × 10⁹)
            </div>

            <p>
              Under NIST 800-63B standards:
            </p>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li><strong>Critical (&lt; 35 bits)</strong>: Crackable in milliseconds to seconds.</li>
              <li><strong>Moderate (35 – 60 bits)</strong>: Vulnerable within hours or days of distributed cracking.</li>
              <li><strong>Strong (&gt; 60 bits)</strong>: Computationally intractable (centuries to millennia).</li>
            </ul>

            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 my-8">
              <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Test Live Inside the Interactive Playground</span>
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                Calculate the exact Shannon entropy, NIST grade, and brute-force time for any token or password in real time.
              </p>
              <Link
                href="/labs/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all font-mono"
              >
                <span>Launch Interactive Entropy Lab</span>
                <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              </Link>
            </div>
          </div>

          <footer className="mt-12 pt-8 border-t border-white/[0.08]">
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-base font-bold text-white">Soham Vyas</h4>
                <p className="text-xs text-zinc-400 mt-1">
                  BS in Data Science &amp; AI @ IIT Jodhpur · Cybersecurity Author
                </p>
              </div>
              <Link
                href="/blog/"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-mono text-zinc-200 transition-all shrink-0"
              >
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>All Engineering Articles</span>
              </Link>
            </div>
          </footer>

          <ArticleShareAndCite
            title="Quantifying Cryptographic Strength: Shannon Entropy & NIST 800-63B"
            slug="shannon-entropy-cybersecurity"
            date="Nov 2026"
            description="Combining Claude Shannon's 1948 mathematical information theory with NIST password guidelines to detect hardcoded secrets."
          />
        </article>
      </main>

      <Footer />
    </div>
  );
}

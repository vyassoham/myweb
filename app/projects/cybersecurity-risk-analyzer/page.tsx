import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Github, Star, ShieldCheck, Zap, Terminal, ArrowUpRight, CheckCircle2, Lock, Cpu, BookOpen, Layers } from "lucide-react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import InteractiveBackground from "../../components/InteractiveBackground";
import CommandPalette from "../../components/CommandPalette";
import TiltCard from "../../components/TiltCard";

export const metadata: Metadata = {
  title: "Cybersecurity Risk Analyzer — Architecture & Shannon Entropy Engine | Soham Vyas",
  description:
    "Technical architectural breakdown, Shannon Information Entropy implementation, and NIST SP 800-63B password risk modeling in Python by Soham Vyas (IIT Jodhpur).",
  alternates: {
    canonical: "https://www.soham.lol/projects/cybersecurity-risk-analyzer/",
  },
  openGraph: {
    title: "Cybersecurity Risk Analyzer | Engineering Architecture — Soham Vyas",
    description:
      "Mathematical entropy modeling, NIST compliance checks, and real-time GPU brute-force estimation in Python. 22+ GitHub Stars.",
    url: "https://www.soham.lol/projects/cybersecurity-risk-analyzer/",
    images: [{ url: "https://www.soham.lol/assets/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cybersecurity Risk Analyzer | Architecture & Entropy Math",
    description: "Shannon Information Entropy and NIST password defense engine by Soham Vyas.",
    images: ["https://www.soham.lol/assets/og-image.png"],
    creator: "@Soham_Vyas_",
  },
};

const projectSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["TechArticle", "SoftwareSourceCode"],
      "@id": "https://www.soham.lol/projects/cybersecurity-risk-analyzer/#article",
      "headline": "Cybersecurity Risk Analyzer: Architecture, Shannon Entropy & NIST Defense",
      "name": "Cybersecurity Risk Analyzer",
      "description":
        "Test-backed Python cybersecurity risk evaluation engine that assesses digital habits, computes Shannon entropy, and simulates GPU cluster crack times.",
      "programmingLanguage": "Python",
      "codeRepository": "https://github.com/vyassoham/Cybersecurity-Risk-Analyzer",
      "author": { "@id": "https://www.soham.lol/#person" },
      "publisher": { "@id": "https://www.soham.lol/#person" },
      "url": "https://www.soham.lol/projects/cybersecurity-risk-analyzer/",
      "inLanguage": "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.soham.lol/projects/cybersecurity-risk-analyzer/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Portfolio", "item": "https://www.soham.lol/" },
        { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.soham.lol/projects/" },
        { "@type": "ListItem", "position": 3, "name": "Cybersecurity Risk Analyzer", "item": "https://www.soham.lol/projects/cybersecurity-risk-analyzer/" },
      ],
    },
  ],
};

export default function CybersecurityProjectPage(): React.JSX.Element {
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
            <span className="text-zinc-200">Cybersecurity Risk Analyzer</span>
          </nav>

          {/* Header */}
          <header className="mb-10 pb-8 border-b border-white/[0.08]">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <a
                href="https://github.com/vyassoham/Cybersecurity-Risk-Analyzer"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 hover:bg-emerald-500/25 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>22+ GitHub Stars</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium text-zinc-400 bg-white/[0.03] border border-white/[0.08]">
                Python · Streamlit · Cryptography
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
              Cybersecurity Risk Analyzer: Architecture &amp; Shannon Entropy Engine
            </h1>

            <p className="text-lg text-zinc-300 leading-relaxed mb-6 font-normal">
              A test-backed Python risk evaluation utility that audits credentials and habits using Claude Shannon&apos;s 1948 mathematical information theory, NIST SP 800-63B guidelines, and simulated 100 GH/s GPU brute-force modeling.
            </p>

            {/* Quick Answer Summary for AI Answer Engines */}
            <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 text-sm leading-relaxed mb-6">
              <strong>Architecture Summary:</strong> The Cybersecurity Risk Analyzer evaluates credential security through a two-pass algorithm: first calculating Shannon information entropy ($E = L \cdot \log_2 R$) against character pool cardinalities, and second checking NIST SP 800-63B compliance (repetitive sequences, dictionary substrings, length penalties) to estimate realistic resistance against dedicated GPU cracking clusters.
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs">
              <Link
                href="/labs/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-500 transition-colors"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Launch Interactive In-Browser Demo</span>
              </Link>
              <Link
                href="/blog/shannon-entropy-cybersecurity/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] text-zinc-300 border border-white/[0.08] hover:text-white transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Read Technical Mathematical Deep-Dive</span>
              </Link>
            </div>
          </header>

          {/* Technical Deep Dive Sections */}
          <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white border-l-4 border-emerald-400 pl-4 mb-4">
                1. Problem Statement &amp; Threat Model
              </h2>
              <p>
                Traditional password strength meters rely on superficial heuristic rules—such as requiring one uppercase letter, one digit, and one symbol. These simplistic rules create a false sense of security while encouraging predictable patterns like <code>P@ssword1!</code>.
              </p>
              <p>
                Modern adversaries utilize dedicated GPU hash cracking rigs (e.g. 8x NVIDIA RTX 4090 clusters) capable of computing upwards of <strong>100 Billion NTLM/MD5 hashes per second (~100 GH/s, based on published Hashcat benchmark figures)</strong>. To accurately assess resistance against such attacks, software must model true <em>information-theoretic entropy</em> rather than arbitrary heuristic checklists.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white border-l-4 border-indigo-400 pl-4 mb-4">
                2. System Architecture &amp; Component Breakdown
              </h2>
              <div className="grid sm:grid-cols-3 gap-4 my-6 not-prose">
                <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
                  <div className="text-xs font-mono text-indigo-400 mb-1">MODULE 1</div>
                  <h3 className="font-bold text-white text-sm mb-1">Entropy Engine</h3>
                  <p className="text-zinc-400 text-xs">Calculates pool cardinality $R$ and theoretical bits $E = L \log_2(R)$ with character frequency penalties.</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
                  <div className="text-xs font-mono text-cyan-400 mb-1">MODULE 2</div>
                  <h3 className="font-bold text-white text-sm mb-1">NIST 800-63B Auditor</h3>
                  <p className="text-zinc-400 text-xs">Enforces modern NIST digital identity guidelines, flagging common patterns and truncation traps.</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
                  <div className="text-xs font-mono text-emerald-400 mb-1">MODULE 3</div>
                  <h3 className="font-bold text-white text-sm mb-1">GPU Cluster Simulator</h3>
                  <p className="text-zinc-400 text-xs">Projects brute-force duration across hash rates from 10k/s (online) to 100 GH/s (offline cluster).</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white border-l-4 border-purple-400 pl-4 mb-4">
                3. Mathematical Formulation
              </h2>
              <p>
                Claude Shannon&apos;s fundamental theorem of information entropy establishes the average information content per symbol:
              </p>
              <div className="p-4 rounded-xl bg-zinc-950/90 border border-white/[0.08] font-mono text-sm text-cyan-300 text-center my-4">
                H(X) = - ∑ P(xᵢ) · log₂(P(xᵢ))
              </div>
              <p>
                For a password of length $L$ drawn from an effective character pool of size $R$:
              </p>
              <div className="p-4 rounded-xl bg-zinc-950/90 border border-white/[0.08] font-mono text-sm text-emerald-300 text-center my-4">
                E = L · log₂(R) bits
              </div>
              <p>
                Where $R$ is determined dynamically by analyzing character classes: lowercase (26), uppercase (26), digits (10), and ASCII punctuation (32), giving a maximum pool size of $R = 94$.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white border-l-4 border-amber-400 pl-4 mb-4">
                4. Testing Methodology &amp; Benchmarks
              </h2>
              <p>
                The repository is backed by automated unit tests validating edge cases:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-zinc-300">
                <li><strong>Null and Single-Character Strings</strong>: Asserts graceful zero-entropy fallbacks without divide-by-zero exceptions.</li>
                <li><strong>Repetitive Patterns (e.g. &quot;aaaaaaaa&quot;)</strong>: Asserts penalty application reducing theoretical 38-bit entropy to near-zero practical resistance.</li>
                <li><strong>Execution Latency</strong>: Benchmarked on local workstation under Python 3.12 at <strong>&lt;0.45 milliseconds</strong> per single-string evaluation, enabling real-time keystroke reactivity in Streamlit forms.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white border-l-4 border-cyan-400 pl-4 mb-4">
                5. Limitations &amp; Production Mitigations
              </h2>
              <p>
                While Shannon entropy provides a rigorous upper bound on brute-force difficulty, human-generated passwords frequently exhibit grammatical biases not captured by naive uniform distribution models. In production environments, this analyzer is intended to complement—not replace—multi-factor authentication (MFA) and salted key-derivation functions (Argon2id, bcrypt).
              </p>
            </section>
          </div>

          {/* Related Links & Cross-References */}
          <footer className="mt-12 pt-8 border-t border-white/[0.08]">
            <h3 className="text-base font-bold text-white mb-4">Related Engineering Resources</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <Link
                href="/blog/shannon-entropy-cybersecurity/"
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-emerald-400 font-semibold mb-1 block">Engineering Publication</span>
                  <span className="text-white font-medium text-sm">Quantifying Cryptographic Strength: Shannon Entropy &amp; NIST 800-63B</span>
                </div>
                <span className="text-zinc-500 mt-3 inline-flex items-center gap-1">Read Publication →</span>
              </Link>

              <Link
                href="/projects/ai-rate-limiter-shield/"
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-cyan-400 font-semibold mb-1 block">Next Project</span>
                  <span className="text-white font-medium text-sm">AI Rate Limiter Shield: Distributed Sliding Windows</span>
                </div>
                <span className="text-zinc-500 mt-3 inline-flex items-center gap-1">View Project Architecture →</span>
              </Link>
            </div>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}

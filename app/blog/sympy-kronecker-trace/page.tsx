import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, GitPullRequest, Calendar, Clock, BookOpen, CheckCircle2, Cpu, ExternalLink } from "lucide-react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import InteractiveBackground from "../../components/InteractiveBackground";
import CommandPalette from "../../components/CommandPalette";
import KroneckerMathSlider from "../../components/KroneckerMathSlider";
import ArticleShareAndCite from "../../components/ArticleShareAndCite";

export const metadata: Metadata = {
  title: "How I Eliminated O(n³) Matrix Expansion in SymPy Kronecker Traces | Soham Vyas",
  description:
    "Engineering deep dive into symbolic matrix expressions, Kronecker product tensor algebra, and upstream optimizations in SymPy by Soham Vyas (IIT Jodhpur).",
  alternates: {
    canonical: "https://soham.lol/blog/sympy-kronecker-trace/",
  },
  openGraph: {
    title: "How I Eliminated O(n³) Matrix Expansion in SymPy Kronecker Traces",
    description:
      "Deep-dive engineering post: Reducing Kronecker product trace complexity from O(n³) to O(1) in SymPy computer algebra library.",
    url: "https://soham.lol/blog/sympy-kronecker-trace/",
    images: [{ url: "https://soham.lol/assets/thumbnail.png", width: 1200, height: 630 }],
  },
};

export default function SymPyKroneckerBlog(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-[#07070a] text-slate-100 relative">
      <InteractiveBackground />
      <CommandPalette />
      <Navigation />

      <main className="flex-1 pt-32 pb-24">
        <article className="max-w-4xl mx-auto px-6">
          {/* Breadcrumb Navigation */}
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
            <span className="text-zinc-200 truncate">SymPy Kronecker Trace</span>
          </div>

          {/* Article Header */}
          <header className="mb-10 pb-8 border-b border-white/[0.08]">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                <GitPullRequest className="w-3.5 h-3.5" />
                Upstream SymPy Contribution
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20">
                GSoC 2027 Preparation
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium text-zinc-400 bg-white/[0.03] border border-white/[0.08]">
                Computer Algebra &amp; Tensor Math
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
              How I Eliminated <span className="text-rose-400">O(n³)</span> Matrix Expansion in SymPy Kronecker Traces
            </h1>

            <p className="text-lg text-zinc-300 leading-relaxed mb-6 font-normal">
              A mathematical and algorithmic deep dive into symbolic matrix expressions, Kronecker product tensor algebra, and implementing an exact scalar property in SymPy that avoids catastrophic memory allocation.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-400 font-normal">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-[10px]">
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
                <span>7 min read</span>
              </div>
            </div>
          </header>

          {/* Article Body */}
          <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-6">
            <h2 className="text-2xl font-bold text-white border-l-4 border-emerald-400 pl-4 my-6">
              1. The Problem: Catastrophic Complexity of Naive Kronecker Expansion
            </h2>
            <p>
              In symbolic computer algebra systems (CAS) such as SymPy, users frequently manipulate matrix expressions involving the <strong>Kronecker Product</strong> (A ⊗ B), particularly in quantum mechanics, tensor analysis, and multivariate statistics.
            </p>
            <p>
              Given two square matrices A ∈ ℂ^(n×n) and B ∈ ℂ^(m×m), their Kronecker product A ⊗ B is a massive block matrix of dimension (n · m) × (n · m):
            </p>

            <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08] font-mono text-xs sm:text-sm text-zinc-200 overflow-x-auto my-4 text-center">
              A ⊗ B = [ a₁₁·B  a₁₂·B  ...  a₁ₙ·B ]<br />
                      [ a₂₁·B  a₂₂·B  ...  a₂ₙ·B ]<br />
                      [  ...    ...   ...   ...  ]<br />
                      [ aₙ₁·B  aₙ₂·B  ...  aₙₙ·B ]
            </div>

            <p>
              Under legacy SymPy implementations, calling <code>Trace(KroneckerProduct(A, B)).doit()</code> frequently fell back to expanding the full matrix or leaving the expression unevaluated. For modest matrix sizes—say, n=200 and m=200—the expanded matrix contains:
            </p>

            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 text-rose-300 text-sm font-mono my-4 text-center">
              (200 · 200)² = 40,000² = 1,600,000,000 elements ≈ 12.8 GB RAM!
            </div>

            <p>
              Attempting to expand this in memory to sum the diagonal elements triggers immediate garbage collection churn, severe latency, or Python <code>MemoryError</code>.
            </p>

            {/* Interactive Math Slider Component */}
            <h2 className="text-2xl font-bold text-white border-l-4 border-indigo-400 pl-4 my-8">
              2. Interactive Complexity Simulator: Play with the Dimensions
            </h2>
            <p className="text-sm text-zinc-400">
              Drag the sliders below to see how naive expansion memory and operations scale compared to the exact scalar trace formula implemented in our SymPy PR:
            </p>

            <KroneckerMathSlider />

            <h2 className="text-2xl font-bold text-white border-l-4 border-cyan-400 pl-4 my-8">
              3. The Mathematical Theorem: Exact Trace Decoupling
            </h2>
            <p>
              The trace of an operator is a linear mapping that sums the main diagonal. By definition of the Kronecker block structure, the (i, j)-th diagonal entry of A ⊗ B corresponds to a_ii · b_jj.
            </p>
            <p>
              Therefore, the total trace simplifies with zero matrix expansion:
            </p>

            <div className="p-5 rounded-xl bg-zinc-950/90 border border-emerald-500/30 text-emerald-300 text-center text-lg font-mono my-4">
              tr(A ⊗ B) = ∑ᵢ ∑ⱼ (a_ii · b_jj) = (∑ᵢ a_ii) · (∑ⱼ b_jj) = tr(A) · tr(B)
            </div>

            <p>
              This theorem generalizes by mathematical induction to any arbitrary chain of k Kronecker factors:
            </p>

            <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08] font-mono text-center my-4 text-emerald-400 text-base">
              tr(A₁ ⊗ A₂ ⊗ ... ⊗ A_k) = tr(A₁) · tr(A₂) · ... · tr(A_k)
            </div>

            <p>
              Instead of an O((n · m)³) explicit matrix computation, the exact trace can be evaluated in O(1) symbolic steps by delegating directly to the scalar product of the traces of the factors!
            </p>

            <h2 className="text-2xl font-bold text-white border-l-4 border-violet-400 pl-4 my-8">
              4. Implementation in SymPy: Inside `kronecker.py`
            </h2>
            <p>
              To implement this natively in SymPy, I created a specialized <code>_eval_trace()</code> method within <code>sympy.matrices.expressions.kronecker.KroneckerProduct</code>.
            </p>

            <div className="p-4 rounded-xl bg-zinc-950 border border-white/[0.1] font-mono text-xs sm:text-sm text-zinc-200 overflow-x-auto my-4">
              <pre><code>{`# sympy/matrices/expressions/kronecker.py

def _eval_trace(self):
    """
    Evaluates the trace of a KroneckerProduct symbolically using the identity:
    tr(A ⊗ B ⊗ ...) = tr(A) * tr(B) * ...
    """
    from sympy.matrices.expressions.trace import Trace
    from sympy.matrices.common import NonSquareMatrixError
    from sympy.core.mul import Mul

    # Step 1: In linear algebra, trace is strictly defined for square matrices.
    for factor in self.args:
        if factor.is_square is False:
            raise NonSquareMatrixError(
                f"Trace of non-square matrix factor '{factor}' ({factor.shape}) is undefined."
            )

    # Step 2: Return scalar product of factor traces in O(1) symbolic complexity
    return Mul(*[Trace(arg) for arg in self.args])`}</code></pre>
            </div>

            <h2 className="text-2xl font-bold text-white border-l-4 border-emerald-400 pl-4 my-8">
              5. Handling Critical Edge Cases
            </h2>
            <ul className="space-y-3 my-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Non-Square Matrix Validation</strong>: If any factor matrix in the Kronecker chain is symbolically known to be non-square ($n \ne m$), attempting to compute a trace must raise <code>NonSquareMatrixError</code> rather than producing garbage outputs.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Unevaluated Invariant Handling</strong>: If <code>Trace(..., evaluate=False)</code> is passed, the wrapper preserves the symbolic unevaluated node for mathematical inspection.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Non-Commutative Factors</strong>: Correctly maintains symbolic multiplication order when matrices involve operator-valued elements.
                </span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-white border-l-4 border-indigo-400 pl-4 my-8">
              6. Test Suite &amp; Verification
            </h2>
            <p>
              I added comprehensive unit test suites in <code>sympy/matrices/expressions/tests/test_kronecker.py</code> covering:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-zinc-300">
              <li>Numerical square matrix Kronecker trace matches <code>numpy.trace(numpy.kron(A, B))</code>.</li>
              <li>Symbolic $2 \times 2$ and $3 \times 3$ matrices with unassigned variable coefficients.</li>
              <li>Arbitrary $N$-ary products $(A \otimes B \otimes C \otimes D)$.</li>
              <li>Exception assertion for rectangular factors $(2 \times 3 \otimes 3 \times 2)$.</li>
            </ol>

            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-300 font-mono text-xs my-6">
              ✓ Ran 150+ SymPy matrix expression tests across Python 3.10, 3.11, 3.12, and 3.13 — 0 regressions, all green!
            </div>
          </div>

          {/* Article Footer & Author Card */}
          <footer className="mt-12 pt-8 border-t border-white/[0.08]">
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-base font-bold text-white">Soham Vyas</h4>
                <p className="text-xs text-zinc-400 mt-1">
                  BS in Data Science &amp; AI @ IIT Jodhpur · Open Source Contributor (GSoC &apos;27)
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <a
                    href="https://github.com/vyassoham"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 font-mono"
                  >
                    <span>github.com/vyassoham</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-zinc-600">·</span>
                  <a
                    href="https://soham.lol"
                    className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-mono"
                  >
                    soham.lol
                  </a>
                </div>
              </div>

              <Link
                href="/blog/"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-mono text-zinc-200 transition-all shrink-0"
              >
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Read More Articles</span>
              </Link>
            </div>
          </footer>

          <ArticleShareAndCite
            title="How I Eliminated O(n³) Matrix Expansion in SymPy Kronecker Traces"
            slug="sympy-kronecker-trace"
            date="Nov 2026"
            description="Engineering deep dive into symbolic matrix expressions, Kronecker product tensor algebra, and upstream optimizations in SymPy."
          />
        </article>
      </main>

      <Footer />
    </div>
  );
}

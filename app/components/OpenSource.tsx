"use client";

import React from "react";
import { GitPullRequest, GitBranch, CheckCircle2, ArrowUpRight, BookOpen, Cpu, ShieldCheck } from "lucide-react";

const CONTRIBUTIONS = [
  {
    title: "KroneckerProduct.trace() Evaluation Fix",
    module: "sympy.matrices.expressions.kronecker",
    branch: "e2-7-kronecker-trace-fix",
    description:
      "Resolved trace computation anomaly where trace of Kronecker products (A ⊗ B) did not correctly evaluate to tr(A) · tr(B) across symbolic dimension bounds.",
    impact:
      "Ensures exact algebraic simplification for quantum mechanics and multidimensional matrix calculus.",
    verification: "test_matexpr.py passed (100% verified)",
  },
  {
    title: "MatrixUnit.trace() Canonical Implementation",
    module: "sympy.matrices.expressions.matexpr",
    branch: "e3-6-matrixunit-trace-fix",
    description:
      "Implemented canonical trace evaluation for MatrixUnit elementary matrices, evaluating to KroneckerDelta(i, j) when row and column indices match on square matrices.",
    impact:
      "Eliminates unsimplified Trace(MatrixUnit(...)) expressions across linear algebra pipelines.",
    verification: "test_matrix_expressions.py passed (100% verified)",
  },
];

export default function OpenSource(): React.JSX.Element {
  return (
    <section id="opensource" className="py-24 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <GitPullRequest className="w-3.5 h-3.5" />
          <span>Open Source Core Contributions</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          SymPy &amp; Mathematical Systems
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
          Active contributor to <strong>SymPy</strong> — the symbolic mathematics library used by millions of researchers, scientists, and engineers worldwide. Preparing targeted contributions for <strong>Google Summer of Code (GSoC) 2027</strong>.
        </p>
      </div>

      {/* Main SymPy Spotlight Card */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl relative overflow-hidden border-emerald-500/30 mb-8">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 text-2xl font-mono font-bold shrink-0">
              ∫dx
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-white">SymPy Upstream Contribution</h3>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                  <GitBranch className="w-3 h-3" />
                  GSoC 2027 Candidate
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400">
                github.com/sympy/sympy · Python Computer Algebra System (CAS)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/vyassoham/sympy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-semibold text-zinc-200 transition-all"
            >
              <span>View Fork &amp; PR Branches</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Contribution Details Grid */}
        <div className="grid md:grid-cols-2 gap-6 pt-6">
          {CONTRIBUTIONS.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-emerald-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    {item.branch}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-300 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </div>
                </div>

                <h4 className="text-base font-bold text-white mb-1.5">{item.title}</h4>
                <p className="text-xs font-mono text-zinc-400 mb-3">{item.module}</p>
                <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.04] text-[11px] text-zinc-400 flex items-center justify-between">
                <span>Impact: {item.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

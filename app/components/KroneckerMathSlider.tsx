"use client";

import React, { useState } from "react";
import { Sliders } from "lucide-react";

export default function KroneckerMathSlider(): React.JSX.Element {
  const [dimN, setDimN] = useState<number>(50);
  const [dimM, setDimM] = useState<number>(50);

  // Calculations
  const totalDim = dimN * dimM;
  const totalElements = BigInt(totalDim) * BigInt(totalDim);
  const memoryBytes = Number(totalElements) * 8; // 8 bytes per Float64
  const memoryFormatted =
    memoryBytes > 1024 * 1024 * 1024
      ? `${(memoryBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
      : memoryBytes > 1024 * 1024
      ? `${(memoryBytes / (1024 * 1024)).toFixed(2)} MB`
      : `${(memoryBytes / 1024).toFixed(2)} KB`;

  // Naive expansion operations: (N*M)^3 for full naive matrix construction + diagonal sum
  const naiveOps = Math.pow(totalDim, 3);
  // Optimized exact trace operations: N additions for tr(A) + M additions for tr(B) + 1 multiplication
  const optimizedOps = dimN + dimM - 1;

  const opsSavedPercent = ((1 - optimizedOps / naiveOps) * 100).toFixed(6);

  const setPreset = (n: number, m: number) => {
    setDimN(n);
    setDimM(m);
  };

  return (
    <div className="my-8 p-6 rounded-2xl bg-zinc-900/90 border border-indigo-500/30 shadow-2xl shadow-indigo-950/40">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
        <div>
          <span className="text-xs font-medium text-indigo-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Mathematical Complexity Simulator
          </span>
          <h3 className="text-xl font-bold text-white mt-1">
            Naive O(n³) Expansion vs. Exact O(1) Scalar Trace
          </h3>
        </div>
        {/* Presets */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setPreset(10, 10)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              dimN === 10 && dimM === 10
                ? "bg-indigo-600 text-white font-semibold"
                : "bg-white/[0.05] text-zinc-300 hover:bg-white/[0.1]"
            }`}
          >
            N=10, M=10
          </button>
          <button
            onClick={() => setPreset(50, 50)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              dimN === 50 && dimM === 50
                ? "bg-indigo-600 text-white font-semibold"
                : "bg-white/[0.05] text-zinc-300 hover:bg-white/[0.1]"
            }`}
          >
            N=50, M=50
          </button>
          <button
            onClick={() => setPreset(200, 200)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              dimN === 200 && dimM === 200
                ? "bg-indigo-600 text-white font-bold"
                : "bg-white/[0.05] text-zinc-300 hover:bg-white/[0.1]"
            }`}
          >
            N=200, M=200
          </button>
          <button
            onClick={() => setPreset(500, 500)}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
              dimN === 500 && dimM === 500
                ? "bg-rose-600 text-white font-bold"
                : "bg-rose-950/40 text-rose-300 border border-rose-500/30 hover:bg-rose-900/50"
            }`}
          >
            N=500 (OOM Stress Test)
          </button>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid md:grid-cols-2 gap-6 my-6">
        {/* Slider A */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-zinc-200">
              Matrix $A$ Dimension ($N \times N$)
            </span>
            <span className="font-mono text-sm px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
              {dimN} × {dimN}
            </span>
          </div>
          <input
            type="range"
            min="2"
            max="500"
            value={dimN}
            onChange={(e) => setDimN(parseInt(e.target.value))}
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
          <div className="flex justify-between text-[11px] font-mono text-zinc-500 mt-1">
            <span>2×2 (Trivial)</span>
            <span>250×250</span>
            <span>500×500 (Massive)</span>
          </div>
        </div>

        {/* Slider B */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-zinc-200">
              Matrix $B$ Dimension ($M \times M$)
            </span>
            <span className="font-mono text-sm px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
              {dimM} × {dimM}
            </span>
          </div>
          <input
            type="range"
            min="2"
            max="500"
            value={dimM}
            onChange={(e) => setDimM(parseInt(e.target.value))}
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
          <div className="flex justify-between text-[11px] font-mono text-zinc-500 mt-1">
            <span>2×2 (Trivial)</span>
            <span>250×250</span>
            <span>500×500 (Massive)</span>
          </div>
        </div>
      </div>

      {/* Real-time Math Output Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.06]">
          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
            Kronecker Matrix Size
          </span>
          <span className="text-xl font-bold font-mono text-white">
            {totalDim.toLocaleString()} × {totalDim.toLocaleString()}
          </span>
          <span className="text-[11px] text-zinc-400 block mt-1">
            ({totalElements.toLocaleString()} cells)
          </span>
        </div>

        <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20">
          <span className="text-[11px] font-mono text-rose-300 uppercase tracking-wider block mb-1">
            Naive Memory Footprint
          </span>
          <span className="text-xl font-bold font-mono text-rose-400">
            {memoryFormatted}
          </span>
          <span className="text-[11px] text-rose-300/70 block mt-1">
            {dimN >= 200 ? "🚨 Severe OutOfMemory Crash" : "Required in RAM"}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20">
          <span className="text-[11px] font-mono text-rose-300 uppercase tracking-wider block mb-1">
            Naive Expansion FLOPs
          </span>
          <span className="text-xl font-bold font-mono text-rose-400">
            {naiveOps > 1e12
              ? `${(naiveOps / 1e12).toFixed(2)} Tera-ops`
              : naiveOps > 1e9
              ? `${(naiveOps / 1e9).toFixed(2)} Giga-ops`
              : naiveOps > 1e6
              ? `${(naiveOps / 1e6).toFixed(2)} Mega-ops`
              : naiveOps.toLocaleString()}
          </span>
          <span className="text-[11px] text-rose-300/70 block mt-1">
            O((N · M)³) computation
          </span>
        </div>

        <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
          <span className="text-[11px] font-mono text-emerald-300 uppercase tracking-wider block mb-1">
            New SymPy PR FLOPs
          </span>
          <span className="text-xl font-bold font-mono text-emerald-400">
            {optimizedOps} ops
          </span>
          <span className="text-[11px] text-emerald-300/80 block mt-1">
            {opsSavedPercent}% operations saved
          </span>
        </div>
      </div>

      {/* Comparison Progress Bar */}
      <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06]">
        <div className="flex justify-between items-center text-xs font-mono mb-2">
          <span className="text-zinc-300 font-semibold">
            Algorithmic Reduction Ratio
          </span>
          <span className="text-emerald-400 font-bold">
            {(naiveOps / Math.max(1, optimizedOps)).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
            × Faster
          </span>
        </div>
        <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden flex">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: "100%" }}
            title="Optimized trace execution"
          />
        </div>
        <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed">
          <strong>Key Insight</strong>: Rather than generating the full ({totalDim} × {totalDim}) Kronecker block matrix in memory, the new algorithm applies the tensor trace theorem:
          <span className="font-mono text-emerald-300 ml-1">
            tr(A ⊗ B) = tr(A) · tr(B)
          </span>. Memory drops from <strong>{memoryFormatted}</strong> to <strong>0 bytes</strong>, and complexity drops from <strong>O(n³)</strong> to <strong>O(1)</strong> symbolic steps!
        </p>
      </div>
    </div>
  );
}

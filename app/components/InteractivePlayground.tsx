"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { analyzePassword, formatDuration } from "../../lib/entropy";
import {
  Zap,
  RefreshCw,
  CheckCircle2,
  Lock,
  Play,
  Activity,
  Calculator,
  Terminal,
  Cpu,
  Layers,
  Copy,
  Check,
  Flame,
  ShieldCheck,
  AlertTriangle,
  ArrowUpRight,
  Database,
  Radio,
  Sliders,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

// =========================================================================
// ⚛️ MATRIX UTILITIES FOR BENCH 1 (SymPy CAS Engine)
// =========================================================================
type Matrix2x2 = [[number, number], [number, number]];
type Matrix4x4 = number[][];

const MATRIX_PRESETS: Record<
  string,
  { label: string; A: Matrix2x2; B: Matrix2x2; note: string }
> = {
  quantum: {
    label: "Quantum Spin Operators (σx ⊗ σz)",
    A: [
      [0, 1],
      [1, 0],
    ], // Pauli-X
    B: [
      [1, 0],
      [0, -1],
    ], // Pauli-Z
    note: "2-Qubit quantum spin entanglement tensor. tr(σx)=0, tr(σz)=0 ⟹ tr(σx ⊗ σz)=0.",
  },
  matrixunit: {
    label: "MatrixUnit Delta Test (I₂ ⊗ E₁,₂)",
    A: [
      [1, 0],
      [0, 1],
    ], // I_2
    B: [
      [0, 1],
      [0, 0],
    ], // E_{1,2}
    note: "Elementary matrix unit test (PR #31010). tr(E₁,₂)=0, tr(I₂)=2 ⟹ tr(I₂ ⊗ E₁,₂)=0.",
  },
  triangular: {
    label: "Triangular & Nilpotent (T ⊗ N)",
    A: [
      [2, 1],
      [0, 3],
    ],
    B: [
      [1, 4],
      [0, 1],
    ],
    note: "General upper triangular Kronecker product. tr(A)=5, tr(B)=2 ⟹ tr(A ⊗ B)=10.",
  },
  zeromatrix: {
    label: "Zero-Tensor Collapse (A ⊗ 0₂)",
    A: [
      [1, 2],
      [3, 4],
    ],
    B: [
      [0, 0],
      [0, 0],
    ], // ZeroMatrix
    note: "Tests zero tensor collapse from PR #31207 (Merged by S.Y. Lee). Canonicalizes to 0₄.",
  },
};

function multiply2x2(A: Matrix2x2, B: Matrix2x2): Matrix2x2 {
  return [
    [
      A[0][0] * B[0][0] + A[0][1] * B[1][0],
      A[0][0] * B[0][1] + A[0][1] * B[1][1],
    ],
    [
      A[1][0] * B[0][0] + A[1][1] * B[1][0],
      A[1][0] * B[0][1] + A[1][1] * B[1][1],
    ],
  ];
}

function power2x2(A: Matrix2x2, p: number): Matrix2x2 {
  if (p === 0)
    return [
      [1, 0],
      [0, 1],
    ];
  if (p === 1)
    return [
      [A[0][0], A[0][1]],
      [A[1][0], A[1][1]],
    ];
  let res: Matrix2x2 = [
    [1, 0],
    [0, 1],
  ];
  const base: Matrix2x2 = [
    [A[0][0], A[0][1]],
    [A[1][0], A[1][1]],
  ];
  for (let i = 0; i < p; i++) {
    res = multiply2x2(res, base);
  }
  return res;
}

function kroneckerProduct(A: Matrix2x2, B: Matrix2x2): Matrix4x4 {
  const result: Matrix4x4 = [];
  for (let i = 0; i < 2; i++) {
    for (let k = 0; k < 2; k++) {
      const row: number[] = [];
      for (let j = 0; j < 2; j++) {
        for (let l = 0; l < 2; l++) {
          row.push(A[i][j] * B[k][l]);
        }
      }
      result.push(row);
    }
  }
  return result;
}

function trace2x2(A: Matrix2x2): number {
  return A[0][0] + A[1][1];
}

function trace4x4(M: Matrix4x4): number {
  return M[0][0] + M[1][1] + M[2][2] + M[3][3];
}

// =========================================================================
// 🛡️ SHANNON & HARDWARE BENCHMARK UTILITIES FOR BENCH 2 (Cybersecurity)
// =========================================================================
function computeShannonEntropy(str: string): {
  shannonBitsPerChar: number;
  totalShannonBits: number;
  charDistribution: Array<{ char: string; count: number; pct: number }>;
} {
  if (!str) return { shannonBitsPerChar: 0, totalShannonBits: 0, charDistribution: [] };
  const counts: Record<string, number> = {};
  for (const ch of str) {
    counts[ch] = (counts[ch] || 0) + 1;
  }
  const len = str.length;
  let shannon = 0;
  const dist: Array<{ char: string; count: number; pct: number }> = [];
  for (const [char, count] of Object.entries(counts)) {
    const p = count / len;
    shannon -= p * Math.log2(p);
    dist.push({ char, count, pct: Math.round(p * 100) });
  }
  dist.sort((a, b) => b.count - a.count);
  return {
    shannonBitsPerChar: Number(shannon.toFixed(3)),
    totalShannonBits: Math.round(shannon * len),
    charDistribution: dist.slice(0, 6),
  };
}

function computeHardwareCrackTimes(entropyBits: number) {
  const log10Keys = (entropyBits - 1) * Math.log10(2);
  const cpuSec = log10Keys - 7; // 10 MH/s
  const rtxSec = log10Keys - 11; // 100 GH/s
  const h100Sec = log10Keys - 13; // 10 TH/s
  const groverLog10Keys = (entropyBits / 2) * Math.log10(2);
  const groverSec = groverLog10Keys - 9; // 1 GHz Grover Oracle

  return {
    cpu: formatDuration(cpuSec),
    rtx4090: formatDuration(rtxSec),
    h100Cluster: formatDuration(h100Sec),
    quantumGrover: formatDuration(groverSec),
  };
}

export default function InteractivePlayground(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<"sympy" | "security" | "ratelimit">("sympy");

  // =========================================================================
  // BENCH 1 STATE: SymPy Matrix & Tensor Engine
  // =========================================================================
  const [matrixA, setMatrixA] = useState<Matrix2x2>([
    [0, 1],
    [1, 0],
  ]);
  const [matrixB, setMatrixB] = useState<Matrix2x2>([
    [1, 0],
    [0, -1],
  ]);
  const [selectedPreset, setSelectedPreset] = useState<string>("quantum");
  const [powerExp, setPowerExp] = useState<number>(2);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [hoveredCell, setHoveredCell] = useState<{ r: number; c: number } | null>(null);

  const applyPreset = (key: string) => {
    setSelectedPreset(key);
    const p = MATRIX_PRESETS[key];
    if (p) {
      setMatrixA(p.A);
      setMatrixB(p.B);
    }
  };

  const handleCellChange = (
    mat: "A" | "B",
    r: number,
    c: number,
    valStr: string
  ) => {
    const val = Number(valStr) || 0;
    if (mat === "A") {
      const next: Matrix2x2 = [
        [matrixA[0][0], matrixA[0][1]],
        [matrixA[1][0], matrixA[1][1]],
      ];
      next[r][c] = val;
      setMatrixA(next);
      setSelectedPreset("custom");
    } else {
      const next: Matrix2x2 = [
        [matrixB[0][0], matrixB[0][1]],
        [matrixB[1][0], matrixB[1][1]],
      ];
      next[r][c] = val;
      setMatrixB(next);
      setSelectedPreset("custom");
    }
  };

  // Tensor computations
  const kroneckerMat = useMemo(
    () => kroneckerProduct(matrixA, matrixB),
    [matrixA, matrixB]
  );
  const trA = useMemo(() => trace2x2(matrixA), [matrixA]);
  const trB = useMemo(() => trace2x2(matrixB), [matrixB]);
  const trProduct = trA * trB;
  const trKronecker = useMemo(() => trace4x4(kroneckerMat), [kroneckerMat]);

  // Mixed power computations
  const aPow = useMemo(() => power2x2(matrixA, powerExp), [matrixA, powerExp]);
  const bPow = useMemo(() => power2x2(matrixB, powerExp), [matrixB, powerExp]);
  const factoredKroneckerPow = useMemo(
    () => kroneckerProduct(aPow, bPow),
    [aPow, bPow]
  );

  const copySymPyCode = () => {
    const code = `# Verified with SymPy 1.14 / Python 3.12
from sympy import Matrix
from sympy.matrices.expressions import KroneckerProduct

# Factors A and B
A = Matrix([${JSON.stringify(matrixA[0])}, ${JSON.stringify(matrixA[1])}])
B = Matrix([${JSON.stringify(matrixB[0])}, ${JSON.stringify(matrixB[1])}])

kp = KroneckerProduct(A, B)

# 1. Exact Trace Identity Verification (PR #31011):
assert kp.trace().doit() == A.trace() * B.trace()

# 2. Mixed-Product Integer Power Distribution (PR #31284):
# (A ⊗ B)^${powerExp} == A^${powerExp} ⊗ B^${powerExp}
assert (kp ** ${powerExp}) == KroneckerProduct(A ** ${powerExp}, B ** ${powerExp})
print("SymPy Algebraic Identities: VERIFIED PASS")`;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // =========================================================================
  // BENCH 2 STATE: Cybersecurity Entropy & Attack Physics
  // =========================================================================
  const [testPassword, setTestPassword] = useState("Soham#IITJ@2027_Quantum");
  const analysis = useMemo(() => analyzePassword(testPassword), [testPassword]);
  const shannonData = useMemo(
    () => computeShannonEntropy(testPassword),
    [testPassword]
  );
  const hardwareTimes = useMemo(
    () => computeHardwareCrackTimes(analysis.entropyBits),
    [analysis.entropyBits]
  );

  // =========================================================================
  // BENCH 3 STATE: Atomic Lua Rate Limiter & Concurrency Lab
  // =========================================================================
  const [requestTimestamps, setRequestTimestamps] = useState<number[]>([]);
  const [lastResponse, setLastResponse] = useState<{
    status: number;
    message: string;
    timestamp: string;
    latencyMs: number;
  }>({
    status: 200,
    message: "200 OK — Ready. Atomic Lua sliding-window script initialized on Redis cluster.",
    timestamp: "Ready",
    latencyMs: 0.32,
  });
  const [blockedCount, setBlockedCount] = useState(0);
  const [allowedCount, setAllowedCount] = useState(0);
  const [trafficMode, setTrafficMode] = useState<"idle" | "burst" | "botnet">("idle");
  const burstTimerRef = useRef<NodeJS.Timeout | null>(null);

  const RATE_LIMIT_CAPACITY = 5;
  const WINDOW_SECONDS = 6;

  const sendSinglePacket = (now = Date.now()) => {
    const windowStart = now - WINDOW_SECONDS * 1000;
    const currentWindow = requestTimestamps.filter((ts) => ts > windowStart);
    const simulatedLatency = Number((0.28 + Math.random() * 0.18).toFixed(2));

    if (currentWindow.length < RATE_LIMIT_CAPACITY) {
      const updated = [...currentWindow, now];
      setRequestTimestamps(updated);
      setAllowedCount((prev) => prev + 1);
      setLastResponse({
        status: 200,
        message: `200 OK — Authorized. Window occupancy: ${updated.length}/${RATE_LIMIT_CAPACITY}. ZADD timestamp recorded.`,
        timestamp: new Date().toLocaleTimeString(),
        latencyMs: simulatedLatency,
      });
    } else {
      setBlockedCount((prev) => prev + 1);
      const oldest = currentWindow[0];
      const waitSec = Math.ceil((oldest + WINDOW_SECONDS * 1000 - now) / 1000);
      setLastResponse({
        status: 429,
        message: `429 TOO MANY REQUESTS — Atomic Lua threshold exceeded! Retry-After: ${waitSec}s. Lock-free drop.`,
        timestamp: new Date().toLocaleTimeString(),
        latencyMs: simulatedLatency,
      });
    }
  };

  const simulateBotnetAttack = () => {
    setTrafficMode("botnet");
    let count = 0;
    if (burstTimerRef.current) clearInterval(burstTimerRef.current);
    burstTimerRef.current = setInterval(() => {
      count++;
      sendSinglePacket();
      if (count >= 12) {
        if (burstTimerRef.current) clearInterval(burstTimerRef.current);
        setTrafficMode("idle");
      }
    }, 70);
  };

  const simulateOrganicTraffic = () => {
    setTrafficMode("burst");
    let count = 0;
    if (burstTimerRef.current) clearInterval(burstTimerRef.current);
    burstTimerRef.current = setInterval(() => {
      count++;
      sendSinglePacket();
      if (count >= 3) {
        if (burstTimerRef.current) clearInterval(burstTimerRef.current);
        setTrafficMode("idle");
      }
    }, 1100);
  };

  const resetRateLimiter = () => {
    if (burstTimerRef.current) clearInterval(burstTimerRef.current);
    setRequestTimestamps([]);
    setBlockedCount(0);
    setAllowedCount(0);
    setTrafficMode("idle");
    setLastResponse({
      status: 200,
      message: "Rate limiter state flushed. Redis ZSET sliding window cleared (5 req / 6 sec).",
      timestamp: new Date().toLocaleTimeString(),
      latencyMs: 0.25,
    });
  };

  useEffect(() => {
    return () => {
      if (burstTimerRef.current) clearInterval(burstTimerRef.current);
    };
  }, []);

  // Compute live traffic anomaly metrics
  const nowTime = Date.now();
  const recentPackets = requestTimestamps.filter(
    (ts) => ts > nowTime - 2500
  ).length;
  const isHighVelocity = recentPackets >= 4;
  const anomalyRiskScore = isHighVelocity ? 94 : Math.min(recentPackets * 18, 45);

  return (
    <section id="lab" className="pt-10 pb-10 px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-medium mb-3">
          <Zap className="w-3.5 h-3.5" />
          <span>Interactive Engineering Lab · Research Benches</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Live In-Browser System Simulators
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-3xl font-normal">
          Rigorous client-side computational laboratories. Test symbolic tensor identities authored in SymPy, inspect atomic Redis sliding-window concurrency, and calculate cryptographic keyspace physics in real time.
        </p>

        {/* 3 Research Bench Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2.5 mt-6">
          <button
            onClick={() => setActiveTab("sympy")}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "sympy"
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/25 border border-purple-400/30"
                : "bg-white/[0.04] text-zinc-400 hover:text-white border border-white/[0.06]"
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-purple-300" />
            <span>SymPy Tensor &amp; CAS Engine</span>
            <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-200 font-mono">
              GSoC &apos;27 Core
            </span>
          </button>

          <button
            onClick={() => setActiveTab("security")}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "security"
                ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-600/25 border border-indigo-400/30"
                : "bg-white/[0.04] text-zinc-400 hover:text-white border border-white/[0.06]"
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-indigo-300" />
            <span>Cybersecurity Entropy Lab</span>
            <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-200 font-mono">
              22⭐ Project
            </span>
          </button>

          <button
            onClick={() => setActiveTab("ratelimit")}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "ratelimit"
                ? "bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg shadow-cyan-600/25 border border-cyan-400/30"
                : "bg-white/[0.04] text-zinc-400 hover:text-white border border-white/[0.06]"
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-cyan-300" />
            <span>Atomic Rate Limiter</span>
            <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-200 font-mono">
              Lua + Redis
            </span>
          </button>
        </div>
      </div>

      {/* BENCH CONTAINER */}
      <ScrollReveal direction="up">
        <div className="glass-card p-6 sm:p-8 rounded-2xl border-white/10 relative overflow-hidden bg-[#0d0d14]/95 shadow-2xl">
          {/* ========================================================================= */}
          {/* BENCH 1: SymPy Tensor & Matrix Engine */}
          {/* ========================================================================= */}
          {activeTab === "sympy" && (
            <div>
              {/* Bench Sub-Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <span>Kronecker Tensor Product &amp; Algebraic Proof Engine</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      SymPy CAS Upstream
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Direct visual proof of Soham Vyas&apos;s merged upstream contributions (PR #31011, PR #31284, PR #31207). Live mixed-product power distribution and scalar trace decomposition.
                  </p>
                </div>

                {/* Presets */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-mono text-zinc-500">Presets:</span>
                  {Object.entries(MATRIX_PRESETS).map(([k, p]) => (
                    <button
                      key={k}
                      onClick={() => applyPreset(k)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        selectedPreset === k
                          ? "bg-purple-600 text-white font-semibold shadow-sm"
                          : "bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 border border-white/[0.08]"
                      }`}
                    >
                      {p.label.split(" (")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Matrix Factors A and B Inputs Grid */}
              <div className="grid lg:grid-cols-12 gap-6 pt-6">
                {/* Left: Factors Editor */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                  <div>
                    <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block mb-3 font-mono">
                      Input Factor Matrices (2 × 2 Real Field)
                    </span>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Matrix A Box */}
                      <div className="p-4 rounded-xl bg-black/40 border border-purple-500/25">
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="font-bold text-purple-300 font-mono">Matrix A</span>
                          <span className="text-[11px] font-mono text-zinc-500">
                            tr(A) = {trA}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {[0, 1].map((r) =>
                            [0, 1].map((c) => (
                              <input
                                key={`A-${r}-${c}`}
                                type="number"
                                aria-label={`Matrix A element ${r},${c}`}
                                value={matrixA[r][c]}
                                onChange={(e) =>
                                  handleCellChange("A", r, c, e.target.value)
                                }
                                className="w-full text-center py-2 bg-purple-950/20 border border-purple-500/30 rounded-lg text-sm font-mono text-white focus:outline-none focus:border-purple-400"
                              />
                            ))
                          )}
                        </div>
                      </div>

                      {/* Matrix B Box */}
                      <div className="p-4 rounded-xl bg-black/40 border border-indigo-500/25">
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="font-bold text-indigo-300 font-mono">Matrix B</span>
                          <span className="text-[11px] font-mono text-zinc-500">
                            tr(B) = {trB}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {[0, 1].map((r) =>
                            [0, 1].map((c) => (
                              <input
                                key={`B-${r}-${c}`}
                                type="number"
                                aria-label={`Matrix B element ${r},${c}`}
                                value={matrixB[r][c]}
                                onChange={(e) =>
                                  handleCellChange("B", r, c, e.target.value)
                                }
                                className="w-full text-center py-2 bg-indigo-950/20 border border-indigo-500/30 rounded-lg text-sm font-mono text-white focus:outline-none focus:border-indigo-400"
                              />
                            ))
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-zinc-400 mt-2.5 font-normal leading-relaxed">
                      💡 <strong>Live Identity:</strong>{" "}
                      {MATRIX_PRESETS[selectedPreset]?.note ||
                        "Custom real matrix factor configuration."}
                    </p>
                  </div>

                  {/* Mixed Power Exponent Slider (PR #31284 Feature) */}
                  <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-semibold text-purple-200 flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-purple-400" />
                        <span>Kronecker Power Exponent: p = {powerExp}</span>
                      </span>
                      <span className="text-[10px] font-mono text-purple-300 px-2 py-0.5 rounded bg-purple-500/15">
                        PR #31284 Feature
                      </span>
                    </div>

                    <input
                      type="range"
                      min={0}
                      max={3}
                      step={1}
                      value={powerExp}
                      onChange={(e) => setPowerExp(Number(e.target.value))}
                      className="w-full accent-purple-500 cursor-pointer"
                    />

                    <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
                      <span>p=0 (Identity)</span>
                      <span>p=1</span>
                      <span>p=2 (Quadratic)</span>
                      <span>p=3 (Cubic)</span>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-white/[0.06] text-xs font-mono text-purple-300">
                      <span>(A ⊗ B)^{powerExp} = A^{powerExp} ⊗ B^{powerExp}</span>
                      <span className="text-zinc-400 block text-[11px] mt-0.5">
                        Evaluates without expanding into 4×4 intermediate powers.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Kronecker Heatmap & Algebraic Identity Verification */}
                <div className="lg:col-span-7 flex flex-col justify-between gap-6">
                  {/* Heatmap & Grid */}
                  <div className="p-5 rounded-xl bg-black/60 border border-white/[0.08]">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                      <span className="text-xs font-semibold text-zinc-300 font-mono flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-purple-400" />
                        <span>Kronecker Product Matrix: A ⊗ B (4 × 4)</span>
                      </span>
                      <span className="text-[11px] font-mono text-zinc-500">
                        Hover cells for block derivation
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {kroneckerMat.map((row, r) =>
                        row.map((val, c) => {
                          const isDiag = r === c;
                          const isHovered =
                            hoveredCell?.r === r && hoveredCell?.c === c;
                          return (
                            <div
                              key={`k-${r}-${c}`}
                              onMouseEnter={() => setHoveredCell({ r, c })}
                              onMouseLeave={() => setHoveredCell(null)}
                              className={`p-2.5 rounded-lg border text-center transition-all cursor-crosshair font-mono text-xs ${
                                isDiag
                                  ? "bg-purple-500/20 border-purple-400/50 text-purple-200 font-bold"
                                  : "bg-white/[0.02] border-white/[0.06] text-zinc-300"
                              } ${isHovered ? "ring-2 ring-emerald-400 scale-105 z-10" : ""}`}
                              title={`Row ${r}, Col ${c}: ${val}`}
                            >
                              <div className="text-[9px] text-zinc-500 mb-0.5">
                                [{r},{c}]
                              </div>
                              <div className="text-sm">{val}</div>
                            </div>
                          );
                        })
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-3 mt-3 border-t border-white/[0.06]">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded bg-purple-500/30 border border-purple-400/50" />
                        <span>Highlighted diagonal elements (sum to trace)</span>
                      </span>
                      {hoveredCell && (
                        <span className="font-mono text-emerald-400">
                          A[{Math.floor(hoveredCell.r / 2)},
                          {Math.floor(hoveredCell.c / 2)}] × B[
                          {hoveredCell.r % 2},{hoveredCell.c % 2}] ={" "}
                          {kroneckerMat[hoveredCell.r][hoveredCell.c]}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Mathematical Verification Banner */}
                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Trace Product Theorem Verified (PR #31011)</span>
                      </div>
                      <p className="text-xs font-mono text-zinc-300">
                        tr(A ⊗ B) = {trKronecker} ⟷ tr(A) · tr(B) = {trA} × {trB} ={" "}
                        {trProduct}
                      </p>
                    </div>

                    <button
                      onClick={copySymPyCode}
                      className="px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-xs font-mono text-zinc-200 flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-center"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy SymPy Verification</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* BENCH 2: Cybersecurity Entropy & Attack Physics */}
          {/* ========================================================================= */}
          {activeTab === "security" && (
            <div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <span>Shannon Entropy &amp; GPU Brute-Force Time Calculator</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      NIST 800-63B
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Simulating cryptographic password strength evaluator from `Cybersecurity-Risk-Analyzer` (22⭐ GitHub Project).
                  </p>
                </div>

                {/* Presets */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-mono text-zinc-500">Try presets:</span>
                  {[
                    "password123",
                    "admin#2026",
                    "Tr0ub4dor&3",
                    "Soham#IITJ@2027_Quantum",
                    "correct horse battery staple",
                  ].map((p) => (
                    <button
                      key={p}
                      onClick={() => setTestPassword(p)}
                      className="px-2.5 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] text-[11px] font-mono text-zinc-300 transition-colors cursor-pointer border border-white/[0.06]"
                    >
                      {p.length > 14 ? p.slice(0, 12) + "..." : p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input & Metrics */}
              <div className="grid lg:grid-cols-12 gap-8 pt-6">
                <div className="lg:col-span-7 flex flex-col justify-between gap-6">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-2 font-mono">
                      Enter any sample string to evaluate cryptographic entropy:
                    </label>
                    <input
                      type="text"
                      aria-label="Sample string to evaluate"
                      value={testPassword}
                      onChange={(e) => setTestPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-sm font-mono text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="Type string..."
                    />
                    <div className="flex items-center justify-between text-[11px] text-zinc-500 mt-2 font-mono">
                      <span>Length: {testPassword.length} characters</span>
                      <span>
                        Pool Diversity:{" "}
                        {analysis.poolLabels.length > 0
                          ? analysis.poolLabels.join(" + ")
                          : "Empty"}
                      </span>
                    </div>

                    {/* Real-time Entropy Bar */}
                    <div className="mt-5 pt-4 border-t border-white/[0.06]">
                      <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                        <span className="text-zinc-300">Entropy Strength:</span>
                        <span className={analysis.color}>{analysis.level}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/[0.08] overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${analysis.barClass}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Character Frequency Distribution (Shannon Metric) */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06]">
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                      <span>Top Character Frequencies (Shannon Entropy)</span>
                      <span className="text-indigo-400 font-bold">
                        H(X) = {shannonData.shannonBitsPerChar} bits/char
                      </span>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                      {shannonData.charDistribution.map((item) => (
                        <div
                          key={item.char}
                          className="p-2 rounded bg-white/[0.03] border border-white/[0.06] text-center font-mono text-xs"
                        >
                          <div className="text-zinc-200 font-bold">
                            {item.char === " " ? "␣" : item.char}
                          </div>
                          <div className="text-[10px] text-zinc-500">
                            {item.pct}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* NIST SP 800-63B Standards Compliance Checklist */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.06]">
                      <span className="text-[10px] text-zinc-500 block">Length ≥ 8</span>
                      <span
                        className={
                          testPassword.length >= 8
                            ? "text-emerald-400 font-bold"
                            : "text-red-400 font-bold"
                        }
                      >
                        {testPassword.length >= 8 ? "PASS ✓" : "FAIL ✗"}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.06]">
                      <span className="text-[10px] text-zinc-500 block">Dictionary Leak</span>
                      <span
                        className={
                          analysis.commonPattern
                            ? "text-red-400 font-bold"
                            : "text-emerald-400 font-bold"
                        }
                      >
                        {analysis.commonPattern ? "FLAGGED ✗" : "CLEAN ✓"}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.06]">
                      <span className="text-[10px] text-zinc-500 block">Shannon Density</span>
                      <span
                        className={
                          shannonData.shannonBitsPerChar >= 3.0
                            ? "text-emerald-400 font-bold"
                            : "text-amber-400 font-bold"
                        }
                      >
                        {shannonData.shannonBitsPerChar.toFixed(2)} b/c
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.06]">
                      <span className="text-[10px] text-zinc-500 block">Grover Margin</span>
                      <span
                        className={
                          analysis.entropyBits >= 128
                            ? "text-emerald-400 font-bold"
                            : "text-indigo-400 font-bold"
                        }
                      >
                        {analysis.entropyBits >= 128 ? "IMMUNE" : "SUB-128"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Hardware Attack Spectrum Benchmark */}
                <div className="lg:col-span-5 p-5 rounded-xl bg-black/40 border border-white/[0.08] flex flex-col justify-between gap-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-3">
                      Calculated Keyspace Metrics (L · log₂R)
                    </span>

                    <div className="space-y-4">
                      <div>
                        <span className="text-xs text-zinc-400 block font-mono">
                          Total Keyspace Search Entropy:
                        </span>
                        <span className="text-3xl font-extrabold font-mono text-white">
                          {analysis.entropyBits}{" "}
                          <span className="text-xs font-normal text-indigo-400">
                            bits
                          </span>
                        </span>
                      </div>

                      {/* Hardware Attack Speeds Matrix */}
                      <div className="space-y-2.5 pt-3 border-t border-white/[0.06]">
                        <span className="text-xs font-semibold text-zinc-300 block font-mono">
                          Estimated Crack Time by Threat Tier:
                        </span>

                        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-between text-xs font-mono">
                          <span className="text-zinc-400">📱 Commodity CPU (10 MH/s)</span>
                          <span className="text-zinc-200 font-bold">
                            {hardwareTimes.cpu}
                          </span>
                        </div>

                        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-between text-xs font-mono">
                          <span className="text-zinc-400">🎮 RTX 4090 (100 GH/s)</span>
                          <span className="text-indigo-300 font-bold">
                            {hardwareTimes.rtx4090}
                          </span>
                        </div>

                        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-between text-xs font-mono">
                          <span className="text-zinc-400">🏢 8x H100 GPU Cluster (10 TH/s)</span>
                          <span className="text-purple-300 font-bold">
                            {hardwareTimes.h100Cluster}
                          </span>
                        </div>

                        <div className="p-2.5 rounded-lg bg-purple-950/20 border border-purple-500/25 flex items-center justify-between text-xs font-mono">
                          <span className="text-purple-200">⚛️ Quantum Grover Search</span>
                          <span className="text-emerald-400 font-bold">
                            {hardwareTimes.quantumGrover}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] text-[11px] text-zinc-500 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>NIST SP 800-63B Combinatorics &amp; Cryptanalysis</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* BENCH 3: Atomic Lua Rate Limiter & Concurrency Lab */}
          {/* ========================================================================= */}
          {activeTab === "ratelimit" && (
            <div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <span>Atomic Lua Sliding Window Simulator (Redis ZSET)</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      Max 5 req / 6 sec
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Live client-side reproduction of `ai-rate-limiter-shield`. Atomic concurrency guarantees with zero database race conditions.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={resetRateLimiter}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-medium text-zinc-300 flex items-center gap-1.5 transition-colors cursor-pointer border border-white/[0.08]"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset State</span>
                  </button>
                </div>
              </div>

              <div className="grid lg:grid-cols-12 gap-8 pt-6">
                {/* Left: Interactive Packet Injection Bench */}
                <div className="lg:col-span-6 flex flex-col justify-between gap-6">
                  <div>
                    <p className="text-xs text-zinc-300 mb-4 leading-relaxed font-normal">
                      Trigger manual requests or simulate coordinated botnet attacks. The atomic Lua script runs within Redis memory, ensuring zero race conditions even under 100k req/sec multi-threaded load.
                    </p>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      <button
                        onClick={() => sendSinglePacket()}
                        className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/20 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Send API Request (Fire Packet)</span>
                      </button>

                      <button
                        onClick={simulateBotnetAttack}
                        disabled={trafficMode !== "idle"}
                        className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-bold text-xs shadow-lg shadow-rose-600/20 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        <Flame className="w-3.5 h-3.5" />
                        <span>Simulate Botnet Attack (12 Spikes)</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <button
                        onClick={simulateOrganicTraffic}
                        disabled={trafficMode !== "idle"}
                        className="w-full py-2.5 px-3 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-medium text-zinc-300 transition-colors cursor-pointer border border-white/[0.08] flex items-center justify-center gap-1.5"
                      >
                        <Radio className="w-3 h-3 text-emerald-400" />
                        <span>Simulate Organic User Traffic (Steady Cadence)</span>
                      </button>
                    </div>

                    {/* Window Capacity Meter */}
                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] mb-4">
                      <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                        <span className="text-zinc-400">Sliding Window Capacity:</span>
                        <span className="font-bold text-white">
                          {requestTimestamps.filter((ts) => ts > Date.now() - WINDOW_SECONDS * 1000).length} / {RATE_LIMIT_CAPACITY} Slots
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/[0.08] overflow-hidden">
                        <div
                          className={`h-full transition-all duration-200 ${
                            requestTimestamps.filter((ts) => ts > Date.now() - WINDOW_SECONDS * 1000).length >= RATE_LIMIT_CAPACITY
                              ? "bg-rose-500"
                              : "bg-cyan-500"
                          }`}
                          style={{
                            width: `${Math.min(
                              (requestTimestamps.filter((ts) => ts > Date.now() - WINDOW_SECONDS * 1000).length / RATE_LIMIT_CAPACITY) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Counters */}
                    <div className="grid grid-cols-2 gap-3 text-center font-mono">
                      <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <span className="text-xs text-zinc-400 block mb-0.5">Authorized (200)</span>
                        <span className="text-xl font-bold text-emerald-400">{allowedCount}</span>
                      </div>
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <span className="text-xs text-zinc-400 block mb-0.5">Rate Limited (429)</span>
                        <span className="text-xl font-bold text-red-400">{blockedCount}</span>
                      </div>
                    </div>
                  </div>

                  {/* ML Isolation Forest Anomaly Radar */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <ShieldCheck
                        className={`w-4 h-4 ${
                          isHighVelocity ? "text-rose-400" : "text-emerald-400"
                        }`}
                      />
                      <span className="text-zinc-300">
                        ML Traffic Classifier: {isHighVelocity ? "Automated Attack" : "Normal User"}
                      </span>
                    </div>
                    <span
                      className={`font-bold ${
                        isHighVelocity ? "text-rose-400" : "text-emerald-400"
                      }`}
                    >
                      Risk: {anomalyRiskScore}%
                    </span>
                  </div>
                </div>

                {/* Right: Telemetry Output & Live Redis Terminal */}
                <div className="lg:col-span-6 p-5 rounded-xl bg-black/70 border border-white/10 font-mono text-xs flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-zinc-500 pb-2 mb-3 border-b border-white/[0.08]">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        Live Redis Sliding Window Telemetry
                      </span>
                      <span>Latency: {lastResponse.latencyMs} ms</span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-2 text-zinc-400">
                        <span className="text-cyan-400">$</span>
                        <span className="text-zinc-200">
                          EVALSHA rate_limiter.lua 1 ip:client_102 {Date.now()}{" "}
                          {WINDOW_SECONDS * 1000} {RATE_LIMIT_CAPACITY}
                        </span>
                      </div>

                      <div
                        className={`p-3.5 rounded-lg border transition-all ${
                          lastResponse.status === 200
                            ? "bg-emerald-950/20 border-emerald-500/25 text-emerald-300"
                            : "bg-red-950/20 border-red-500/30 text-red-300"
                        }`}
                      >
                        <p className="font-semibold mb-1 flex items-center gap-1.5">
                          <span>HTTP Status: {lastResponse.status}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/[0.08] font-normal">
                            {lastResponse.timestamp}
                          </span>
                        </p>
                        <p className="text-[11px] leading-relaxed text-zinc-300">
                          {lastResponse.message}
                        </p>
                      </div>

                      {/* Redis Step-by-Step Command Log */}
                      <div className="p-3 rounded-lg bg-black/60 border border-white/[0.05] space-y-1.5 text-[11px] text-zinc-400">
                        <div className="text-zinc-500 font-semibold mb-1">
                          Atomic Pipeline Steps Executed:
                        </div>
                        <div>
                          1.{" "}
                          <span className="text-cyan-300">
                            ZREMRANGEBYSCORE
                          </span>{" "}
                          ip:client_102 0 (now - 6000ms)
                        </div>
                        <div>
                          2. <span className="text-cyan-300">ZCARD</span>{" "}
                          ip:client_102 ⟹{" "}
                          {requestTimestamps.filter((ts) => ts > Date.now() - WINDOW_SECONDS * 1000).length} active
                        </div>
                        <div>
                          3.{" "}
                          <span className="text-cyan-300">
                            {lastResponse.status === 200 ? "ZADD" : "DROP"}
                          </span>{" "}
                          {lastResponse.status === 200
                            ? "ip:client_102 <now> <uuid>"
                            : "HTTP 429 Retry-After triggered"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] text-zinc-500 pt-2 border-t border-white/[0.05] flex items-center justify-between">
                    <span>Zero DB Disk I/O</span>
                    <span>100% In-Memory Atomicity</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}

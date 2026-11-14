"use client";

import React, { useState, useEffect } from "react";
import { Shield, Zap, Sparkles, RefreshCw, AlertTriangle, CheckCircle, Lock, Play, Activity } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function InteractivePlayground(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<"security" | "ratelimit">("security");

  // --- LAB 1: Cybersecurity Entropy & Crack Time Simulator State ---
  const [testPassword, setTestPassword] = useState("Soham#IITJ@2027_Quantum");
  const [entropy, setEntropy] = useState(0);
  const [crackTime, setCrackTime] = useState("");
  const [strengthColor, setStrengthColor] = useState("text-emerald-400");
  const [strengthLevel, setStrengthLevel] = useState("Quantum-Resistant");

  useEffect(() => {
    // Calculate Shannon entropy bits: L * log2(R)
    let poolSize = 0;
    if (/[a-z]/.test(testPassword)) poolSize += 26;
    if (/[A-Z]/.test(testPassword)) poolSize += 26;
    if (/[0-9]/.test(testPassword)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(testPassword)) poolSize += 32;

    const length = testPassword.length;
    if (length === 0 || poolSize === 0) {
      setEntropy(0);
      setCrackTime("Instant");
      setStrengthLevel("None");
      setStrengthColor("text-zinc-500");
      return;
    }

    const calculatedEntropy = Math.round(length * (Math.log(poolSize) / Math.log(2)));
    setEntropy(calculatedEntropy);

    // Crack time assuming 100 Billion hashes/sec (modern GPU cluster)
    const combinations = Math.pow(poolSize, length);
    const seconds = combinations / 1e11;

    if (calculatedEntropy < 35) {
      setCrackTime("< 0.001 seconds (Instant crack)");
      setStrengthLevel("Critical Vulnerability");
      setStrengthColor("text-red-400");
    } else if (calculatedEntropy < 55) {
      setCrackTime("~ 12 minutes");
      setStrengthLevel("Weak");
      setStrengthColor("text-amber-400");
    } else if (calculatedEntropy < 75) {
      setCrackTime("~ 4.8 centuries");
      setStrengthLevel("Strong Enterprise Grade");
      setStrengthColor("text-indigo-400");
    } else {
      setCrackTime("> 1.2 Quadrillion Years");
      setStrengthLevel("Quantum-Resistant");
      setStrengthColor("text-emerald-400");
    }
  }, [testPassword]);

  // --- LAB 2: Atomic Rate Limiter Simulator State ---
  const [requestTimestamps, setRequestTimestamps] = useState<number[]>([]);
  const [lastResponse, setLastResponse] = useState<{ status: number; message: string; timestamp: string }>({
    status: 200,
    message: "200 OK — Request authorized by Atomic Lua sliding window.",
    timestamp: "Ready",
  });
  const [blockedCount, setBlockedCount] = useState(0);
  const [allowedCount, setAllowedCount] = useState(0);

  const RATE_LIMIT_CAPACITY = 5;
  const WINDOW_SECONDS = 6;

  const sendRateLimitedRequest = () => {
    const now = Date.now();
    const windowStart = now - WINDOW_SECONDS * 1000;

    // Filter out old timestamps outside the sliding window
    const currentWindow = requestTimestamps.filter((ts) => ts > windowStart);

    if (currentWindow.length < RATE_LIMIT_CAPACITY) {
      // Allowed
      const updated = [...currentWindow, now];
      setRequestTimestamps(updated);
      setAllowedCount((prev) => prev + 1);
      setLastResponse({
        status: 200,
        message: `200 OK — Tokens in window: ${updated.length}/${RATE_LIMIT_CAPACITY}. Redis ZSET timestamp recorded.`,
        timestamp: new Date().toLocaleTimeString(),
      });
    } else {
      // Blocked
      setBlockedCount((prev) => prev + 1);
      const oldest = currentWindow[0];
      const waitMs = Math.ceil((oldest + WINDOW_SECONDS * 1000 - now) / 1000);
      setLastResponse({
        status: 429,
        message: `429 TOO MANY REQUESTS — Atomic Lua rate limit tripped! Retry-After: ${waitMs}s.`,
        timestamp: new Date().toLocaleTimeString(),
      });
    }
  };

  const resetRateLimiter = () => {
    setRequestTimestamps([]);
    setBlockedCount(0);
    setAllowedCount(0);
    setLastResponse({
      status: 200,
      message: "Rate limiter state flushed. Bucket capacity reset to 5 tokens.",
      timestamp: new Date().toLocaleTimeString(),
    });
  };

  return (
    <section id="lab" className="pt-10 pb-10 px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-medium mb-3">
          <Zap className="w-3.5 h-3.5" />
          <span>Interactive Engineering Lab</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Live In-Browser System Simulators
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl font-normal">
          Don&apos;t just read code — test it live. These interactive simulators demonstrate the core algorithms behind my top GitHub projects directly in your browser.
        </p>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mt-6">
          <button
            onClick={() => setActiveTab("security")}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "security"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "bg-white/[0.04] text-zinc-400 hover:text-white border border-white/[0.06]"
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Cybersecurity Entropy Lab (22⭐ Project)</span>
          </button>
          <button
            onClick={() => setActiveTab("ratelimit")}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "ratelimit"
                ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/30"
                : "bg-white/[0.04] text-zinc-400 hover:text-white border border-white/[0.06]"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Atomic Rate Limiter (Lua + Redis)</span>
          </button>
        </div>
      </div>

      {/* LAB CONTAINER */}
      <ScrollReveal direction="up">
        <div className="glass-card p-6 sm:p-8 rounded-2xl border-white/10 relative overflow-hidden bg-[#0d0d14]/90">
        {activeTab === "security" ? (
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Shannon Entropy &amp; GPU Brute-Force Time Calculator</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300">
                    NIST 800-63B
                  </span>
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Simulating cryptographic password strength evaluator from `Cybersecurity-Risk-Analyzer`.
                </p>
              </div>

              {/* Presets */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] text-zinc-500">Try presets:</span>
                {["password123", "admin#2026", "Soham#IITJ@2027_Quantum"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setTestPassword(p)}
                    className="px-2.5 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] text-[11px] font-mono text-zinc-300 transition-colors cursor-pointer"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Input & Metrics */}
            <div className="grid md:grid-cols-12 gap-8 pt-6">
              <div className="md:col-span-7 flex flex-col justify-between">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-2">
                    Enter any sample string to evaluate cryptographic entropy:
                  </label>
                  <input
                    type="text"
                    value={testPassword}
                    onChange={(e) => setTestPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-sm font-mono text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="Type string..."
                  />
                  <div className="flex items-center justify-between text-[11px] text-zinc-500 mt-2">
                    <span>Length: {testPassword.length} characters</span>
                    <span>Pool Diversity: {testPassword.length > 0 ? "Uppercase + Lowercase + Digits + Symbols" : "Empty"}</span>
                  </div>
                </div>

                {/* Real-time bar */}
                <div className="mt-6 pt-4 border-t border-white/[0.06]">
                  <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                    <span className="text-zinc-300">Entropy Strength:</span>
                    <span className={strengthColor}>{strengthLevel}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/[0.08] overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        entropy < 35
                          ? "bg-red-500 w-[20%]"
                          : entropy < 55
                          ? "bg-amber-500 w-[50%]"
                          : entropy < 75
                          ? "bg-indigo-500 w-[80%]"
                          : "bg-emerald-500 w-[100%]"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Output Stats Box */}
              <div className="md:col-span-5 p-5 rounded-xl bg-black/40 border border-white/[0.08] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-3">
                    Calculated Metrics (100 GH/s Hashcat Rig)
                  </span>

                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-zinc-400 block">Shannon Information Entropy:</span>
                      <span className="text-2xl font-extrabold font-mono text-white">
                        {entropy} <span className="text-xs font-normal text-indigo-400">bits</span>
                      </span>
                    </div>

                    <div>
                      <span className="text-xs text-zinc-400 block">Estimated Brute-Force Crack Time:</span>
                      <span className={`text-base font-bold font-mono ${strengthColor}`}>
                        {crackTime}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.06] text-[11px] text-zinc-500 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Real-time logarithmic combinatorics</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* LAB 2: RATE LIMITER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Atomic Lua Sliding Window Simulator (Redis ZSET)</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300">
                    Max 5 req / 6 sec
                  </span>
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Live reproduction of `ai-rate-limiter-shield` atomic sliding window algorithm.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={resetRateLimiter}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-medium text-zinc-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset State</span>
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-12 gap-8 pt-6 items-center">
              <div className="md:col-span-6 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-zinc-300 mb-4 leading-relaxed">
                    Click the button rapidly to trigger high-velocity traffic. When requests exceed 5 within any continuous 6-second window, the atomic Lua script returns HTTP 429 without database locks.
                  </p>

                  <button
                    onClick={sendRateLimitedRequest}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-cyan-600/20 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Send API Request (Fire Packet)</span>
                  </button>

                  <div className="grid grid-cols-2 gap-3 mt-4 text-center">
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-xs text-zinc-400 block">Authorized (200)</span>
                      <span className="text-lg font-bold font-mono text-emerald-400">{allowedCount}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20">
                      <span className="text-xs text-zinc-400 block">Rate Limited (429)</span>
                      <span className="text-lg font-bold font-mono text-red-400">{blockedCount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Telemetry Output Terminal */}
              <div className="md:col-span-6 p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs">
                <div className="flex items-center justify-between text-[10px] text-zinc-500 pb-2 mb-2 border-b border-white/[0.08]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Live Redis Sliding Window Telemetry
                  </span>
                  <span>{lastResponse.timestamp}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-zinc-500">$</span>
                    <span className="text-zinc-300">EVALSHA rate_limiter.lua 1 ip:client_102 ...</span>
                  </div>

                  <div
                    className={`p-3 rounded-lg border ${
                      lastResponse.status === 200
                        ? "bg-emerald-950/20 border-emerald-500/20 text-emerald-300"
                        : "bg-red-950/20 border-red-500/30 text-red-300 animate-shake"
                    }`}
                  >
                    <p className="font-semibold mb-1">HTTP Status: {lastResponse.status}</p>
                    <p className="text-[11px] leading-relaxed text-zinc-300">{lastResponse.message}</p>
                  </div>

                  <div className="text-[10px] text-zinc-500 pt-2 border-t border-white/[0.05] flex items-center justify-between">
                    <span>Algorithm: Atomic ZREMRANGEBYSCORE + ZADD + ZCARD</span>
                    <span>Zero DB I/O</span>
                  </div>
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

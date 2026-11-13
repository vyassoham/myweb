"use client";

import React, { useState } from "react";
import { Coffee, Sparkles, Zap } from "lucide-react";

const COFFEE_QUOTES = [
  "“A mathematician is a machine for turning coffee into theorems.” — Alfréd Rényi / Paul Erdős",
  "“Coffee is a feature, not a bug.” — Computing Lore",
  "“Caffeine level nominal. Ready to optimize complex computational pipelines.”",
  "“Compiling kernel modules at 3:00 AM requires high-octane dark roast.”",
  "“SymPy Kronecker traces optimized. Synapses firing at O(1) velocity!”",
  "“Caffeine ingested. Ready to debug the toughest race conditions.”",
];

export default function InteractiveCoffee(): React.JSX.Element {
  const [sips, setSips] = useState(0);
  const [isDrinking, setIsDrinking] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSip = () => {
    setSips((prev) => prev + 1);
    setIsDrinking(true);
    setShowToast(true);

    setTimeout(() => setIsDrinking(false), 400);
    setTimeout(() => setShowToast(false), 2000);
  };

  const currentQuote = COFFEE_QUOTES[sips % COFFEE_QUOTES.length];
  const caffeineMg = sips * 65;

  return (
    <div className="flex flex-col items-center my-6 select-none">
      {/* Toast popup on sip */}
      <div
        className={`transition-all duration-300 transform mb-2 text-xs font-mono px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 shadow-lg shadow-amber-500/10 ${
          showToast ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95 pointer-events-none"
        }`}
      >
        <Zap className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
        <span>+65mg Caffeine Ingested! ☕</span>
      </div>

      {/* Interactive Coffee Mug Container */}
      <div
        onClick={handleSip}
        className={`relative cursor-pointer group p-4 transition-transform duration-300 ${
          isDrinking ? "scale-90 rotate-6" : "hover:scale-105"
        }`}
        title="Click to take a sip of coffee!"
      >
        {/* Animated Steam Clouds (CSS Keyframes) */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-10 flex justify-center gap-2 pointer-events-none">
          <span className="w-1.5 h-6 bg-gradient-to-t from-amber-400/60 to-transparent rounded-full animate-pulse delay-75 blur-[0.5px]" />
          <span className="w-1.5 h-8 bg-gradient-to-t from-orange-300/70 to-transparent rounded-full animate-bounce blur-[0.5px]" />
          <span className="w-1.5 h-6 bg-gradient-to-t from-amber-400/60 to-transparent rounded-full animate-pulse delay-150 blur-[0.5px]" />
        </div>

        {/* The Ceramic Mug Graphic */}
        <div className="relative w-24 h-20 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black rounded-b-3xl border-2 border-amber-500/40 shadow-xl shadow-amber-500/10 flex items-center justify-center overflow-visible group-hover:border-amber-400 transition-colors">
          {/* Mug Rim & Coffee Liquid */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[88%] h-5 bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 rounded-full border-2 border-amber-500/50 shadow-inner flex items-center justify-center">
            {/* Coffee Foam swirl */}
            <div className="w-12 h-2.5 rounded-full bg-amber-700/50 blur-[1px] animate-pulse" />
          </div>

          {/* Mug Handle */}
          <div className="absolute -right-5 top-2 w-6 h-12 rounded-r-2xl border-4 border-l-0 border-zinc-700 group-hover:border-amber-500/60 transition-colors" />

          {/* Front Mug Emblem */}
          <div className="flex flex-col items-center justify-center pt-2">
            <Coffee className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-mono text-zinc-400 mt-1 uppercase tracking-widest font-semibold">
              IIT JODHPUR
            </span>
          </div>
        </div>

        {/* Saucer / Plate */}
        <div className="w-32 h-3 -mt-1 mx-auto bg-gradient-to-r from-transparent via-zinc-800 to-transparent rounded-full border-b border-amber-500/20 shadow-lg shadow-black/60" />
      </div>

      {/* Interactive Controls & Telemetry */}
      <div className="flex items-center gap-2 mt-2">
        <button
          onClick={handleSip}
          className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-xs flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
        >
          <Coffee className="w-3.5 h-3.5 text-amber-400" />
          <span>Click to Sip ({sips} sips · {caffeineMg}mg)</span>
        </button>
      </div>

      {/* Dynamic Coder Quote on Coffee */}
      <p className="text-xs text-zinc-400 font-mono italic mt-2.5 max-w-sm text-center transition-all min-h-[32px] flex items-center justify-center">
        {currentQuote}
      </p>
    </div>
  );
}

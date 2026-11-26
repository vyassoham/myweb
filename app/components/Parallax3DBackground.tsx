"use client";

import React, { useSyncExternalStore } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const emptySubscribe = () => () => {};

export default function Parallax3DBackground(): React.JSX.Element {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  // Spatial scroll-driven depth layers (smooth GPU transforms)
  const yLayer1 = useTransform(scrollY, [0, 3000], [0, -220]);
  const yLayer2 = useTransform(scrollY, [0, 3000], [0, 180]);
  const yLayer3 = useTransform(scrollY, [0, 3000], [0, -140]);
  const rotateLayer = useTransform(scrollY, [0, 3000], [0, 45]);
  const gridY = useTransform(scrollY, [0, 3000], [0, 100]);

  if (shouldReduceMotion || !mounted) {
    return <div aria-hidden="true" />;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
      style={{ perspective: "1400px" }}
      aria-hidden="true"
    >
      {/* Dynamic Ambient Volumetric Lighting Glows */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/[0.07] blur-[140px] pointer-events-none" />
      <div className="absolute top-[900px] right-10 w-[600px] h-[600px] rounded-full bg-violet-600/[0.06] blur-[150px] pointer-events-none" />
      <div className="absolute top-[2000px] left-10 w-[550px] h-[550px] rounded-full bg-cyan-600/[0.05] blur-[140px] pointer-events-none" />

      {/* 3D Isometric Cybernetic Grid Plane with Depth Fade */}
      <motion.div
        style={{ y: gridY }}
        className="absolute inset-0 opacity-[0.025] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_60%,transparent_100%)]"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
            transform: "rotateX(60deg) scale(1.8)",
            transformOrigin: "center top",
          }}
        />
      </motion.div>

      {/* 3D Floating Tensor Node (Top-Right: Kronecker Product ⊗ Spatial Token) */}
      <motion.div
        style={{ y: yLayer1, rotate: rotateLayer }}
        className="absolute top-44 right-[6%] hidden xl:block"
      >
        <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-500/20 backdrop-blur-xl shadow-2xl shadow-indigo-500/10 flex items-center justify-center relative overflow-hidden transition-all duration-700 hover:border-indigo-400/40">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] to-transparent pointer-events-none" />
          <span className="font-mono text-3xl font-bold bg-gradient-to-br from-indigo-300 via-purple-200 to-indigo-400 bg-clip-text text-transparent opacity-60">
            ⊗
          </span>
          <div className="absolute -bottom-1 -right-1 text-[9px] font-mono text-indigo-400/40 px-1.5 py-0.5">
            A⊗B
          </div>
        </div>
      </motion.div>

      {/* 3D Floating Delta Node (Mid-Left: Kronecker Delta δ_{i,j} Matrix Token) */}
      <motion.div
        style={{ y: yLayer2 }}
        className="absolute top-[1200px] left-[4%] hidden lg:block"
      >
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-teal-500/5 to-transparent border border-cyan-400/20 backdrop-blur-xl shadow-2xl shadow-cyan-500/10 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] to-transparent pointer-events-none" />
          <span className="font-mono text-2xl font-bold bg-gradient-to-br from-cyan-300 via-teal-200 to-cyan-400 bg-clip-text text-transparent opacity-60">
            δ<sub className="text-xs">ij</sub>
          </span>
          <div className="absolute -bottom-1 -right-1 text-[8px] font-mono text-cyan-400/40 px-1.5 py-0.5">
            tr(E)
          </div>
        </div>
      </motion.div>

      {/* 3D Floating Information Entropy Node (Lower-Right: Shannon H(X) Token) */}
      <motion.div
        style={{ y: yLayer3 }}
        className="absolute top-[2300px] right-[7%] hidden xl:block"
      >
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-400/20 backdrop-blur-xl shadow-2xl shadow-emerald-500/10 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] to-transparent pointer-events-none" />
          <span className="font-mono text-xl font-bold bg-gradient-to-br from-emerald-300 via-teal-200 to-emerald-400 bg-clip-text text-transparent opacity-60">
            H(X)
          </span>
          <div className="absolute -bottom-1 -right-1 text-[8px] font-mono text-emerald-400/40 px-1.5 py-0.5">
            bits
          </div>
        </div>
      </motion.div>
    </div>
  );
}

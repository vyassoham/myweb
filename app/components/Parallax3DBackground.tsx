"use client";

import React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function Parallax3DBackground(): React.JSX.Element {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Optimized scroll-driven z-depth parallax layers
  const yLayer1 = useTransform(scrollY, [0, 2500], [0, -180]);
  const yLayer2 = useTransform(scrollY, [0, 2500], [0, 240]);
  const yLayer3 = useTransform(scrollY, [0, 2500], [0, -90]);

  if (shouldReduceMotion) {
    return <div aria-hidden="true" />;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
      style={{ perspective: "1200px" }}
      aria-hidden="true"
    >
      {/* 3D Floating Node 1 (Top-Right: Deep Indigo Polyhedron - GPU Composited) */}
      <motion.div
        style={{ y: yLayer1 }}
        className="absolute top-48 right-[8%] hidden lg:block"
      >
        <div className="w-36 h-36 rounded-3xl border border-indigo-500/20 bg-indigo-600/[0.03] shadow-2xl shadow-indigo-500/10 animate-float-node-1">
          <div className="absolute inset-4 rounded-2xl border border-dashed border-violet-500/25" />
        </div>
      </motion.div>

      {/* 3D Floating Node 2 (Mid-Left: Cyan Wireframe Cube - GPU Composited) */}
      <motion.div
        style={{ y: yLayer2 }}
        className="absolute top-[1100px] left-[5%] hidden md:block"
      >
        <div className="w-28 h-28 rounded-2xl border border-cyan-400/20 bg-cyan-500/[0.03] shadow-xl shadow-cyan-500/10 animate-float-node-2">
          <div className="absolute inset-3 rounded-xl border border-cyan-400/20 rotate-45" />
        </div>
      </motion.div>

      {/* 3D Floating Node 3 (Lower-Right: Amber / Emerald Math Node - GPU Composited) */}
      <motion.div
        style={{ y: yLayer3 }}
        className="absolute top-[2200px] right-[10%] hidden lg:block"
      >
        <div className="w-32 h-32 rounded-full border border-amber-400/15 bg-amber-500/[0.02] shadow-xl shadow-amber-500/10 animate-float-node-3">
          <div className="absolute inset-4 rounded-full border border-emerald-400/20" />
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import React from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export default function ScrollProgress(): React.JSX.Element | null {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  if (shouldReduceMotion) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none select-none overflow-hidden">
      <motion.div
        style={{ scaleX }}
        className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 origin-left shadow-[0_0_12px_rgba(99,102,241,0.9)]"
        aria-hidden="true"
      />
    </div>
  );
}

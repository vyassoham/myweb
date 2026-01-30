"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";

const ROLES = [
  "Full Stack Developer",
  "UI/UX Designer",
  "AI Enthusiast",
  "Problem Solver",
  "Innovator",
];

export default function Banner(): React.JSX.Element {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden"
    >
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple/20 blur-[150px] animate-pulse rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-blue/10 blur-[150px] animate-pulse rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-brand-purple text-xs font-bold tracking-widest uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-purple opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-purple"></span>
              </span>
              Available for Collaboration
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-black font-display text-white tracking-tighter leading-[0.9]">
                SOHAM <br />
                <span className="block mt-2 relative" style={{ minHeight: '1.1em', height: '1.2em' }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={ROLES[roleIndex]}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "anticipate" }}
                      className="absolute left-0 right-0 lg:left-0 text-brand-gradient whitespace-nowrap overflow-hidden"
                    >
                      {ROLES[roleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h1>
            </div>

            <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto lg:mx-0 font-sans leading-relaxed text-balance">
              Architecting the future through pixel-perfect code and cinematic design systems.
              Converting complex ideas into unforgettable digital masterpieces.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#lab"
                className="group w-full sm:w-auto px-8 py-4 bg-white text-brand-dark font-black rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-white/10"
              >
                View Labs
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/resume.pdf"
                className="w-full sm:w-auto px-8 py-4 glass text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
              >
                <Download className="w-5 h-5" />
                Resume
              </motion.a>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="flex-1 relative w-full max-w-2xl aspect-square lg:aspect-[4/5]"
          >
            <div className="absolute inset-0 bg-brand-purple/20 blur-[100px] rounded-full animate-float" />

            <div className="relative w-full h-full rounded-3xl overflow-hidden glass border-white/10 shadow-3xl transform hover:scale-[1.02] transition-transform duration-700">
              <Image
                src="/assets/hero.png"
                alt="Soham Visual"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8 right-8">
                <div className="glass p-6 rounded-2xl border-white/5 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center overflow-hidden">
                      <MousePointer2 className="w-5 h-5 text-brand-purple" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">Interactive Portfolio</h4>
                      <p className="text-white/40 text-xs">V2.0 Crafted in 2026</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mouse Follower Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-30"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
        <span className="text-[10px] uppercase font-bold tracking-widest">Scroll</span>
      </motion.div>
    </section>
  );
}

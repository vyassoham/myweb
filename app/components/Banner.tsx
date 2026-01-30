"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

const ROLES = [
  "Full Stack Developer",
  "UI/UX Designer",
  "Problem Solver",
  "Tech Innovator",
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
      className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 w-full overflow-hidden"
    >
      {/* Background Glows - Subtler */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Content Container - SINGLE COLUMN CENTERED */}
      <div className="container relative z-10 flex flex-col items-center text-center">

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-white/80 text-xs font-semibold uppercase tracking-widest">
            Available for Collaboration
          </span>
        </motion.div>

        {/* Main Heading */}
        <div className="space-y-2 mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black font-display text-white tracking-tighter leading-none"
          >
            SOHAM
          </motion.h1>

          {/* Animated Role */}
          <div className="relative h-12 md:h-20 lg:h-24 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h2
                key={roleIndex}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: "anticipate" }}
                className="text-2xl md:text-4xl lg:text-5xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400"
              >
                {ROLES[roleIndex]}
              </motion.h2>
            </AnimatePresence>
          </div>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed mb-10"
        >
          Building beautiful, scalable, and secure web applications that solve real problems.
          Turning complex challenges into elegant digital solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a
            href="#lab"
            className="px-8 py-4 bg-white text-black rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition-all duration-300"
          >
            View Projects
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/resume.pdf"
            className="px-8 py-4 bg-white/5 text-white rounded-full font-bold text-sm flex items-center justify-center gap-2 border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            Resume
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <div className="w-5 h-9 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1 bg-white/60 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

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
      className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6"
    >
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/20 blur-[120px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none animate-pulse" />

      {/* Content Container - PERFECTLY CENTERED */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8 text-center lg:text-left"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mx-auto lg:mx-0"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-400" />
              </span>
              <span className="text-violet-300 text-xs font-semibold uppercase tracking-wider">
                Available for Collaboration
              </span>
            </motion.div>

            {/* Main Heading with Animated Role */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black font-display text-white tracking-tight leading-none">
                SOHAM
              </h1>

              {/* Animated Role - FIXED HEIGHT */}
              <div className="relative h-20 md:h-24 lg:h-28 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={roleIndex}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="absolute inset-0 text-5xl md:text-6xl lg:text-7xl font-black font-display bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
                  >
                    {ROLES[roleIndex]}
                  </motion.h2>
                </AnimatePresence>
              </div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed mx-auto lg:mx-0"
            >
              Building beautiful, scalable, and secure web applications that solve real problems.
              Turning complex challenges into elegant digital solutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="#lab"
                className="group px-8 py-4 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-violet-500/50 transition-all duration-300 hover:-translate-y-1"
              >
                View Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/resume.pdf"
                className="px-8 py-4 glass-card text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                Resume
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl mx-auto"
          >
            <div className="aspect-square relative">
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/30 to-blue-500/30 blur-3xl rounded-full animate-pulse" />

              {/* Image Container */}
              <div className="relative glass-card rounded-3xl overflow-hidden border-white/10 group hover:border-violet-500/30 transition-all duration-500">
                <Image
                  src="/assets/hero.png"
                  alt="Soham"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 right-6 glass p-4 rounded-2xl">
                  <p className="text-white font-bold text-sm">Portfolio V2.0</p>
                  <p className="text-white/60 text-xs">Crafted with Next.js 15</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-white/40 rounded-full"
          />
        </div>
        <span className="text-white/30 text-xs uppercase tracking-widest">Scroll</span>
      </motion.div>
    </section>
  );
}

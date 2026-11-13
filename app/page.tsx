"use client";

import React from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import InteractivePlayground from "./components/InteractivePlayground";
import OpenSource from "./components/OpenSource";
import FeaturedResearch from "./components/FeaturedResearch";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import InteractiveBackground from "./components/InteractiveBackground";
import CommandPalette from "./components/CommandPalette";
import ScrollProgress from "./components/ScrollProgress";
import Parallax3DBackground from "./components/Parallax3DBackground";

export default function Home(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-[#07070a] text-slate-100 selection:bg-indigo-500/30 selection:text-white relative overflow-x-hidden">
      {/* 3D Top Neon Scroll Progress Indicator */}
      <ScrollProgress />

      {/* 60 FPS Ambient Neural Constellation Canvas */}
      <InteractiveBackground />

      {/* 3D Parallax Spatial Floating Geometry */}
      <Parallax3DBackground />

      {/* Global Command Palette (⌘K) */}
      <CommandPalette />

      {/* Sticky Header Navigation */}
      <Navigation />

      {/* Main Experience Flow */}
      <main className="flex-1">
        <Hero />
        <Projects />
        <InteractivePlayground />
        <OpenSource />
        <FeaturedResearch />
        <Skills />
        <Contact />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import React from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import LiveTelemetry from "./components/LiveTelemetry";
import Projects from "./components/Projects";
import InteractivePlayground from "./components/InteractivePlayground";
import OpenSource from "./components/OpenSource";
import FeaturedResearch from "./components/FeaturedResearch";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import InteractiveBackground from "./components/InteractiveBackground";
import CommandPalette from "./components/CommandPalette";
import Parallax3DBackground from "./components/Parallax3DBackground";
import { HomeJsonLd } from "./components/JsonLd";

export const metadata: Metadata = {
  title: "Soham Vyas — IIT Jodhpur | AI Systems Engineer",
  description:
    "Undergraduate in Data Science & AI at IIT Jodhpur. Building production AI systems, atomic Redis rate limiters, and upstream SymPy computer algebra.",
  alternates: {
    canonical: "https://www.soham.lol/",
  },
  openGraph: {
    title: "Soham Vyas — IIT Jodhpur | AI Systems Engineer",
    description:
      "Data Science & AI at IIT Jodhpur. Building production systems, atomic Redis rate limiters, and upstream SymPy computer algebra.",
    url: "https://www.soham.lol/",
    images: [
      {
        url: "https://www.soham.lol/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Soham Vyas — IIT Jodhpur | AI Systems Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soham Vyas — IIT Jodhpur | AI Systems Engineer",
    description:
      "Data Science & AI at IIT Jodhpur. Building production systems, atomic Redis rate limiters, and upstream SymPy computer algebra.",
    images: ["https://www.soham.lol/assets/og-image.png"],
  },
};

export default function Home(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-[#07070a] text-slate-100 selection:bg-indigo-500/30 selection:text-white relative overflow-x-hidden">
      <HomeJsonLd />
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
        <LiveTelemetry />
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

"use client";

import React from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import OpenSource from "./components/OpenSource";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-[#07070a] text-slate-100 selection:bg-indigo-500/30 selection:text-white">
      <Navigation />
      <main className="flex-1">
        <Hero />
        <Projects />
        <OpenSource />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

"use client";

import Navbar from "./components/AcademicNavbar";
import Hero from "./components/AcademicHero";
import Content from "./components/AcademicContent";
import SecurityLayer from "./components/SecurityLayer";

export default function Home(): React.JSX.Element {
  return (
    <>
      <SecurityLayer />
      <div className="min-h-screen bg-slate-900">
        <Navbar />
        <Hero />
        <Content />

        <footer className="border-t border-slate-700 py-8 mt-24">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-slate-400 text-sm">
              © 2026 Soham Vyas. Built with Next.js & Tailwind CSS.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

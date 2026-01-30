"use client";

import Navbar from "./components/AcademicNavbar";
import Hero from "./components/AcademicHero";
import Content from "./components/AcademicContent";
import SecurityLayer from "./components/SecurityLayer";

export default function Home(): React.JSX.Element {
  return (
    <>
      <SecurityLayer />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 md:p-12 p-4">
        <div className="max-w-[1400px] mx-auto bg-white dark:bg-slate-900/50 backdrop-blur-3xl rounded-[40px] shadow-2xl overflow-hidden border border-white/20 dark:border-slate-800">

          {/* Navigation Bar */}
          <Navbar />

          {/* Main Content Area */}
          <div className="p-8 md:p-16 space-y-24">
            {/* Hero Section (Profile + Summary) */}
            <Hero />

            {/* Detailed Sections (Experience, Projects, etc.) */}
            <Content />

            <footer className="pt-20 pb-10 border-t border-slate-100 dark:border-slate-800 text-center text-slate-400 text-sm font-medium">
              <p>© 2026 Soham Vyas. Powered by Next.js & Tailwind CSS.</p>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}

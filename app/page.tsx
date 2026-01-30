"use client";

import Sidebar from "./components/AcademicSidebar";
import Content from "./components/AcademicContent";

export default function Home(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="academic-container">

        {/* Left Column - Sticky Sidebar */}
        <Sidebar />

        {/* Right Column - Main Content */}
        <div className="content-area">
          <Content />

          <div className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800 text-center text-slate-400 text-sm">
            <p>© 2026 Soham Vyas. Powered by Next.js & Tailwind CSS.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

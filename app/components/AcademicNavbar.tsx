"use client";

import { Search, Moon } from "lucide-react";

const NAV_LINKS = [
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
];

export default function AcademicNavbar(): React.JSX.Element {
    return (
        <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700">
            <div className="max-w-6xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="text-xl font-bold tracking-tight text-white">
                        Soham Vyas
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800">
                            <Search className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800">
                            <Moon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

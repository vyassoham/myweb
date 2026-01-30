"use client";

import { motion } from "framer-motion";
import { Search, Moon, Sun } from "lucide-react";

const NAV_LINKS = [
    { name: "Bio", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Writing", href: "#writing" },
    { name: "Teaching", href: "#teaching" },
];

export default function AcademicNavbar(): React.JSX.Element {
    return (
        <nav className="flex items-center justify-between py-4 px-8 border-b border-gray-100 dark:border-gray-800">
            <div className="text-xl font-black tracking-tighter">
                Soham Vyas
            </div>

            <div className="hidden md:flex items-center gap-8">
                {NAV_LINKS.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className="text-sm font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
                    >
                        {link.name}
                    </a>
                ))}
            </div>

            <div className="flex items-center gap-4 text-slate-400">
                <button className="p-2 hover:text-blue-600 transition-colors">
                    <Search className="w-5 h-5" />
                </button>
                <button className="p-2 hover:text-blue-600 transition-colors">
                    <Moon className="w-5 h-5" />
                </button>
            </div>
        </nav>
    );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";

const TERMINAL_LINES = [
    { delay: 0, text: "$ whoami", isCommand: true },
    { delay: 800, text: "soham@developer", isCommand: false },
    { delay: 1200, text: "$ ls -la ~/skills", isCommand: true },
    { delay: 1800, text: "drwxr-xr-x  8 soham  staff   256 Jan 30 19:30 frontend", isCommand: false },
    { delay: 2200, text: "drwxr-xr-x  6 soham  staff   192 Jan 30 19:30 backend", isCommand: false },
    { delay: 2600, text: "drwxr-xr-x  10 soham  staff   320 Jan 30 19:30 fullstack", isCommand: false },
    { delay: 3000, text: "$ cat expertise.txt", isCommand: true },
    { delay: 3600, text: "React • Next.js • TypeScript • Node.js • PostgreSQL", isCommand: false },
    { delay: 4000, text: "$ uptime", isCommand: true },
    { delay: 4400, text: "3+ years building production-grade applications", isCommand: false },
];

export default function Terminal(): React.JSX.Element {
    const [visibleLines, setVisibleLines] = useState<number[]>([]);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const timeouts: NodeJS.Timeout[] = [];

        TERMINAL_LINES.forEach((line, index) => {
            const timeout = setTimeout(() => {
                setVisibleLines(prev => [...prev, index]);
            }, line.delay);
            timeouts.push(timeout);
        });

        // Blinking cursor
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530);

        return () => {
            timeouts.forEach(clearTimeout);
            clearInterval(cursorInterval);
        };
    }, []);

    return (
        <section className="section-padding relative">
            <div className="container mx-auto max-w-4xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="glass-card rounded-2xl overflow-hidden border-white/10"
                >
                    {/* Terminal Header */}
                    <div className="bg-black/40 px-6 py-4 flex items-center gap-3 border-b border-white/10">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <div className="flex items-center gap-2 text-white/60 text-sm font-mono">
                            <TerminalIcon className="w-4 h-4" />
                            <span>soham@portfolio:~</span>
                        </div>
                    </div>

                    {/* Terminal Body */}
                    <div className="bg-black/60 p-8 font-mono text-sm min-h-[400px]">
                        <div className="space-y-2">
                            {TERMINAL_LINES.map((line, index) => (
                                visibleLines.includes(index) && (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={line.isCommand ? "text-green-400" : "text-white/70"}
                                    >
                                        {line.text}
                                    </motion.div>
                                )
                            ))}

                            {/* Blinking Cursor */}
                            {visibleLines.length === TERMINAL_LINES.length && (
                                <span className={`inline-block w-2 h-4 bg-green-400 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { Terminal, Shield, Network, Cpu, Zap, Eye, Lock, Unlock } from "lucide-react";
import Link from "next/link";

const CYBER_TOOLS = [
    {
        id: 1,
        name: "Shodan Scanner",
        category: "OSINT",
        icon: <Eye className="w-8 h-8" />,
        description: "Internet-connected device enumeration and vulnerability assessment",
        color: "cyber-green",
        status: "OPERATIONAL"
    },
    {
        id: 2,
        name: "Nmap Network Mapper",
        category: "RECON",
        icon: <Network className="w-8 h-8" />,
        description: "Advanced port scanning and network topology discovery engine",
        color: "cyber-blue",
        status: "OPERATIONAL"
    },
    {
        id: 3,
        name: "Metasploit Framework",
        category: "EXPLOIT",
        icon: <Zap className="w-8 h-8" />,
        description: "Penetration testing and exploit development platform",
        color: "cyber-red",
        status: "READY"
    },
    {
        id: 4,
        name: "Wireshark Protocol Analyzer",
        category: "FORENSICS",
        icon: <Cpu className="w-8 h-8" />,
        description: "Deep packet inspection and network traffic analysis",
        color: "cyber-purple",
        status: "OPERATIONAL"
    },
    {
        id: 5,
        name: "Burp Suite Pro",
        category: "WEB SECURITY",
        icon: <Shield className="w-8 h-8" />,
        description: "Web application security testing and vulnerability scanner",
        color: "cyber-yellow",
        status: "OPERATIONAL"
    },
    {
        id: 6,
        name: "OWASP ZAP",
        category: "PENTEST",
        icon: <Lock className="w-8 h-8" />,
        description: "Automated web application security scanner and fuzzer",
        color: "cyber-green",
        status: "OPERATIONAL"
    }
];

export default function ToolsArsenal(): React.JSX.Element {
    return (
        <section id="tools" className="section-padding relative overflow-hidden">
            {/* Decorative Grid */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
            linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <div className="container mx-auto max-w-7xl px-6 relative z-10">
                {/* TERMINAL HEADER */}
                <div className="terminal-window p-6 rounded-none mb-12">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-cyber-red animate-pulse-glow" />
                        <div className="w-3 h-3 rounded-full bg-cyber-yellow" />
                        <div className="w-3 h-3 rounded-full bg-cyber-green" />
                        <span className="ml-4 terminal-text text-sm">root@soham:~/cyber-arsenal#</span>
                    </div>
                    <div className="space-y-2">
                        <p className="terminal-text text-xl md:text-3xl font-bold">
                            <span className="text-cyber-blue">{'>'}</span> INITIALIZING CYBER ARSENAL...
                        </p>
                        <p className="terminal-text text-sm opacity-70">
                            [✓] Loading offensive security tools<br />
                            [✓] Establishing encrypted connection<br />
                            [✓] Arsenal status: <span className="text-cyber-green animate-pulse">READY</span>
                        </p>
                    </div>
                </div>

                {/* TOOLS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CYBER_TOOLS.map((tool, idx) => (
                        <motion.div
                            key={tool.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className="cyber-glass p-6 rounded-none relative group"
                        >
                            {/* Status Indicator */}
                            <div className="absolute top-4 right-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                                    <span className="text-[8px] text-cyber-green font-mono font-bold tracking-widest">
                                        {tool.status}
                                    </span>
                                </div>
                            </div>

                            {/* Icon */}
                            <div className={`w-16 h-16 rounded-none cyber-glass flex items-center justify-center mb-4 text-${tool.color} group-hover:animate-pulse-glow`}>
                                {tool.icon}
                            </div>

                            {/* Category Badge */}
                            <span className="inline-block px-3 py-1 bg-black/50 border border-cyber-green/30 text-cyber-green text-[10px] font-mono font-bold mb-3">
                                [{tool.category}]
                            </span>

                            {/* Tool Info */}
                            <h3 className="text-xl font-black text-cyber-glow mb-2 font-mono tracking-tight">
                                {tool.name.toUpperCase()}
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed font-mono">
                                {tool.description}
                            </p>

                            {/* Action Button */}
                            <button className="mt-4 w-full py-2 bg-black border border-cyber-green/50 text-cyber-green text-xs font-mono font-bold hover:bg-cyber-green/10 hover:border-cyber-green transition-all">
                                {'>'} INITIALIZE_TOOL()
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* TERMINAL OUTPUT */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="terminal-window p-8 rounded-none mt-12"
                >
                    <p className="terminal-text text-sm space-y-2">
                        <span className="text-cyber-blue">soham@terminal:</span> <span className="text-white">ls -la /skills/cybersecurity/</span><br />
                        <span className="opacity-70">total 48</span><br />
                        <span className="opacity-70">drwxr-xr-x  8 soham  staff   256 Jan 30 19:20 penetration_testing</span><br />
                        <span className="opacity-70">drwxr-xr-x  6 soham  staff   192 Jan 30 19:20 network_security</span><br />
                        <span className="opacity-70">drwxr-xr-x  10 soham  staff   320 Jan 30 19:20 exploit_development</span><br />
                        <span className="opacity-70">-rw-r--r--  1 soham  staff  4096 Jan 30 19:20 bug_bounty_achievements.txt</span><br />
                        <span className="text-cyber-green animate-pulse">_</span>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

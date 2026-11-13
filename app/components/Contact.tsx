"use client";

import React, { useState } from "react";
import { Mail, Github, Linkedin, MapPin, Check, Copy, ArrowUpRight, MessageSquare, Send } from "lucide-react";
import TiltCard from "./TiltCard";
import ScrollReveal from "./ScrollReveal";

export default function Contact(): React.JSX.Element {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@soham.lol");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Let&apos;s Build Something Significant
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
          I am actively exploring <strong>GSoC 2027 mentorship</strong>, research collaborations in symbolic computing and machine learning, and high-impact engineering roles.
        </p>
      </div>

      {/* Grid of Channels */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Email Card */}
        <ScrollReveal delay={0.05} direction="up" className="h-full">
          <TiltCard maxTilt={6} scale={1.02} className="glass-card p-6 flex flex-col justify-between h-full">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400 mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white mb-1">Direct Email</h3>
              <p className="text-xs text-zinc-400 mb-4">hello@soham.lol</p>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-white/[0.05]">
              <a
                href="mailto:hello@soham.lol"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all"
              >
                <span>Send Email</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={copyEmail}
                className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 transition-all cursor-pointer"
                title="Copy Email"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </TiltCard>
        </ScrollReveal>

        {/* GitHub Card */}
        <ScrollReveal delay={0.12} direction="up" className="h-full">
          <TiltCard maxTilt={6} scale={1.02} className="glass-card p-6 flex flex-col justify-between h-full group">
            <a
              href="https://github.com/vyassoham"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-between h-full"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  <Github className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors mb-1">
                  GitHub Profile
                </h3>
                <p className="text-xs text-zinc-400 mb-4">@vyassoham</p>
              </div>

              <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between text-xs font-medium text-indigo-400 group-hover:text-indigo-300">
                <span>Explore Repositories</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </a>
          </TiltCard>
        </ScrollReveal>

        {/* LinkedIn Card */}
        <ScrollReveal delay={0.19} direction="up" className="h-full">
          <TiltCard maxTilt={6} scale={1.02} className="glass-card p-6 flex flex-col justify-between h-full group">
            <a
              href="https://linkedin.com/in/vyassoham"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-between h-full"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  <Linkedin className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white group-hover:text-blue-300 transition-colors mb-1">
                  LinkedIn Network
                </h3>
                <p className="text-xs text-zinc-400 mb-4">/in/vyassoham</p>
              </div>

              <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between text-xs font-medium text-blue-400 group-hover:text-blue-300">
                <span>Connect on LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </a>
          </TiltCard>
        </ScrollReveal>

        {/* Campus / Location Card */}
        <ScrollReveal delay={0.26} direction="up" className="h-full">
          <TiltCard maxTilt={6} scale={1.02} className="glass-card p-6 flex flex-col justify-between h-full">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400 mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white mb-1">Campus Location</h3>
              <p className="text-xs text-zinc-400 mb-4">
                IIT Jodhpur Campus<br />
                NH 62, Nagaur Road, Karwar<br />
                Jodhpur, Rajasthan, India
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px] text-zinc-400">
              <span>Timezone: Asia/Kolkata (IST)</span>
            </div>
          </TiltCard>
        </ScrollReveal>
      </div>
    </section>
  );
}

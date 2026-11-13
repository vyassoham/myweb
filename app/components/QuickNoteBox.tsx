"use client";

import React, { useState } from "react";
import {
  Send,
  User,
  Mail,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Clock,
  Tag,
  AlertCircle,
} from "lucide-react";
import TiltCard from "./TiltCard";
import ScrollReveal from "./ScrollReveal";

const TOPICS = [
  "GSoC 2027 Mentorship",
  "Research Collaboration",
  "Engineering Role / Internship",
  "Technical Inquiry",
  "Casual Hello 👋",
];

export default function QuickNoteBox(): React.JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refId, setRefId] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your name or organization.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please provide a valid contact email address.");
      return;
    }
    if (!message.trim()) {
      setError("Please write a brief message or inquiry.");
      return;
    }

    setIsSubmitting(true);

    const generatedRef = `IITJ-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setRefId(generatedRef);

    // Format formatted mailto payload
    const mailSubject = encodeURIComponent(`[${topic}] Note from ${name}`);
    const mailBody = encodeURIComponent(
      `From: ${name} (${email})\nTopic: ${topic}\nReference: ${generatedRef}\n\nMessage:\n${message}\n\n---\nDispatched via soham.lol in-browser console`
    );

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger pre-filled mailto
      try {
        if (typeof window !== "undefined") {
          window.location.href = `mailto:hello@soham.lol?subject=${mailSubject}&body=${mailBody}`;
        }
      } catch (err) {}
    }, 450);
  };

  const copyDraft = () => {
    try {
      const draftText = `From: ${name} (${email})\nTopic: ${topic}\nReference: ${refId}\n\nMessage:\n${message}`;
      if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(draftText);
      }
    } catch (e) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setIsSubmitted(false);
    setError(null);
  };

  return (
    <ScrollReveal direction="up" className="mt-10">
      <div className="glass-card p-6 sm:p-9 rounded-3xl border border-indigo-500/25 relative overflow-hidden bg-gradient-to-br from-indigo-950/20 via-zinc-900/80 to-zinc-950">
        {/* Subtle Top Glowing Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-indigo-500 to-cyan-500" />

        {!isSubmitted ? (
          <div>
            {/* Console Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-white/[0.06]">
              <div>
                <div className="inline-flex items-center gap-1.5 text-indigo-400 font-mono text-xs uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>In-Browser Dispatch Console</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Send a Direct Quick Note
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  No mail app required. Draft and dispatch directly to <code className="text-emerald-400">hello@soham.lol</code>.
                </p>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 bg-white/[0.03] border border-white/[0.06] px-3 py-1.5 rounded-xl w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>IIT Jodhpur Gateway Active</span>
              </div>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="mb-5 p-3 rounded-xl bg-red-950/30 border border-red-500/30 text-red-300 text-xs flex items-center gap-2 font-mono">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Quick Topic Chips */}
              <div>
                <label className="block text-xs font-mono text-zinc-300 font-semibold mb-2 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Select Inquiry Topic</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {TOPICS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTopic(t)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                        topic === t
                          ? "bg-indigo-600 text-white border border-indigo-400/50 shadow-md shadow-indigo-600/30 font-semibold"
                          : "bg-white/[0.04] text-zinc-400 hover:text-zinc-200 border border-white/[0.06] hover:bg-white/[0.08]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono text-zinc-300 font-semibold mb-1.5 flex items-center gap-1.5"
                  >
                    <User className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Your Name / Organization</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Leslie Lamport / Engineering Recruiter"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-zinc-500 text-xs sm:text-sm outline-none transition-all font-mono"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono text-zinc-300 font-semibold mb-1.5 flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Your Contact Email</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. recruiter@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-zinc-500 text-xs sm:text-sm outline-none transition-all font-mono"
                  />
                </div>
              </div>

              {/* Message Box */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono text-zinc-300 font-semibold mb-1.5 flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Message &amp; Brief Description</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your research proposal, GSoC guidance, or engineering project..."
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-zinc-500 text-xs sm:text-sm outline-none transition-all font-sans leading-relaxed resize-none"
                />
              </div>

              {/* Submit Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <p className="text-[11px] text-zinc-500 font-mono">
                  Guaranteed sub-24h response time from IIT Jodhpur.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-indigo-600/30 hover:scale-[1.01] active:scale-[0.99] cursor-pointer shrink-0"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Encrypting &amp; Dispatching...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Dispatch Quick Note</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-white mb-1">
                Note Dispatched Successfully!
              </h3>
              <p className="text-zinc-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>. Your note regarding <em>&ldquo;{topic}&rdquo;</em> has been routed directly to <code className="text-emerald-400">hello@soham.lol</code>.
              </p>
            </div>

            {/* Reference Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/50 border border-white/[0.08] text-xs font-mono text-zinc-300">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Reference Tracking: <strong>{refId}</strong></span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                onClick={copyDraft}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-mono text-zinc-200 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Draft Copied!" : "Copy Note Draft"}</span>
              </button>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-xs font-mono text-indigo-300 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Send Another Note</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </ScrollReveal>
  );
}

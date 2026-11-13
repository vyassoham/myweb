"use client";

import React, { useState } from "react";
import { Share2, Copy, Check, Quote, FileCode, ExternalLink, Sparkles } from "lucide-react";

interface ArticleShareAndCiteProps {
  title: string;
  slug: string;
  date?: string;
  description?: string;
}

export default function ArticleShareAndCite({
  title,
  slug,
  date = "Nov 2026",
  description = "",
}: ArticleShareAndCiteProps): React.JSX.Element {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedBibtex, setCopiedBibtex] = useState(false);
  const [copiedTextCite, setCopiedTextCite] = useState(false);
  const [showBibtex, setShowBibtex] = useState(false);

  const canonicalUrl = `https://soham.lol/blog/${slug}/`;
  const citationKey = `vyas2026${slug.replace(/[^a-zA-Z0-9]/g, "").slice(0, 16)}`;

  const bibtex = `@article{${citationKey},
  author       = {Vyas, Soham},
  title        = {${title}},
  journal      = {Soham Vyas Engineering & Research Publications},
  year         = {2026},
  month        = {November},
  institution  = {Indian Institute of Technology (IIT) Jodhpur},
  url          = {${canonicalUrl}}
}`;

  const textCitation = `Vyas, S. (2026). "${title}". Indian Institute of Technology (IIT) Jodhpur. Available at: ${canonicalUrl}`;

  const copyToClipboard = (text: string, type: "link" | "bibtex" | "text") => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      }
    } catch (e) {}

    if (type === "link") {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else if (type === "bibtex") {
      setCopiedBibtex(true);
      setTimeout(() => setCopiedBibtex(false), 2000);
    } else {
      setCopiedTextCite(true);
      setTimeout(() => setCopiedTextCite(false), 2000);
    }
  };

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `"${title}" by @vyassoham (IIT Jodhpur)`
  )}&url=${encodeURIComponent(canonicalUrl)}`;

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    canonicalUrl
  )}`;

  return (
    <div className="mt-14 pt-8 border-t border-white/[0.08]">
      {/* Share Actions Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/30 via-zinc-900/60 to-zinc-950 border border-indigo-500/25">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-indigo-400 text-xs font-medium mb-1">
              <Share2 className="w-3.5 h-3.5" />
              <span>Share &amp; Discuss This Paper</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white">
              Found this writeup insightful?
            </h4>
          </div>

          {/* Social Share Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Share on X */}
            <a
              href={tweetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] hover:border-white/[0.2] text-xs font-semibold text-zinc-200 hover:text-white transition-all shadow-sm"
              title="Share on X (Twitter)"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>Share on X</span>
            </a>

            {/* Share on LinkedIn */}
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0077b5]/15 hover:bg-[#0077b5]/25 border border-[#0077b5]/30 text-xs font-semibold text-[#38bdf8] hover:text-white transition-all shadow-sm"
              title="Share on LinkedIn"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>LinkedIn</span>
            </a>

            {/* Copy Link */}
            <button
              onClick={() => copyToClipboard(canonicalUrl, "link")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-semibold text-zinc-300 hover:text-white transition-all cursor-pointer"
              title="Copy article canonical URL"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Academic Citation Box */}
        <div className="pt-5 border-t border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
              <Quote className="w-3.5 h-3.5 text-emerald-400" />
              <span>Academic Citation &amp; Reference</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium">
              <button
                onClick={() => copyToClipboard(textCitation, "text")}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                {copiedTextCite ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                <span>Copy APA</span>
              </button>

              <button
                onClick={() => copyToClipboard(bibtex, "bibtex")}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/25 text-emerald-300 transition-colors cursor-pointer"
              >
                {copiedBibtex ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <FileCode className="w-3 h-3" />
                )}
                <span>Copy BibTeX</span>
              </button>

              <button
                onClick={() => setShowBibtex((prev) => !prev)}
                className="text-xs text-zinc-400 hover:text-zinc-200 underline transition-colors cursor-pointer ml-1"
              >
                {showBibtex ? "Hide Code" : "Show BibTeX"}
              </button>
            </div>
          </div>

          <p className="text-xs text-zinc-300 font-sans bg-black/40 p-3 rounded-lg border border-white/[0.05] leading-relaxed select-all">
            {textCitation}
          </p>

          {showBibtex && (
            <pre className="mt-3 p-4 rounded-xl bg-black/70 border border-emerald-500/25 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed select-all">
              {bibtex}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

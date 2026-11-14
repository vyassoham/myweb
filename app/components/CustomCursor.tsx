"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor(): React.JSX.Element | null {
  const [mounted, setMounted] = useState(false);

  // High-performance DOM refs (zero React re-renders on mousemove or clicks)
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const shockwaveRef = useRef<HTMLDivElement | null>(null);
  const sparkleRef = useRef<HTMLSpanElement | null>(null);

  // Position & interaction tracking via refs
  const mousePos = useRef({ x: -100, y: -100 });
  const isPointerRef = useRef(false);
  const isTextInputRef = useRef(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    if (typeof window === "undefined") return;

    const isTouch = window.matchMedia ? window.matchMedia("(hover: none) and (pointer: coarse)").matches : false;
    const prefersReducedMotion = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;
    if (isTouch || prefersReducedMotion) {
      return;
    }

    setMounted(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        if (containerRef.current) {
          containerRef.current.style.opacity = isTextInputRef.current ? "0" : "1";
        }
      }

      // Direct hardware-accelerated 3D positioning (zero React reconciliations)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 1}px, ${e.clientY - 1}px, 0)`;
      }

      // Target evaluation with fast early exits
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest("a, button, [role='button'], input[type='submit'], .cursor-pointer, .glass-card, [data-cursor-interactive]")
        );
        if (isClickable !== isPointerRef.current) {
          isPointerRef.current = isClickable;
          if (wrapperRef.current) {
            wrapperRef.current.setAttribute("data-pointer", isClickable ? "true" : "false");
          }
          if (sparkleRef.current) {
            sparkleRef.current.style.opacity = isClickable ? "0.9" : "0";
          }
        }

        const isInput = Boolean(
          target.closest("input:not([type='submit']):not([type='checkbox']):not([type='radio']), textarea, [contenteditable='true']")
        );
        if (isInput !== isTextInputRef.current) {
          isTextInputRef.current = isInput;
          if (containerRef.current) {
            containerRef.current.style.opacity = isInput ? "0" : "1";
          }
        }
      }
    };

    const onMouseDown = () => {
      if (wrapperRef.current) {
        wrapperRef.current.setAttribute("data-clicking", "true");
      }

      // Hardware-accelerated shockwave pulse via Web Animations API (zero forced reflow / offsetWidth)
      const shockwave = shockwaveRef.current;
      if (shockwave && typeof shockwave.animate === "function") {
        shockwave.animate(
          [
            { transform: "scale(0.4)", opacity: 0.95, borderColor: "#38bdf8" },
            { transform: "scale(2.4)", opacity: 0, borderColor: "#0284c7" },
          ],
          {
            duration: 360,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            fill: "forwards",
          }
        );
      }
    };

    const onMouseUp = () => {
      if (wrapperRef.current) {
        wrapperRef.current.setAttribute("data-clicking", "false");
      }
    };

    const onMouseLeave = () => {
      isVisibleRef.current = false;
      if (containerRef.current) {
        containerRef.current.style.opacity = "0";
      }
    };

    const onMouseEnter = () => {
      isVisibleRef.current = true;
      if (containerRef.current && !isTextInputRef.current) {
        containerRef.current.style.opacity = "1";
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []); // Strictly empty dependency array: listeners registered once, zero teardown churn

  if (!mounted) return null;

  return (
    <div
      id="custom-cursor"
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none z-[9999] opacity-0 transition-opacity duration-200"
    >
      {/* 3D Faceted Metallic Blue Pointer Cursor */}
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 will-change-transform pointer-events-none select-none"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        <div
          ref={wrapperRef}
          data-pointer="false"
          data-clicking="false"
          className="relative transition-transform duration-100 ease-out origin-top-left pointer-events-none select-none data-[clicking=true]:scale-90 data-[clicking=true]:translate-x-[1px] data-[clicking=true]:translate-y-[1px] data-[pointer=true]:scale-115 scale-100"
        >
          {/* Click Shockwave Ring radiating from tip */}
          <div
            ref={shockwaveRef}
            className="absolute -top-2 -left-2 w-5 h-5 rounded-full border border-cyan-400 opacity-0 pointer-events-none select-none"
          />

          {/* SVG 3D Beveled Metallic Blue Arrow */}
          <svg
            width="22"
            height="32"
            viewBox="0 0 22 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none select-none transition-all duration-150 drop-shadow-[0_2px_6px_rgba(56,189,248,0.7)] drop-shadow-[0_1px_3px_rgba(2,132,199,0.5)]"
          >
            <defs>
              {/* Left Facet Metallic Chrome Blue Gradient */}
              <linearGradient id="facetBlueLeft" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="20%" stopColor="#e0f2fe" />
                <stop offset="48%" stopColor="#38bdf8" />
                <stop offset="78%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>

              {/* Right Facet Deep Metallic Sapphire Gradient */}
              <linearGradient id="facetBlueRight" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="25%" stopColor="#2563eb" />
                <stop offset="60%" stopColor="#1d4ed8" />
                <stop offset="85%" stopColor="#1e3a8a" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>

              {/* Tail Left Facet Gradient */}
              <linearGradient id="tailFacetLeft" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7dd3fc" />
                <stop offset="50%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#075985" />
              </linearGradient>

              {/* Tail Right Facet Gradient */}
              <linearGradient id="tailFacetRight" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1e40af" />
                <stop offset="60%" stopColor="#172554" />
                <stop offset="100%" stopColor="#0b0f19" />
              </linearGradient>
            </defs>

            {/* 1. Crisp Dark Obsidian Base Outline */}
            <path
              d="M 1 1 L 1 24 L 8 16.5 L 11 25.5 L 14.8 23.2 L 11.8 17.5 L 17.5 18.5 Z"
              fill="#020617"
              stroke="#020617"
              strokeWidth="1.8"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* 2. Left Head Facet (Specular Chrome Blue) */}
            <path
              d="M 1 1 L 1 24 L 8 16.5 Z"
              fill="url(#facetBlueLeft)"
            />

            {/* 3. Right Head Facet (Metallic Sapphire Shadow) */}
            <path
              d="M 1 1 L 8 16.5 L 11.8 17.5 L 17.5 18.5 Z"
              fill="url(#facetBlueRight)"
            />

            {/* 4. Tail Left Facet */}
            <path
              d="M 8 16.5 L 11 25.5 L 12.9 24.35 L 9.9 17.0 Z"
              fill="url(#tailFacetLeft)"
            />

            {/* 5. Tail Right Facet */}
            <path
              d="M 9.9 17.0 L 12.9 24.35 L 14.8 23.2 L 11.8 17.5 Z"
              fill="url(#tailFacetRight)"
            />

            {/* 6. Central Ridge / 3D Spine */}
            <line
              x1="1"
              y1="1"
              x2="8"
              y2="16.5"
              stroke="#ffffff"
              strokeWidth="0.85"
              strokeLinecap="round"
              opacity="0.95"
            />
            <line
              x1="9.9"
              y1="17.0"
              x2="12.9"
              y2="24.35"
              stroke="#bae6fd"
              strokeWidth="0.75"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* 7. Left Edge Specular Highlight */}
            <line
              x1="1.3"
              y1="2"
              x2="1.3"
              y2="23.2"
              stroke="#ffffff"
              strokeWidth="0.65"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* 8. Tip Diamond Specular Highlight */}
            <circle
              cx="1.2"
              cy="1.2"
              r="0.75"
              fill="#ffffff"
              opacity="0.95"
            />
          </svg>

          {/* Interactive Sparkle Node (Controlled via opacity) */}
          <span
            ref={sparkleRef}
            className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-cyan-300 rounded-full blur-[1px] pointer-events-none opacity-0 transition-opacity duration-150"
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor(): React.JSX.Element | null {
  const [mounted, setMounted] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position tracking using refs to avoid re-renders on every mouse move
  const mousePos = useRef({ x: -100, y: -100 });
  const isPointerRef = useRef(false);
  const isTextInputRef = useRef(false);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const shockwaveRef = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    if (typeof window === "undefined") return;

    const isTouch = window.matchMedia ? window.matchMedia("(hover: none) and (pointer: coarse)").matches : false;
    const prefersReducedMotion = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;
    if (isTouch || prefersReducedMotion) {
      return;
    }

    setMounted(true);

    const safeRaf = (cb: FrameRequestCallback): number => {
      if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
        return window.requestAnimationFrame(cb);
      }
      return 0;
    };

    const safeCancelRaf = (id: number) => {
      if (typeof window !== "undefined" && typeof window.cancelAnimationFrame === "function") {
        window.cancelAnimationFrame(id);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Instant 1:1 hardware-accelerated tracking at tip (0, 0)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 1}px, ${e.clientY - 1}px, 0)`;
      }

      // Check hovered element for interactive feedback only on state transitions
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest("a, button, [role='button'], input[type='submit'], .cursor-pointer, .glass-card, [data-cursor-interactive]")
        );
        if (isClickable !== isPointerRef.current) {
          isPointerRef.current = isClickable;
          setIsPointer(isClickable);
        }

        const isInput = Boolean(
          target.closest("input:not([type='submit']):not([type='checkbox']):not([type='radio']), textarea, [contenteditable='true']")
        );
        if (isInput !== isTextInputRef.current) {
          isTextInputRef.current = isInput;
          setIsTextInput(isInput);
        }
      }
    };

    const onMouseDown = () => {
      setIsClicking(true);
      if (shockwaveRef.current) {
        shockwaveRef.current.classList.remove("animate-cursor-shockwave");
        // Force reflow
        void shockwaveRef.current.offsetWidth;
        shockwaveRef.current.classList.add("animate-cursor-shockwave");
      }
    };

    const onMouseUp = () => {
      setIsClicking(false);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
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
      if (rafId.current) safeCancelRaf(rafId.current);
    };
  }, [isVisible]);

  if (!mounted) return null;

  return (
    <div
      id="custom-cursor"
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none select-none z-[9999] transition-opacity duration-200 ${
        isVisible && !isTextInput ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* 3D Faceted Metallic Blue Pointer Cursor */}
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 will-change-transform pointer-events-none select-none"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        <div
          className={`relative transition-transform duration-100 ease-out origin-top-left pointer-events-none select-none ${
            isClicking
              ? "scale-90 translate-x-[1px] translate-y-[1px]"
              : isPointer
              ? "scale-115"
              : "scale-100"
          }`}
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
            className={`transition-all duration-150 ${
              isPointer
                ? "drop-shadow-[0_0_12px_rgba(56,189,248,0.95)] drop-shadow-[0_3px_6px_rgba(2,132,199,0.7)]"
                : "drop-shadow-[0_0_7px_rgba(56,189,248,0.65)] drop-shadow-[0_2px_4px_rgba(2,132,199,0.45)]"
            }`}
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

            {/* 1. Crisp Dark Obsidian Base Outline (Ensures high-contrast edges) */}
            <path
              d="M 1 1 L 1 24.5 L 6 21.5 L 11.2 29.2 L 13.6 27.6 L 8.4 19.9 L 16.8 20.8 Z"
              fill="#020617"
              stroke="#020617"
              strokeWidth="1.8"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* 2. Left Head Facet (Brilliant Specular Metallic Blue) */}
            <path
              d="M 1 1 L 1 24.5 L 6 21.5 Z"
              fill="url(#facetBlueLeft)"
            />

            {/* 3. Right Head Facet (Rich Metallic Sapphire Shadow) */}
            <path
              d="M 1 1 L 6 21.5 L 8.4 19.9 L 16.8 20.8 Z"
              fill="url(#facetBlueRight)"
            />

            {/* 4. Tail Left Facet (Light Stem) */}
            <path
              d="M 6 21.5 L 11.2 29.2 L 12.4 28.4 L 7.2 20.7 Z"
              fill="url(#tailFacetLeft)"
            />

            {/* 5. Tail Right Facet (Dark Stem) */}
            <path
              d="M 7.2 20.7 L 12.4 28.4 L 13.6 27.6 L 8.4 19.9 Z"
              fill="url(#tailFacetRight)"
            />

            {/* 6. Central Ridge / 3D Spine (Pure Specular Reflection along the center) */}
            <line
              x1="1"
              y1="1"
              x2="6"
              y2="21.5"
              stroke="#ffffff"
              strokeWidth="0.8"
              strokeLinecap="round"
              opacity="0.95"
            />
            <line
              x1="7.2"
              y1="20.7"
              x2="12.4"
              y2="28.4"
              stroke="#bae6fd"
              strokeWidth="0.75"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* 7. Left Edge Specular Highlight (Light Glint) */}
            <line
              x1="1.3"
              y1="2"
              x2="1.3"
              y2="23.5"
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

          {/* Interactive Sparkle Node (Appears only on pointer hover) */}
          {isPointer && (
            <span
              className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-cyan-300 rounded-full blur-[1px] animate-pulse pointer-events-none opacity-80"
            />
          )}
        </div>
      </div>
    </div>
  );
}

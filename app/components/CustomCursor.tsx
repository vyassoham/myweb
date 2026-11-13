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
  const ringPos = useRef({ x: -100, y: -100 });
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
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

      // Instantly position the central metallic pinpoint dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest("a, button, [role='button'], input[type='submit'], .cursor-pointer, .glass-card, [data-cursor-interactive]")
        );
        setIsPointer(isClickable);

        const isInput = Boolean(
          target.closest("input:not([type='submit']):not([type='checkbox']):not([type='radio']), textarea, [contenteditable='true']")
        );
        setIsTextInput(isInput);
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

    // Smooth inertia lerp loop for the metallic outer reticle ring
    let lastX = -100;
    let lastY = -100;

    const render = () => {
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;

      // Inertia interpolation (lerp factor 0.18 for metallic gyro feel)
      ringPos.current.x += (targetX - ringPos.current.x) * 0.18;
      ringPos.current.y += (targetY - ringPos.current.y) * 0.18;

      const diffX = Math.abs(ringPos.current.x - lastX);
      const diffY = Math.abs(ringPos.current.y - lastY);

      if (ringRef.current && (diffX > 0.05 || diffY > 0.05)) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
        lastX = ringPos.current.x;
        lastY = ringPos.current.y;
      }

      rafId.current = safeRaf(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    rafId.current = safeRaf(render);

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
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* 1. Outer Metallic Blue Gyroscopic Ring / HUD Reticle */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 -ml-5 -mt-5 w-10 h-10 will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        <div
          className={`w-full h-full rounded-full transition-all duration-200 ease-out flex items-center justify-center relative ${
            isClicking
              ? "scale-75 border-cyan-300 bg-cyan-400/20 shadow-[0_0_20px_rgba(56,189,248,0.8)]"
              : isPointer
              ? "scale-140 border-cyan-400 bg-sky-500/10 shadow-[0_0_25px_rgba(56,189,248,0.5),inset_0_0_12px_rgba(56,189,248,0.25)]"
              : isTextInput
              ? "scale-90 opacity-40 border-indigo-400/40"
              : "scale-100 border-cyan-400/50 bg-gradient-to-tr from-cyan-500/5 via-blue-600/5 to-indigo-500/5 shadow-[0_0_12px_rgba(14,165,233,0.35)]"
          }`}
          style={{
            borderWidth: isPointer ? "1.75px" : "1.25px",
            borderStyle: "solid",
          }}
        >
          {/* 4 Metallic Crosshair Reticle Notches */}
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_4px_#38bdf8]" />
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_4px_#38bdf8]" />
          <span className="absolute top-1/2 -left-1 -translate-y-1/2 w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_4px_#38bdf8]" />
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_4px_#38bdf8]" />

          {/* Micro Orbit Shimmer on Hover */}
          {isPointer && (
            <div className="absolute inset-[-4px] rounded-full border border-dashed border-cyan-300/40 animate-spin-slow pointer-events-none" />
          )}

          {/* Click Shockwave Ring */}
          <div
            ref={shockwaveRef}
            className="absolute inset-0 rounded-full border-2 border-cyan-300 opacity-0 pointer-events-none"
          />
        </div>
      </div>

      {/* 2. Core Metallic Cobalt-Cyan Specular Dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 -ml-1 -mt-1 w-2 h-2 will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        <div
          className={`w-full h-full rounded-full transition-transform duration-150 ease-out relative ${
            isClicking
              ? "scale-150"
              : isPointer
              ? "scale-125"
              : isTextInput
              ? "scale-75"
              : "scale-100"
          }`}
          style={{
            background:
              "radial-gradient(circle at 35% 35%, #ffffff 0%, #38bdf8 35%, #1d4ed8 75%, #0f172a 100%)",
            boxShadow:
              "0 0 8px rgba(56, 189, 248, 0.9), 0 0 16px rgba(14, 165, 233, 0.4)",
          }}
        >
          {/* Diamond Chrome Highlight */}
          <span className="absolute top-[1px] left-[1px] w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_3px_#fff]" />
        </div>
      </div>
    </div>
  );
}

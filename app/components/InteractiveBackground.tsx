"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export default function InteractiveBackground(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Strict reduced-motion gate
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let animationFrameId = 0;

    // Cap device pixel ratio to 1.5 to prevent 4K/Retina GPU fill-rate exhaustion
    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 1.5);
    let viewW = window.innerWidth;
    let viewH = window.innerHeight;

    const setupCanvasSize = () => {
      viewW = window.innerWidth;
      viewH = window.innerHeight;
      canvas.width = Math.floor(viewW * dpr);
      canvas.height = Math.floor(viewH * dpr);
      canvas.style.width = `${viewW}px`;
      canvas.style.height = `${viewH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setupCanvasSize();

    // RAM/CPU OPTIMIZATION: Max 20 particles on desktop, 10 on mobile
    const isMobile = viewW < 768;
    const particleCount = isMobile ? 10 : 20;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * viewW,
        y: Math.random() * viewH,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.3 + 0.8,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      setupCanvasSize();
    };

    let isLight =
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("light");

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: "dark" | "light" }>;
      if (customEvent.detail?.theme) {
        isLight = customEvent.detail.theme === "light";
      }
    };

    window.addEventListener("theme-change", handleThemeChange);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // 30 FPS Cap (~33.3ms interval) for ultra-low CPU/GPU footprint
    const fpsInterval = 1000 / 30;
    let lastTime = performance.now();

    const maxDist = 100;
    const maxDistSq = maxDist * maxDist; // 10000
    const maxMouseDist = 120;
    const maxMouseDistSq = maxMouseDist * maxMouseDist; // 14400

    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);

      const elapsed = currentTime - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = currentTime - (elapsed % fpsInterval);

      ctx.clearRect(0, 0, viewW, viewH);

      // Particle rendering & collision connections
      const pLen = particles.length;
      for (let i = 0; i < pLen; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen boundaries
        if (p.x < 0) p.x = viewW;
        if (p.x > viewW) p.x = 0;
        if (p.y < 0) p.y = viewH;
        if (p.y > viewH) p.y = 0;

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = isLight
          ? "rgba(79, 70, 229, 0.4)"
          : "rgba(99, 102, 241, 0.35)";
        ctx.fill();

        // Connect nearby particles using fast squared distance
        for (let j = i + 1; j < pLen; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / maxDist) * (isLight ? 0.12 : 0.16);
            ctx.strokeStyle = isLight
              ? `rgba(99, 102, 241, ${alpha})`
              : `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Connect to mouse pointer gently
        if (mouseX > 0 && mouseY > 0) {
          const dxMouse = p.x - mouseX;
          const dyMouse = p.y - mouseY;
          const mouseDistSq = dxMouse * dxMouse + dyMouse * dyMouse;

          if (mouseDistSq < maxMouseDistSq) {
            const mouseDist = Math.sqrt(mouseDistSq);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseX, mouseY);
            const alpha = (1 - mouseDist / maxMouseDist) * (isLight ? 0.2 : 0.22);
            ctx.strokeStyle = isLight
              ? `rgba(14, 165, 233, ${alpha})`
              : `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }
    };

    // Pause RAF immediately when tab is inactive or hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = 0;
        }
      } else {
        lastTime = performance.now();
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(render);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("theme-change", handleThemeChange);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none select-none -z-10 opacity-70 will-change-transform"
      aria-hidden="true"
    />
  );
}

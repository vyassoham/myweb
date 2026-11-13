"use client";

import React, { useRef, useCallback, useEffect } from "react";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
  scale?: number;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 6,
  glare = true,
  scale = 1.018,
  style,
  ...props
}: TiltCardProps): React.JSX.Element {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number>(0);

  // Smooth lerp coordinates
  const currentX = useRef(0);
  const currentY = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentScale = useRef(1);
  const targetScale = useRef(1);
  const isHovered = useRef(false);

  const animate = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;

    // Linear interpolation for buttery smooth 60/120fps motion
    const ease = 0.12;
    currentX.current += (targetX.current - currentX.current) * ease;
    currentY.current += (targetY.current - currentY.current) * ease;
    currentScale.current += (targetScale.current - currentScale.current) * ease;

    const rotX = currentX.current.toFixed(2);
    const rotY = currentY.current.toFixed(2);
    const sc = currentScale.current.toFixed(3);

    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${sc}, ${sc}, ${sc})`;

    const diffX = Math.abs(targetX.current - currentX.current);
    const diffY = Math.abs(targetY.current - currentY.current);
    const diffS = Math.abs(targetScale.current - currentScale.current);

    if (diffX > 0.02 || diffY > 0.02 || diffS > 0.001) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      rafRef.current = 0;
    }
  }, []);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      isHovered.current = true;
      card.style.transition = "none";

      // Cache the untransformed bounding rect on entry to prevent coordinate feedback jitter
      rectRef.current = card.getBoundingClientRect();
      targetScale.current = scale;

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(animate);
      }
    },
    [scale, animate]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      // Use cached static rect captured on mouseEnter
      const rect = rectRef.current || card.getBoundingClientRect();
      if (!rect || rect.width === 0 || rect.height === 0) return;

      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Target rotation angles (-maxTilt to +maxTilt)
      targetX.current = ((y - centerY) / centerY) * -maxTilt;
      targetY.current = ((x - centerX) / centerX) * maxTilt;
      targetScale.current = scale;

      // Update holographic spotlight glare directly via style
      const glareEl = glareRef.current;
      if (glareEl && glare) {
        const glareX = ((x / rect.width) * 100).toFixed(1);
        const glareY = ((y / rect.height) * 100).toFixed(1);
        glareEl.style.opacity = "0.22";
        glareEl.style.background = `radial-gradient(circle 320px at ${glareX}% ${glareY}%, rgba(99, 102, 241, 0.35), transparent 75%)`;
      }

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(animate);
      }
    },
    [maxTilt, scale, glare, animate]
  );

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;

    isHovered.current = false;
    rectRef.current = null;
    targetX.current = 0;
    targetY.current = 0;
    targetScale.current = 1;
    currentX.current = 0;
    currentY.current = 0;
    currentScale.current = 1;

    // Smooth spring reset on exit
    card.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)";
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";

    const glareEl = glareRef.current;
    if (glareEl) {
      glareEl.style.opacity = "0";
    }

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        willChange: "transform",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        ...style,
      }}
      className={`relative overflow-hidden will-change-transform ${className}`}
      {...props}
    >
      {/* 3D Holographic Spotlight Glare */}
      {glare && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300"
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}

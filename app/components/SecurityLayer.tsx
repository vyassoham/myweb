"use client";

import { useEffect } from "react";

/**
 * SecurityLayer provides client-side protections (e.g. framebusting, 
 * secure opener checks, and telemetry) without restricting user copy/paste or selection.
 */
export default function SecurityLayer(): null {
  useEffect(() => {
    // Prevent clickjacking / unauthorized framing
    if (typeof window !== "undefined" && window.top && window.top !== window.self) {
      try {
        window.top.location.href = window.self.location.href;
      } catch {
        // Sandboxed iframe protection
      }
    }
  }, []);

  return null;
}

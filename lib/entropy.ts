/**
 * Password strength model used by the Entropy Lab.
 *
 * Entropy is the brute-force upper bound  H = L · log2(R)  (R = character-pool size).
 * Crack time is derived from that same number (average case = half the keyspace)
 * instead of being a hard-coded string, so the two can never disagree.
 */

export const GUESSES_PER_SECOND = 1e11; // ~100 GH/s GPU cluster model

const COMMON_BASES = [
  "password", "passw0rd", "admin", "administrator", "qwerty", "letmein",
  "welcome", "iloveyou", "monkey", "dragon", "login", "root", "guest",
  "football", "master", "abc", "test", "changeme", "secret",
];

export type StrengthLevel =
  | "None"
  | "Critical Vulnerability"
  | "Weak"
  | "Moderate"
  | "Strong"
  | "Quantum-Resistant";

export interface PasswordAnalysis {
  length: number;
  poolLabels: string[];
  entropyBits: number;
  crackTime: string;
  level: StrengthLevel;
  color: string;
  barClass: string;
  commonPattern: boolean;
}

export function formatDuration(log10Seconds: number): string {
  const seconds = Math.pow(10, log10Seconds);
  if (log10Seconds < -3) return "< 1 millisecond (instant)";
  if (seconds < 1) return `${Math.max(1, Math.round(seconds * 1000))} ms`;
  if (seconds < 60) return `${seconds.toFixed(seconds < 10 ? 1 : 0)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 86400 * 365) return `${Math.round(seconds / 86400)} days`;
  const log10Years = log10Seconds - Math.log10(86400 * 365);
  if (log10Years < 6) return `${Math.round(Math.pow(10, log10Years)).toLocaleString("en-US")} years`;
  const exp = Math.floor(log10Years);
  const mantissa = Math.pow(10, log10Years - exp);
  return `~${mantissa.toFixed(1)} × 10^${exp} years`;
}

function hasCommonPattern(pw: string): boolean {
  const base = pw.toLowerCase().replace(/[^a-z]/g, "");
  if (!base) return /^(?:0123456789|123456789|12345678|1234567|123456|12345)$/.test(pw);
  return COMMON_BASES.some(
    (w) => base === w || (base.startsWith(w) && base.length - w.length <= 3)
  );
}

export function analyzePassword(pw: string): PasswordAnalysis {
  const poolLabels: string[] = [];
  let pool = 0;
  if (/[a-z]/.test(pw)) { pool += 26; poolLabels.push("Lowercase"); }
  if (/[A-Z]/.test(pw)) { pool += 26; poolLabels.push("Uppercase"); }
  if (/[0-9]/.test(pw)) { pool += 10; poolLabels.push("Digits"); }
  if (/[^a-zA-Z0-9]/.test(pw)) { pool += 32; poolLabels.push("Symbols"); }

  const length = pw.length;
  if (length === 0 || pool === 0) {
    return {
      length, poolLabels, entropyBits: 0, crackTime: "Instant", level: "None",
      color: "text-zinc-500", barClass: "bg-zinc-600 w-[2%]", commonPattern: false,
    };
  }

  const commonPattern = hasCommonPattern(pw);
  const bruteBits = length * Math.log2(pool);
  // A dictionary attack ignores the keyspace: cap common patterns at ~28 bits.
  const entropyBits = Math.round(commonPattern ? Math.min(bruteBits, 28) : bruteBits);
  // average case = half the keyspace
  const log10Seconds = (entropyBits - 1) * Math.log10(2) - Math.log10(GUESSES_PER_SECOND);

  let level: StrengthLevel, color: string, barClass: string;
  if (entropyBits < 40) {
    level = "Critical Vulnerability"; color = "text-red-400"; barClass = "bg-red-500 w-[20%]";
  } else if (entropyBits < 64) {
    level = "Weak"; color = "text-amber-400"; barClass = "bg-amber-500 w-[45%]";
  } else if (entropyBits < 80) {
    level = "Moderate"; color = "text-yellow-300"; barClass = "bg-yellow-400 w-[65%]";
  } else if (entropyBits < 128) {
    level = "Strong"; color = "text-indigo-400"; barClass = "bg-indigo-500 w-[85%]";
  } else {
    // 128 bits keeps ~64 bits of margin even against Grover's √N speed-up
    level = "Quantum-Resistant"; color = "text-emerald-400"; barClass = "bg-emerald-500 w-[100%]";
  }

  return {
    length, poolLabels, entropyBits, crackTime: formatDuration(log10Seconds),
    level, color, barClass, commonPattern,
  };
}

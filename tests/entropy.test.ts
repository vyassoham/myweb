import { describe, expect, test } from "bun:test";
import { analyzePassword } from "../lib/entropy";

describe("analyzePassword", () => {
  test("common passwords are never rated strong", () => {
    for (const pw of ["password123", "admin#2026"]) {
      const a = analyzePassword(pw);
      expect(a.level).toBe("Critical Vulnerability");
      expect(a.commonPattern).toBe(true);
    }
  });

  test("long mixed-character strings reach quantum-resistant", () => {
    const a = analyzePassword("Soham#IITJ@2027_Quantum");
    expect(a.entropyBits).toBeGreaterThanOrEqual(128);
    expect(a.level).toBe("Quantum-Resistant");
    expect(a.poolLabels).toEqual(["Lowercase", "Uppercase", "Digits", "Symbols"]);
  });

  test("pool diversity reflects the actual character classes", () => {
    expect(analyzePassword("abcdef").poolLabels).toEqual(["Lowercase"]);
  });

  test("empty input is handled", () => {
    const a = analyzePassword("");
    expect(a.entropyBits).toBe(0);
    expect(a.level).toBe("None");
  });
});

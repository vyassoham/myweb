import os

base_dir = r"C:\Users\dell\.gemini\antigravity\scratch\gsoc2027\myweb"
phrases = [
    "18-year-old",
    "100% Test Coverage",
    "production-tested",
    "Zero Memory Blowup",
    "drops to 0 bytes",
    "100 GH/s Hashcat Rig"
]

print("=== RECURSIVE SEARCH ACROSS ENTIRE REPO ===")
for root, dirs, files in os.walk(base_dir):
    if ".git" in root or "node_modules" in root:
        continue
    for f in files:
        path = os.path.join(root, f)
        try:
            with open(path, "r", encoding="utf-8", errors="ignore") as fp:
                content = fp.read()
            for p in phrases:
                if p.lower() in content.lower():
                    rel = os.path.relpath(path, base_dir)
                    print(f"[{p}] in {rel}")
        except Exception:
            pass

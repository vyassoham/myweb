import os

app_dir = r"C:\Users\dell\.gemini\antigravity\scratch\gsoc2027\myweb\app"
phrases = [
    "18-year-old",
    "100% Test Coverage",
    "production-tested",
    "Zero Memory Blowup",
    "drops to 0 bytes",
    "100 GH/s Hashcat Rig",
    "0 bytes",
    "Hashcat Rig"
]

print("=== CHECKING APP/ ===")
for root, dirs, files in os.walk(app_dir):
    for f in files:
        if f.endswith(('.tsx', '.ts', '.jsx', '.js')):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8', errors='ignore') as fp:
                content = fp.read()
            for p in phrases:
                if p.lower() in content.lower():
                    print(f"FOUND \"{p}\" in {os.path.relpath(path, app_dir)}")

print("\n=== CHECKING PUBLIC/ ===")
pub_dir = r"C:\Users\dell\.gemini\antigravity\scratch\gsoc2027\myweb\public"
for root, dirs, files in os.walk(pub_dir):
    for f in files:
        path = os.path.join(root, f)
        with open(path, 'r', encoding='utf-8', errors='ignore') as fp:
            content = fp.read()
        for p in phrases:
            if p.lower() in content.lower():
                print(f"FOUND \"{p}\" in {os.path.relpath(path, pub_dir)}")

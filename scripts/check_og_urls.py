import os
import re

out_dir = "out"
html_files = []
for root, dirs, files in os.walk(out_dir):
    for f in files:
        if f.endswith(".html"):
            html_files.append(os.path.join(root, f))

print(f"Comparing Canonical vs OpenGraph URLs in {len(html_files)} files...")
mismatches = []
for p in html_files:
    rel = os.path.relpath(p, out_dir).replace("\\", "/")
    if rel in ["404.html", "_not-found/index.html", "google787667f481678cdc.html"]:
        continue
    with open(p, "r", encoding="utf-8") as f:
        c = f.read()
    m_canon = re.findall(r'<link[^>]*rel=["\']canonical["\'][^>]*href=["\']([^"\']+)["\']', c)
    if not m_canon:
        m_canon = re.findall(r'<link[^>]*href=["\']([^"\']+)["\'][^>]*rel=["\']canonical["\']', c)
    m_og = re.findall(r'<meta[^>]*property=["\']og:url["\'][^>]*content=["\']([^"\']+)["\']', c)
    
    canon = m_canon[0] if m_canon else None
    og = m_og[0] if m_og else None
    
    if canon != og:
        mismatches.append((rel, canon, og))
    print(f"  {rel:45} -> Canon: {canon} | OG: {og}")

print(f"\nMismatches found: {len(mismatches)}")
for rel, canon, og in mismatches:
    print(f"  [MISMATCH] {rel}: Canonical={canon} vs OG={og}")

import os
import re

out_dir = "out"
titles = {}
for root, dirs, files in os.walk(out_dir):
    for f in files:
        if f.endswith(".html"):
            p = os.path.join(root, f)
            rel = os.path.relpath(p, out_dir).replace("\\", "/")
            if rel in ["404.html", "_not-found/index.html", "google787667f481678cdc.html"]:
                continue
            with open(p, "r", encoding="utf-8") as fl:
                c = fl.read()
            m = re.findall(r'<title>([^<]+)</title>', c)
            t = m[0] if m else "NONE"
            titles[rel] = t

print(f"{'Page':45} | {'Len':3} | Title")
print("-" * 110)
for rel, t in sorted(titles.items()):
    clean_t = t.replace("&amp;", "&").replace("&apos;", "'")
    print(f"{rel:45} | {len(clean_t):3} | {clean_t}")

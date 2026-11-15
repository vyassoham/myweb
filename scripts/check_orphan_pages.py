import os
import re
from urllib.parse import urlparse

out_dir = "out"
html_files = {}
for root, dirs, files in os.walk(out_dir):
    for f in files:
        if f.endswith(".html"):
            p = os.path.join(root, f)
            rel = os.path.relpath(p, out_dir).replace("\\", "/")
            if rel in ["404.html", "_not-found/index.html", "google787667f481678cdc.html"]:
                continue
            with open(p, "r", encoding="utf-8") as fl:
                html_files[rel] = fl.read()

# Map route to rel file
routes = {}
for rel in html_files.keys():
    if rel == "index.html":
        routes["/"] = rel
    elif rel.endswith("/index.html"):
        clean = "/" + rel[:-len("index.html")]
        routes[clean] = rel
        routes[clean[:-1]] = rel # without trailing slash

inbound_links = {rel: set() for rel in html_files.keys()}

for source_rel, html in html_files.items():
    hrefs = re.findall(r'href=["\']([^"\']+)["\']', html)
    for href in hrefs:
        parsed = urlparse(href)
        path = parsed.path
        if href.startswith("/") or parsed.netloc in ["www.soham.lol", "soham.lol"]:
            target_rel = routes.get(path)
            if target_rel and target_rel != source_rel:
                inbound_links[target_rel].add(source_rel)

print(f"{'Page':45} | Inbound Links Count | Linked From")
print("-" * 100)
orphans = []
for rel, sources in sorted(inbound_links.items()):
    print(f"{rel:45} | {len(sources):19} | {list(sources)[:3]}")
    if len(sources) == 0 and rel != "index.html":
        orphans.append(rel)

print(f"\nTotal orphan pages (0 inbound links): {len(orphans)}")
if orphans:
    print("Orphan pages:", orphans)

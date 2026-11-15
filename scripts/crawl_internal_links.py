import os
import re
from urllib.parse import urlparse

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(BASE_DIR, "out")
CANONICAL_HOST = "www.soham.lol"

def crawl_links():
    html_files = {}
    for root, dirs, files in os.walk(OUT_DIR):
        for f in files:
            if f.endswith(".html"):
                p = os.path.join(root, f)
                rel = os.path.relpath(p, OUT_DIR).replace("\\", "/")
                with open(p, "r", encoding="utf-8") as fl:
                    html_files[rel] = fl.read()

    print(f"Crawling internal links across {len(html_files)} HTML pages...")
    
    broken_links = []
    total_internal = 0
    all_targets = set()

    # Build set of all known local routes
    known_routes = set()
    for rel in html_files.keys():
        known_routes.add(rel)
        if rel == "index.html":
            known_routes.add("/")
        elif rel.endswith("/index.html"):
            route = "/" + rel[:-len("index.html")]
            known_routes.add(route)
            known_routes.add(route[:-1]) # without trailing slash

    for rel, html in html_files.items():
        # find all href="..."
        hrefs = re.findall(r'href=["\']([^"\']+)["\']', html)
        for href in hrefs:
            if href.startswith(("#", "mailto:", "tel:", "javascript:")):
                continue
            
            # check if internal
            parsed = urlparse(href)
            is_internal = False
            path = parsed.path
            
            if href.startswith("/"):
                is_internal = True
            elif parsed.netloc in ["www.soham.lol", "soham.lol", "localhost"]:
                is_internal = True
            elif not parsed.netloc and not href.startswith("http"):
                is_internal = True
                
            if is_internal:
                total_internal += 1
                all_targets.add(path)
                
                # Check resolution
                # Path could be "/", "/about/", "/about", "/assets/...", "/favicon.ico"
                clean_path = path.lstrip("/")
                if clean_path == "":
                    target_file = "index.html"
                elif clean_path.endswith("/"):
                    target_file = clean_path + "index.html"
                elif "." in clean_path.split("/")[-1]:
                    target_file = clean_path
                else:
                    target_file = clean_path + "/index.html"
                    
                target_disk = os.path.join(OUT_DIR, target_file.replace("/", os.sep))
                alt_disk = os.path.join(OUT_DIR, clean_path.replace("/", os.sep))
                
                if not os.path.exists(target_disk) and not os.path.exists(alt_disk):
                    broken_links.append((rel, href, target_file))

    print(f"Total internal link occurrences checked: {total_internal}")
    print(f"Distinct internal paths targeted: {len(all_targets)}")
    print(f"Broken links found: {len(broken_links)}")
    for source, href, target in broken_links:
        print(f"  [BROKEN] in {source}: href='{href}' (expected {target})")

if __name__ == "__main__":
    crawl_links()

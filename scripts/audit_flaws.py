import os
import re
import json
import xml.etree.ElementTree as ET
from urllib.parse import urlparse

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(BASE_DIR, "out")
APP_DIR = os.path.join(BASE_DIR, "app")
CANONICAL_HOST = "www.soham.lol"
CANONICAL_BASE = f"https://{CANONICAL_HOST}"

def run_flaw_audit():
    results = {}
    
    # Read all HTML files in out/
    html_files = {}
    for root, dirs, files in os.walk(OUT_DIR):
        for f in files:
            if f.endswith(".html"):
                p = os.path.join(root, f)
                rel = os.path.relpath(p, OUT_DIR).replace("\\", "/")
                with open(p, "r", encoding="utf-8") as fl:
                    html_files[rel] = fl.read()

    print(f"Loaded {len(html_files)} HTML files from out/\n")

    # 1. Global homepage canonical potentially overrides individual page canonicals
    # 2. Duplicate canonical declaration in root layout
    # Check canonical in every html file
    canonicals = {}
    duplicate_canonicals = {}
    for rel, html in html_files.items():
        if rel in ["404.html", "_not-found/index.html", "google787667f481678cdc.html"]:
            continue
        canons = re.findall(r'<link[^>]*rel=["\']canonical["\'][^>]*href=["\']([^"\']+)["\']', html)
        if not canons:
            canons = re.findall(r'<link[^>]*href=["\']([^"\']+)["\'][^>]*rel=["\']canonical["\']', html)
        canonicals[rel] = canons
        if len(canons) > 1:
            duplicate_canonicals[rel] = canons
            
    print("=== FLAW 1 & 2: CANONICAL AUDIT ===")
    print(f"Total indexable pages: {len(canonicals)}")
    for rel, c in canonicals.items():
        print(f"  {rel:45} -> {c}")
    print(f"Duplicates: {len(duplicate_canonicals)}\n")

    # Check root layout.tsx for alternates.canonical
    layout_path = os.path.join(APP_DIR, "layout.tsx")
    with open(layout_path, "r", encoding="utf-8") as f:
        layout_src = f.read()
    has_layout_canonical = "canonical:" in layout_src
    print(f"Root layout has canonical: {has_layout_canonical}\n")

    # 3. Mixed www.soham.lol and soham.lol URLs
    print("=== FLAW 3: DOMAIN AUDIT (www vs apex) ===")
    apex_mentions = []
    for rel, html in html_files.items():
        # find https://soham.lol without www
        matches = re.findall(r'https://soham\.lol[^\s"\'<>]*', html)
        if matches:
            apex_mentions.append((rel, matches))
    print(f"Pages with bare apex domain: {len(apex_mentions)}")
    for rel, m in apex_mentions:
        print(f"  {rel}: {set(m)}")
    print()

    # 4 & 12: Sitemap audit
    print("=== FLAW 4 & 12: SITEMAP AUDIT ===")
    sitemap_path = os.path.join(OUT_DIR, "sitemap.xml")
    tree = ET.parse(sitemap_path)
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    sitemap_urls = [loc.text.strip() for loc in tree.getroot().findall(".//sm:loc", ns)]
    print(f"Sitemap URL count: {len(sitemap_urls)}")
    for u in sitemap_urls:
        print(f"  {u}")
    print()

    # 6 & 7: Person schema (age & worksFor vs affiliation)
    print("=== FLAW 6 & 7: PERSON SCHEMA AUDIT ===")
    schemas = []
    for rel, html in html_files.items():
        for s in re.findall(r'<script type="application/ld\+json">([\s\S]*?)</script>', html):
            try:
                data = json.loads(s)
                schemas.append((rel, data))
            except Exception as e:
                pass
    
    person_schemas = []
    for rel, s in schemas:
        if isinstance(s, dict):
            if s.get("@type") == "Person":
                person_schemas.append((rel, s))
            if "@graph" in s:
                for item in s["@graph"]:
                    if item.get("@type") == "Person":
                        person_schemas.append((rel, item))
    print(f"Found {len(person_schemas)} Person schemas")
    for rel, p in person_schemas:
        has_age = "age" in p or "birthDate" in p or "18" in str(p)
        works_for = p.get("worksFor")
        affiliation = p.get("affiliation")
        print(f"  {rel}: age present={has_age}, worksFor={works_for}, affiliation={affiliation}")
    print()

    # 8. Article schema
    print("=== FLAW 8: ARTICLE SCHEMA AUDIT ===")
    article_schemas = []
    for rel, s in schemas:
        if isinstance(s, dict):
            if s.get("@type") in ["Article", "BlogPosting", "TechArticle"]:
                article_schemas.append((rel, s))
            if "@graph" in s:
                for item in s["@graph"]:
                    if item.get("@type") in ["Article", "BlogPosting", "TechArticle"]:
                        article_schemas.append((rel, item))
    print(f"Found {len(article_schemas)} Article schemas")
    for rel, a in article_schemas:
        print(f"  {rel}: type={a.get('@type')}, headline={a.get('headline')[:40]}..., author={a.get('author')}")
    print()

    # 9. Project pages metadata
    print("=== FLAW 9: PROJECT METADATA AUDIT ===")
    project_pages = [r for r in html_files.keys() if r.startswith("projects/") and r != "projects/index.html"]
    for pr in project_pages:
        html = html_files[pr]
        title = re.findall(r'<title>([^<]+)</title>', html)
        desc = re.findall(r'<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"\']+)["\']', html)
        og_desc = re.findall(r'<meta[^>]*property=["\']og:description["\'][^>]*content=["\']([^"\']+)["\']', html)
        print(f"  {pr}:\n    Title: {title}\n    Desc: {desc}\n    OG Desc: {og_desc}")
    print()

    # 10. Breadcrumbs
    print("=== FLAW 10: BREADCRUMBS AUDIT ===")
    breadcrumbs = []
    for rel, s in schemas:
        if isinstance(s, dict):
            if s.get("@type") == "BreadcrumbList":
                breadcrumbs.append((rel, s))
            if "@graph" in s:
                for item in s["@graph"]:
                    if item.get("@type") == "BreadcrumbList":
                        breadcrumbs.append((rel, item))
    print(f"Found {len(breadcrumbs)} BreadcrumbList schemas")
    for rel, b in breadcrumbs:
        items = [i.get("name") for i in b.get("itemListElement", [])]
        print(f"  {rel}: items={items}")
    print()

    # 15. Image alt text
    print("=== FLAW 15: IMAGE ALT AUDIT ===")
    missing_alts = []
    for rel, html in html_files.items():
        imgs = re.findall(r'<img([^>]+)>', html)
        for img in imgs:
            if 'alt=' not in img or 'alt=""' in img or "alt=''" in img:
                missing_alts.append((rel, img))
    print(f"Images missing or empty alt: {len(missing_alts)}")
    for rel, img in missing_alts[:5]:
        print(f"  {rel}: {img[:80]}")
    print()

    # 16. Heading hierarchy
    print("=== FLAW 16: HEADING HIERARCHY AUDIT ===")
    for rel, html in sorted(html_files.items()):
        if rel in ["404.html", "_not-found/index.html", "google787667f481678cdc.html"]:
            continue
        h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', html, re.DOTALL)
        h2s = re.findall(r'<h2[^>]*>(.*?)</h2>', html, re.DOTALL)
        print(f"  {rel:45}: h1={len(h1s)}, h2={len(h2s)}")
    print()

    # 17. Duplicate titles & descriptions
    print("=== FLAW 17: DUPLICATE TITLES/DESCRIPTIONS ===")
    titles = {}
    descriptions = {}
    for rel, html in html_files.items():
        if rel in ["404.html", "_not-found/index.html", "google787667f481678cdc.html"]:
            continue
        t = re.findall(r'<title>([^<]+)</title>', html)
        d = re.findall(r'<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"\']+)["\']', html)
        if t:
            titles.setdefault(t[0], []).append(rel)
        if d:
            descriptions.setdefault(d[0], []).append(rel)
    print("Duplicate Titles:")
    for t, pages in titles.items():
        if len(pages) > 1:
            print(f"  '{t}': {pages}")
    print("Duplicate Descriptions:")
    for d, pages in descriptions.items():
        if len(pages) > 1:
            print(f"  '{d}': {pages}")
    print()

if __name__ == "__main__":
    run_flaw_audit()

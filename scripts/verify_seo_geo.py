import os
import re
import json
import xml.etree.ElementTree as ET

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(BASE_DIR, "out")
CANONICAL_DOMAIN = "https://www.soham.lol"

def test_sitemap():
    sitemap_path = os.path.join(OUT_DIR, "sitemap.xml")
    assert os.path.exists(sitemap_path), f"Sitemap missing at {sitemap_path}"
    tree = ET.parse(sitemap_path)
    root = tree.getroot()
    urls = []
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    for loc in root.findall(".//sm:loc", ns):
        url = loc.text.strip()
        assert url.startswith(CANONICAL_DOMAIN), f"Sitemap URL {url} does not start with {CANONICAL_DOMAIN}"
        assert not url.startswith("https://soham.lol"), f"Sitemap URL has apex {url}"
        urls.append(url)
    print(f"✓ Sitemap valid with {len(urls)} URLs, all using {CANONICAL_DOMAIN}")
    return urls

def test_robots():
    robots_path = os.path.join(OUT_DIR, "robots.txt")
    assert os.path.exists(robots_path), f"robots.txt missing at {robots_path}"
    with open(robots_path, "r", encoding="utf-8") as f:
        content = f.read()
    assert f"Host: {CANONICAL_DOMAIN}" in content, "robots.txt missing Host directive"
    assert f"Sitemap: {CANONICAL_DOMAIN}/sitemap.xml" in content, "robots.txt missing Sitemap directive"
    
    crawlers = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Googlebot", "Bingbot"]
    for bot in crawlers:
        assert bot in content, f"Crawler {bot} not explicitly addressed in robots.txt"
    print("✓ robots.txt valid with Host, Sitemap, and all major AI/search crawlers configured")

def test_html_files():
    html_files = []
    for root, dirs, files in os.walk(OUT_DIR):
        for f in files:
            if f.endswith(".html"):
                html_files.append(os.path.join(root, f))
    
    print(f"Found {len(html_files)} HTML files in out/")
    
    passed_canonicals = 0
    passed_og = 0
    passed_twitter = 0
    passed_schemas = 0

    for path in html_files:
        rel_path = os.path.relpath(path, OUT_DIR).replace("\\", "/")
        with open(path, "r", encoding="utf-8") as f:
            html = f.read()
            
        # 1. Canonical tag check
        canon_matches = re.findall(r'<link[^>]*rel=["\']canonical["\'][^>]*href=["\']([^"\']+)["\']', html)
        if not canon_matches:
            # check alternate attribute order
            canon_matches = re.findall(r'<link[^>]*href=["\']([^"\']+)["\'][^>]*rel=["\']canonical["\']', html)
            
        if rel_path not in ["404.html", "_not-found/index.html", "google787667f481678cdc.html"]:
            assert len(canon_matches) == 1, f"Expected 1 canonical tag in {rel_path}, found {len(canon_matches)}: {canon_matches}"
            canon_url = canon_matches[0]
            assert canon_url.startswith(CANONICAL_DOMAIN), f"Canonical in {rel_path} does not use canonical domain: {canon_url}"
            assert not canon_url.startswith("https://soham.lol/"), f"Canonical in {rel_path} has apex domain: {canon_url}"
            passed_canonicals += 1

        # 2. Open Graph & Twitter checks
        if rel_path not in ["404.html", "_not-found/index.html", "google787667f481678cdc.html"]:
            assert '<meta property="og:title"' in html or '<meta name="og:title"' in html, f"Missing og:title in {rel_path}"
            assert '<meta property="og:image"' in html or '<meta name="og:image"' in html, f"Missing og:image in {rel_path}"
            assert '<meta name="twitter:card"' in html, f"Missing twitter:card in {rel_path}"
            passed_og += 1
            passed_twitter += 1

        # 3. JSON-LD checks
        schema_matches = re.findall(r'<script type="application/ld\+json">([\s\S]*?)</script>', html)
        for s in schema_matches:
            data = json.loads(s)
            assert "@context" in data, f"Schema missing @context in {rel_path}"
            passed_schemas += 1

    print(f"✓ All {passed_canonicals} indexable pages have exactly 1 canonical tag pointing to {CANONICAL_DOMAIN}")
    print(f"✓ All {passed_og} pages have valid OpenGraph and Twitter card metadata")
    print(f"✓ Validated {passed_schemas} Schema.org JSON-LD blocks across all routes")

def test_llms_txt():
    llms_path = os.path.join(OUT_DIR, "llms.txt")
    llms_full_path = os.path.join(OUT_DIR, "llms-full.txt")
    assert os.path.exists(llms_path), "llms.txt missing in out/"
    assert os.path.exists(llms_full_path), "llms-full.txt missing in out/"
    with open(llms_path, "r", encoding="utf-8") as f:
        text = f.read()
    assert "Soham Vyas" in text
    assert "Indian Institute of Technology Jodhpur" in text
    assert "#31010" in text
    assert "#31011" in text
    assert "https://www.soham.lol" in text
    print("✓ llms.txt and llms-full.txt verified with accurate credentials and canonical URLs")

if __name__ == "__main__":
    print("--- STARTING SEO & GEO VALIDATION ---")
    test_sitemap()
    test_robots()
    test_llms_txt()
    test_html_files()
    print("--- ALL TESTS PASSED SUCCESSFULLY ---")

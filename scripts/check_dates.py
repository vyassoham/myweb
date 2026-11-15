import os
import re
import json
import xml.etree.ElementTree as ET
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(BASE_DIR, "out")
APP_DIR = os.path.join(BASE_DIR, "app")

def check_dates():
    # 1. Sitemap dates
    sitemap_path = os.path.join(OUT_DIR, "sitemap.xml")
    tree = ET.parse(sitemap_path)
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    print("=== SITEMAP DATES ===")
    for u in tree.getroot().findall(".//sm:url", ns):
        loc = u.find("sm:loc", ns).text
        lastmod = u.find("sm:lastmod", ns).text
        dt = datetime.strptime(lastmod, "%Y-%m-%d")
        print(f"  {loc:55} lastmod={lastmod} (valid ISO)")

    # 2. Article schemas dates
    print("\n=== ARTICLE SCHEMA DATES ===")
    articles = [
        'app/blog/sympy-kronecker-trace/page.tsx',
        'app/blog/redis-lua-rate-limiter/page.tsx',
        'app/blog/shannon-entropy-cybersecurity/page.tsx'
    ]
    for p in articles:
        with open(os.path.join(BASE_DIR, p), "r", encoding="utf-8") as f:
            c = f.read()
        m_pub = re.search(r'"datePublished":\s*"([^"]+)"', c)
        m_mod = re.search(r'"dateModified":\s*"([^"]+)"', c)
        pub = m_pub.group(1) if m_pub else None
        mod = m_mod.group(1) if m_mod else None
        d_pub = datetime.strptime(pub, "%Y-%m-%d") if pub else None
        d_mod = datetime.strptime(mod, "%Y-%m-%d") if mod else None
        is_consistent = d_mod >= d_pub if (d_mod and d_pub) else False
        print(f"  {p:50}\n    datePublished: {pub}\n    dateModified:  {mod}\n    consistent (mod >= pub): {is_consistent}")

if __name__ == "__main__":
    check_dates()

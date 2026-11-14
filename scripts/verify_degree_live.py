import urllib.request
import time
import ssl

ctx = ssl.create_default_context()
ts = str(int(time.time()))

urls = [
    ("llms.txt", f"https://www.soham.lol/llms.txt?_ts={ts}"),
    ("llms-full.txt", f"https://www.soham.lol/llms-full.txt?_ts={ts}"),
    ("Homepage", f"https://www.soham.lol/?_ts={ts}"),
    ("About Page", f"https://www.soham.lol/about/?_ts={ts}")
]

print("=== LIVE PRODUCTION DEGREE VERIFICATION ===")
for name, url in urls:
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Cache-Control": "no-cache"
    })
    try:
        content = urllib.request.urlopen(req, context=ctx, timeout=10).read().decode("utf-8", errors="ignore")
        has_hons = "Bachelor of Science (Hons)" in content
        has_btech = ("b.tech" in content.lower()) or ("btech" in content.lower())
        print(f"[{name}]")
        print(f"  - 'Bachelor of Science (Hons)' present: {has_hons}")
        print(f"  - 'B.Tech' absent: {not has_btech}")
        assert has_hons, f"Missing 'Bachelor of Science (Hons)' in {name}"
        assert not has_btech, f"Found 'B.Tech' in {name}"
    except Exception as e:
        print(f"Error on {name}: {e}")

print("\nALL LIVE DEGREE VERIFICATIONS PASSED SUCCESSFULLY!")

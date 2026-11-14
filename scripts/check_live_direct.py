import urllib.request
import ssl

ctx = ssl.create_default_context()

targets = [
    "https://soham.lol/",
    "http://soham.lol/",
    "https://www.soham.lol/",
    "http://www.soham.lol/"
]

phrases = [
    "18-year-old",
    "100% Test Coverage",
    "production-tested",
    "Zero Memory Blowup",
    "drops to 0 bytes",
    "100 GH/s Hashcat Rig"
]

class DirectHandler(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        print(f"  -> Redirect [{code}] to: {newurl}")
        return super().redirect_request(req, fp, code, msg, headers, newurl)

opener = urllib.request.build_opener(DirectHandler)

for t in targets:
    print(f"\n--- FETCHING: {t} ---")
    req = urllib.request.Request(t, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache"
    })
    try:
        resp = opener.open(req, timeout=10)
        body = resp.read().decode("utf-8", errors="ignore")
        print(f"Final URL: {resp.geturl()}")
        print(f"Status Code: {resp.status}")
        headers = dict(resp.headers)
        print(f"Age: {headers.get('Age')}, X-Cache: {headers.get('X-Cache')}, ETag: {headers.get('ETag')}")
        for p in phrases:
            if p in body:
                print(f"  ❌ FOUND: {p}")
            else:
                print(f"  ✓ NOT FOUND: {p}")
    except Exception as e:
        print(f"Error: {e}")

import urllib.request
import urllib.error
import ssl
import re

ctx = ssl.create_default_context()

routes = [
    "",
    "about/",
    "blog/",
    "blog/sympy-kronecker-trace/",
    "blog/redis-lua-rate-limiter/",
    "blog/shannon-entropy-cybersecurity/",
    "projects/",
    "projects/cybersecurity-risk-analyzer/",
    "projects/ai-rate-limiter-shield/",
    "projects/soham-crypto-tracker/",
    "projects/sociallogger/",
    "opensource/",
    "labs/",
    "contact/"
]

print("=== 1. TESTING LIVE HTTP RESPONSES & CANONICAL TAGS ===")
for r in routes:
    url = f"https://www.soham.lol/{r}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
            code = resp.status
            body = resp.read().decode("utf-8", errors="ignore")
            canon_match = re.findall(r'<link[^>]*rel=["\']canonical["\'][^>]*href=["\']([^"\']+)["\']', body)
            if not canon_match:
                canon_match = re.findall(r'<link[^>]*href=["\']([^"\']+)["\'][^>]*rel=["\']canonical["\']', body)
            canon = canon_match[0] if canon_match else "NONE"
            has_noindex = "noindex" in body
            print(f"[{code}] {url} -> Canonical: {canon} | noindex: {has_noindex}")
    except urllib.error.HTTPError as e:
        print(f"[{e.code}] {url}")
    except Exception as e:
        print(f"[ERR] {url}: {e}")

print("\n=== 2. TESTING REDIRECTS (APEX & HTTP) ===")
redirect_tests = [
    "http://soham.lol",
    "https://soham.lol",
    "http://www.soham.lol",
]

class NoRedirectHandler(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None

opener = urllib.request.build_opener(NoRedirectHandler)

for test_url in redirect_tests:
    try:
        resp = opener.open(test_url, timeout=10)
        print(f"[{resp.status}] {test_url} -> Direct Response")
    except urllib.error.HTTPError as e:
        location = e.headers.get("Location", "No Location Header")
        print(f"[{e.code}] {test_url} -> Redirects To: {location}")
    except Exception as e:
        print(f"[ERR] {test_url}: {e}")

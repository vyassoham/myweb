import urllib.request
import time
import ssl

ctx = ssl.create_default_context()
ts = str(int(time.time()))

urls = [
    ("Homepage", f"https://www.soham.lol/?_nocache={ts}"),
    ("SymPy Article", f"https://www.soham.lol/blog/sympy-kronecker-trace/?_nocache={ts}")
]

outdated_phrases = [
    "18-year-old",
    "100% Test Coverage",
    "production-tested",
    "Zero Memory Blowup",
    "drops to 0 bytes",
    "100 GH/s Hashcat Rig"
]

expected_corrected_phrases = [
    "a technology-driven student",
    "Automated Test Suites",
    "test-backed, actively maintained",
    "Avoids Dense Matrix Allocation",
    "~100 GH/s GPU Benchmark Model"
]

sympy_scope_phrases = [
    "O(1) symbolic rewrite steps",
    "Crucial Scope",
    "distinguish between symbolic expression tree evaluation",
    "arithmetic additions respectively",
    "negligible scalar metadata"
]

print("=================================================================")
print("FRESH PRODUCTION LIVE VERIFICATION REPORT")
print(f"Timestamp: {time.strftime('%Y-%m-%d %H:%M:%S UTC', time.gmtime())}")
print("=================================================================\n")

for label, url in urls:
    print(f"--- TESTING: {label} ({url}) ---")
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache"
    })
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            status = resp.status
            headers = dict(resp.headers)
            body = resp.read().decode("utf-8", errors="ignore")
            
            print(f"HTTP Status: {status}")
            print(f"Content-Length: {len(body)} bytes")
            print(f"Age Header: {headers.get('Age')}")
            print(f"X-Cache: {headers.get('X-Cache')}")
            print(f"ETag: {headers.get('ETag')}")
            print(f"Last-Modified: {headers.get('Last-Modified')}")
            
            print("\n  [Checking Outdated Phrases (Must be FALSE)]")
            for phrase in outdated_phrases:
                found = phrase in body
                status_icon = "❌ STILL PRESENT" if found else "✓ CLEAN (NOT FOUND)"
                print(f"    - \"{phrase}\": {status_icon}")
                
            print("\n  [Checking Corrected & Scoped Phrases (Must be TRUE where applicable)]")
            if label == "Homepage":
                for phrase in expected_corrected_phrases:
                    found = phrase in body
                    status_icon = "✓ VERIFIED PRESENT" if found else "❌ MISSING"
                    print(f"    - \"{phrase}\": {status_icon}")
            elif label == "SymPy Article":
                for phrase in sympy_scope_phrases:
                    found = phrase in body
                    status_icon = "✓ VERIFIED PRESENT" if found else "❌ MISSING"
                    print(f"    - \"{phrase}\": {status_icon}")
            print("\n" + "="*65 + "\n")
    except Exception as e:
        print(f"ERROR testing {label}: {e}")

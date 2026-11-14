import urllib.request
import re

req = urllib.request.Request("https://www.soham.lol/", headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
html = urllib.request.urlopen(req).read().decode("utf-8")

# Extract scripts
scripts = re.findall(r'src="([^"]+\.js)"', html)
print(f"Auditing {len(scripts)} live JS bundles:")

bad_count = 0
for s in scripts:
    url = f"https://www.soham.lol{s}" if s.startswith("/") else s
    s_req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    js = urllib.request.urlopen(s_req).read().decode("utf-8", errors="ignore")
    
    issues = []
    if "18-year-old" in js:
        issues.append("18-year-old")
    if "100% Test Coverage" in js:
        issues.append("100% Test Coverage")
    if "production-tested" in js:
        issues.append("production-tested")
    if "Zero Memory Blowup" in js:
        issues.append("Zero Memory Blowup")
        
    if issues:
        print(f"❌ FOUND IN {s}: {', '.join(issues)}")
        bad_count += 1
    else:
        print(f"✓ Clean: {s}")

print(f"\nTotal scripts with old claims: {bad_count}")

print("\n=== LIVE HOMEPAGE AUDIT ===")
print("Contains '18-year-old'?", "18-year-old" in html)
print("Contains '100% Test Coverage'?", "100% Test Coverage" in html)
print("Contains 'production-tested'?", "production-tested" in html)
print("Contains 'Zero Memory Blowup'?", "Zero Memory Blowup" in html)
print("Contains 'Automated Test Suites'?", "Automated Test Suites" in html)
print("Contains 'Avoids Dense Matrix Allocation'?", "Avoids Dense Matrix Allocation" in html)


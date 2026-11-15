import os
import re

patterns = [
    r'(?i)(?:api_key|apikey|secret|token|password|auth_token)\s*[:=]\s*["\'][A-Za-z0-9_\-\.]{16,}["\']',
    r'AIza[0-9A-Za-z-_]{35}',
    r'sk-[a-zA-Z0-9]{20,}',
    r'ghp_[a-zA-Z0-9]{20,}',
    r'github_pat_[a-zA-Z0-9]{22}_[a-zA-Z0-9]{59}',
    r'-----BEGIN (?:RSA |EC )?PRIVATE KEY-----'
]

findings = []

for root, dirs, files in os.walk('.'):
    if any(ignore in root for ignore in ['.git', 'node_modules', '.next', 'out']):
        continue
    for f in files:
        if f.endswith(('.pyc', '.png', '.ico', '.jpg', '.webp')):
            continue
        p = os.path.join(root, f)
        try:
            with open(p, 'r', encoding='utf-8', errors='ignore') as fl:
                content = fl.read()
            for pat in patterns:
                matches = re.findall(pat, content)
                for m in matches:
                    # Ignore harmless public verification IDs
                    if "google787667f481678cdc" in m:
                        continue
                    findings.append((p, m[:40]))
        except Exception:
            pass

print(f"=== SECRETS SCAN RESULTS ===")
print(f"Potentially sensitive strings found: {len(findings)}")
for p, snippet in findings:
    print(f"  [ALERT] in {p}: {snippet}")

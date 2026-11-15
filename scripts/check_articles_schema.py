import os
import re

articles = [
    'app/blog/sympy-kronecker-trace/page.tsx',
    'app/blog/redis-lua-rate-limiter/page.tsx',
    'app/blog/shannon-entropy-cybersecurity/page.tsx'
]

for p in articles:
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()
    m = re.search(r'const (?:articleSchema|jsonLd) = (\{[\s\S]*?\n\};)', c)
    if m:
        print(f"=== {p} ===")
        print(m.group(1)[:400])
        print("...\n")

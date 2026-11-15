import os
import re

projects = [
    'app/projects/cybersecurity-risk-analyzer/page.tsx',
    'app/projects/ai-rate-limiter-shield/page.tsx',
    'app/projects/soham-crypto-tracker/page.tsx',
    'app/projects/sociallogger/page.tsx'
]

for p in projects:
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()
    m_title = re.search(r'title:\s*["\']([^"\']+)["\']', c)
    m_desc = re.search(r'description:\s*["\']([^"\']+)["\']', c)
    # count words in main text
    words = len(re.findall(r'\b\w+\b', c))
    print(f"=== {p} ===")
    print(f"  Title: {m_title.group(1) if m_title else 'N/A'}")
    print(f"  Meta Description: {m_desc.group(1) if m_desc else 'N/A'}")
    print(f"  Source Word Count: {words} words\n")

import os
import re

for root, dirs, files in os.walk('app'):
    for f in files:
        if f == 'page.tsx':
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8') as fl:
                c = fl.read()
            m_title = re.search(r'title:\s*["\']([^"\']+)["\']', c)
            m_desc = re.search(r'description:\s*["\']([^"\']+)["\']', c)
            rel = os.path.relpath(p, 'app').replace('\\', '/')
            title = m_title.group(1) if m_title else "Inherited from layout"
            desc = m_desc.group(1) if m_desc else "Inherited from layout"
            print(f"{rel}:")
            print(f"  Title ({len(title)} chars): {title}")
            print(f"  Desc  ({len(desc)} chars): {desc}\n")

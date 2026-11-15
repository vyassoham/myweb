import os
import re

unsafe_links = []
total_external = 0

for root, dirs, files in os.walk('app'):
    for f in files:
        if not f.endswith(('.tsx', '.jsx')):
            continue
        p = os.path.join(root, f)
        with open(p, 'r', encoding='utf-8') as fl:
            c = fl.read()
        
        # find <a ... target="_blank" ...>
        tags = re.findall(r'<a[^>]+target=["\']_blank["\'][^>]*>', c)
        tags += re.findall(r'<a[^>]*rel=["\'][^"\']*["\'][^>]*target=["\']_blank["\'][^>]*>', c)
        # de-duplicate
        for tag in set(tags):
            total_external += 1
            if 'rel=' not in tag or 'noopener' not in tag:
                unsafe_links.append((p, tag))

print(f"Total target='_blank' links inspected: {total_external}")
print(f"Unsafe links (missing rel='noopener noreferrer'): {len(unsafe_links)}")
for p, tag in unsafe_links:
    print(f"  [UNSAFE] in {p}: {tag[:80]}")

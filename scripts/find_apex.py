import os
import re

for root, dirs, files in os.walk('app'):
    for f in files:
        if not f.endswith(('.tsx', '.ts', '.js', '.jsx', '.json', '.md', '.txt')):
            continue
        p = os.path.join(root, f)
        with open(p, 'r', encoding='utf-8', errors='ignore') as fl:
            c = fl.read()
        for m in re.finditer(r'https://soham\.lol', c):
            idx = m.start()
            after = c[idx:idx+25]
            if not after.startswith('https://www.soham.lol'):
                print(f'{p}: {c[max(0, idx-20):min(len(c), idx+60)]}')

# Also check public/ and components
for root, dirs, files in os.walk('public'):
    for f in files:
        p = os.path.join(root, f)
        with open(p, 'r', encoding='utf-8', errors='ignore') as fl:
            c = fl.read()
        for m in re.finditer(r'https://soham\.lol', c):
            idx = m.start()
            after = c[idx:idx+25]
            if not after.startswith('https://www.soham.lol'):
                print(f'{p}: {c[max(0, idx-20):min(len(c), idx+60)]}')

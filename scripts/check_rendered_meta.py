with open(r'C:/Users/dell/.gemini/antigravity/scratch/gsoc2027/myweb/out/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re
t = re.search(r'<title>(.*?)</title>', html).group(1)
og_t = re.search(r'property="og:title" content="(.*?)"', html).group(1)
og_d = re.search(r'property="og:description" content="(.*?)"', html).group(1)
tw_t = re.search(r'name="twitter:title" content="(.*?)"', html).group(1)
tw_d = re.search(r'name="twitter:description" content="(.*?)"', html).group(1)

print(f"<title>: {t} ({len(t)} chars)")
print(f"og:title: {og_t} ({len(og_t)} chars)")
print(f"og:description: {og_d} ({len(og_d)} chars)")
print(f"twitter:title: {tw_t} ({len(tw_t)} chars)")
print(f"twitter:description: {tw_d} ({len(tw_d)} chars)")

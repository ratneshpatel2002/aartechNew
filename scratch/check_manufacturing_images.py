import re

with open('Aartechassets.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

pos = text.find("Factory Acceptance Test")
if pos != -1:
    chunk = text[pos:pos+15000]
    print("Found 'Factory Acceptance Test' at:", pos)
    print("--- HTML FOLLOWING ---")
    print(chunk[:4000])

    # Find image alts and base64 lengths
    for m in re.finditer(r'<img[^>]+>', chunk):
        img_tag = m.group(0)
        alt = re.search(r'alt="([^"]*)"', img_tag)
        src = re.search(r'src="([^"]*)"', img_tag)
        print("IMG:", alt.group(1) if alt else 'no-alt', len(src.group(1)) if src else 'no-src')

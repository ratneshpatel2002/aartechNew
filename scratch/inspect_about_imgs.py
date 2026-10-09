with open('Aartechassets.html', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

pos = 12462080
sub = c[pos:pos+150000]

# find all img tags
import re
imgs = re.findall(r'<img[^>]*?>', sub)
print(f"Total img tags in this About Us section: {len(imgs)}")
for i, img in enumerate(imgs):
    alt_m = re.search(r'alt="([^"]*)"', img)
    src_m = re.search(r'src="([^"]*)"', img)
    alt = alt_m.group(1) if alt_m else ''
    src = src_m.group(1) if src_m else ''
    if src.startswith('data:'):
        src = f"data:image... ({len(src)} chars)"
    print(f"Img {i}: alt='{alt}' src='{src[:60]}'")

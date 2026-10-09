with open('scratch/cleaned_aartechassets.html', 'r', encoding='utf-8') as f:
    c = f.read()

pos = c.find('Application Engineering Specialist')
sub = c[pos:pos+3000]

# find all img tags
import re
imgs = re.findall(r'<img[^>]*?>', sub)
print(f"Total img tags in this About Us section: {len(imgs)}")
for i, img in enumerate(imgs):
    alt_m = re.search(r'alt="([^"]*)"', img)
    src_m = re.search(r'src="([^"]*)"', img)
    alt = alt_m.group(1) if alt_m else ''
    src = src_m.group(1) if src_m else ''
    print(f"Img {i}: alt='{alt}' src='{src[:60]}'")

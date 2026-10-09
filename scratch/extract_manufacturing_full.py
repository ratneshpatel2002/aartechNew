import re

with open('Aartechassets.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

pos = text.find('MANUFACTURING')
chunk = text[pos-300:pos+15000]

# Let's inspect all elements and images in this section
print("--- RAW MANUFACTURING SECTION FROM AARTECHSOLONICS ---")
print(chunk[:4000])

# Find all image tags in this section
imgs = re.findall(r'<img[^>]+>', chunk)
print(f"\nTotal images in this section: {len(imgs)}")
for i, img in enumerate(imgs):
    alt = re.search(r'alt="([^"]*)"', img)
    src = re.search(r'src="([^"]*)"', img)
    print(f"Img {i}: alt='{alt.group(1) if alt else ''}' src='{src.group(1)[:50] if src else ''}...'")

import re

with open('Aartechassets.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

pos = text.find("MANUFACTURING")
chunk = text[pos-500:pos+25000]

matches = re.findall(r'src="(data:image/[^"]+)"', chunk)
print(f"Found {len(matches)} data:image matches in chunk!")
for i, m in enumerate(matches):
    print(f"Match {i}: type={m[:30]} len={len(m)}")
    # save to file
    header, b64 = m.split(',', 1)
    ext = header.split(';')[0].split('/')[1]
    import base64
    padded = b64 + '=' * (-len(b64) % 4)
    fname = f"public/assets/mfg_asset_{i+1}.{ext}"
    with open(fname, "wb") as f:
        f.write(base64.b64decode(padded))
    print(f"Saved {fname}")
    from PIL import Image
    im = Image.open(fname)
    print(f"  size: {im.size}, mode: {im.mode}")

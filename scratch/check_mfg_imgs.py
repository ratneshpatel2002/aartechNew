import re
import base64

with open('Aartechassets.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

pos_mfg = text.find('MANUFACTURING')
pos_ftr = text.find('<footer')
sub = text[pos_mfg:pos_ftr]

imgs = list(re.finditer(r'<img[^>]+src="([^"]+)"[^>]*>', sub))
print(f'Total img tags found: {len(imgs)}')
for i, m in enumerate(imgs):
    src = m.group(1)
    tag = m.group(0)
    print(f'Img {i}: tag={tag[:80]} len={len(src)}')
    if src.startswith('data:image'):
        header, b64 = src.split(',', 1)
        ext = header.split(';')[0].split('/')[1]
        padded = b64 + '=' * (-len(b64) % 4)
        fname = f'public/assets/section_asset_{i+1}.{ext}'
        with open(fname, 'wb') as f_out:
            f_out.write(base64.b64decode(padded))
        print(f'  Saved {fname}')

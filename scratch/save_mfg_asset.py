with open('Aartechassets.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

pos = 19325655
# find closing quote
src_start = text.find('src="', pos) + 5
src_end = text.find('"', src_start)
data_url = text[src_start:src_end]
print("data url length:", len(data_url))

header, b64 = data_url.split(',', 1)
print("Header:", header)

import base64
padded = b64 + '=' * (-len(b64) % 4)
decoded = base64.b64decode(padded)
with open("public/assets/mfg_asset.webp", "wb") as f:
    f.write(decoded)
print("Saved to public/assets/mfg_asset.webp, size in bytes:", len(decoded))

from PIL import Image
im = Image.open("public/assets/mfg_asset.webp")
print("Image dimensions:", im.size, "mode:", im.mode)

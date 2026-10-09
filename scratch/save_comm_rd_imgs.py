import base64

with open('Aartechassets.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

pos_comm = text.find('COMMISSIONING')
pos_rd = text.find('RESEARCH &amp; DEVELOPMENT')

def save_img_before(pos, name):
    chunk = text[pos-3000:pos]
    start = chunk.rfind('src="data:image/')
    if start != -1:
        end = chunk.find('"', start+5)
        data = chunk[start+5:end]
        header, b64 = data.split(',', 1)
        ext = header.split(';')[0].split('/')[1]
        padded = b64 + '=' * (-len(b64) % 4)
        out_name = f'public/assets/{name}.{ext}'
        with open(out_name, 'wb') as f:
            f.write(base64.b64decode(padded))
        print(f'Saved {out_name}, bytes: {len(padded)}')

save_img_before(pos_comm, 'commissioning_exact')
save_img_before(pos_rd, 'research_dev_exact')

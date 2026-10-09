import re

with open('Aartechassets.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

pos_mfg = text.find('MANUFACTURING')
pos_footer = text.find('<footer')
sub = text[pos_mfg-500:pos_footer]

# strip base64 data to keep output readable
clean_sub = re.sub(r'data:image/[^;]+;base64,[^"]+', 'IMAGE_DATA', sub)

with open('scratch/mfg_comm_rd_clean.html', 'w', encoding='utf-8') as out:
    out.write(clean_sub)

print("Saved cleanly to scratch/mfg_comm_rd_clean.html, length:", len(clean_sub))

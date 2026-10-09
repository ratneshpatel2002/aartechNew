with open('Aartechassets.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

pos = 19322469 # 'MANUFACTURING'
chunk = text[pos-1000:pos+15000]

import re
# find the container and its full structure
print("--- FULL MANUFACTURING HTML ---")
# Let's print the clean text and all tags
clean_text = re.sub(r'<[^>]+>', '\n', chunk)
lines = [l.strip() for l in clean_text.split('\n') if l.strip()]
for line in lines[:60]:
    print(line)

import re

with open('Aartechassets.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

pos = text.find("Manufacturing Hubs")
if pos != -1:
    snippet = text[pos:pos+3000]
    # Clean tags nicely
    cleaned = re.sub(r'</?(?:div|li|ul|p|span|h[1-6]|b|strong)[^>]*>', '\n', snippet)
    cleaned = re.sub(r'<[^>]+>', '', cleaned)
    print("\n--- Manufacturing Hubs Content ---")
    for line in cleaned.split('\n'):
        if line.strip():
            print(line.strip())

import re

with open('Aartechassets.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

pos = text.find("Manufacturing Hubs")
if pos != -1:
    chunk = text[pos-500:pos+8000]
    print("Found 'Manufacturing Hubs' at:", pos)
    print("--- RAW HTML SNIPPET ---")
    print(chunk[:3000])

    # Clean text to understand structure
    cleaned = re.sub(r'</?(?:div|li|ul|p|h[1-6]|span|b|strong)[^>]*>', '\n', chunk)
    cleaned = re.sub(r'<[^>]+>', '', cleaned)
    print("\n--- CLEAN TEXT ---")
    for line in cleaned.split('\n')[:40]:
        if line.strip():
            print(line.strip())

with open('scratch/cleaned_aartechassets.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re

# Find all <h1> or <h2> or major section headers
headers = re.findall(r'(<(?:h1|h2|h3)[^>]*>.*?</(?:h1|h2|h3)>)', html, re.DOTALL)
print(f"Total headers: {len(headers)}")
for i, h in enumerate(headers):
    # clean tags
    text = re.sub(r'<[^>]+>', ' ', h).strip()
    text = re.sub(r'\s+', ' ', text)
    print(f"Header {i}: {text[:100]}")

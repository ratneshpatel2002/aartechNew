with open('Aartechassets.html', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

pos = 12462080
# Find enclosing tag before pos
# Let's inspect 2000 chars before and 2000 chars after pos
snippet = c[pos-2000:pos+2000]

import re
snippet_clean = re.sub(r'data:image/[^;]+;base64,[^"\'\s>]+', 'DATA_IMG', snippet)

print("Snippet around Application Engineering Specialist:")
print(snippet_clean)

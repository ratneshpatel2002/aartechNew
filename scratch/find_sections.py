with open('scratch/cleaned_aartechassets.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re

# Find all occurrences of classes or titles that look like sections
matches = re.findall(r'(<(?:div|section)[^>]*?(?:class="[^"]*(?:fullPage|container|section|page|w-full)[^"]*"|id="[^"]*")[^>]*>)', html)
print(f"Total matching containers: {len(matches)}")
for i, m in enumerate(matches[:30]):
    print(f"{i}: {m[:120]}")

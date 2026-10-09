import re

with open('scratch/cleaned_aartechassets.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's find all text blocks between > and <
tokens = re.findall(r'>([^<]+)<', html)
clean_texts = [t.strip() for t in tokens if len(t.strip()) > 3]

print(f"Total non-empty text tokens: {len(clean_texts)}")
print("\nFirst 60 non-empty text strings:")
for i, t in enumerate(clean_texts[:60]):
    print(f"{i}: {t[:100]}")

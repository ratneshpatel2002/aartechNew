import re

with open('scratch/root_sample.html', 'r', encoding='utf-8') as f:
    s = f.read()

# Let's search for text strings that appear after the navbar
# In HTML, let's find all text outside of tags
cleaned = re.sub(r'<style[^>]*>.*?</style>', '', s, flags=re.DOTALL)
cleaned = re.sub(r'<script[^>]*>.*?</script>', '', cleaned, flags=re.DOTALL)
texts = re.findall(r'>([^<]{4,})<', cleaned)

print("Visible texts inside root sample (count={}):".format(len(texts)))
for i, t in enumerate(texts[:50]):
    print(f"{i}: {t.strip()}")

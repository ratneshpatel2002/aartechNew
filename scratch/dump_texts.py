import re

with open('scratch/cleaned_aartechassets.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's find all major blocks
# Remove all scripts
no_scripts = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.DOTALL)
no_styles = re.sub(r'<style[^>]*>.*?</style>', '', no_scripts, flags=re.DOTALL)

# Let's find sections by searching for text headings or major divs
lines = [l.strip() for l in no_styles.split('>') if l.strip()]
meaningful = []
for l in lines:
    text = l.split('<')[0].strip()
    if len(text) > 2 and not text.startswith('&') and not text.startswith('/*'):
        meaningful.append(text)

print(f"Total meaningful text tokens: {len(meaningful)}")
with open('scratch/all_texts.txt', 'w', encoding='utf-8') as f:
    for i, t in enumerate(meaningful):
        f.write(f"{i}: {t}\n")

print("Saved scratch/all_texts.txt")

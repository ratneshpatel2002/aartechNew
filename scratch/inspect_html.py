import re

with open('Aartechassets.html', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Replace all base64 image data
clean = re.sub(r'data:image/[^;]+;base64,[^"\'\s>]+', 'DATA_IMG', content)

# Save cleaned HTML for easy inspection
with open('scratch/cleaned_aartechassets.html', 'w', encoding='utf-8') as f:
    f.write(clean)

print("Saved scratch/cleaned_aartechassets.html, length:", len(clean))

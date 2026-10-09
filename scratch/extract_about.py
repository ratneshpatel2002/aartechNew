with open('Aartechassets.html', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

pos = 12462080
# Find enclosing section or div
start = c.rfind('<div class=" fullPage', 0, pos)
if start == -1:
    start = c.rfind('<div', 0, pos - 500)

end = c.find('</div></div>', pos + 1000)
if end == -1:
    end = pos + 3000

print(f"Start: {start}, End: {end}")
section_raw = c[start:end+20]

# remove base64
import re
section_clean = re.sub(r'data:image/[^;]+;base64,[^"\'\s>]+', 'DATA_IMG', section_raw)

with open('scratch/about_section_from_html.html', 'w', encoding='utf-8') as f:
    f.write(section_clean)

print("Saved scratch/about_section_from_html.html, length:", len(section_clean))
print("\nSection content snippet:")
print(section_clean[:2500])

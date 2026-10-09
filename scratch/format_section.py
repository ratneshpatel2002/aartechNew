with open('scratch/second_section.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's inspect where the section begins and ends
# In HTML, let's find the container around INDUSTRIES
import re

# Split by tags and print with indentation
def format_html(h):
    # insert newlines around tags
    h = re.sub(r'(<[^>]+>)', r'\n\1\n', h)
    lines = [l.strip() for l in h.split('\n') if l.strip()]
    return '\n'.join(lines)

formatted = format_html(html)
with open('scratch/formatted_second_section.html', 'w', encoding='utf-8') as f:
    f.write(formatted)

print("Saved formatted_second_section.html. First 120 lines:")
for l in formatted.split('\n')[:120]:
    print(l)

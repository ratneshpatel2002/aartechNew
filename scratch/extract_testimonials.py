import re

with open('Aartechassets.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# search for all testimonial blocks
matches = [m.start() for m in re.finditer(r'testimonial', text, re.I)]
print(f"Total 'testimonial' matches: {len(matches)}")

people = set()
for pos in matches:
    sub = text[max(0, pos-200):min(len(text), pos+600)]
    for line in re.findall(r'>([^<]+)<', sub):
        line = line.strip()
        if any(w in line for w in ['NTPC', 'CSTPS', 'Jindal', 'Adani', 'Damodar', 'Hindalco', 'Manager', 'Engineer']):
            people.add(line)

print("Found people / titles:")
for p in sorted(people):
    print(" -", p)

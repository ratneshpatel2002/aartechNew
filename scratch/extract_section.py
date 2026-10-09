with open('scratch/root_sample.html', 'r', encoding='utf-8') as f:
    s = f.read()

# Let's find where "INDUSTRIES" appears
pos = s.find('INDUSTRIES')
print("Position of INDUSTRIES:", pos)

# Let's inspect 3000 chars before and 8000 chars after
start = max(0, pos - 1500)
end = min(len(s), pos + 10000)

section_html = s[start:end]

with open('scratch/second_section.html', 'w', encoding='utf-8') as f:
    f.write(section_html)

print("Saved scratch/second_section.html, length:", len(section_html))

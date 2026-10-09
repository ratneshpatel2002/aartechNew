with open('Aartechassets.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

# Look for titles or section markers in order
markers = [
    'Our Tailored Solutions',
    'Our Global Presence',
    'About Us',
    'Living Passions Through Engineering',
    'Trust, in our customers',
    'MANUFACTURING',
    'Manufacturing Hubs',
    'R&D Facilities',
    'Research & Development',
    'COMMISSIONING'
]

for m in markers:
    pos = text.find(m)
    print(f"'{m}': pos = {pos}")

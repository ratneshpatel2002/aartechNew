with open('scratch/formatted_second_section.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines in formatted section: {len(lines)}")
print("\nLines 120 to 350:")
for i, l in enumerate(lines[120:350]):
    print(f"{120+i}: {l.strip()}")

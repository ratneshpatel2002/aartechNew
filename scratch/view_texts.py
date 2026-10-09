with open('scratch/all_texts.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for l in lines[:100]:
    print(l.strip())

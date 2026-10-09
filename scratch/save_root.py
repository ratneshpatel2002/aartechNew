with open('scratch/cleaned_aartechassets.html', 'r', encoding='utf-8') as f:
    html = f.read()

root_idx = html.find('id="root"')
root_html = html[root_idx:root_idx+60000]

# Let's save root_html to scratch
with open('scratch/root_sample.html', 'w', encoding='utf-8') as f:
    f.write(root_html)

print("Saved root_sample.html, length:", len(root_html))

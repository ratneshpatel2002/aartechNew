import re

with open('exact_tailored_page.html', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Let's see how many times 'customer-' appears
cust = re.findall(r'alt="(customer-[^"]+)"', text)
print("Customers in exact_tailored_page:", set(cust))

# Check Aartechassets.html as well
with open('Aartechassets.html', encoding='utf-8', errors='ignore') as f:
    text2 = f.read()

cust2 = re.findall(r'alt="(customer-[^"]+)"', text2)
print("Customers in Aartechassets:", set(cust2))

# Also check customer files in public/assets/
import os
for f in os.listdir('public/assets'):
    if 'customer' in f:
        print('Found customer file in public/assets:', f)

with open('scratch/cleaned_aartechassets.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's extract the HTML from the 3 cards up to testimonials
p1 = html.find('INDUSTRIES')
# find parent div of the 3 cards
card_start = html.rfind('<div class="flex flex-col lg:flex-row w-full justify-center', 0, p1)
tailored_start = html.find('Our Tailored Solutions')
tailored_parent = html.rfind('<div class=" fullPage', 0, tailored_start)
testimonials_start = html.find('Testimonials')

print("Card start pos:", card_start)
print("Tailored start pos:", tailored_parent)
print("Testimonials start pos:", testimonials_start)

# Let's inspect the 3 cards HTML:
print("\n--- 3 CARDS HTML ---")
print(html[card_start:card_start+2500])

# Let's inspect the Tailored Solutions header and layout HTML:
print("\n--- TAILORED SOLUTIONS HTML ---")
print(html[tailored_parent:tailored_parent+3000])

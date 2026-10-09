import fs from 'fs';

const content = fs.readFileSync('C:/Users/ratne/.gemini/antigravity-ide/brain/cfcdb081-b2d8-4f64-b498-4f3399580dfd/.system_generated/steps/219/content.md', 'utf8');

const heroSection = content.slice(50000, 62000);
fs.writeFileSync('ril_hero_section.html', heroSection);
console.log('Saved ril_hero_section.html, length:', heroSection.length);

// Also let's inspect the navigation menu items
const navMatch = content.match(/<nav[\s\S]*?<\/nav>/gi) || [];
console.log('Nav tags found:', navMatch.length);

// Let's inspect the main navigation items in ril_header.html
const header = fs.readFileSync('ril_header.html', 'utf8');
const menuItems = header.match(/<li[^>]*class="[^"]*nav-item[^"]*"[\s\S]*?<a[^>]*class="[^"]*nav-link[^"]*"[^>]*>(.*?)<\/a>/gi) || [];
console.log('\nMain Nav Items in RIL Header:');
menuItems.forEach(m => console.log(m.replace(/<[^>]+>/g, '').trim()));

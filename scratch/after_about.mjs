import fs from 'fs';

const html = fs.readFileSync('Aartechassets.html', 'utf8');

// Find all text after About Us (pos 12461279)
const aboutPos = 12461279;
const afterAbout = html.substring(aboutPos);

// Search for titles or headings
const hRegex = /<(?:h[1-6]|div|p)[^>]*class="[^"]*(?:title|heading|text-box-red)[^"]*"[^>]*>([\s\S]*?)<\/(?:h[1-6]|div|p)>/gi;
let m;
const found = [];
while ((m = hRegex.exec(afterAbout)) !== null) {
  const text = m[1].replace(/<[^>]+>/g, '').trim();
  if (text.length > 2 && text.length < 80) {
    found.push(text);
  }
}

console.log('Headings/titles after About Us (total:', found.length, '):');
// remove duplicates preserving order
const unique = [...new Set(found)];
console.log(unique.slice(0, 40));

const fs = require('fs');

const html = fs.readFileSync('clean_dom_structure.html', 'utf8');

// Let's inspect the major sections
// Print text inside prominent tags or look at top-level container structure
const sections = [];
// Find elements with id or significant classes
const regex = /<(div|section|nav|header|footer)[^>]*class="([^"]*)"[^>]*>/gi;
let match;
const foundClasses = [];
while ((match = regex.exec(html)) !== null) {
  if (match[2].includes('relative') || match[2].includes('carousel') || match[2].includes('footer') || match[2].includes('grid') || match[2].includes('flex-col')) {
    foundClasses.push({ tag: match[1], class: match[2].slice(0, 100) });
  }
}

console.log('Sample structural containers:', foundClasses.slice(0, 25));

// Let's dump all text chunks > 20 chars
const texts = html.replace(/<script[\s\S]*?<\/script>/gi, '')
                  .replace(/<style[\s\S]*?<\/style>/gi, '')
                  .replace(/<[^>]+>/g, '\n')
                  .split('\n')
                  .map(t => t.trim())
                  .filter(t => t.length > 5);

const uniqueTexts = Array.from(new Set(texts));
console.log('\n--- EXTRACTED PAGE TEXT HIGHLIGHTS ---');
uniqueTexts.forEach(t => console.log('• ' + t));

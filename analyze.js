const fs = require('fs');

const content = fs.readFileSync('Aartechassets.html', 'utf8');
const lines = content.split('\n');
const root = lines[1094];

// Let's inspect remaining images (from 41 to 62)
const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
let match;
const images = [];
while ((match = imgRegex.exec(root)) !== null) {
  const fullTag = match[0];
  const src = match[1];
  const altMatch = fullTag.match(/alt=["']([^"']*)["']/i);
  const alt = altMatch ? altMatch[1] : '';
  images.push({
    src: src.startsWith('data:') ? `[DATA_URI len=${src.length} mime=${src.slice(0, 30)}]` : src,
    realSrc: src,
    alt,
    fullTag: fullTag.slice(0, 150)
  });
}

console.log('Total images found:', images.length);
images.slice(40).forEach((img, idx) => {
  console.log(`${idx + 41}: alt="${img.alt}" src="${img.src}"`);
});

// Let's also search for SVGs or background images
const svgMatches = root.match(/<svg[\s\S]*?<\/svg>/gi) || [];
console.log('\nTotal inline SVGs found:', svgMatches.length);

// Extract color codes from the CSS line (line 1085)
const css = lines[1084];
const hexColors = new Set(css.match(/#[0-9a-fA-F]{3,8}\b/g) || []);
console.log('\nHex colors found in CSS:', Array.from(hexColors).slice(0, 30));

// Extract tailwind or custom classes
const classRegex = /class="([^"]+)"/g;
const classes = new Set();
let classMatch;
while ((classMatch = classRegex.exec(root)) !== null) {
  classMatch[1].split(/\s+/).forEach(c => classes.add(c));
}
console.log('\nUnique classes sample:', Array.from(classes).filter(c => c.includes('bg-') || c.includes('text-') || c.includes('primary') || c.includes('blue') || c.includes('orange') || c.includes('red')).slice(0, 40));

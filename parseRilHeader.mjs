import fs from 'fs';

const header = fs.readFileSync('ril_header.html', 'utf8');

// Print all direct children and layout of header
console.log('--- HEADER SNIPPET (First 2500 chars) ---');
console.log(header.slice(0, 2500));

// Also let's extract all top-level elements and navigation links
const navLinks = [];
const linkRegex = /<a[^>]+class="[^"]*nav-link[^"]*"[^>]*>([\s\S]*?)<\/a>/gi;
let match;
while ((match = linkRegex.exec(header)) !== null) {
  navLinks.push(match[1].replace(/<[^>]+>/g, '').trim());
}
console.log('Nav Links found:', navLinks);

// Let's find all <a> tags in the header
const allLinks = [];
const aRegex = /<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
while ((match = aRegex.exec(header)) !== null) {
  const text = match[2].replace(/<[^>]+>/g, '').trim();
  if (text.length > 0 && text.length < 40) {
    allLinks.push({ href: match[1], text });
  }
}
console.log('\nTop unique links in header:');
const uniqueLinks = Array.from(new Set(allLinks.map(l => `${l.text} -> ${l.href}`)));
console.log(uniqueLinks.slice(0, 30));

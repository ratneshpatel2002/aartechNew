import fs from 'fs';

const html = fs.readFileSync('Aartechassets.html', 'utf8');

const idx = html.indexOf('Our Tailored Solutions');
// print 1000 chars before and 3000 chars after
console.log('=== BEFORE OUR TAILORED SOLUTIONS ===');
console.log(html.slice(Math.max(0, idx - 1200), idx));

console.log('=== AFTER OUR TAILORED SOLUTIONS ===');
console.log(html.slice(idx, idx + 2500));

import fs from 'fs';

const header = fs.readFileSync('ril_header.html', 'utf8');

// Find all occurrences of class="nav-item
const matches = [];
const regex = /<li[^>]*class="[^"]*nav-item[^"]*"[\s\S]*?<a[^>]*class="[^"]*nav-link[^"]*"[^>]*>([\s\S]*?)<\/a>/gi;
let m;
while ((m = regex.exec(header)) !== null) {
  matches.push(m[1].replace(/<[^>]+>/g, '').trim());
}

console.log('All nav-item nav-links in header:');
console.log(matches);

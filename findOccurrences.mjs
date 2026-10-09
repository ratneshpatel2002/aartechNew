import fs from 'fs';

const html = fs.readFileSync('Aartechassets.html', 'utf8');

// Find all occurrences of "section1" or "industry-select"
const matches = [];
let pos = 0;
while ((pos = html.indexOf('industry-select', pos)) !== -1) {
  matches.push(pos);
  pos += 'industry-select'.length;
}
console.log('industry-select occurrences:', matches);

matches.forEach((p, i) => {
  console.log(`\nMatch ${i} at ${p}:`);
  console.log(html.slice(Math.max(0, p - 100), Math.min(html.length, p + 200)));
});

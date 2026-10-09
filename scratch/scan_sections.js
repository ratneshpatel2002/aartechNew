const fs = require('fs');
const html = fs.readFileSync('Aartechassets.html', 'utf8');

console.log('Total file length:', html.length);

// Let's find main sections or div tags with class fullPage or id
const matches = [];
const regex = /<div[^>]*class="[^"]*fullPage[^"]*"[^>]*>/g;
let m;
while ((m = regex.exec(html)) !== null) {
  matches.push({ index: m.index, match: m[0] });
}

console.log('Matches with fullPage:', matches.length);
matches.forEach((item, i) => {
  const snippet = html.substring(item.index, item.index + 400).replace(/\s+/g, ' ');
  console.log(`\n--- Section ${i + 1} at pos ${item.index} ---`);
  console.log(snippet);
});

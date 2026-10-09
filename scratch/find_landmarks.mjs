import fs from 'fs';

const html = fs.readFileSync('Aartechassets.html', 'utf8');

// Find what components/sections are inside #root
// Let's search for tags with id, or major divs
const rootIndex = html.indexOf('<div id="root">');
console.log('Root index:', rootIndex);

// Let's find sections or major landmarks
const matches = [];
// Match any element with id, or class containing 'fullPage' or 'Section' or 'header' or 'footer' or 'nav'
const regex = /<(div|section|header|footer|nav)[^>]*(?:id="([^"]+)"|class="([^"]*(?:fullPage|nav|header|footer|hero|banner|slider)[^"]*)")[^>]*>/gi;

let m;
while ((m = regex.exec(html)) !== null) {
  matches.push({
    index: m.index,
    tag: m[1],
    id: m[2] || '',
    class: m[3] || '',
    full: m[0].substring(0, 150)
  });
}

console.log('Found landmarks count:', matches.length);
matches.forEach((item, idx) => {
  console.log(`[${idx}] pos:${item.index} <${item.tag}> id="${item.id}" class="${item.class.substring(0, 60)}"`);
});

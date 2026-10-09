import fs from 'fs';

const html = fs.readFileSync('Aartechassets.html', 'utf8');

const rootIndex = html.indexOf('<div id="root">');
const pos = rootIndex + 15468186;

console.log(html.substring(pos, pos + 2500).replace(/\s+/g, ' '));

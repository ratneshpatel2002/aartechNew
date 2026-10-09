import fs from 'fs';

const html = fs.readFileSync('Aartechassets.html', 'utf8');

const start = html.indexOf('<div class=" fullPage');
const before = html.slice(start - 2500, start);
console.log('Before tailored section:\n', before);

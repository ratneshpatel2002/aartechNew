import fs from 'fs';

const header = fs.readFileSync('ril_header.html', 'utf8');

// Print the skeleton with indents
const lines = header.split('\n');
console.log('Total header lines:', lines.length);

// Let's print lines 50 to 120, and 280 to 350
console.log('--- LINES 65 to 110 ---');
console.log(lines.slice(65, 110).join('\n'));

console.log('--- LINES 280 to 335 ---');
console.log(lines.slice(280, 335).join('\n'));

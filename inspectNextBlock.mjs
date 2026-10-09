import fs from 'fs';

const html = fs.readFileSync('exact_tailored_page.html', 'utf8');

const lastSec = html.lastIndexOf('section25');
const nextBlock = html.slice(lastSec, lastSec + 2500);
console.log('Next block:\n', nextBlock);

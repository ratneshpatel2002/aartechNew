import fs from 'fs';

const html = fs.readFileSync('exact_tailored_page.html', 'utf8');

// Find all section25 occurrences and where the next element starts
const lastSec = html.lastIndexOf('section25');
console.log('last section25 index:', lastSec);

// Look 5000 chars after lastSec
const afterLastSec = html.slice(lastSec, lastSec + 6000);
console.log('After last section25:\n', afterLastSec.slice(0, 1500));

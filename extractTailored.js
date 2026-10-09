const fs = require('fs');
const html = fs.readFileSync('clean_dom_structure.html', 'utf8');

// Find the data inside tailored solutions section
const tailoredIdx = html.indexOf('Our Tailored Solutions');
const slice = html.slice(tailoredIdx, tailoredIdx + 12000);

fs.writeFileSync('tailored_slice.html', slice);
console.log('Wrote tailored solutions slice, length:', slice.length);

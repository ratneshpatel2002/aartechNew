import fs from 'fs';

const html = fs.readFileSync('Aartechassets.html', 'utf8');

// Find all script contents or inline onclick/onchange
const scripts = [...html.matchAll(/<script[\s\S]*?<\/script>/gi)].map(m => m[0]);
console.log('Script count:', scripts.length);
scripts.forEach((s, i) => {
  if (s.includes('industry-select') || s.includes('product-select') || s.includes('solution-select') || s.includes('section1')) {
    console.log(`Script ${i} matches! Length: ${s.length}`);
    console.log(s.slice(0, 1000));
    fs.writeFileSync(`found_script_${i}.js`, s, 'utf8');
  }
});

// Also check for inline scripts anywhere
const inlineIdx = html.indexOf('industry-select');
console.log('industry-select found at index:', inlineIdx);
// Let's search after the tailored section for any script tag
const afterTailored = html.slice(inlineIdx, inlineIdx + 100000);
const scriptAfter = afterTailored.match(/<script[\s\S]*?<\/script>/gi);
console.log('Scripts after tailored:', scriptAfter ? scriptAfter.length : 0);
if (scriptAfter) {
  scriptAfter.forEach((s, idx) => {
    console.log(`Script after ${idx}:`, s.slice(0, 200));
  });
}

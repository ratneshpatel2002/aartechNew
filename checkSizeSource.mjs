import fs from 'fs';

const html = fs.readFileSync('exact_tailored_page.html', 'utf8');

// Find all image tags or base64
const imgMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)];
console.log('Images in tailored page:', imgMatches.length);
imgMatches.forEach((m, idx) => {
  const src = m[1];
  console.log(`Image ${idx}: length ${src.length}, preview: ${src.slice(0, 60)}`);
});

// Check where the bulk of bytes is
const parts = html.split('<div class="');
console.log('Div parts count:', parts.length);
let maxPartLen = 0;
let maxPartIdx = 0;
parts.forEach((p, i) => {
  if (p.length > maxPartLen) {
    maxPartLen = p.length;
    maxPartIdx = i;
  }
});
console.log(`Largest part is index ${maxPartIdx} with length ${maxPartLen}`);
console.log('Preview of largest part:', parts[maxPartIdx].slice(0, 300));

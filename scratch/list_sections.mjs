import fs from 'fs';

const html = fs.readFileSync('Aartechassets.html', 'utf8');

// Find all occurrences of fullPage, or h1, h2, or sections
const sections = [];
const regex = /<div class="[^"]*fullPage[^"]*"[^>]*>([\s\S]*?)(?=<div class="[^"]*fullPage|$)/g;
let m;
while ((m = regex.exec(html)) !== null) {
  const content = m[1];
  // extract first 200 chars and any heading
  const hMatch = content.match(/<(?:h[1-6]|div)[^>]*class="[^"]*(?:title|heading)[^"]*"[^>]*>([\s\S]*?)<\/(?:h[1-6]|div)>/i);
  sections.push({
    index: m.index,
    title: hMatch ? hMatch[1].replace(/<[^>]+>/g, '').trim() : 'NO TITLE FOUND',
    preview: content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 150)
  });
}

console.log('Total fullPage sections:', sections.length);
sections.forEach((s, i) => {
  console.log(`\nSection #${i + 1} (pos ${s.index}): "${s.title}"`);
  console.log(`  Preview: ${s.preview}`);
});

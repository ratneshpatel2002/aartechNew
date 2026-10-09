import fs from 'fs';

const html = fs.readFileSync('Aartechassets.html', 'utf8');

// Find all elements with class starting with "section" or containing "section"
const regex = /<div class="[^"]*?(section\d+)[^"]*?"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi;
// Let's do a more robust parse of all sections:
// Start of section is `<div class="(section\d+)..."`
// End of section is before the next `<div class="section...` or after its closing divs.
const sectionIdxs = [];
const secRegex = /<div class="[^"]*?\b(section\d+)\b[^"]*?"/gi;
let match;
while ((match = secRegex.exec(html)) !== null) {
  sectionIdxs.push({
    className: match[1],
    index: match.index
  });
}

console.log('Total sections in Aartechassets.html:', sectionIdxs.length);

const parsedSections = [];

for (let i = 0; i < sectionIdxs.length; i++) {
  const cur = sectionIdxs[i];
  const nextIdx = i + 1 < sectionIdxs.length ? sectionIdxs[i + 1].index : html.indexOf('id="testimonial', cur.index);
  const end = nextIdx !== -1 ? nextIdx : cur.index + 15000;
  const chunk = html.slice(cur.index, end);

  // Extract columns (usually 3 divs inside)
  // Let's extract all <a> and <li> tags and <p> headers
  const colBlocks = [...chunk.matchAll(/<div class="[^"]*?">\s*<p[^>]*class="[^"]*?(?:lg:hidden|uppercase)[^"]*?"[^>]*>([\s\S]*?)<\/p>([\s\S]*?)<\/div>/gi)];
  
  // Or extract all <p> headers and <li> items
  const pHeaders = [...chunk.matchAll(/<p[^>]*class="[^"]*?(?:lg:hidden|uppercase)[^"]*?"[^>]*>(.*?)<\/p>/gi)].map(m => m[1].trim());
  
  // Extract all links
  const links = [...chunk.matchAll(/<a\s+href="([^"]*)"[^>]*>[\s\S]*?<li[^>]*>([\s\S]*?)<\/li>[\s\S]*?<\/a>/gi)].map(m => ({
    href: m[1],
    title: m[2].replace(/<[^>]+>/g, '').trim()
  }));

  console.log(`\n--- Section ${cur.className} (Index ${cur.index}) ---`);
  console.log('Headers:', pHeaders);
  console.log('Links count:', links.length);
  if (links.length > 0) {
    console.log('First link:', links[0]);
    console.log('Last link:', links[links.length - 1]);
  }

  parsedSections.push({
    sectionClass: cur.className,
    headers: pHeaders,
    links: links,
    rawHtml: chunk
  });
}

fs.writeFileSync('all_parsed_sections.json', JSON.stringify(parsedSections, null, 2), 'utf8');
console.log('Saved all_parsed_sections.json');

import fs from 'fs';

const html = fs.readFileSync('tailored_solutions_full.html', 'utf8');

// Regex for extracting sections
// Let's find every div with class containing "section<number>"
const sectionRegex = /<div class="[^"]*?\bsection(\d+)\b[^"]*?"([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi;

// Let's do a more robust parse of all sections
// Find all section starts
const starts = [];
const regex = /<div class="[^"]*?\b(section\d+)\b[^"]*?"/gi;
let m;
while ((m = regex.exec(html)) !== null) {
  starts.push({ section: m[1], index: m.index });
}

console.log('Total section markers found:', starts.length);
starts.forEach(s => console.log(s.section));

const sectionData = [];
for (let i = 0; i < starts.length; i++) {
  const current = starts[i];
  const nextIndex = i + 1 < starts.length ? starts[i + 1].index : html.indexOf('Testimonial', current.index);
  const chunk = html.slice(current.index, nextIndex !== -1 ? nextIndex : current.index + 10000);
  
  // Parse paragraphs/headers
  // Notice in the snippet:
  // <p class="lg:hidden block text-box-red uppercase font-Barlow font-bold mt-8">Selected Industry</p>
  // <p ...>Related Products</p>
  // <p ...>Related Solutions</p>
  
  // Or column blocks:
  // The layout is 3 columns:
  // Column 1: Industry (either Selected Industry or Related Industries)
  // Column 2: Product (either Selected Product or Related Products)
  // Column 3: Solution (either Selected Solution or Related Solutions)

  // Let's extract each of the 3 columns
  // In the HTML: <div class="sectionN grid grid-cols-1 lg:grid-cols-3 lg:gap-x-[29px] hidden">
  //   <div>...col 1...</div>
  //   <div>...col 2...</div>
  //   <div>...col 3...</div>
  // </div>
  
  // Let's parse column items and labels
  const colLabels = [...chunk.matchAll(/<p[^>]*class="[^"]*?(?:lg:hidden|uppercase)[^"]*?"[^>]*>(.*?)<\/p>/gi)].map(m => m[1].trim());
  
  // Extract all links with their texts and hrefs
  // Also extract text inside li
  const items = [...chunk.matchAll(/<li[^>]*>(.*?)<\/li>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  
  console.log(`\n=================== ${current.section} ===================`);
  console.log('Labels:', colLabels);
  console.log('Items count:', items.length);
  console.log('Items:', items);
  
  sectionData.push({
    section: current.section,
    labels: colLabels,
    items: items,
    htmlPreview: chunk.slice(0, 300)
  });
}

fs.writeFileSync('parsed_sections.json', JSON.stringify(sectionData, null, 2), 'utf8');
console.log('Saved parsed_sections.json');

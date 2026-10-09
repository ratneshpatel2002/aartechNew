import fs from 'fs';

const parsed = JSON.parse(fs.readFileSync('all_parsed_sections.json', 'utf8'));
console.log('Total sections in json:', parsed.length);

// Let's inspect each section to map:
// 1. What type (Industry, Product, Solution)
// 2. What is the selected name
// 3. What are the related items in the other two categories
const entries = [];

parsed.forEach((sec, idx) => {
  const html = sec.rawHtml;
  
  // Find column divs
  // Look for 3 columns:
  // In each column:
  // <p class="lg:hidden block text-box-red uppercase font-Barlow font-bold ...">(Selected Industry|Related Industries|Selected Product|Related Products|Selected Soultion|Selected Solution|Related Solutions|Related Soultion)</p>
  // followed by <ul>...<li class="our-tailored-class...">...</li>...</ul>
  
  const colMatches = [...html.matchAll(/<p[^>]*class="[^"]*?(?:lg:hidden|uppercase)[^"]*?"[^>]*>([\s\S]*?)<\/p>\s*<ul>([\s\S]*?)<\/ul>/gi)];
  
  let selectedType = null;
  let selectedName = null;
  const related = {};

  colMatches.forEach(col => {
    const header = col[1].replace(/<[^>]+>/g, '').trim();
    const ulContent = col[2];
    const items = [...ulContent.matchAll(/<a\s+href="([^"]*)"[^>]*>[\s\S]*?<li[^>]*>([\s\S]*?)<\/li>[\s\S]*?<\/a>/gi)].map(m => ({
      href: m[1],
      title: m[2].replace(/&amp;/g, '&').replace(/<[^>]+>/g, '').trim()
    }));

    if (header.toLowerCase().includes('selected')) {
      if (header.toLowerCase().includes('industry')) selectedType = 'Industry';
      else if (header.toLowerCase().includes('product')) selectedType = 'Product';
      else if (header.toLowerCase().includes('solut') || header.toLowerCase().includes('soult')) selectedType = 'Solution';

      if (items.length > 0) {
        selectedName = items[0].title;
      }
    } else if (header.toLowerCase().includes('related')) {
      let relCat = 'Other';
      if (header.toLowerCase().includes('industr')) relCat = 'Industries';
      else if (header.toLowerCase().includes('product')) relCat = 'Products';
      else if (header.toLowerCase().includes('solut') || header.toLowerCase().includes('soult')) relCat = 'Solutions';

      related[relCat] = items;
    }
  });

  entries.push({
    sectionClass: sec.sectionClass,
    selectedType,
    selectedName,
    related
  });
});

console.log('Parsed entries count:', entries.length);
entries.forEach((e, i) => {
  console.log(`${i + 1}. [${e.selectedType}] ${e.selectedName} -> Industries: ${(e.related.Industries || []).length}, Products: ${(e.related.Products || []).length}, Solutions: ${(e.related.Solutions || []).length}`);
});

fs.writeFileSync('tailored_matrix_complete.json', JSON.stringify(entries, null, 2), 'utf8');
console.log('Saved tailored_matrix_complete.json');

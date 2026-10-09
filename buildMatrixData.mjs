import fs from 'fs';
import path from 'path';

const html = fs.readFileSync('clean_dom_structure.html', 'utf8');

// Find all section1, section2... in html
// Each section has 3 columns:
// Col 1: Selected item
// Col 2: Related category 1 items
// Col 3: Related category 2 items

// Let's find all divs with class="section..."
const sectionMatches = html.match(/<div class="section\d+[^"]*"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g) || [];

console.log('Direct sections found:', sectionMatches.length);

// Let's parse the HTML by splitting on class="section
const parts = html.split(/<div class="section\d+/);
const matrixEntries = [];

for (let i = 1; i < parts.length; i++) {
  const block = parts[i];
  
  // Extract Selected Item label and text
  const selectedMatch = block.match(/Selected\s+(Industry|Product|Soultion|Solution)[\s\S]*?<li[^>]*>([^<]+)<\/li>/i);
  if (!selectedMatch) continue;
  
  const type = selectedMatch[1].replace('Soultion', 'Solution');
  const name = selectedMatch[2].trim();

  // Extract the other two columns
  const relatedRegex = /Related\s+(Products|Industries|Soultion|Solutions)[\s\S]*?<ul>([\s\S]*?)<\/ul>/gi;
  let relMatch;
  const related = {};

  while ((relMatch = relatedRegex.exec(block)) !== null) {
    const relType = relMatch[1].replace('Soultion', 'Solution');
    const items = [];
    const itemRegex = /<li[^>]*>([^<]+)<\/li>/gi;
    let liMatch;
    while ((liMatch = itemRegex.exec(relMatch[2])) !== null) {
      const itemText = liMatch[1].trim();
      if (itemText && !itemText.toLowerCase().includes('related') && !itemText.toLowerCase().includes('selected')) {
        items.push(itemText);
      }
    }
    related[relType] = items;
  }

  matrixEntries.push({
    type,
    name,
    related
  });
}

console.log('Parsed matrix entries:', matrixEntries.length);
console.log('Sample entry:', JSON.stringify(matrixEntries[0], null, 2));

const srcDataDir = path.join(process.cwd(), 'src', 'data');
if (!fs.existsSync(srcDataDir)) {
  fs.mkdirSync(srcDataDir, { recursive: true });
}

fs.writeFileSync(path.join(srcDataDir, 'matrixData.json'), JSON.stringify(matrixEntries, null, 2));
console.log('Saved to src/data/matrixData.json');

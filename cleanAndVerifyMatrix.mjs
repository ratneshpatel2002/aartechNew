import fs from 'fs';

const parsed = JSON.parse(fs.readFileSync('all_parsed_sections.json', 'utf8'));

// The 3 dropdown lists:
const industryOptions = [
  "DEFENSE & EXPLORATION",
  "RENEWABLE ENERGY",
  "NON-RENEWABLE ENERGY",
  "POWER TRANSMISSION & DISTRIBUTION",
  "HEAVY ENGINEERING INDUSTRIES",
  "HEALTHCARE",
  "IT & TELECOM",
  "WASTE MANAGEMENT",
  "TRANSPORTATION"
];

const productOptions = [
  "KRANKING ULTRACAPACITORS",
  "BESTCASE",
  "SOLID WASTE TREATMENT",
  "CLIP FAULT CURRENT LIMITORS",
  "CONTROL & RELAY PANELS",
  "BTS 2000",
  "AC & DC UPS",
  "FLYWHEEL",
  "SOLAR DESIGN & SERVICES",
  "LOAD LIMITING"
];

const solutionOptions = [
  "LOAD LIMITING",
  "RELIABLE ENGINE STARTING",
  "POWER BACKUP UNIT",
  "ENERGY STORAGE",
  "CUSTOMIZED PLASTIC CASE",
  "SOLID WASTE TREATMENT",
  "CONTROL & AUTOMATION",
  "PROCESS CONTINUITY",
  "FAULT CURRENT LIMITING",
  "UNINTERRUPTED POWER SUPPLY",
  "SOLAR DESIGN, ENGINEERING"
];

const cleanEntries = [];

parsed.forEach((sec, idx) => {
  const html = sec.rawHtml;
  
  // Each section has 3 column divs directly under the grid:
  // <div class="sectionN ...">
  //   <div>...col 1 (Industry)...</div>
  //   <div>...col 2 (Product)...</div>
  //   <div>...col 3 (Solution)...</div>
  // </div>
  
  // Let's extract each of the 3 columns by looking at the inner column divs
  // In each section, there are 3 inner columns:
  const colChunks = [];
  // Match the 3 top-level div children
  const innerMatch = html.replace(/<div class="[^"]*?section\d+[^"]*?"[^>]*>/i, '');
  
  // Find all <p class="... uppercase font-Barlow font-bold ...">
  const pRegex = /<p[^>]*class="[^"]*?(?:lg:hidden|uppercase)[^"]*?"[^>]*>([\s\S]*?)<\/p>/gi;
  const pPositions = [];
  let pm;
  while ((pm = pRegex.exec(html)) !== null) {
    pPositions.push({
      header: pm[1].replace(/<[^>]+>/g, '').trim(),
      index: pm.index,
      fullMatch: pm[0]
    });
  }

  // Parse items for each column based on slices
  const cols = [];
  for (let i = 0; i < pPositions.length; i++) {
    const curP = pPositions[i];
    const nextIndex = i + 1 < pPositions.length ? pPositions[i + 1].index : html.length;
    const colSlice = html.slice(curP.index, nextIndex);
    
    // Extract all links & lis in this slice
    const items = [...colSlice.matchAll(/<a\s+href="([^"]*)"[^>]*>[\s\S]*?<li[^>]*>([\s\S]*?)<\/li>[\s\S]*?<\/a>/gi)].map(m => ({
      href: m[1],
      title: m[2].replace(/&amp;/g, '&').replace(/<[^>]+>/g, '').trim()
    }));
    
    cols.push({
      header: curP.header,
      items
    });
  }

  // Determine section role
  // Check which col has "Selected ..."
  let selectedCol = cols.find(c => c.header.toLowerCase().includes('selected'));
  let type = "Industry";
  let name = "";
  
  if (selectedCol) {
    if (selectedCol.header.toLowerCase().includes('industry')) type = "Industry";
    else if (selectedCol.header.toLowerCase().includes('product')) type = "Product";
    else if (selectedCol.header.toLowerCase().includes('solut') || selectedCol.header.toLowerCase().includes('soult')) type = "Solution";
    
    if (selectedCol.items.length > 0) {
      name = selectedCol.items[0].title;
    }
  }

  // Related items
  const related = {};
  cols.forEach(c => {
    if (c.header.toLowerCase().includes('related')) {
      let cat = 'Other';
      if (c.header.toLowerCase().includes('industr')) cat = 'Industries';
      else if (c.header.toLowerCase().includes('product')) cat = 'Products';
      else if (c.header.toLowerCase().includes('solut') || c.header.toLowerCase().includes('soult')) cat = 'Solutions';
      related[cat] = c.items;
    }
  });

  cleanEntries.push({
    index: idx + 1,
    sectionClass: sec.sectionClass,
    type,
    name,
    columns: cols,
    related
  });
});

console.log('Clean entries count:', cleanEntries.length);
cleanEntries.forEach(e => {
  console.log(`[${e.index}] ${e.sectionClass} => Type: ${e.type}, Name: "${e.name}", Cols: ${e.columns.map(c => c.header + '(' + c.items.length + ')').join(' | ')}`);
});

fs.writeFileSync('src/data/tailoredMatrixFull.json', JSON.stringify(cleanEntries, null, 2), 'utf8');
console.log('Saved to src/data/tailoredMatrixFull.json');

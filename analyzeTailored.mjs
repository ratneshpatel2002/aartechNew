import fs from 'fs';

const html = fs.readFileSync('tailored_solutions_full.html', 'utf8');

// Find all section matches
const sectionRegex = /<div class="[^"]*?(section\d+)[^"]*?"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;

// Let's see all select options first
const selectIndustry = html.match(/<select id="industry-select"[\s\S]*?<\/select>/i);
const selectProduct = html.match(/<select id="product-select"[\s\S]*?<\/select>/i);
const selectSolution = html.match(/<select id="solution-select"[\s\S]*?<\/select>/i);

console.log('--- INDUSTRY OPTIONS ---');
if (selectIndustry) {
  const opts = [...selectIndustry[0].matchAll(/<option value="([^"]*)"[^>]*>(.*?)<\/option>/gi)].map(m => m[1]);
  console.log(opts);
}

console.log('--- PRODUCT OPTIONS ---');
if (selectProduct) {
  const opts = [...selectProduct[0].matchAll(/<option value="([^"]*)"[^>]*>(.*?)<\/option>/gi)].map(m => m[1]);
  console.log(opts);
}

console.log('--- SOLUTION OPTIONS ---');
if (selectSolution) {
  const opts = [...selectSolution[0].matchAll(/<option value="([^"]*)"[^>]*>(.*?)<\/option>/gi)].map(m => m[1]);
  console.log(opts);
}

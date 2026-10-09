import fs from 'fs';

const html = fs.readFileSync('clean_dom_structure.html', 'utf8');

// Parse section1, section2, etc. or whatever represents the mappings
const sectionsRegex = /<div class="(section\d+)[^"]*">([\s\S]*?)<\/div>(?=(?:<div class="section\d+|$))/gi;
let match;
const matrix = [];

// Alternatively, let's search for "Selected Industry", "Selected Product", "Selected Solution"
// and extract the chosen item + related items
const blockRegex = /<p[^>]*>Selected (Industry|Product|Soultion|Solution)<\/p>[\s\S]*?<li[^>]*>([^<]+)<\/li>[\s\S]*?<p[^>]*>Related (Products|Industries|Soultion|Solutions)<\/p>[\s\S]*?<ul>([\s\S]*?)<\/ul>[\s\S]*?<p[^>]*>Related (Products|Industries|Soultion|Solutions)<\/p>[\s\S]*?<ul>([\s\S]*?)<\/ul>/gi;

// Let's do a more robust parse
const lines = html.split('\n');
console.log('Clean html total length:', html.length);

// Let's find all occurrences of Selected Industry
const matches = [];
const regex = />Selected (Industry|Product|Soultion|Solution)</gi;
while ((match = regex.exec(html)) !== null) {
  matches.push({ index: match.index, type: match[1] });
}

console.log('Found selection blocks:', matches.length);

// Let's write a clean script to extract the structured data into data.json
fs.writeFileSync('matrix_blocks.json', JSON.stringify(matches, null, 2));

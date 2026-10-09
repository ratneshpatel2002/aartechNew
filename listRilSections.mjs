import fs from 'fs';

const content = fs.readFileSync('C:/Users/ratne/.gemini/antigravity-ide/brain/cfcdb081-b2d8-4f64-b498-4f3399580dfd/.system_generated/steps/219/content.md', 'utf8');

// Find all <section tags
const sectionRegex = /<section[^>]*class="([^"]*)"[^>]*>/gi;
let match;
const sections = [];
while ((match = sectionRegex.exec(content)) !== null) {
  sections.push(match[1]);
}

console.log('All sections on RIL homepage:');
console.log(sections);

import fs from 'fs';

const content = fs.readFileSync('C:/Users/ratne/.gemini/antigravity-ide/brain/cfcdb081-b2d8-4f64-b498-4f3399580dfd/.system_generated/steps/219/content.md', 'utf8');

// Look for header
const headerMatch = content.match(/<header[\s\S]*?<\/header>/i);
if (headerMatch) {
  fs.writeFileSync('ril_header.html', headerMatch[0]);
  console.log('Wrote ril_header.html, length:', headerMatch[0].length);
}

// Look for hero / banner / slider
// Let's search for "banner", "slider", "carousel", "Growth is Life", "About Us", "Our History"
const keywords = ["Growth is Life", "About Us", "Our History", "banner", "carousel", "hero"];
for (const kw of keywords) {
  let idx = 0;
  let count = 0;
  while ((idx = content.indexOf(kw, idx)) !== -1 && count < 3) {
    console.log(`Keyword "${kw}" at index ${idx}:`);
    console.log(content.slice(Math.max(0, idx - 100), Math.min(content.length, idx + 200)));
    console.log('---');
    idx += kw.length;
    count++;
  }
}

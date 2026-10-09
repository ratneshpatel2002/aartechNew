import fs from 'fs';

const html = fs.readFileSync('Aartechassets.html', 'utf8');

const rootIndex = html.indexOf('<div id="root">');
const rootEnd = html.lastIndexOf('</div>'); // or similar

// Let's find direct children of #root or main sections
// In React apps, #root usually contains an outer div or direct siblings
const rootContent = html.substring(rootIndex, rootIndex + 20000000);

// Let's find all divs with distinctive class or roles
const regex = /<div class="([^"]*(?:fullPage|navbar-bg|image-slider|bg-\[#|bg-foot-blue)[^"]*)"/g;
let m;
while ((m = regex.exec(rootContent)) !== null) {
  // get snippet
  const snippet = rootContent.substring(m.index, m.index + 200).replace(/\s+/g, ' ');
  console.log(`Pos ${m.index}: class="${m[1]}"`);
  console.log(`   Snippet: ${snippet.substring(0, 120)}\n`);
}

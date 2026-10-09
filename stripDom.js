const fs = require('fs');

const content = fs.readFileSync('Aartechassets.html', 'utf8');
const lines = content.split('\n');
const root = lines[1094];

// Extract all text content and inspect sections
// Let's find main sections by looking at divs, sections, or IDs
const cheerioLike = () => {
  // Let's strip large data: URLs to make the HTML readable
  const cleanHtml = root.replace(/src="data:[^"]+"/g, 'src="[EXTRACTED_IMAGE]"')
                        .replace(/url\(&quot;data:[^&]+&quot;\)/g, 'url("[EXTRACTED_BG]")')
                        .replace(/url\("data:[^"]+"\)/g, 'url("[EXTRACTED_BG]")');
  
  fs.writeFileSync('clean_dom_structure.html', cleanHtml);
  console.log('Clean DOM structure written to clean_dom_structure.html, length:', cleanHtml.length);
};

cheerioLike();

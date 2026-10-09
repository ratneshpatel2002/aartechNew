import fs from 'fs';

const html = fs.readFileSync('Aartechassets.html', 'utf8');

// Find all headings (h1, h2, h3, h4) and elements with class title or section
const regex = /<(h[1-4]|div)[^>]*class="[^"]*(?:title|heading)[^"]*"[^>]*>([\s\S]*?)<\/\1>/gi;
let m;
let i = 0;
while ((m = regex.exec(html)) !== null) {
  const text = m[2].replace(/<[^>]+>/g, '').trim();
  if (text.length > 0 && text.length < 100) {
    console.log(`[${m.index}] <${m[1]}>: ${text}`);
    i++;
  }
}

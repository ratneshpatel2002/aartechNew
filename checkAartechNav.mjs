import fs from 'fs';

const html = fs.readFileSync('Aartechassets.html', 'utf8');

// Find all navbar links in Aartechassets.html
const navMatch = html.match(/<nav[\s\S]*?<\/nav>/i) || html.match(/<header[\s\S]*?<\/header>/i);
if (navMatch) {
  const links = [...navMatch[0].matchAll(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)].map(m => ({
    href: m[1],
    text: m[2].replace(/<[^>]+>/g, '').trim()
  }));
  console.log('Nav links in Aartechassets.html:', links);
} else {
  console.log('No header/nav tag found directly, searching for navbar classes');
  const links = [...html.matchAll(/class="[^"]*nav[^"]*"[\s\S]*?<\/div>/gi)];
  console.log('Found nav divs:', links.length);
}

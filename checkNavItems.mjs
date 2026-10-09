import fs from 'fs';

const header = fs.readFileSync('ril_header.html', 'utf8');

// Find all <a> tags inside navbar-nav
const navMatch = header.match(/<ul class="navbar-nav[\s\S]*?<\/ul>/i);
if (navMatch) {
  const links = navMatch[0].match(/<a[^>]+>([\s\S]*?)<\/a>/gi) || [];
  console.log('Total links in navbar-nav:', links.length);
  // Get top-level items
  const topLevel = navMatch[0].match(/<li[^>]*class="[^"]*nav-item[^"]*"[\s\S]*?<a[^>]*class="[^"]*nav-link[^"]*"[^>]*>([\s\S]*?)<\/a>/gi) || [];
  console.log('Top level nav links:');
  topLevel.forEach(l => console.log(l.replace(/<[^>]+>/g, '').trim()));
}

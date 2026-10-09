import fs from 'fs';

const header = fs.readFileSync('ril_header.html', 'utf8');

// Find the main nav list
const navListMatch = header.match(/<nav[^>]*>([\s\S]*?)<\/nav>/i);
if (navListMatch) {
  console.log('--- MAIN NAV TAG ---');
  console.log(navListMatch[0].slice(0, 1500));
}

// Find navbar-nav
const navbarNavMatch = header.match(/<ul[^>]*class="[^"]*navbar-nav[^"]*"[\s\S]*?<\/ul>/i);
if (navbarNavMatch) {
  console.log('--- NAVBAR NAV UL (first 2000 chars) ---');
  console.log(navbarNavMatch[0].slice(0, 2000));
} else {
  // Let's find all ul tags
  const uls = header.match(/<ul[^>]*>/gi);
  console.log('All UL tags in header:', uls);
}

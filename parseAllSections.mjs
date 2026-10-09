import fs from 'fs';

const html = fs.readFileSync('tailored_solutions_full.html', 'utf8');

// Let's find all section occurrences
const sectionMatches = [...html.matchAll(/class="([^"]*?(section\d+)[^"]*?)"/gi)];
console.log('Found section tags:', sectionMatches.length);
const sectionNames = [...new Set(sectionMatches.map(m => m[2]))];
console.log('Distinct sections:', sectionNames);

// Let's inspect what each section contains
sectionNames.forEach(secName => {
  const re = new RegExp(`<div class="[^"]*?\\b${secName}\\b[\\s\\S]*?(?=(?:<div class="[^"]*?\\bsection\\d+\\b)|(?:<div class="[^"]*?Testimonial)|(?:<footer)|$)`, 'i');
  const match = html.match(re);
  if (match) {
    const secHtml = match[0];
    // extract paragraph labels or headings
    const paras = [...secHtml.matchAll(/<p[^>]*>(.*?)<\/p>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
    const links = [...secHtml.matchAll(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)].map(m => ({
      href: m[1],
      text: m[2].replace(/<[^>]+>/g, '').trim()
    }));
    console.log(`\n=== ${secName} ===`);
    console.log('Labels:', paras);
    console.log('Links count:', links.length);
    console.log('First 5 links:', links.slice(0, 5));
  }
});

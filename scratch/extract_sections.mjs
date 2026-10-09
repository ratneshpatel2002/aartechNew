import fs from 'fs';

const html = fs.readFileSync('Aartechassets.html', 'utf8');

// Section 1: Our Tailored Solutions
const p1 = html.indexOf('Our Tailored Solutions');
const p1_start = html.lastIndexOf('<div class=" fullPage', p1);
const p1_end = html.indexOf('Customers', p1);
console.log('--- Section: Our Tailored Solutions ---');
console.log('Length:', p1_end - p1_start);

// Section 2: About Us
const p2 = html.indexOf('About Us', p1_end);
const p2_start = html.lastIndexOf('<div class="fullPage', p2);
const p2_end = html.indexOf('Testimonials', p2);
console.log('--- Section: About Us ---');
console.log('Length:', p2_end - p2_start);
console.log(html.substring(p2_start, p2_start + 1800).replace(/\s+/g, ' '));

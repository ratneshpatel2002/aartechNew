import fs from 'fs';

const html = fs.readFileSync('Aartechassets.html', 'utf8');

// 1. Check "Our Tailored Solutions"
const pTail = html.indexOf('Our Tailored Solutions');
const tailStart = html.lastIndexOf('<div class=" fullPage', pTail);
const custStart = html.indexOf('Customers', pTail);
const tailHtml = html.substring(tailStart, custStart);
console.log('--- Our Tailored Solutions outer HTML preview (first 1000 chars) ---');
console.log(tailHtml.substring(0, 1000).replace(/\s+/g, ' '));

// 2. Check "About Us"
const pAbout = html.indexOf('About Us', custStart);
const aboutStart = html.lastIndexOf('<div class="fullPage', pAbout);
const testStart = html.indexOf('Testimonials', pAbout);
const aboutHtml = html.substring(aboutStart, testStart);
console.log('\n--- About Us outer HTML preview (first 1000 chars) ---');
console.log(aboutHtml.substring(0, 1000).replace(/\s+/g, ' '));

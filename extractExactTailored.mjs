import fs from 'fs';

const html = fs.readFileSync('Aartechassets.html', 'utf8');

// Find start and end of "Our Tailored Solutions" section in Aartechassets.html
const start = html.indexOf('<div class=" fullPage');
const h1Idx = html.indexOf('Our Tailored Solutions');
console.log('fullPage idx:', start, 'h1 idx:', h1Idx);

// Let's find the closing tag of this entire fullPage container
// It is before Testimonials
const testIdx = html.indexOf('Testimonial', h1Idx);
console.log('Testimonials idx:', testIdx);

const tailoredBlock = html.slice(start, testIdx);
// Let's find the last </div> before Testimonials
const lastDivIdx = tailoredBlock.lastIndexOf('</div>');
const exactTailoredHtml = tailoredBlock.slice(0, lastDivIdx + 6);

fs.writeFileSync('exact_tailored_page.html', exactTailoredHtml, 'utf8');
console.log('Saved exact_tailored_page.html, size:', exactTailoredHtml.length);

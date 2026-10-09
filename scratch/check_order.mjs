import fs from 'fs';

const html = fs.readFileSync('Aartechassets.html', 'utf8');

// Find all elements between 5980993 and 12600000 that look like major containers
let idx = 5980993;
// Find where hero slider ends
const endOfSlider = html.indexOf('Our Tailored Solutions');
console.log('Index of "Our Tailored Solutions":', endOfSlider);

// What is between mobile hero slider and Our Tailored Solutions?
const between = html.substring(idx, endOfSlider);
// check if there are other sections
const regex = /<div[^>]*class="[^"]*(?:title|heading|fullPage)[^"]*"[^>]*>/gi;
let m;
while ((m = regex.exec(between)) !== null) {
  console.log('Found inside between:', m[0].substring(0, 100));
}

// Let's also check between Our Tailored Solutions and pos 12600000
const tailToAbout = html.substring(endOfSlider, endOfSlider + 600000);
console.log('Tailored to About length:', tailToAbout.length);
const aboutIndex = html.indexOf('About Us', endOfSlider);
console.log('Index of "About Us":', aboutIndex);

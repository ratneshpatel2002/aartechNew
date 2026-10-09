import fs from 'fs';

const html = fs.readFileSync('Aartechassets.html', 'utf8');

const pAbout = html.indexOf('<div class="title lg:text-4xl md:text-3xl text-[28px] text-box-red font-normal font-antonio lg:mb-9 mb-4">About Us</div>');
const start = html.lastIndexOf('<div class="fullPage', pAbout);
const nextSection = html.indexOf('<div class="relative w-full bg-[#0C013D]', start);
const sectionHtml = html.substring(start, nextSection);

// Replace large base64 strings with placeholders so we can read the exact markup
const clean = sectionHtml.replace(/data:image\/[^;]+;base64,[^"]+/g, (match) => {
  return `data:image/...[len:${match.length}]`;
});

console.log('Cleaned HTML length:', clean.length);
fs.writeFileSync('scratch/exact_about_us.html', clean, 'utf8');
console.log('Written to scratch/exact_about_us.html');

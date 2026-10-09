import fs from 'fs';

const html = fs.readFileSync('Aartechassets.html', 'utf8');

const p2 = html.indexOf('About Us');
const p2_start = html.lastIndexOf('<div class="fullPage', p2);
const carouselStart = html.indexOf('<div class="flex justify-center items-center', p2_start);
console.log(html.substring(carouselStart, carouselStart + 3000).replace(/\s+/g, ' '));

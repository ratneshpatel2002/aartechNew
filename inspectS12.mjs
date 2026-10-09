import fs from 'fs';

const html = fs.readFileSync('exact_tailored_page.html', 'utf8');

const s12Idx = html.indexOf('section12');
console.log('section12 index:', s12Idx);
if (s12Idx !== -1) {
  console.log(html.slice(s12Idx - 50, s12Idx + 1500));
}

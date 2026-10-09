import fs from 'fs';

const html = fs.readFileSync('Aartechassets.html', 'utf8');

// Find CSS definition of our-tailored-class, font-antonio, text-box-red
const styleMatches = [...html.matchAll(/<style[\s\S]*?<\/style>/gi)].map(m => m[0]);
console.log('Style tags count:', styleMatches.length);

const fullCss = styleMatches.join('\n');
fs.writeFileSync('all_styles.css', fullCss, 'utf8');
console.log('Saved all_styles.css, size:', fullCss.length);

['our-tailored-class', 'text-box-red', 'font-antonio', 'proClass', 'select-industry', 'fullPage'].forEach(term => {
  const re = new RegExp(`\\.${term}[^{]*\\{[^}]*\\}`, 'g');
  const m = fullCss.match(re);
  console.log(`Class .${term}:`, m ? m.slice(0, 3) : 'not found in <style>');
});

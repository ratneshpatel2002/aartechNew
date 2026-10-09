import fs from 'fs';

const html = fs.readFileSync('Aartechassets.html', 'utf8');

[11957302, 12019837].forEach(pos => {
  console.log(`\n--- Around pos ${pos} ---`);
  console.log(html.substring(pos - 100, pos + 250).replace(/\s+/g, ' '));
});

import fs from 'fs';

const html = fs.readFileSync('Aartechassets.html', 'utf8');

// Search for any mention of industry-select or product-select in JS
const terms = ['industry-select', 'product-select', 'solution-select', 'section1', 'proClass'];
terms.forEach(t => {
  let count = 0;
  let idx = 0;
  while ((idx = html.indexOf(t, idx)) !== -1) {
    count++;
    idx += t.length;
  }
  console.log(`Term "${t}": ${count} occurrences`);
});

// Let's search for "change" event listeners or jQuery in any script or in the html
const scriptMatches = [...html.matchAll(/<script[\s\S]*?<\/script>/gi)];
console.log('Total scripts in Aartechassets.html:', scriptMatches.length);
scriptMatches.forEach((sm, i) => {
  const content = sm[0];
  console.log(`Script ${i}: length ${content.length}`);
});

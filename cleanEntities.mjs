import fs from 'fs';

const data = JSON.parse(fs.readFileSync('src/data/matrixData.json', 'utf8'));
const clean = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
const cleaned = data.map(item => ({
  type: clean(item.type),
  name: clean(item.name),
  related: Object.fromEntries(
    Object.entries(item.related).map(([k, v]) => [clean(k), v.map(clean)])
  )
}));
fs.writeFileSync('src/data/matrixData.json', JSON.stringify(cleaned, null, 2));
console.log('Cleaned entity symbols in matrixData.json');

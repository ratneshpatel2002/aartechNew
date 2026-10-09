import fs from 'fs';

const matrix = JSON.parse(fs.readFileSync('src/data/tailoredMatrixFull.json', 'utf8'));

// Build lookup dictionaries for fast, infallible matching
const industryMap = {};
const productMap = {};
const solutionMap = {};

matrix.forEach(entry => {
  const normName = entry.name.toLowerCase().trim();
  if (entry.type === 'Industry') {
    industryMap[normName] = entry;
  } else if (entry.type === 'Product') {
    productMap[normName] = entry;
  } else if (entry.type === 'Solution') {
    solutionMap[normName] = entry;
  }
});

console.log('Industries mapped:', Object.keys(industryMap));
console.log('Products mapped:', Object.keys(productMap));
console.log('Solutions mapped:', Object.keys(solutionMap));

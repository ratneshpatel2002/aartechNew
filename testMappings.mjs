import fs from 'fs';

const data = JSON.parse(fs.readFileSync('src/data/tailoredMatrixFull.json', 'utf8'));

const industryOptions = [
  "DEFENSE & EXPLORATION",
  "RENEWABLE ENERGY",
  "NON-RENEWABLE ENERGY",
  "POWER TRANSMISSION & DISTRIBUTION",
  "HEAVY ENGINEERING INDUSTRIES",
  "HEALTHCARE",
  "IT & TELECOM",
  "WASTE MANAGEMENT",
  "TRANSPORTATION"
];

const productOptions = [
  "KRANKING ULTRACAPACITORS",
  "BESTCASE",
  "SOLID WASTE TREATMENT",
  "CLIP FAULT CURRENT LIMITORS",
  "CONTROL & RELAY PANELS",
  "BTS 2000",
  "AC & DC UPS",
  "FLYWHEEL",
  "SOLAR DESIGN & SERVICES",
  "LOAD LIMITING"
];

const solutionOptions = [
  "LOAD LIMITING",
  "RELIABLE ENGINE STARTING",
  "POWER BACKUP UNIT",
  "ENERGY STORAGE",
  "CUSTOMIZED PLASTIC CASE",
  "SOLID WASTE TREATMENT",
  "CONTROL & AUTOMATION",
  "PROCESS CONTINUITY",
  "FAULT CURRENT LIMITING",
  "UNINTERRUPTED POWER SUPPLY",
  "SOLAR DESIGN, ENGINEERING"
];

console.log('--- CHECK INDUSTRY MAPPINGS ---');
industryOptions.forEach((opt, idx) => {
  const norm = opt.toLowerCase().replace(/[^a-z0-9]/g, '');
  const match = data.find(d => d.type === 'Industry' && d.name.toLowerCase().replace(/[^a-z0-9]/g, '').includes(norm.slice(0, 10)));
  console.log(`Industry [${idx + 1}] "${opt}":`, match ? `Matched section ${match.sectionClass} ("${match.name}")` : 'NO MATCH');
});

console.log('\n--- CHECK PRODUCT MAPPINGS ---');
productOptions.forEach((opt, idx) => {
  const norm = opt.toLowerCase().replace(/[^a-z0-9]/g, '');
  const match = data.find(d => d.type === 'Product' && d.name.toLowerCase().replace(/[^a-z0-9]/g, '').includes(norm.slice(0, 8)));
  console.log(`Product [${idx + 1}] "${opt}":`, match ? `Matched section ${match.sectionClass} ("${match.name}")` : 'NO MATCH');
});

console.log('\n--- CHECK SOLUTION MAPPINGS ---');
solutionOptions.forEach((opt, idx) => {
  const norm = opt.toLowerCase().replace(/[^a-z0-9]/g, '');
  const match = data.find(d => d.type === 'Solution' && d.name.toLowerCase().replace(/[^a-z0-9]/g, '').includes(norm.slice(0, 8)));
  console.log(`Solution [${idx + 1}] "${opt}":`, match ? `Matched section ${match.sectionClass} ("${match.name}")` : 'NO MATCH');
});

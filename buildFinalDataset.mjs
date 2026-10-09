import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('src/data/tailoredMatrixFull.json', 'utf8'));

// Filter out empty name entry (index 12)
const clean = raw.filter(item => item.name && item.name.trim() !== '');

console.log('Clean entries count:', clean.length);

// Ensure every entry has standardized dropdown values for matching
const dropdownLists = {
  industries: [
    "DEFENSE & EXPLORATION",
    "RENEWABLE ENERGY",
    "NON-RENEWABLE ENERGY",
    "POWER TRANSMISSION & DISTRIBUTION",
    "HEAVY ENGINEERING INDUSTRIES",
    "HEALTHCARE",
    "IT & TELECOM",
    "WASTE MANAGEMENT",
    "TRANSPORTATION"
  ],
  products: [
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
  ],
  solutions: [
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
  ]
};

const finalData = {
  dropdownLists,
  pathways: clean
};

fs.writeFileSync('src/data/tailoredSolutionsData.json', JSON.stringify(finalData, null, 2), 'utf8');
console.log('Saved src/data/tailoredSolutionsData.json');

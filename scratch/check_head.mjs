import fs from 'fs';

const html = fs.readFileSync('Aartechassets.html', 'utf8');

// Look for styles in head
const head = html.substring(0, html.indexOf('</head>'));
console.log('Head length:', head.length);

// Extract style tags or link tags
const styleMatches = head.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || [];
console.log('Style tags in head:', styleMatches.length);

// Check if tailwind or custom classes are used
console.log('Does head mention font-antonio?', head.includes('antonio'));
console.log('Does head mention font-Barlow?', head.includes('Barlow'));
console.log('Does head mention text-box-red?', head.includes('text-box-red'));

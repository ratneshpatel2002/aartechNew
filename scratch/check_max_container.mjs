import fs from 'fs';

const html = fs.readFileSync('Aartechassets.html', 'utf8');

const head = html.substring(0, html.indexOf('</head>'));
const p = head.indexOf('max-container');
if (p !== -1) {
  console.log(head.substring(p - 20, p + 120));
} else {
  console.log('max-container not found in head');
}

import fs from 'fs';

const html = fs.readFileSync('Aartechassets.html', 'utf8');

const head = html.substring(0, html.indexOf('</head>'));

// search for text-box-red
const pos = head.indexOf('text-box-red');
if (pos !== -1) {
  console.log(head.substring(pos - 50, pos + 100));
}

// search for text-lightBlack
const pos2 = head.indexOf('text-lightBlack');
if (pos2 !== -1) {
  console.log(head.substring(pos2 - 50, pos2 + 100));
}

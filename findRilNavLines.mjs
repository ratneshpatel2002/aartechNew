import fs from 'fs';

const header = fs.readFileSync('ril_header.html', 'utf8');

// Find the main nav
const lines = header.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('class="navbar-nav')) {
    console.log('Found navbar-nav at line:', i);
    console.log(lines.slice(Math.max(0, i - 15), i + 40).join('\n'));
    break;
  }
}

// Find how the top-menu is laid out
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('class="top-menu"')) {
    console.log('\nFound top-menu at line:', i);
    console.log(lines.slice(Math.max(0, i - 5), i + 35).join('\n'));
    break;
  }
}

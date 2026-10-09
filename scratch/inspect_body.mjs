import fs from 'fs';

const html = fs.readFileSync('Aartechassets.html', 'utf8');

const bodyIndex = html.indexOf('<body');
console.log('Body index:', bodyIndex);

// Let's find direct children or main container elements inside body or main
const mainMatch = html.match(/<main[\s\S]*?<\/main>/i);
if (mainMatch) {
  console.log('Found <main>, length:', mainMatch[0].length);
}

// Let's find all tags that look like sections or direct child divs of root/body
const searchStr = html.substring(bodyIndex, bodyIndex + 50000);
console.log('Snippet after body:', searchStr.substring(0, 3000));

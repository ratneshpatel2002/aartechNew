import fs from 'fs';

const content = fs.readFileSync('C:/Users/ratne/.gemini/antigravity-ide/brain/cfcdb081-b2d8-4f64-b498-4f3399580dfd/.system_generated/steps/219/content.md', 'utf8');

// Search for video-content in the file
const idx = content.indexOf('class="video-content"');
console.log(content.slice(idx - 200, idx + 600));

// Also let's check welcome-box
const idx2 = content.indexOf('class="welcome-box"');
console.log('--- WELCOME BOX ---');
console.log(content.slice(idx2 - 100, idx2 + 500));

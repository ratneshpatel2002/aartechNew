const res = await fetch('http://localhost:5174/');
const html = await res.text();
console.log('HTTP Status:', res.status, 'HTML length:', html.length);
console.log('Includes root div:', html.includes('<div id="root"></div>'));
console.log('Includes Antonio font:', html.includes('Antonio'));
console.log('Includes Barlow font:', html.includes('Barlow'));

import fs from 'fs';

const html = fs.readFileSync('Aartechassets.html', 'utf8');
const links = [...html.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi)];
const uniqueHrefs = [...new Set(links.map(l => l[1]))].filter(h => !h.startsWith('data:') && !h.startsWith('#') && h.length < 100);
console.log('Total unique hrefs:', uniqueHrefs.length);
console.log('Sample hrefs:', uniqueHrefs.slice(0, 30));

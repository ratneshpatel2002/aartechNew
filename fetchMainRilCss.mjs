import fs from 'fs';

async function fetchCss() {
  const res = await fetch('https://www.ril.com/');
  const html = await res.text();
  const matches = html.match(/href="([^"]+\.css[^"]*)"/g) || [];
  console.log('All CSS links:');
  for (const m of matches) {
    const url = m.replace('href="', '').replace('"', '');
    console.log(url);
    if (url.includes('theme') || url.includes('custom') || url.includes('reliance')) {
      const fullUrl = url.startsWith('http') ? url : 'https://www.ril.com' + url;
      const cRes = await fetch(fullUrl);
      const text = await cRes.text();
      fs.writeFileSync('main_ril_theme.css', text);
      console.log('Saved main_ril_theme.css, length:', text.length);
      break;
    }
  }
}

fetchCss();

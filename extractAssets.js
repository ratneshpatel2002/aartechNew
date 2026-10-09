const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'extracted_assets');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const content = fs.readFileSync('Aartechassets.html', 'utf8');
const lines = content.split('\n');
const root = lines[1094];

// Extract all data URIs
const imgRegex = /<img[^>]+src=["'](data:image\/([a-zA-Z0-9\+\-]+);base64,([^"']+))["'][^>]*>/gi;
let match;
let count = 0;
const manifest = [];

// Also check background images or other data URIs
while ((match = imgRegex.exec(root)) !== null) {
  count++;
  const fullTag = match[0];
  const mimeSubtype = match[2];
  const b64Data = match[3];
  
  const altMatch = fullTag.match(/alt=["']([^"']*)["']/i);
  const alt = altMatch ? altMatch[1] : `image_${count}`;

  let ext = mimeSubtype;
  if (mimeSubtype === 'svg+xml') ext = 'svg';
  else if (mimeSubtype === 'jpeg') ext = 'jpg';
  
  // Safe filename based on alt or count
  const safeAlt = alt.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 30) || 'asset';
  const filename = `${String(count).padStart(2, '0')}_${safeAlt}.${ext}`;
  const filePath = path.join(outDir, filename);

  const buffer = Buffer.from(b64Data, 'base64');
  fs.writeFileSync(filePath, buffer);

  manifest.push({
    index: count,
    filename,
    alt,
    ext,
    sizeBytes: buffer.length,
    fullTagSnippet: fullTag.slice(0, 100)
  });
}

// Also check for background-image data URIs
const bgRegex = /url\(["']?(data:image\/([a-zA-Z0-9\+\-]+);base64,([^"')]+))["']?\)/gi;
let bgMatch;
let bgCount = 0;
while ((bgMatch = bgRegex.exec(root)) !== null) {
  bgCount++;
  const mimeSubtype = bgMatch[2];
  const b64Data = bgMatch[3];
  let ext = mimeSubtype === 'svg+xml' ? 'svg' : (mimeSubtype === 'jpeg' ? 'jpg' : mimeSubtype);
  const filename = `bg_${String(bgCount).padStart(2, '0')}.${ext}`;
  const filePath = path.join(outDir, filename);
  const buffer = Buffer.from(b64Data, 'base64');
  fs.writeFileSync(filePath, buffer);
  manifest.push({
    index: `bg_${bgCount}`,
    filename,
    alt: 'Background Image',
    ext,
    sizeBytes: buffer.length
  });
}

fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`Extracted ${count} img tags and ${bgCount} background images to ${outDir}`);

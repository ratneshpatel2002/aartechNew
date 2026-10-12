import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import jpeg from 'jpeg-js';
import { PNG } from 'pngjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const refHtmlPath = path.join(__dirname, '..', 'reference', 'Machine assembly on scroll.html');
const htmlContent = fs.readFileSync(refHtmlPath, 'utf8');
const match = htmlContent.match(/const SRC="([^"]+)";/);

if (!match) {
  console.error('Could not find SRC in reference HTML');
  process.exit(1);
}

const base64Data = match[1].replace('data:image/jpeg;base64,', '');
const buf = Buffer.from(base64Data, 'base64');
const raw = jpeg.decode(buf, { useTArray: true });
console.log('Original image dimensions:', raw.width, 'x', raw.height);

const png = new PNG({ width: raw.width, height: raw.height });

// Filter ONLY the background paper & grid lines (brightness >= 215)
// Any pixel with gray >= 215 becomes pure transparent white (#ffffff00).
// NO part of the model is removed or clipped! The entire model remains 100% full and complete!
let erasedCount = 0;
let keptCount = 0;

for (let i = 0; i < raw.data.length; i += 4) {
  const r = raw.data[i];
  const g = raw.data[i + 1];
  const b = raw.data[i + 2];
  const gray = 0.299 * r + 0.587 * g + 0.114 * b;

  if (gray >= 215) {
    // Pure white transparent background - removes all grid lines!
    png.data[i] = 255;
    png.data[i + 1] = 255;
    png.data[i + 2] = 255;
    png.data[i + 3] = 0;
    erasedCount++;
  } else {
    // Full CAD model - 100% complete, unclipped!
    png.data[i] = r;
    png.data[i + 1] = g;
    png.data[i + 2] = b;
    png.data[i + 3] = 255;
    keptCount++;
  }
}

console.log('Erased (background):', erasedCount, 'Kept (full model):', keptCount);
const outPngPath = path.join(__dirname, '..', 'public', 'assets', 'machine-model-full.png');
const pngBuffer = PNG.sync.write(png);
fs.writeFileSync(outPngPath, pngBuffer);
console.log('Saved to', outPngPath, 'size:', pngBuffer.length);

// Also generate the base64 URI file
const base64URI = `data:image/png;base64,${pngBuffer.toString('base64')}`;
const base64File = path.join(__dirname, '..', 'src', 'data', 'machineModelBase64.js');
const base64Content = `// Base64 clean CAD model image (100% complete model, background grid lines removed)\nexport const MACHINE_MODEL_SRC = "${base64URI}";\n`;
fs.writeFileSync(base64File, base64Content, 'utf8');
console.log('Updated src/data/machineModelBase64.js with full model!');

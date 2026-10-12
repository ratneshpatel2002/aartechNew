import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import jpeg from 'jpeg-js';
import { PNG } from 'pngjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, '..', 'public', 'assets', 'machine-model.jpg');
const buf = fs.readFileSync(inputPath);
const raw = jpeg.decode(buf, { useTArray: true });

const W = raw.width;
const H = raw.height;

// Point-in-polygon helper
function pointInPoly(x, y, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1];
    const xj = poly[j][0], yj = poly[j][1];
    const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Machine outline polygon (outer perimeter of the whole machine)
// Machine is roughly within x: 150 to 980, y: 30 to 860
// Let's create a PNG with 4 channels (RGBA)
const png = new PNG({ width: W, height: H });

// We want:
// 1. All grid lines (brightness >= 215) to become 100% pure white (or transparent).
// 2. Machine lines (< 200) to be preserved crisply.
// 3. Any stray background dashed lines outside the machine to be removed if desired.
// Let's test clearing any pixel with brightness >= 210:
// If gray >= 210 -> white (255, 255, 255, 0 or 255, 255, 255, 255)
// Let's see: If we set alpha = 0 for background, or set RGB = 255, 255, 255:

for (let i = 0; i < raw.data.length; i += 4) {
  const r = raw.data[i];
  const g = raw.data[i + 1];
  const b = raw.data[i + 2];
  const gray = 0.299 * r + 0.587 * g + 0.114 * b;

  if (gray >= 210) {
    // Pure white / transparent background - eliminates ALL grid lines!
    png.data[i] = 255;
    png.data[i + 1] = 255;
    png.data[i + 2] = 255;
    png.data[i + 3] = 0; // Transparent!
  } else {
    // Dark CAD lines - keep them crisp and solid!
    // Normalize contrast slightly so black is pure black
    const factor = Math.max(0, (gray - 30) / (210 - 30));
    const val = Math.round(factor * 200);
    png.data[i] = Math.min(r, val);
    png.data[i + 1] = Math.min(g, val);
    png.data[i + 2] = Math.min(b, val);
    png.data[i + 3] = 255; // Fully opaque!
  }
}

const outPngPath = path.join(__dirname, '..', 'public', 'assets', 'machine-model-clean.png');
const outBuffer = PNG.sync.write(png);
fs.writeFileSync(outPngPath, outBuffer);
console.log('Saved machine-model-clean.png, size:', outBuffer.length);

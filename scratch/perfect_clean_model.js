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

const png = new PNG({ width: W, height: H });

// Step 1: Remove all background grid lines (brightness >= 215)
// Keeps all machine lines, stippling, coils, hatching 100% intact!
for (let i = 0; i < raw.data.length; i += 4) {
  const r = raw.data[i];
  const g = raw.data[i + 1];
  const b = raw.data[i + 2];
  const gray = 0.299 * r + 0.587 * g + 0.114 * b;

  if (gray >= 215) {
    // Pure white / transparent background - eliminates ALL grid lines!
    png.data[i] = 255;
    png.data[i + 1] = 255;
    png.data[i + 2] = 255;
    png.data[i + 3] = 0;
  } else {
    // Exact machine lines
    png.data[i] = r;
    png.data[i + 1] = g;
    png.data[i + 2] = b;
    png.data[i + 3] = 255;
  }
}

function eraseBox(x1, y1, x2, y2) {
  for (let y = Math.max(0, y1); y <= Math.min(H - 1, y2); y++) {
    for (let x = Math.max(0, x1); x <= Math.min(W - 1, x2); x++) {
      const idx = (y * W + x) * 4;
      png.data[idx] = 255;
      png.data[idx + 1] = 255;
      png.data[idx + 2] = 255;
      png.data[idx + 3] = 0;
    }
  }
}

function eraseLine(x1, y1, x2, y2, r = 4) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const steps = Math.ceil(len * 2);
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const cx = Math.round(x1 + dx * t);
    const cy = Math.round(y1 + dy * t);
    eraseBox(cx - r, cy - r, cx + r, cy + r);
  }
}

// Erase ONLY lines in the empty background outside the machine:
// 1. Far margins in empty background space:
eraseBox(890, 0, W - 1, H - 1); // Right empty space (erases dashed line to corner and right leader lines)
eraseBox(0, 0, 135, H - 1);     // Left empty space (erases left dashed line to corner and left leader lines)
eraseBox(0, 0, W - 1, 35);      // Top empty space (erases top vertical line and top arrows)
eraseBox(0, 885, W - 1, H - 1);  // Bottom empty space (erases bottom vertical line)

// 2. Erase the dashed axis line sticking out from the rear shaft into empty space (x: 850-890, y: 260-285)
eraseLine(850, 275, 890, 260, 3);

// 3. Erase the dashed axis line sticking out past the bottom-left foot into empty space (x: 110-150, y: 745-720)
eraseLine(110, 755, 145, 725, 3);

// 4. Erase leader arrows floating in empty space on top-left:
eraseBox(135, 230, 175, 275);
eraseBox(135, 320, 175, 370);
eraseBox(330, 50, 400, 100);

const outPath = path.join(__dirname, '..', 'public', 'assets', 'machine-model-clean.png');
fs.writeFileSync(outPath, PNG.sync.write(png));
console.log('Successfully created clean PNG!');

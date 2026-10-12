import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PNG } from 'pngjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pngPath = path.join(__dirname, '..', 'public', 'assets', 'machine-model-clean.png');
const png = PNG.sync.read(fs.readFileSync(pngPath));
const W = png.width;
const H = png.height;

// Find all dark pixels outside the machine area
// Let's define the outer boundary of the machine:
// 1. Top region (above y < 35): anything is background
// 2. Far left region (x < 140): anything is background
// 3. Far right region (x > 880): anything above y < 450 (except the rear shaft which is between x: 780-880, y: 230-345)
// 4. Above y < 140 and x < 400: empty space
// 5. Leader line to "34" at x: 670-745, y: 140-230
// Let's create an envelope polygon of the machine itself:
const machineEnvelope = [
  [440, 35],   // top curve start
  [590, 36],   // top curve
  [650, 72],   // top right step
  [645, 145],  // top right housing step
  [670, 230],  // bearing housing
  [745, 230],  // rear shaft start
  [885, 255],  // rear shaft tip top
  [885, 345],  // rear shaft tip bottom
  [740, 345],  // rear shaft base
  [740, 415],  // right bracket
  [845, 475],  // right frame top
  [845, 780],  // right frame bottom
  [820, 840],  // right I-beam
  [610, 890],  // bottom center
  [500, 890],  // bottom rail
  [140, 830],  // left I-beam foot
  [140, 700],  // left I-beam top
  [170, 520],  // front cover left lower
  [170, 220],  // front cover left upper
  [300, 145],  // front cover top left
  [440, 95],   // front cover top right
  [440, 35]    // back to top
];

function pointInEnvelope(x, y) {
  let inside = false;
  for (let i = 0, j = machineEnvelope.length - 1; i < machineEnvelope.length; j = i++) {
    const xi = machineEnvelope[i][0], yi = machineEnvelope[i][1];
    const xj = machineEnvelope[j][0], yj = machineEnvelope[j][1];
    const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Let's erase any pixel outside the machine envelope + 15px margin
let erasedOutside = 0;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const idx = (y * W + x) * 4;
    // Check if inside envelope with slight tolerance or padding
    if (!pointInEnvelope(x, y)) {
      if (png.data[idx + 3] > 0) {
        png.data[idx] = 255;
        png.data[idx + 1] = 255;
        png.data[idx + 2] = 255;
        png.data[idx + 3] = 0; // Erase!
        erasedOutside++;
      }
    }
  }
}

console.log('Erased outside envelope pixels:', erasedOutside);
const outPath = path.join(__dirname, '..', 'public', 'assets', 'machine-model-clean.png');
fs.writeFileSync(outPath, PNG.sync.write(png));
console.log('Updated machine-model-clean.png');

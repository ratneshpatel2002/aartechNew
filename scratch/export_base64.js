import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htmlContent = fs.readFileSync(path.join(__dirname, '..', 'reference', 'Machine assembly on scroll.html'), 'utf8');
const match = htmlContent.match(/const SRC="([^"]+)";/);

if (match) {
  const src = match[1];
  const outPath = path.join(__dirname, '..', 'src', 'data', 'machineModelBase64.js');
  const code = `// Base64 CAD model image extracted from reference/Machine assembly on scroll.html\nexport const MACHINE_MODEL_SRC = "${src}";\n`;
  fs.writeFileSync(outPath, code, 'utf8');
  console.log('Successfully created src/data/machineModelBase64.js! File size:', fs.statSync(outPath).size);
} else {
  console.error('Failed to match SRC in reference HTML');
}

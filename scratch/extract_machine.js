import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htmlContent = fs.readFileSync(path.join(__dirname, '..', 'reference', 'Machine assembly on scroll.html'), 'utf8');
const match = htmlContent.match(/const SRC="(data:image\/jpeg;base64,[^"]+)"/);

if (match) {
  const base64Data = match[1].replace('data:image/jpeg;base64,', '');
  const outDir = path.join(__dirname, '..', 'public', 'assets');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outPath = path.join(outDir, 'machine-model.jpg');
  fs.writeFileSync(outPath, Buffer.from(base64Data, 'base64'));
  console.log('Successfully saved to:', outPath, 'size:', fs.statSync(outPath).size);
} else {
  console.error('Failed to find SRC in reference HTML');
}

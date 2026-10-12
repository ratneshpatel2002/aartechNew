import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cleanPngPath = path.join(__dirname, '..', 'public', 'assets', 'machine-model-clean.png');
const pngBuf = fs.readFileSync(cleanPngPath);
const base64Str = `data:image/png;base64,${pngBuf.toString('base64')}`;

const targetFile = path.join(__dirname, '..', 'src', 'data', 'machineModelBase64.js');
const fileContent = `// Base64 clean CAD model image (grid lines removed, transparent background)\nexport const MACHINE_MODEL_SRC = "${base64Str}";\n`;

fs.writeFileSync(targetFile, fileContent, 'utf8');
console.log('Successfully updated src/data/machineModelBase64.js! Length:', base64Str.length);

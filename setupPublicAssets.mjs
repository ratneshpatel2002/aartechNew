import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, 'extracted_assets');
const targetDir = path.join(__dirname, 'public', 'assets');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
files.forEach(file => {
  const src = path.join(srcDir, file);
  const dest = path.join(targetDir, file);
  fs.copyFileSync(src, dest);
});

const aliases = {
  'logo.webp': '02_main_logo.webp',
  'footer_logo.webp': '60_footer_logo.webp',
  'whatsapp.svg': '01_whatsapp.svg',
  'linkedin.webp': '61_linked_in.webp',
  'hero_1.png': '05_empowering_possibilities_engin.png',
  'hero_2.png': '06_transforming_industries_poweri.png',
  'hero_3.jpg': '07_powering_progress_one_product_.jpg',
  'industry_1.png': '11_image_1.png',
  'industry_2.jpg': '12_image_2.jpg',
  'industry_3.png': '10_image_3.png',
  'map_desktop.png': '37_map_.png',
  'map_mobile.png': '38_map_mobile.png',
  'solution_1.jpg': '41_image_1.jpg',
  'solution_2.jpg': '39_image_2.jpg',
  'solution_0.jpg': '40_image_0.jpg',
  'service_1.webp': '56_services.webp',
  'service_2.webp': '57_services.webp',
  'service_3.webp': '58_services.webp',
  'service_4.webp': '59_services.webp',
};

for (let i = 0; i <= 10; i++) {
  aliases[`customer_${i}.webp`] = `${15 + i}_customer_${i}.webp`;
}

aliases['testimonial_1.webp'] = '44_testimonialimage.webp';
aliases['testimonial_2.webp'] = '46_testimonialimage.webp';
aliases['testimonial_3.webp'] = '48_testimonialimage.webp';
aliases['testimonial_4.webp'] = '50_testimonialimage.webp';
aliases['testimonial_5.webp'] = '52_testimonialimage.webp';
aliases['testimonial_6.webp'] = '54_testimonialimage.webp';

for (const [alias, original] of Object.entries(aliases)) {
  const origPath = path.join(targetDir, original);
  if (fs.existsSync(origPath)) {
    fs.copyFileSync(origPath, path.join(targetDir, alias));
  }
}

console.log('Public assets configured successfully!');

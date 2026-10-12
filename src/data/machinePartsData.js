// 7 Layer transparent PNG parts from reference2/Machine assembly on scroll new.html
// Static assets located in public/assets/machine-parts/
// Native CAD resolution: 1800x1344 (1200x896 aspect ratio 4:3)
export const W = 1200;
export const H = 896;

export const PARTS_CONFIG = [
  { n: 'Front shaft', off: [-170, 95], at: [0.00, 0.40] },
  { n: 'Rear shaft', off: [170, -95], at: [0.00, 0.40] },
  { n: 'Front cover', off: [-105, 60], at: [0.10, 0.55] },
  { n: 'Rotor and stator', off: [55, -80], at: [0.25, 0.70] },
  { n: 'Top housing', off: [0, -185], at: [0.40, 0.85] },
  { n: 'Base frame', off: [0, 150], at: [0.40, 0.85] },
  { n: 'Lower housing', off: [0, 60], at: [0.55, 1.00] }
];

export const Z_ORDER = [5, 6, 3, 4, 2, 0, 1]; // back to front

export const MACHINE_PARTS_URIS = [
  '/assets/machine-parts/part_0.png',
  '/assets/machine-parts/part_1.png',
  '/assets/machine-parts/part_2.png',
  '/assets/machine-parts/part_3.png',
  '/assets/machine-parts/part_4.png',
  '/assets/machine-parts/part_5.png',
  '/assets/machine-parts/part_6.png'
];

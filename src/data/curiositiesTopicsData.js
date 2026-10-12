// Exact topic data and SVG artwork from reference2/Small Curiosities.html
// Plus rich engineering segments formatted to the exact same structure

const VB = 'viewBox="0 0 1440 900" preserveAspectRatio="xMaxYMax slice" aria-hidden="true"';

function rng(seed) {
  return function() {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
}

export function artOcean() {
  return (
    '<svg class="art" ' + VB + '>' +
      '<g class="layer" style="--i:0"><circle cx="1150" cy="430" r="82" fill="#E6F4EF" opacity=".92"/></g>' +
      '<g class="layer" style="--i:1"><path fill="#17707F" d="M0 650 C180 600 360 700 540 650 S900 600 1080 650 S1300 690 1440 640 V900 H0Z"/></g>' +
      '<g class="layer" style="--i:2"><path fill="#2A9094" d="M0 720 C200 680 380 770 600 720 S980 680 1200 725 S1380 750 1440 720 V900 H0Z"/></g>' +
      '<g class="layer" style="--i:3"><path fill="#8FD3C4" d="M0 800 C240 770 420 840 680 800 S1060 770 1260 805 S1400 820 1440 800 V900 H0Z"/></g>' +
    '</svg>'
  );
}

function pines(seed, count, base, hMin, hMax, color) {
  var r = rng(seed), out = '';
  for (var i = 0; i < count; i++) {
    var x = i * (1440 / count) + (r() * 40 - 20);
    var H = hMin + r() * (hMax - hMin) + (x > 900 ? r() * 130 : 0);
    var w = H * 0.42, b = base;
    var y1 = b - H * 0.68, y2 = b - H * 0.36;
    var pts = [
      [x, b - H], [x + w * 0.26, y1], [x + w * 0.12, y1], [x + w * 0.38, y2], [x + w * 0.2, y2], [x + w * 0.5, b],
      [x - w * 0.5, b], [x - w * 0.2, y2], [x - w * 0.38, y2], [x - w * 0.12, y1], [x - w * 0.26, y1]
    ].map(function(p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ');
    out += '<polygon points="' + pts + '" fill="' + color + '"/>';
  }
  return out;
}

export function artForest() {
  return (
    '<svg class="art" ' + VB + '>' +
      '<g class="layer" style="--i:0"><circle cx="1140" cy="400" r="64" fill="#D9E8A8" opacity=".85"/></g>' +
      '<g class="layer" style="--i:1">' + pines(11, 17, 800, 130, 200, '#4A7249') + '</g>' +
      '<g class="layer" style="--i:2">' + pines(23, 14, 855, 150, 250, '#38593A') + '</g>' +
      '<g class="layer" style="--i:3">' + pines(37, 10, 905, 160, 280, '#1B2E1E') + '<rect x="0" y="880" width="1440" height="40" fill="#1B2E1E"/></g>' +
    '</svg>'
  );
}

export function artDesert() {
  return (
    '<svg class="art" ' + VB + '>' +
      '<g class="layer" style="--i:0"><circle cx="1090" cy="520" r="120" fill="#F7DB9A"/></g>' +
      '<g class="layer" style="--i:1"><path fill="#D08A44" d="M0 700 C220 620 420 660 640 710 S1020 760 1220 670 S1380 630 1440 650 V900 H0Z"/></g>' +
      '<g class="layer" style="--i:2"><path fill="#B2652F" d="M0 770 C260 700 480 740 720 790 S1100 830 1300 750 S1400 730 1440 740 V900 H0Z"/></g>' +
      '<g class="layer" style="--i:3"><path fill="#86442A" d="M0 840 C300 800 560 850 820 850 S1200 870 1440 820 V900 H0Z"/></g>' +
    '</svg>'
  );
}

export function artNight() {
  var r = rng(5), s = '', s2 = '';
  for (var i = 0; i < 150; i++) {
    var x = r() * 1440, y = r() * 640, rad = 0.8 + r() * 1.5, o = (0.3 + r() * 0.7).toFixed(2);
    var c = '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + rad.toFixed(1) + '" fill="#F1ECFF" opacity="' + o + '"/>';
    if (i % 2) s += c; else s2 += c;
  }
  return (
    '<svg class="art" ' + VB + '>' +
      '<defs><mask id="moonmask"><rect width="1440" height="900" fill="#fff"/><circle cx="1184" cy="398" r="62" fill="#000"/></mask></defs>' +
      '<g class="layer" style="--i:0">' + s2 + '</g>' +
      '<g class="layer" style="--i:1">' + s + '<circle cx="1150" cy="420" r="72" fill="#F1ECFF" mask="url(#moonmask)"/></g>' +
      '<g class="layer" style="--i:2"><path fill="#2B2A66" d="M0 760 C260 690 520 740 760 710 S1160 650 1440 720 V900 H0Z"/></g>' +
      '<g class="layer" style="--i:3"><path fill="#15142F" d="M0 830 C300 790 600 850 900 820 S1300 790 1440 830 V900 H0Z"/></g>' +
    '</svg>'
  );
}

function flower(x, y, s, c) {
  var p = '';
  for (var k = 0; k < 5; k++) {
    var a = k * 72 * Math.PI / 180 - Math.PI / 2;
    p += '<circle cx="' + (x + Math.cos(a) * 11 * s).toFixed(1) + '" cy="' + (y + Math.sin(a) * 11 * s).toFixed(1) + '" r="' + (9 * s).toFixed(1) + '" fill="' + c + '"/>';
  }
  return p + '<circle cx="' + x + '" cy="' + y + '" r="' + (4 * s).toFixed(1) + '" fill="#C95B7B"/>';
}

export function artBlossom() {
  var r = rng(9);
  var pts = [
    [1380, 105], [1300, 140], [1240, 195], [1160, 240], [1090, 250], [1000, 275], [930, 305], [870, 350], [830, 395],
    [1060, 215], [1010, 175], [950, 150], [1235, 215], [1250, 290], [1205, 345], [1340, 170], [1120, 285], [900, 255]
  ];
  var a = '', b = '';
  pts.forEach(function(p, i) {
    var f = flower(p[0] + (r() * 16 - 8) | 0, p[1] + (r() * 16 - 8) | 0, 0.8 + r() * 0.7, r() > 0.35 ? '#FFF0F3' : '#FFD3DD');
    if (i % 2) a += f; else b += f;
  });
  var petals = '';
  for (var i = 0; i < 30; i++) {
    petals += '<ellipse cx="' + (r() * 1440).toFixed(0) + '" cy="' + (560 + r() * 320).toFixed(0) + '" rx="7" ry="4" fill="#FFF0F3" opacity=".9" transform="rotate(' + (r() * 180 | 0) + ' 0 0)" style="transform-box:fill-box;transform-origin:center"/>';
  }
  return (
    '<svg class="art" ' + VB + '>' +
      '<g class="layer" style="--i:0"><g fill="none" stroke="#5A2A3E" stroke-linecap="round">' +
        '<path stroke-width="9" d="M1440 90 C1300 130 1230 230 1090 250 S900 300 820 400"/>' +
        '<path stroke-width="6" d="M1090 250 C1040 190 1000 160 930 150"/>' +
        '<path stroke-width="5" d="M1240 195 C1255 260 1250 310 1205 350"/></g></g>' +
      '<g class="layer" style="--i:1">' + b + '</g>' +
      '<g class="layer" style="--i:2">' + a + '</g>' +
      '<g class="layer" style="--i:3"><path fill="#E48FA5" d="M0 810 C300 760 600 840 900 800 S1300 770 1440 810 V900 H0Z"/>' + petals + '</g>' +
      '<g class="layer" style="--i:4"><path fill="#C96B86" d="M0 860 C320 830 640 880 960 855 S1340 835 1440 860 V900 H0Z"/></g>' +
    '</svg>'
  );
}

export function artTechGrid() {
  return (
    '<svg class="art" ' + VB + '>' +
      '<g class="layer" style="--i:0"><circle cx="1200" cy="450" r="100" fill="#C4A467" opacity=".35"/></g>' +
      '<g class="layer" style="--i:1"><path fill="#150a58" d="M0 660 C240 610 460 710 680 660 S1040 610 1240 665 S1380 680 1440 650 V900 H0Z"/></g>' +
      '<g class="layer" style="--i:2"><path fill="#0C013D" d="M0 740 C220 700 440 780 680 735 S1020 700 1260 745 S1380 760 1440 730 V900 H0Z"/></g>' +
      '<g class="layer" style="--i:3"><path fill="#B80001" d="M0 820 C260 785 500 850 760 810 S1120 785 1320 820 S1400 830 1440 815 V900 H0Z"/></g>' +
    '</svg>'
  );
}

// Complete 5 Topics from Small Curiosities.html
export const CURIOSITIES_TOPICS = [
  {
    id: 'ocean',
    name: 'Ocean',
    hint: 'Tides, depth and salt',
    orb: '#1E7F8C',
    bg: '#0E4A5A',
    fg: '#E6F4EF',
    title: 'The long blue',
    lede: 'Most of the planet is water, and most of that water is far darker and colder than the shore suggests.',
    notes: [
      ['Tides', 'Pulled by the Moon, the sea rises and falls about twice a day along most coasts.'],
      ['Depth', 'Sunlight fades out around 200 metres down. Below that, life runs on its own light or on what drifts from above.'],
      ['Salt', 'Rivers carry minerals to the sea over millions of years. The water keeps them when it evaporates.']
    ],
    art: artOcean
  },
  {
    id: 'forest',
    name: 'Forest',
    hint: 'Rings, leaves and shade',
    orb: '#4F7A4B',
    bg: '#2E4630',
    fg: '#EEF1DC',
    title: 'Under the canopy',
    lede: 'A forest is slow and layered: tall crowns, shrubs, moss, and a floor of leaves that never stops becoming soil.',
    notes: [
      ['Rings', 'Trees in temperate climates add one ring of wood a year, wide in good seasons and narrow in dry ones.'],
      ['Leaf litter', 'Fallen leaves are broken down by fungi and insects, which hands nutrients back to the roots.'],
      ['Layers', 'Light drops off quickly from crown to floor, so plants near the ground are built for shade.']
    ],
    art: artForest
  },
  {
    id: 'desert',
    name: 'Desert',
    hint: 'Dunes and dry air',
    orb: '#E3A94D',
    bg: '#E3B25B',
    fg: '#3A2410',
    title: 'Dry country',
    lede: 'Deserts are defined by how little rain they get, not by how hot they are. Cold ones count too.',
    notes: [
      ['Dunes', 'Wind lifts sand grains and drops them again, so a dune slowly walks downwind.'],
      ['Cacti', 'Their stems swell with stored water, and spines shade the surface and cut down airflow.'],
      ['Cold nights', 'With little cloud or moisture to hold heat, the ground cools fast once the sun is gone.']
    ],
    art: artDesert
  },
  {
    id: 'night',
    name: 'Night sky',
    hint: 'Planets, stars and the Moon',
    orb: '#3A3585',
    bg: '#1C1B3F',
    fg: '#F1ECFF',
    title: 'After dark',
    lede: 'Away from city lights, a few thousand stars are visible with no equipment at all. Give your eyes twenty minutes to adjust.',
    notes: [
      ['Planets', 'They shine steadily, while stars twinkle as their light passes through moving air.'],
      ['Old light', 'Sunlight reaches us in about eight minutes. Light from the nearest other star takes over four years.'],
      ['The Moon', 'It rises roughly fifty minutes later each night, which is why its phase shifts through the month.']
    ],
    art: artNight
  },
  {
    id: 'blossom',
    name: 'Blossom',
    hint: 'A few days of color',
    orb: '#F0A9B8',
    bg: '#F0B7C2',
    fg: '#4A1F33',
    title: 'Brief bloom',
    lede: 'Flowering trees put everything into a few days of color, then let it go all at once.',
    notes: [
      ['Hanami', 'In Japan, picnicking under cherry trees in bloom is a custom that goes back centuries.'],
      ['Timing', 'Warm spells bring blossom forward, and a cold snap can hold it back by a week or more.'],
      ['Petal fall', 'Wind and rain strip the flowers fast, which is part of why people make time to go and look.']
    ],
    art: artBlossom
  }
];

// Complete Aartech Domain Topics matching exact Small Curiosities format
export const AARTECH_TOPICS_LIST = [
  // Industry Segment Topics
  {
    id: 'defense & exploration',
    name: 'Defence & Exploration',
    hint: 'Mission-critical power & pulsed energy',
    orb: '#0C013D',
    bg: '#0C013D',
    fg: '#FFFFFF',
    title: 'Defense and exploration',
    lede: 'Hostile terrains and strategic applications demand zero-failure electrical systems that withstand extreme shock, vibration, and sub-zero starts.',
    notes: [
      ['Cold Start', 'Ultracapacitor engine cranking systems activate military main battle tanks and mobile generators instantly at -40°C.'],
      ['Pulsed Power', 'High-discharge energy banks supply radar tracking arrays and directed energy installations with microsecond recovery.'],
      ['Rugged Enclosures', 'Custom IP67 composite casings isolate sensitive field electronics from sand, water immersion, and ballistics.']
    ],
    art: artTechGrid
  },
  {
    id: 'renewable energy',
    name: 'Renewable Energy',
    hint: 'Solar, wind & hybrid storage systems',
    orb: '#1E7F8C',
    bg: '#0E4A5A',
    fg: '#E6F4EF',
    title: 'Clean power continuity',
    lede: 'Harnessing variable renewable generation requires fast bus transfers and hybrid storage to buffer intermittent dips and maintain grid stability.',
    notes: [
      ['Bus Transfer', 'Fast sub-cycle bus transfer (<2 cycles) prevents inverter disconnection and plant shutdowns during grid fluctuations.'],
      ['Kinetic Buffer', 'Flywheel energy systems inject rapid reactive power during sudden solar irradiance drops or wind shear.'],
      ['Peak Optimization', 'Programmable demand limiters balance onsite battery discharge with utility tariffs to prevent demand charges.']
    ],
    art: artOcean
  },
  {
    id: 'non-renewable energy',
    name: 'Non-Renewable Energy',
    hint: 'Thermal, nuclear & hydro generation',
    orb: '#D08A44',
    bg: '#3D2A18',
    fg: '#F7E6D0',
    title: 'Base load power reliability',
    lede: 'Gigawatt thermal, hydro, and nuclear generating stations depend on sub-cycle auxiliary bus changeover to avoid unit trips during transmission fault conditions.',
    notes: [
      ['Station Auxiliary', 'Seamless fast transfer of station auxiliary transformers during feeder trips protects boiler feed pumps and cooling systems.'],
      ['Generator Protection', 'Microprocessor control and relay panels ensure precision differential protection, loss-of-excitation, and out-of-step trip isolation.'],
      ['Black Start', 'Rapid capacitor energy storage supplies instant black-start auxiliary exciter power during emergency blackout recovery.']
    ],
    art: artDesert
  },
  {
    id: 'heavy engineering industries',
    name: 'Heavy Engineering Industries',
    hint: 'Fast bus transfer & dynamic loads',
    orb: '#86442A',
    bg: '#1C1B3F',
    fg: '#F1ECFF',
    title: 'Continuous industrial drives',
    lede: 'In steel mills, chemical plants, and cement works, a fraction of a second of power disruption costs millions in ruined batches and stuck machinery.',
    notes: [
      ['Zero Interruption', 'BTS 2000 automates high-speed bus transfers under full motor load without tripping sensitive variable frequency drives.'],
      ['Fault Isolation', 'CLIP current limiters extinguish devastating short-circuit faults within a quarter of a cycle, preserving switchgear.'],
      ['Protection Bays', 'Centralized relay automation and SCADA panels monitor mill motors, transformers, and switchyard feeders in real time.']
    ],
    art: artNight
  },
  {
    id: 'health care',
    name: 'Health Care',
    hint: 'Zero interruption hospital backup',
    orb: '#17707F',
    bg: '#0F3C47',
    fg: '#E0F2F1',
    title: 'Unfailing life safety power',
    lede: 'Hospitals and intensive healthcare facilities cannot tolerate even momentary power dips in operating theatres, intensive care units, and imaging suites.',
    notes: [
      ['Sub-Cycle Transfer', 'Ultra-fast source transfer switches switchover ICU and life-support feeder feeds before voltage collapse occurs.'],
      ['Clean Power Inverters', 'High-endurance industrial inverters prevent electrical harmonics and noise from interfering with diagnostic MRI and CT equipment.'],
      ['Generator Cold-Start', 'Ultracapacitor engine start banks guarantee emergency backup diesel generators crank instantly in any season without battery failure.']
    ],
    art: artOcean
  },
  {
    id: 'transportation',
    name: 'Transportation',
    hint: 'Metro rail & locomotive traction',
    orb: '#3A3585',
    bg: '#171638',
    fg: '#EBE9F7',
    title: 'Traction and transit energy',
    lede: 'Electric locomotives, metro networks, and heavy freight rail require rapid energy recovery and reliable power continuity across traction substations.',
    notes: [
      ['Craning & Dynamic Braking', 'Absorbs dynamic regenerative braking energy to feed auxiliary traction and stabilize catenary voltage levels.'],
      ['Substation Relay Automation', 'Engineered control panels manage overhead line sectionalizers and track-side auto-reclosers under high vibration.'],
      ['Instant Cold Cranking', 'Ultra-capacitor starter systems provide dependable locomotive diesel engine starting without heavy lead-acid batteries.']
    ],
    art: artNight
  },
  {
    id: 'waste water treatment',
    name: 'Waste Water Treatment',
    hint: 'Pumping continuity & automation',
    orb: '#4F7A4B',
    bg: '#1D3320',
    fg: '#E8F0E6',
    title: 'Continuous treatment flow',
    lede: 'Municipal and industrial effluent treatment plants operate continuous biological aerators and high-volume pumps requiring non-stop electrical supply.',
    notes: [
      ['Continuous Pumping', 'Fast bus transfer eliminates aeration pump cavitation and water-hammer shockwaves caused by utility voltage transients.'],
      ['Polymer Field Housings', 'Corrosion-proof IP67 polymer enclosures withstand corrosive hydrogen sulfide and outdoor weather without rust.'],
      ['Intelligent Load Limiter', 'Automated energy limiters prevent excessive maximum demand charges during peak community pumping schedules.']
    ],
    art: artForest
  },

  // Product Segment Topics
  {
    id: 'bts 2000',
    name: 'BTS 2000',
    hint: 'Fast Bus Transfer System controller',
    orb: '#0C013D',
    bg: '#16132B',
    fg: '#EDEAF8',
    title: 'Fast bus transfer system',
    lede: 'Microprocessor-based high-speed bus transfer system engineered for continuous process facilities and generating station auxiliaries.',
    notes: [
      ['High Speed Transfer', 'Executes transfer within 1.5 to 2 cycles when phase angle, slip frequency, and voltage differentials are satisfied.'],
      ['In-Phase & Residual', 'Automatically chooses between fast in-phase, residual voltage, or long-time transfer modes based on live motor bus back-EMF.'],
      ['Proven Reliability', 'Over 1,000 installations across thermal, hydro, nuclear, petrochemical, and manufacturing power plants globally.']
    ],
    art: artTechGrid
  },
  {
    id: 'control & relay panel (crp)',
    name: 'Control & Relay Panel (CRP)',
    hint: 'Protection & metering cubicles',
    orb: '#17707F',
    bg: '#0F3C47',
    fg: '#E0F2F1',
    title: 'Protection and control panels',
    lede: 'Engineered switchyard and generation control panels delivering centralized protection, metering, alarm annunciation, and substation automation.',
    notes: [
      ['IEC 61850 Architecture', 'Seamless optical fiber and Ethernet communication interfacing with modern SCADA and remote substation control centers.'],
      ['Precision Relay Schemes', 'Customized differential, overcurrent, distance, and earth-fault protection relays engineered to utility standards.'],
      ['Factory Tested Enclosures', 'Rigid form-factor metal-enclosed construction with full wiring oscillography and type-tested thermal validation.']
    ],
    art: artOcean
  },
  {
    id: 'fcm',
    name: 'FCM (Fast Bus Transfer)',
    hint: 'Microsecond high-speed transfer',
    orb: '#B80001',
    bg: '#240608',
    fg: '#F8E8E9',
    title: 'Fast bus transfer module',
    lede: 'Dedicated high-speed transfer relay designed for industrial plants to switch seamlessly between utility feeds without dropping motor contactors.',
    notes: [
      ['Sub-Cycle Decision', 'Processes voltage vectors in microseconds to determine whether to execute fast in-phase transfer safely.'],
      ['Motor Back-EMF Vectoring', 'Constantly samples bus decay frequency to eliminate shaft torque shock on sensitive rotating machinery.'],
      ['Compact Modular Design', 'Easily retrofitted into existing switchgear cubicles with minimal civil alterations and downtime.']
    ],
    art: artTechGrid
  },
  {
    id: 'ultra capacitors',
    name: 'Ultra Capacitors',
    hint: 'Instant cold cranking modules',
    orb: '#2A9094',
    bg: '#0E4A5A',
    fg: '#E6F4EF',
    title: 'Electrostatic energy storage',
    lede: 'High-power ultracapacitor modules engineered for extreme power density, rapid cycling, and ultra-reliable starting performance.',
    notes: [
      ['Million-Cycle Life', 'Over 1,000,000 cycles with zero electrochemical degradation or capacity loss over decades of service.'],
      ['Sub-Zero Tolerance', 'Maintains full rated cranking current from -40°C to +65°C without freezing electrolyte or loss of capacitance.'],
      ['Maintenance Free', 'No toxic acid, no watering, and no thermal runaway risk, delivering peace of mind for critical backup installations.']
    ],
    art: artOcean
  },
  {
    id: 'kraning',
    name: 'Kraning',
    hint: 'Crane dynamic braking systems',
    orb: '#D08A44',
    bg: '#3D2A18',
    fg: '#F7E6D0',
    title: 'Dynamic braking and energy handling',
    lede: 'Specialized dynamic braking and energy capture technology built for container port cranes, overhead gantry cranes, and heavy lifting hoists.',
    notes: [
      ['Regenerative Dissipation', 'Safely absorbs and regulates massive regenerative energy spikes when lowering heavy container payloads.'],
      ['Braking Resistor Protection', 'Intelligent thermal modeling prevents resistor overheat and ensures continuous cycle availability.'],
      ['Grid Surge Buffer', 'Prevents dynamic braking surges from tripping plant switchgear or distorting facility power quality.']
    ],
    art: artDesert
  },
  {
    id: 'load limiter',
    name: 'Load Limiter',
    hint: 'Intelligent demand management',
    orb: '#3A3585',
    bg: '#171638',
    fg: '#EBE9F7',
    title: 'Intelligent demand limiting',
    lede: 'Automated peak power and energy management systems that protect distribution equipment from overloads and slash utility peak-demand penalties.',
    notes: [
      ['Dynamic Peak Clamping', 'Monitors realtime kVA demand and automatically sheds non-critical auxiliary loads before threshold breach.'],
      ['Tamper-Resistant Hardware', 'Microprocessor units sealed against tampering, designed for rural feeder lines and commercial complexes.'],
      ['Automated Reconnection', 'Smoothly restores shed circuits once line loads normalize without operator intervention or manual resets.']
    ],
    art: artNight
  },
  {
    id: 'flywheel',
    name: 'Flywheel',
    hint: 'Kinetic energy buffer storage',
    orb: '#8FD3C4',
    bg: '#0E4A5A',
    fg: '#E6F4EF',
    title: 'Kinetic energy storage',
    lede: 'High-speed rotary kinetic storage systems providing instantaneous ride-through energy and grid inertia stabilization.',
    notes: [
      ['Instantaneous Frequency Response', 'Delivers full rated power in milliseconds to bridge the gap while standby diesel gensets synchronize.'],
      ['Zero Chemical Footprint', 'Pure kinetic storage operating in a vacuum housing with magnetic bearings, eliminating chemical battery hazards.'],
      ['Decades of Operational Life', 'Designed for 20+ years of continuous high-cycling service without cell degradation or capacity decline.']
    ],
    art: artOcean
  },
  {
    id: 'solid state relay',
    name: 'Solid State Relay',
    hint: 'High endurance solid state switching',
    orb: '#86442A',
    bg: '#3D2A18',
    fg: '#F7E6D0',
    title: 'High-endurance electronic switching',
    lede: 'Semiconductor-based switching solutions engineered for silent, sparkless, and ultra-high cycle industrial heating and motor applications.',
    notes: [
      ['Zero Contact Arcing', 'Optical isolation and solid-state power switches eliminate electrical arc wear in explosive or dusty atmospheres.'],
      ['Infinite Switching Cycles', 'Capable of millions of fast switching cycles per hour without mechanical fatigue or contact bounce.'],
      ['Built-in Snubber Protection', 'Integrated MOV and transient snubber networks protect against line inductive voltage spikes.']
    ],
    art: artDesert
  },

  // Solution Segment Topics
  {
    id: 'bus transfer schemes',
    name: 'Bus Transfer Schemes',
    hint: 'Sub-cycle power source changeover',
    orb: '#0C013D',
    bg: '#16132B',
    fg: '#EDEAF8',
    title: 'Source bus transfer schemes',
    lede: 'Engineered power continuity schemes that automatically swap power feeds during upstream outages to keep production lines running 24/7.',
    notes: [
      ['High Speed Transfer', 'Executes transfer within 1.5 to 2 cycles when phase angle, slip frequency, and voltage differentials are satisfied.'],
      ['In-Phase & Residual', 'Automatically chooses between fast in-phase, residual voltage, or long-time transfer modes based on live motor bus back-EMF.'],
      ['Turnkey Engineering', 'From protection coordination studies to on-site commissioning and retrofitting of legacy electromechanical relays.']
    ],
    art: artTechGrid
  },
  {
    id: 'pulse power applications',
    name: 'Pulse Power Applications',
    hint: 'High voltage capacitor discharge',
    orb: '#B80001',
    bg: '#240608',
    fg: '#F8E8E9',
    title: 'Pulsed power and high energy discharge',
    lede: 'Specialized energy discharge banks delivering megawatts of peak pulse power for scientific research, defense radar, and electromagnetic forming.',
    notes: [
      ['Microsecond Discharge', 'Engineered low-inductance busbars deliver kiloampere current pulses in fractions of a millisecond.'],
      ['High-Voltage Isolation', 'Dielectric barriers and fiber-optic triggers ensure total operator safety from kilovolt capacitor banks.'],
      ['Pulsed Forming Systems', 'Enables electromagnetic metal forming, magnetic pulse welding, and laser flashlamp excitation.']
    ],
    art: artTechGrid
  },
  {
    id: 'solar rooftop / offgrid installations',
    name: 'Solar Rooftop / Offgrid',
    hint: 'Industrial hybrid solar microgrid',
    orb: '#2A9094',
    bg: '#0E4A5A',
    fg: '#E6F4EF',
    title: 'Industrial rooftop and offgrid microgrids',
    lede: 'Engineered commercial and industrial solar PV microgrids integrating battery and capacitor storage for dependable self-reliance.',
    notes: [
      ['Hybrid Microgrid Management', 'Intelligent controllers seamlessly blend rooftop solar generation with utility grid and standby diesel power.'],
      ['Grid Export Control', 'Zero-export feedback controllers ensure compliance with local utility regulations where net metering is restricted.'],
      ['Rugged Inverter Topology', 'Industrial-grade solar inverters engineered for harsh ambient temperatures and polluted industrial atmospheres.']
    ],
    art: artOcean
  },
  {
    id: 'custom polymer enclosures',
    name: 'Custom Polymer Enclosures',
    hint: 'Non-metallic IP67 field housings',
    orb: '#4F7A4B',
    bg: '#1D3320',
    fg: '#E8F0E6',
    title: 'Corrosion-proof non-metallic housings',
    lede: 'Engineered structural polymer enclosures designed for corrosive chemical zones, coastal sub-stations, and outdoor telecom nodes.',
    notes: [
      ['IP67 Waterproof & Dustproof', 'Continuous silicone gaskets prevent any moisture ingress during direct high-pressure hose-downs or monsoons.'],
      ['Non-Metallic Safety', 'Completely non-conductive enclosures eliminate shock risk and earth fault leakage currents in wet environments.'],
      ['UV & Chemical Resistant', 'Engineered resin blends will not crack, chalk, or degrade under harsh solar UV and chemical fumes.']
    ],
    art: artForest
  },
  {
    id: 'engine starting solutions',
    name: 'Engine Starting Solutions',
    hint: 'Sub-zero cold start modules',
    orb: '#B80001',
    bg: '#240608',
    fg: '#F8E8E9',
    title: 'Guaranteed engine starting solutions',
    lede: 'Turnkey ultracapacitor cranking systems delivering instant start performance for diesel generators, locomotive engines, and marine vessels.',
    notes: [
      ['Sub-Zero Readiness', 'Starts diesel and turbine engines on the first attempt even after weeks of freezing standby conditions.'],
      ['Zero Maintenance', 'No electrolyte top-ups, no sulfation risk, and robust resistance to shock, vibration, and deep discharge.'],
      ['Dual-Source Redundancy', 'Combines energy storage capacitor modules with auxiliary battery inputs for fail-safe redundancy.']
    ],
    art: artTechGrid
  },
  {
    id: 'ups / inverter solutions',
    name: 'UPS / Inverter Solutions',
    hint: 'Industrial continuity inverters',
    orb: '#17707F',
    bg: '#0F3C47',
    fg: '#E0F2F1',
    title: 'Industrial continuity inverters',
    lede: 'Heavy-duty galvanic isolation UPS and static inverter systems engineered for utility substations, process automation, and refineries.',
    notes: [
      ['Galvanic Transformer Isolation', 'Protects sensitive digital automation equipment from severe AC mains voltage spikes and lightning transients.'],
      ['High Inrush Capability', 'Handles 200% overload for motor starts and solenoid valve energization without transferring to bypass.'],
      ['Substation Battery Compatibility', 'Directly integrates with standard 110V or 220V DC station batteries with high MTBF reliability.']
    ],
    art: artOcean
  }
];

export function getTopicByIdOrName(idOrName) {
  if (!idOrName) return AARTECH_TOPICS_LIST[0];
  const query = idOrName.toLowerCase().trim();

  // 1. Check Aartech topics list first
  const found = AARTECH_TOPICS_LIST.find((t) => t.id === query || t.name.toLowerCase() === query);
  if (found) return found;

  // 2. Fallback: generate exact Small Curiosities format for any other segment name
  return {
    id: query.replace(/[^a-z0-9]/g, '-'),
    name: idOrName,
    hint: 'Engineered specialized solution',
    orb: '#0C013D',
    bg: '#16132B',
    fg: '#EDEAF8',
    title: idOrName.toLowerCase(),
    lede: 'Engineered application solutions designed and field-proven by Aartech Solonics for mission-critical reliability across heavy industries.',
    notes: [
      ['Core Technology', 'Custom application engineering developed to satisfy rigorous national and international industrial benchmarks.'],
      ['Field Reliability', 'Extensive laboratory type-testing, thermal cycling, and field validation ensure decades of uninterrupted operation.'],
      ['Turnkey Integration', 'Full lifecycle support including system study, integration engineering, commissioning, and operational training.']
    ],
    art: artTechGrid
  };
}

// Professional industrial domain descriptions for segment dropdown options and explorer pages
// Inherited from Small Curiosities format: <b>Title</b><small>Subtitle/Hint</small>

export const SEGMENT_HINTS = {
  // Industries
  'defense & exploration': 'Mission-critical power & pulsed energy',
  'renewable energy': 'Solar, wind & hybrid storage systems',
  'non-renewable energy': 'Thermal, nuclear & captive utilities',
  'power transmission & distribution': 'Grid reliability & sub-station protection',
  'heavy engineering industries': 'Continuous process drives & fast switching',
  'healthcare': 'Zero-fail medical power continuity',
  'it & telecom': 'Critical backup & uninterruptible loads',
  'waste management': 'Eco-smart processing & recovery units',
  'transportation': 'Railways, metro & transit power systems',

  // Products
  'kranking ultracapacitors': 'High-rate engine starting & pulsed power',
  'bestcase': 'Ruggedized composite IP67 enclosures',
  'solid waste treatment': 'Decentralized automated processing',
  'clip fault current limitors': 'Ultra-fast microsecond fault isolation',
  'control & relay panels': 'Intelligent protection & automation bays',
  'bts 2000': 'Fast bus transfer systems (<2 cycles)',
  'ac & dc ups': 'Industrial grade heavy-duty power backup',
  'flywheel': 'Kinetic energy storage & ride-through',
  'solar design & services': 'Turnkey EPC, engineering & consultancy',
  'load limiting': 'Intelligent tariff & peak demand control',

  // Solutions
  'reliable engine starting': 'Sub-zero cold start & defense readiness',
  'power backup unit': 'Seamless critical load preservation',
  'energy storage': 'Modular electrochemical & kinetic units',
  'customized plastic case': 'Bespoke transit & field instrumentation cases',
  'control & automation': 'Substation SCADA & telemetry systems',
  'process continuity': 'Zero-interruption bus transfer solutions',
  'fault current limiting': 'Explosion prevention & switchgear protection',
  'uninterrupted power supply': 'High MTBF industrial uninterruptible feeds',
  'solar design, engineering': 'Utility scale & rooftop system engineering',
};

export const getSegmentHint = (name, fallback = 'Engineered industrial solution') => {
  if (!name) return fallback;
  const key = name.toLowerCase().trim();
  return SEGMENT_HINTS[key] || fallback;
};

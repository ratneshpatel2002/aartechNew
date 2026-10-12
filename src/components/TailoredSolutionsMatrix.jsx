import React, { useState, useRef, useEffect } from 'react';
import { clients } from '../data/siteData';
import MachineAssemblyScroll from './MachineAssemblyScroll';
import SegmentExplorerModal from './SegmentExplorerModal';

const INDUSTRY_OPTIONS = [
  { name: 'Defence & Exploration', hint: 'Mission-critical power & pulsed energy', color: '#0C013D', topicId: 'defense & exploration' },
  { name: 'Renewable Energy', hint: 'Solar, wind & hybrid storage systems', color: '#1E7F8C', topicId: 'renewable energy' },
  { name: 'Non-Renewable Energy', hint: 'Thermal, nuclear & hydro generation', color: '#D08A44', topicId: 'non-renewable energy' },
  { name: 'Heavy Engineering Industries', hint: 'Fast bus transfer & dynamic loads', color: '#86442A', topicId: 'heavy engineering industries' },
  { name: 'Health Care', hint: 'Zero interruption hospital backup', color: '#17707F', topicId: 'health care' },
  { name: 'Transportation', hint: 'Metro rail & locomotive traction', color: '#3A3585', topicId: 'transportation' },
  { name: 'Waste Water Treatment', hint: 'Pumping continuity & automation', color: '#4F7A4B', topicId: 'waste water treatment' }
];

const PRODUCT_OPTIONS = [
  { name: 'BTS 2000', hint: 'Fast Bus Transfer System controller', color: '#0C013D', topicId: 'bts 2000' },
  { name: 'Control & Relay Panel (CRP)', hint: 'Protection & metering cubicles', color: '#17707F', topicId: 'control & relay panel (crp)' },
  { name: 'FCM (Fast Bus Transfer)', hint: 'Microsecond high-speed transfer', color: '#B80001', topicId: 'fcm' },
  { name: 'Ultra Capacitors', hint: 'Instant cold cranking modules', color: '#2A9094', topicId: 'ultra capacitors' },
  { name: 'Kraning', hint: 'Crane dynamic braking systems', color: '#D08A44', topicId: 'kraning' },
  { name: 'Load Limiter', hint: 'Intelligent demand management', color: '#3A3585', topicId: 'load limiter' },
  { name: 'Flywheel', hint: 'Kinetic energy buffer storage', color: '#8FD3C4', topicId: 'flywheel' },
  { name: 'Solid State Relay', hint: 'High endurance solid state switching', color: '#86442A', topicId: 'solid state relay' }
];

const SOLUTION_OPTIONS = [
  { name: 'Bus Transfer Schemes', hint: 'Sub-cycle power source changeover', color: '#0C013D', topicId: 'bus transfer schemes' },
  { name: 'Pulse Power Applications', hint: 'High voltage capacitor discharge', color: '#B80001', topicId: 'pulse power applications' },
  { name: 'Solar Rooftop / Offgrid', hint: 'Industrial hybrid solar microgrid', color: '#2A9094', topicId: 'solar rooftop / offgrid installations' },
  { name: 'Custom Polymer Enclosures', hint: 'Non-metallic IP67 field housings', color: '#4F7A4B', topicId: 'custom polymer enclosures' },
  { name: 'Engine Starting Solutions', hint: 'Sub-zero cold start modules', color: '#B80001', topicId: 'engine starting solutions' },
  { name: 'UPS / Inverter Solutions', hint: 'Industrial continuity inverters', color: '#17707F', topicId: 'ups / inverter solutions' }
];

const BRAND_CLIENTS = [
  {
    id: 0,
    name: "NTPC Limited",
    renderLogo: () => (
      <svg viewBox="0 0 150 44" className="h-8 sm:h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(2, 2)">
          <path d="M12 2C8 7 5 14 7 21c2 6 7 11 13 13-3-2-6-7-7-12-1-5 2-10 6-15-2 2-5 6-7 12z" fill="#00843D" />
          <path d="M19 5c-3 3-4 8-2 13 2 5 6 9 11 11-2-2-5-6-6-10-1-4 2-8 5-12-2 1-4 5-7 8z" fill="#005B94" />
          <text x="36" y="22" fontFamily="'Antonio', sans-serif" fontWeight="700" fontSize="22" fill="#005B94" letterSpacing="0.04em">NTPC</text>
          <text x="37" y="32" fontFamily="'Barlow', sans-serif" fontWeight="700" fontSize="8" fill="#00843D" letterSpacing="0.14em">LIMITED</text>
        </g>
      </svg>
    )
  },
  {
    id: 1,
    name: "Adani Power",
    renderLogo: () => (
      <svg viewBox="0 0 150 44" className="h-8 sm:h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(4, 4)">
          <path d="M4 22C4 12 12 4 22 4" stroke="#7B1FA2" strokeWidth="4" strokeLinecap="round" />
          <path d="M11 25C11 17 17 11 25 11" stroke="#00A3E0" strokeWidth="4" strokeLinecap="round" />
          <path d="M18 28C18 22 22 18 28 18" stroke="#133B5C" strokeWidth="4" strokeLinecap="round" />
          <text x="34" y="21" fontFamily="'Barlow', sans-serif" fontWeight="800" fontSize="19" fill="#133B5C" letterSpacing="-0.02em">adani</text>
          <text x="35" y="31" fontFamily="'Barlow', sans-serif" fontWeight="700" fontSize="8.5" fill="#00A3E0" letterSpacing="0.16em">POWER</text>
        </g>
      </svg>
    )
  },
  {
    id: 2,
    name: "Jindal Power",
    renderLogo: () => (
      <svg viewBox="0 0 150 44" className="h-8 sm:h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(4, 4)">
          <polygon points="12,2 20,16 13,16 18,30 6,15 13,15" fill="#D8232A" />
          <text x="27" y="21" fontFamily="'Antonio', sans-serif" fontWeight="700" fontSize="21" fill="#1B365D" letterSpacing="0.04em">JINDAL</text>
          <text x="28" y="31" fontFamily="'Barlow', sans-serif" fontWeight="700" fontSize="8.5" fill="#D8232A" letterSpacing="0.18em">POWER</text>
        </g>
      </svg>
    )
  },
  {
    id: 3,
    name: "Hindalco Mahan",
    renderLogo: () => (
      <svg viewBox="0 0 160 44" className="h-8 sm:h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(4, 4)">
          <circle cx="14" cy="18" r="6" fill="#DA291C" />
          <path d="M14 6v3M14 27v3M4 18h3M21 18h3M7 11l2 2M19 23l2 2M7 25l2-2M19 13l2-2" stroke="#F2A900" strokeWidth="1.8" strokeLinecap="round" />
          <text x="30" y="20" fontFamily="'Antonio', sans-serif" fontWeight="700" fontSize="20" fill="#DA291C" letterSpacing="0.04em">HINDALCO</text>
          <text x="31" y="30" fontFamily="'Barlow', sans-serif" fontWeight="600" fontSize="7.5" fill="#475569" letterSpacing="0.12em">ADITYA BIRLA GROUP</text>
        </g>
      </svg>
    )
  },
  {
    id: 4,
    name: "CSTPS",
    renderLogo: () => (
      <svg viewBox="0 0 150 44" className="h-8 sm:h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(4, 4)">
          <rect x="3" y="6" width="20" height="23" rx="2" fill="#0A2540" />
          <path d="M13 8l-4 10h5l-3 9 7-11h-5z" fill="#C8102E" />
          <text x="30" y="21" fontFamily="'Antonio', sans-serif" fontWeight="700" fontSize="21" fill="#0A2540" letterSpacing="0.04em">CSTPS</text>
          <text x="31" y="31" fontFamily="'Barlow', sans-serif" fontWeight="700" fontSize="8" fill="#C8102E" letterSpacing="0.12em">MAHAGENCO</text>
        </g>
      </svg>
    )
  },
  {
    id: 5,
    name: "Damodar Valley Corporation",
    renderLogo: () => (
      <svg viewBox="0 0 160 44" className="h-8 sm:h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(4, 4)">
          <circle cx="15" cy="18" r="12" stroke="#003E7E" strokeWidth="2.2" fill="#F8FAFC" />
          <path d="M8 18c3-2 10-2 14 0M8 22c3-2 10-2 14 0" stroke="#138808" strokeWidth="1.8" strokeLinecap="round" />
          <text x="34" y="20" fontFamily="'Antonio', sans-serif" fontWeight="700" fontSize="21" fill="#003E7E" letterSpacing="0.05em">DVC</text>
          <text x="35" y="30" fontFamily="'Barlow', sans-serif" fontWeight="600" fontSize="7.5" fill="#138808" letterSpacing="0.1em">DAMODAR VALLEY CORP</text>
        </g>
      </svg>
    )
  },
  {
    id: 6,
    name: "Indian Oil",
    renderLogo: () => (
      <svg viewBox="0 0 150 44" className="h-8 sm:h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(4, 4)">
          <circle cx="15" cy="18" r="13" fill="#F47920" />
          <rect x="2" y="14" width="26" height="7.5" fill="#002B49" />
          <text x="34" y="21" fontFamily="'Barlow', sans-serif" fontWeight="800" fontSize="17" fill="#002B49" letterSpacing="0.02em">IndianOil</text>
          <text x="35" y="31" fontFamily="'Barlow', sans-serif" fontWeight="600" fontSize="7.5" fill="#F47920" letterSpacing="0.16em">PUBLIC SECTOR</text>
        </g>
      </svg>
    )
  },
  {
    id: 7,
    name: "BHEL",
    renderLogo: () => (
      <svg viewBox="0 0 150 44" className="h-8 sm:h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(4, 4)">
          <polygon points="15,3 25,9 25,25 15,31 5,25 5,9" stroke="#004C87" strokeWidth="2.2" fill="#F8FAFC" />
          <circle cx="15" cy="17" r="4.5" fill="#C8102E" />
          <text x="33" y="21" fontFamily="'Antonio', sans-serif" fontWeight="700" fontSize="22" fill="#004C87" letterSpacing="0.06em">BHEL</text>
          <text x="34" y="31" fontFamily="'Barlow', sans-serif" fontWeight="600" fontSize="8" fill="#475569" letterSpacing="0.12em">POWER SECTOR</text>
        </g>
      </svg>
    )
  },
  {
    id: 8,
    name: "Power Grid Corporation",
    renderLogo: () => (
      <svg viewBox="0 0 160 44" className="h-8 sm:h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(4, 4)">
          <path d="M8 29L14 5l6 24M10 20h8M12 12h4" stroke="#003399" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="14" cy="5" r="2.5" fill="#008040" />
          <text x="30" y="20" fontFamily="'Antonio', sans-serif" fontWeight="700" fontSize="19" fill="#008040" letterSpacing="0.04em">POWERGRID</text>
          <text x="31" y="30" fontFamily="'Barlow', sans-serif" fontWeight="600" fontSize="7.5" fill="#003399" letterSpacing="0.12em">CORP OF INDIA</text>
        </g>
      </svg>
    )
  },
  {
    id: 9,
    name: "Tata Power",
    renderLogo: () => (
      <svg viewBox="0 0 150 44" className="h-8 sm:h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(4, 4)">
          <path d="M6 8c4 0 7 3.5 7 8s-3 8-7 8M20 8c-4 0-7 3.5-7 8s3 8 7 8" stroke="#00509E" strokeWidth="2.5" strokeLinecap="round" />
          <text x="29" y="20" fontFamily="'Antonio', sans-serif" fontWeight="700" fontSize="20" fill="#00509E" letterSpacing="0.05em">TATA POWER</text>
          <text x="30" y="30" fontFamily="'Barlow', sans-serif" fontWeight="600" fontSize="7.5" fill="#475569" letterSpacing="0.14em">LEADERSHIP WITH TRUST</text>
        </g>
      </svg>
    )
  },
  {
    id: 10,
    name: "State Electricity Boards",
    renderLogo: () => (
      <svg viewBox="0 0 160 44" className="h-8 sm:h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(4, 4)">
          <polygon points="14,2 24,14 16,14 22,30 8,15 15,15" fill="#F59E0B" />
          <text x="30" y="20" fontFamily="'Antonio', sans-serif" fontWeight="700" fontSize="18" fill="#0284C7" letterSpacing="0.04em">STATE ELECTRICITY</text>
          <text x="31" y="30" fontFamily="'Barlow', sans-serif" fontWeight="600" fontSize="7.5" fill="#475569" letterSpacing="0.12em">BOARDS & DISCOMS</text>
        </g>
      </svg>
    )
  }
];

export default function TailoredSolutionsMatrix({ onOpenInquiry }) {
  // Modal explorer state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [clickCoords, setClickCoords] = useState(null);

  // Marquee hover pause state
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  // Dropdown open states: 'industry' | 'product' | 'solution' | null
  const [openDropdown, setOpenDropdown] = useState(null);

  // Section ref for scroll-based assembly animation tracking
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  // Dropdown ref for click-outside detection
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Selection handlers - Open popup directly and close dropdown
  const handleSelectIndustry = (ind, e = null) => {
    const topicId = typeof ind === 'object' && ind.topicId ? ind.topicId : ind;
    if (e && e.currentTarget) {
      const r = e.currentTarget.getBoundingClientRect();
      setClickCoords({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    } else {
      setClickCoords({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }
    setOpenDropdown(null);
    setModalItem(topicId);
    setIsModalOpen(true);
  };

  const handleSelectProduct = (prod, e = null) => {
    const topicId = typeof prod === 'object' && prod.topicId ? prod.topicId : prod;
    if (e && e.currentTarget) {
      const r = e.currentTarget.getBoundingClientRect();
      setClickCoords({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    } else {
      setClickCoords({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }
    setOpenDropdown(null);
    setModalItem(topicId);
    setIsModalOpen(true);
  };

  const handleSelectSolution = (sol, e = null) => {
    const topicId = typeof sol === 'object' && sol.topicId ? sol.topicId : sol;
    if (e && e.currentTarget) {
      const r = e.currentTarget.getBoundingClientRect();
      setClickCoords({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    } else {
      setClickCoords({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }
    setOpenDropdown(null);
    setModalItem(topicId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalItem(null);
    setOpenDropdown(null);
  };

  // 4x duplicated clients for uninterrupted 60fps infinite loop
  const quadClients = [...BRAND_CLIENTS, ...BRAND_CLIENTS, ...BRAND_CLIENTS, ...BRAND_CLIENTS];

  return (
    <section
      ref={sectionRef}
      id="tailored-solutions"
      aria-label="Tailored To Your Needs"
      className="w-full bg-white text-[#0C013D] relative overflow-visible scroll-mt-20 selection:bg-[#0C013D] selection:text-white border-b border-slate-200"
    >
      <span id="matrix" className="absolute -top-28 left-0 pointer-events-none" />

      {/* Pinned Scroll Track for Model Assembly: stays disassembled until reaching page 2, then pins while assembling */}
      <div
        id="assembly-scroll-track"
        ref={trackRef}
        className="relative w-full overflow-visible"
        style={{ minHeight: '230vh' }}
      >
        {/* Sticky Viewport Stage: Pinned below navbar while scroll drives assembly */}
        <div
          id="assembly-stage"
          ref={stageRef}
          className="sticky top-16 sm:top-20 w-full min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] flex items-center overflow-visible z-10 py-6"
        >
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:pl-16 lg:pr-4 xl:pr-6">
            {/* Unified 2-Column Section: Left (Headline + Description + Dropdown Selectors) | Right (Full CAD Machine Assembly Model) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          {/* Left Block: Text + Dropdown Selectors (Shifted to the right) */}
          <div className="lg:col-span-5 flex flex-col justify-center lg:translate-x-6 xl:translate-x-10 2xl:translate-x-12">
            {/* Eyebrow with gold dash */}
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-[2px] bg-[#C4A467] inline-block" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#0C013D]/75">
                TAILORED TO YOUR NEEDS
              </span>
            </div>

            {/* Main Headline in Aartech's original font (Antonio) and #B80001 (Enlarged) */}
            <h2 className="font-antonio text-4xl sm:text-5xl lg:text-[52px] xl:text-[60px] text-[#B80001] font-normal tracking-wide uppercase leading-[1.08] mb-4 sm:mb-5">
              Our Tailored Solutions
            </h2>

            {/* Description Subtext in #0C013D (Enlarged) */}
            <p className="text-[#0C013D]/85 text-base sm:text-lg lg:text-[19px] xl:text-xl font-normal leading-relaxed mb-6 sm:mb-7">
              Choose any <strong className="font-semibold text-[#0C013D]">ONE</strong> of the <strong className="font-semibold text-[#0C013D]">THREE</strong> segments below and check out corresponding 2 segments linked with your chosen one.
            </p>

            {/* Dropdown Section Sub-header */}
            <div className="flex items-center justify-between gap-2 mb-3.5">
              <span className="text-sm sm:text-base lg:text-[17px] font-semibold text-[#0C013D]">
                Choose one segment to see related segments:
              </span>
            </div>

            {/* 3 Dropdown Segment Selectors: Row 1 (Industry & Product styled matching screenshot), Row 2 (Solution centered in the middle below) */}
            <div ref={dropdownRef} className="space-y-4 sm:space-y-5 w-full">
              {/* Row 1: Industry and Product placed close together */}
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5 lg:gap-3">
                {/* 1. Industry Button (Chevron Left matching dark button 'Contact sales' in screenshot) */}
                <div className="pick w-full">
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={openDropdown === 'industry'}
                    onClick={() => setOpenDropdown(openDropdown === 'industry' ? null : 'industry')}
                    className="chevron-btn chevron-btn-left bg-[#333144] hover:bg-[#252332] text-white shadow-md cursor-pointer"
                  >
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mx-auto">
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-widest text-slate-300 leading-tight">
                          Industry
                        </span>
                        <span className="truncate text-xs sm:text-sm lg:text-[14px] font-black uppercase tracking-wide text-white leading-tight">
                          Choose Industry
                        </span>
                      </div>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className={`arrow-icon text-white transition-transform duration-300 ease-[cubic-bezier(.7,0,.2,1)] shrink-0 ${
                          openDropdown === 'industry' ? 'rotate-180' : ''
                        }`}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </button>

                  <ul
                    className={`menu ${openDropdown === 'industry' ? 'open' : ''} max-h-80 overflow-y-auto w-full sm:w-[360px]`}
                    role="menu"
                  >
                    <li role="none" className="px-3.5 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-[#0C013D]">
                      <span className="text-[11px] font-bold uppercase tracking-wider">
                        Industry Options
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        Opens ripple popup
                      </span>
                    </li>
                    {INDUSTRY_OPTIONS.map((item, idx) => (
                      <li key={idx} role="none">
                        <button
                          type="button"
                          role="menuitem"
                          className="opt"
                          style={{ '--c': item.color }}
                          onClick={(e) => handleSelectIndustry(item, e)}
                        >
                          <span className="dot" style={{ backgroundColor: item.color }} />
                          <b>{item.name}</b>
                          <small>{item.hint}</small>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Product Button (Chevron Right matching bright green button 'Start now' in screenshot) */}
                <div className="pick w-full">
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={openDropdown === 'product'}
                    onClick={() => setOpenDropdown(openDropdown === 'product' ? null : 'product')}
                    className="chevron-btn chevron-btn-right bg-[#28E99F] hover:bg-[#20D690] text-[#0C013D] shadow-md cursor-pointer"
                  >
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mx-auto">
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-widest text-[#0C013D]/70 leading-tight">
                          Product
                        </span>
                        <span className="truncate text-xs sm:text-sm lg:text-[14px] font-black uppercase tracking-wide text-[#0C013D] leading-tight">
                          Choose Product
                        </span>
                      </div>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className={`arrow-icon text-[#0C013D] transition-transform duration-300 ease-[cubic-bezier(.7,0,.2,1)] shrink-0 ${
                          openDropdown === 'product' ? 'rotate-180' : ''
                        }`}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </button>

                  <ul
                    className={`menu ${openDropdown === 'product' ? 'open' : ''} right-0 left-auto max-h-80 overflow-y-auto w-full sm:w-[360px]`}
                    role="menu"
                  >
                    <li role="none" className="px-3.5 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-[#0C013D]">
                      <span className="text-[11px] font-bold uppercase tracking-wider">
                        Product Options
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        Opens ripple popup
                      </span>
                    </li>
                    {PRODUCT_OPTIONS.map((item, idx) => (
                      <li key={idx} role="none">
                        <button
                          type="button"
                          role="menuitem"
                          className="opt"
                          style={{ '--c': item.color }}
                          onClick={(e) => handleSelectProduct(item, e)}
                        >
                          <span className="dot" style={{ backgroundColor: item.color }} />
                          <b>{item.name}</b>
                          <small>{item.hint}</small>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Row 2: Solution Button placed below the two buttons and in the middle (Chevron matching Crimson brand) */}
              <div className="flex justify-center w-full">
                <div className="w-full sm:w-[calc(50%-1.25rem)] pick">
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={openDropdown === 'solution'}
                    onClick={() => setOpenDropdown(openDropdown === 'solution' ? null : 'solution')}
                    className="chevron-btn chevron-btn-right bg-[#B80001] hover:bg-[#9E0001] text-white shadow-md cursor-pointer"
                  >
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mx-auto">
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-widest text-red-200 leading-tight">
                          Solution
                        </span>
                        <span className="truncate text-xs sm:text-sm lg:text-[14px] font-black uppercase tracking-wide text-white leading-tight">
                          Choose Solution
                        </span>
                      </div>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className={`arrow-icon text-white transition-transform duration-300 ease-[cubic-bezier(.7,0,.2,1)] shrink-0 ${
                          openDropdown === 'solution' ? 'rotate-180' : ''
                        }`}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </button>

                  <ul
                    className={`menu ${openDropdown === 'solution' ? 'open' : ''} left-1/2 -translate-x-1/2 max-h-80 overflow-y-auto w-full sm:w-[360px]`}
                    role="menu"
                  >
                    <li role="none" className="px-3.5 py-2 bg-red-50 border-b border-red-100 flex items-center justify-between text-[#B80001]">
                      <span className="text-[11px] font-bold uppercase tracking-wider">
                        Solution Options
                      </span>
                      <span className="text-[10px] text-red-400 font-medium">
                        Opens ripple popup
                      </span>
                    </li>
                    {SOLUTION_OPTIONS.map((item, idx) => (
                      <li key={idx} role="none">
                        <button
                          type="button"
                          role="menuitem"
                          className="opt"
                          style={{ '--c': item.color }}
                          onClick={(e) => handleSelectSolution(item, e)}
                        >
                          <span className="dot" style={{ backgroundColor: item.color }} />
                          <b>{item.name}</b>
                          <small>{item.hint}</small>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sided Interactive CAD Machine Assembly on Scroll (Enlarged and positioned to the right) */}
          <div className="lg:col-span-7 flex items-center justify-end w-full overflow-visible">
            <div className="w-full lg:w-[125%] xl:w-[135%] 2xl:w-[140%] flex justify-end ml-auto lg:translate-x-12 xl:translate-x-20 2xl:translate-x-28">
              <div className="w-full">
                <MachineAssemblyScroll
                  parentSectionRef={trackRef}
                />
              </div>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>



      {/* Segment Explorer Popup Modal */}
      <SegmentExplorerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialItem={modalItem}
        clickCoords={clickCoords}
      />

      {/* Full-Width Customers Marquee Section (#0C013D background) */}
      <div className="w-full border-t border-white/10 bg-[#0C013D] py-10 lg:py-14 relative overflow-hidden">
        {/* Header container aligned with page margins */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#DE0001] block mb-1">
              Ecosystem & Partners
            </span>
            <h3 className="font-antonio text-3xl sm:text-4xl text-white uppercase tracking-wide font-normal">
              Customers
            </h3>
          </div>
        </div>

        {/* Full-Width Continuous Marquee Track spanning edge-to-edge */}
        <div className="relative w-full overflow-hidden py-3">
          {/* Subtle edge fade masks on #0C013D */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#0C013D] via-[#0C013D]/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#0C013D] via-[#0C013D]/80 to-transparent z-20 pointer-events-none" />

          <div className="flex overflow-hidden w-full">
            <div
              className="marquee-track flex items-center gap-6 sm:gap-8 py-2 shrink-0 will-change-transform"
              style={{
                animation: 'marquee 32s linear infinite',
                animationPlayState: isMarqueePaused ? 'paused' : 'running',
              }}
            >
              {quadClients.map((client, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setIsMarqueePaused(true)}
                  onMouseLeave={() => setIsMarqueePaused(false)}
                  className="flex items-center justify-center px-4 py-2.5 rounded-none bg-white border border-slate-200/90 shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 w-48 sm:w-56 h-20 sm:h-22 shrink-0 cursor-pointer select-none group"
                  title={client.name}
                >
                  {client.renderLogo()}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

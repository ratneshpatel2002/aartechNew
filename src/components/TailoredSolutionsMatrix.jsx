import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, Sparkles, Check, RefreshCw } from 'lucide-react';
import data from '../data/tailoredSolutionsData.json';
import { clients } from '../data/siteData';

// Helper to normalize strings for comparison
const norm = (str) => (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');

export default function TailoredSolutionsMatrix({ onOpenInquiry }) {
  const { dropdownLists, pathways } = data;

  // Active selection state: 'Industry' | 'Product' | 'Solution' | null
  const [activeType, setActiveType] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  // Marquee hover pause state
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  // Dropdown open states
  const [openDropdown, setOpenDropdown] = useState(null); // 'industry' | 'product' | 'solution' | null

  // Dropdown refs for click-outside detection
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

  // Find pathway based on current active selection
  const currentPathway = useMemo(() => {
    if (!activeType || !activeItem) return null;
    const itemNorm = norm(activeItem);

    return pathways.find((p) => {
      const typeMatches = p.type.toLowerCase() === activeType.toLowerCase();
      if (!typeMatches) return false;
      const pNorm = norm(p.name);
      return pNorm === itemNorm || pNorm.includes(itemNorm) || itemNorm.includes(pNorm);
    }) || null;
  }, [activeType, activeItem, pathways]);

  // Derived related lists from pathway
  const relatedData = useMemo(() => {
    if (!currentPathway) {
      return { industries: [], products: [], solutions: [] };
    }

    const res = { industries: [], products: [], solutions: [] };
    currentPathway.columns?.forEach((col) => {
      const header = (col.header || '').toLowerCase();
      if (header.includes('industry')) {
        res.industries = col.items.map((i) => i.title);
      } else if (header.includes('product')) {
        res.products = col.items.map((i) => i.title);
      } else if (header.includes('solution') || header.includes('soultion')) {
        res.solutions = col.items.map((i) => i.title);
      }
    });

    return res;
  }, [currentPathway]);

  // Handlers
  const handleSelectIndustry = (ind) => {
    setActiveType('Industry');
    setActiveItem(ind);
    setOpenDropdown(null);
  };

  const handleSelectProduct = (prod) => {
    setActiveType('Product');
    setActiveItem(prod);
    setOpenDropdown(null);
  };

  const handleSelectSolution = (sol) => {
    setActiveType('Solution');
    setActiveItem(sol);
    setOpenDropdown(null);
  };

  const handleClearSelection = () => {
    setActiveType(null);
    setActiveItem(null);
    setOpenDropdown(null);
  };

  // 4x duplicated clients for uninterrupted 60fps infinite loop across all resolutions
  const quadClients = [...clients, ...clients, ...clients, ...clients];

  return (
    <section
      id="tailored-solutions"
      aria-label="Tailored To Your Needs"
      className="w-full bg-white text-[#0C013D] relative overflow-hidden scroll-mt-20 selection:bg-[#0C013D] selection:text-white border-b border-slate-200"
    >
      <span id="matrix" className="absolute -top-28 left-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-14 lg:pt-16 lg:pb-16 relative z-10">
        {/* Top Section: Eyebrow + Headline + Paragraph + Hero Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Block */}
          <div className="lg:col-span-7">
            {/* Eyebrow with gold dash */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-[2px] bg-[#C4A467] inline-block" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0C013D]/75">
                TAILORED TO YOUR NEEDS
              </span>
            </div>

            {/* Main Headline in Aartech's original font (Antonio) and #B80001 */}
            <h2 className="font-antonio text-3xl sm:text-4xl lg:text-[46px] text-[#B80001] font-normal tracking-wide uppercase leading-tight mb-5">
              Our Tailored Solutions
            </h2>

            {/* Description Subtext in #0C013D */}
            <p className="text-[#0C013D]/80 text-base sm:text-[17px] font-normal leading-relaxed max-w-xl">
              Choose any <strong className="font-semibold text-[#0C013D]">ONE</strong> of the <strong className="font-semibold text-[#0C013D]">THREE</strong> segments below and check out corresponding 2 segments linked with your chosen one.
            </p>
          </div>

          {/* Right Hero Image: mac.jpg */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 max-w-[420px] w-full group bg-slate-50">
              <img
                src="/assets/mac.jpg"
                alt="Aartech Solonics Kranking Ultracapacitor engineering system"
                className="w-full h-auto object-cover block transform transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C013D]/10 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="w-full h-px bg-slate-200 my-8 lg:my-10" />

        {/* Middle Section: Dropdown Row */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-[#0C013D] text-base sm:text-[17px] font-medium">
              Choose one segment to see related segments.
            </p>
            {activeItem && (
              <button
                onClick={handleClearSelection}
                className="inline-flex items-center gap-1.5 text-xs text-[#0C013D]/70 hover:text-[#DE0001] transition-colors underline font-medium"
              >
                <RefreshCw size={12} />
                <span>Reset selection</span>
              </button>
            )}
          </div>

          {/* 3 Dropdown Selectors */}
          <div ref={dropdownRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 mb-6 relative">
            {/* 1. Choose Industry */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'industry' ? null : 'industry')}
                className={`w-full rounded-full border px-6 py-3.5 flex items-center justify-between text-base transition-all duration-200 cursor-pointer ${
                  activeType === 'Industry'
                    ? 'border-[#0C013D] bg-[#0C013D] text-white shadow-md font-semibold'
                    : 'border-slate-300 bg-slate-50/70 hover:bg-slate-100 hover:border-[#0C013D]/50 text-[#0C013D] font-medium'
                }`}
              >
                <span className="truncate pr-2">
                  {activeType === 'Industry' ? activeItem : 'Choose Industry'}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 shrink-0 ${
                    activeType === 'Industry' ? 'text-white' : 'text-[#0C013D]/70'
                  } ${openDropdown === 'industry' ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {openDropdown === 'industry' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 right-0 mt-2 z-50 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 max-h-72 overflow-y-auto"
                  >
                    {dropdownLists.industries.map((ind, idx) => {
                      const isSelected = activeType === 'Industry' && norm(activeItem) === norm(ind);
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectIndustry(ind)}
                          className={`w-full px-5 py-2.5 text-left text-sm transition-colors flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#0C013D] text-white font-semibold'
                              : 'text-[#0C013D] hover:bg-slate-100'
                          }`}
                        >
                          <span className="truncate">{ind}</span>
                          {isSelected && <Check size={14} className="shrink-0 text-white" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. Choose Product */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'product' ? null : 'product')}
                className={`w-full rounded-full border px-6 py-3.5 flex items-center justify-between text-base transition-all duration-200 cursor-pointer ${
                  activeType === 'Product'
                    ? 'border-[#0C013D] bg-[#0C013D] text-white shadow-md font-semibold'
                    : 'border-slate-300 bg-slate-50/70 hover:bg-slate-100 hover:border-[#0C013D]/50 text-[#0C013D] font-medium'
                }`}
              >
                <span className="truncate pr-2">
                  {activeType === 'Product' ? activeItem : 'Choose Product'}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 shrink-0 ${
                    activeType === 'Product' ? 'text-white' : 'text-[#0C013D]/70'
                  } ${openDropdown === 'product' ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {openDropdown === 'product' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 right-0 mt-2 z-50 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 max-h-72 overflow-y-auto"
                  >
                    {dropdownLists.products.map((prod, idx) => {
                      const isSelected = activeType === 'Product' && norm(activeItem) === norm(prod);
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectProduct(prod)}
                          className={`w-full px-5 py-2.5 text-left text-sm transition-colors flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#0C013D] text-white font-semibold'
                              : 'text-[#0C013D] hover:bg-slate-100'
                          }`}
                        >
                          <span className="truncate">{prod}</span>
                          {isSelected && <Check size={14} className="shrink-0 text-white" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Choose Solution */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'solution' ? null : 'solution')}
                className={`w-full rounded-full border px-6 py-3.5 flex items-center justify-between text-base transition-all duration-200 cursor-pointer ${
                  activeType === 'Solution'
                    ? 'border-[#0C013D] bg-[#0C013D] text-white shadow-md font-semibold'
                    : 'border-slate-300 bg-slate-50/70 hover:bg-slate-100 hover:border-[#0C013D]/50 text-[#0C013D] font-medium'
                }`}
              >
                <span className="truncate pr-2">
                  {activeType === 'Solution' ? activeItem : 'Choose Solution'}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 shrink-0 ${
                    activeType === 'Solution' ? 'text-white' : 'text-[#0C013D]/70'
                  } ${openDropdown === 'solution' ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {openDropdown === 'solution' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 right-0 mt-2 z-50 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 max-h-72 overflow-y-auto"
                  >
                    {dropdownLists.solutions.map((sol, idx) => {
                      const isSelected = activeType === 'Solution' && norm(activeItem) === norm(sol);
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectSolution(sol)}
                          className={`w-full px-5 py-2.5 text-left text-sm transition-colors flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#0C013D] text-white font-semibold'
                              : 'text-[#0C013D] hover:bg-slate-100'
                          }`}
                        >
                          <span className="truncate">{sol}</span>
                          {isSelected && <Check size={14} className="shrink-0 text-white" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Dynamic Connected Segments Results Drawer (Visible when a segment is selected) */}
        <AnimatePresence>
          {activeItem && currentPathway && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 15 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: 15 }}
              transition={{ duration: 0.3 }}
              className="mt-6 mb-8 overflow-hidden"
            >
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-xl">
                {/* Header bar of the active pathway */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#0C013D] text-white flex items-center justify-center shrink-0 shadow">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-widest text-[#0C013D]/70 font-bold block">
                        Linked Segments For {activeType}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#0C013D] tracking-wide">
                        {activeItem}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleClearSelection}
                      className="px-3.5 py-1.5 text-xs text-[#0C013D] hover:bg-slate-200 border border-slate-300 rounded-full transition-colors font-medium"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => onOpenInquiry && onOpenInquiry(`Consultation for ${activeItem} (${activeType})`)}
                      className="px-5 py-2 bg-[#0C013D] hover:bg-[#DE0001] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow transition-colors inline-flex items-center gap-2"
                    >
                      <span>Request RFQ</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>

                {/* 3 Related Columns: Linked Industries, Products, Solutions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                  {/* Linked Industries */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0C013D]/80 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0C013D]" />
                      <span>Linked Industries ({relatedData.industries.length})</span>
                    </h4>
                    <div className="space-y-1.5">
                      {relatedData.industries.length > 0 ? (
                        relatedData.industries.map((ind, i) => (
                          <button
                            key={i}
                            onClick={() => handleSelectIndustry(ind)}
                            className="w-full text-left px-3.5 py-2 text-xs rounded-lg bg-white hover:bg-[#0C013D] text-[#0C013D] hover:text-white transition-colors border border-slate-200 shadow-sm flex items-center justify-between group font-medium"
                          >
                            <span className="truncate">{ind}</span>
                            <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-white" />
                          </button>
                        ))
                      ) : (
                        <p className="text-xs text-slate-400 italic">Selected category</p>
                      )}
                    </div>
                  </div>

                  {/* Linked Products */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0C013D]/80 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0C013D]" />
                      <span>Linked Products ({relatedData.products.length})</span>
                    </h4>
                    <div className="space-y-1.5">
                      {relatedData.products.length > 0 ? (
                        relatedData.products.map((prod, i) => (
                          <button
                            key={i}
                            onClick={() => handleSelectProduct(prod)}
                            className="w-full text-left px-3.5 py-2 text-xs rounded-lg bg-white hover:bg-[#0C013D] text-[#0C013D] hover:text-white transition-colors border border-slate-200 shadow-sm flex items-center justify-between group font-medium"
                          >
                            <span className="truncate">{prod}</span>
                            <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-white" />
                          </button>
                        ))
                      ) : (
                        <p className="text-xs text-slate-400 italic">Selected category</p>
                      )}
                    </div>
                  </div>

                  {/* Linked Solutions */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0C013D]/80 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0C013D]" />
                      <span>Linked Solutions ({relatedData.solutions.length})</span>
                    </h4>
                    <div className="space-y-1.5">
                      {relatedData.solutions.length > 0 ? (
                        relatedData.solutions.map((sol, i) => (
                          <button
                            key={i}
                            onClick={() => handleSelectSolution(sol)}
                            className="w-full text-left px-3.5 py-2 text-xs rounded-lg bg-white hover:bg-[#0C013D] text-[#0C013D] hover:text-white transition-colors border border-slate-200 shadow-sm flex items-center justify-between group font-medium"
                          >
                            <span className="truncate">{sol}</span>
                            <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-white" />
                          </button>
                        ))
                      ) : (
                        <p className="text-xs text-slate-400 italic">Selected category</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Full-Width Customers Marquee Section (#0C013D background) */}
      <div
        className="w-full border-t border-white/10 bg-[#0C013D] py-10 lg:py-14 relative overflow-hidden"
        onMouseEnter={() => setIsMarqueePaused(true)}
        onMouseLeave={() => setIsMarqueePaused(false)}
      >
        {/* Header container aligned with page margins */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#DE0001] block mb-1">
                Ecosystem & Partners
              </span>
              <h3 className="font-antonio text-3xl sm:text-4xl text-white uppercase tracking-wide font-normal">
                Customers
              </h3>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-300">
              Trusted by Fortune 500 utilities, defense forces & Navratna enterprises
            </p>
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
                  className="flex items-center justify-center p-4 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.09] hover:border-white/25 hover:shadow-lg transition-all duration-300 w-40 sm:w-48 h-24 shrink-0 group cursor-pointer"
                  title={client.name}
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-12 sm:max-h-14 max-w-[120px] w-auto object-contain opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                    loading="eager"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

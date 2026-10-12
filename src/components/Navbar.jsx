import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, ChevronDown, Menu, X, ArrowRight, ShieldCheck, 
  TrendingDown, TrendingUp, Search, Sun, Moon, ArrowUpRight,
  ShieldAlert, AlertTriangle, FileText, CheckCircle2, MapPin
} from 'lucide-react';

export default function Navbar({ onOpenInquiry, onOpenAbout, onOpenHistory }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highContrast, setHighContrast] = useState(false);
  const [fraudModalOpen, setFraudModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleContrast = () => {
    setHighContrast(!highContrast);
    document.documentElement.classList.toggle('high-contrast');
  };

  return (
    <>
      {/* Dynamic Corporate Header: Frosted glass at top with two tiers; White with black text and only lower tier on scroll */}
      <header 
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-Barlow px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 ${
          isScrolled 
            ? 'bg-white text-black shadow-md py-3 sm:py-3.5' 
            : 'bg-transparent text-white pt-8 sm:pt-10 lg:pt-12 xl:pt-14 pb-5 lg:pb-6'
        }`}
      >
        {/* Faded blackish gradient overlay that naturally blends into the background picture without blur */}
        {!isScrolled && (
          <div 
            className="absolute inset-x-0 top-0 h-[115%] pointer-events-none -z-10 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.7) 45%, rgba(0, 0, 0, 0.45) 75%, rgba(0, 0, 0, 0.15) 90%, transparent 100%)',
            }}
          />
        )}

        <div className="w-full max-w-[1520px] mx-auto relative z-10">
          
          {/* TIER 1: UPPER NAVBAR (Visible when not scrolling, removed while scrolling down) */}
          {!isScrolled && (
            <div className="hidden lg:flex items-center justify-between w-full pb-2.5 transition-colors duration-300 text-xs font-bold uppercase tracking-wider border-b-2 border-white/90 text-white animate-in fade-in duration-200 [text-shadow:0_1px_3px_rgba(0,0,0,0.7)]">
              
              {/* Left Side: Live Stock Tickers (NSE & BSE) */}
              <div className="flex items-center gap-4 xl:gap-6 normal-case">
              {/* NSE Ticker */}
              <a 
                href="https://www.nseindia.com" 
                target="_blank" 
                rel="noopener noreferrer"
                title="National Stock Exchange: AARTECH (Aartech Solonics Ltd)"
                className="flex items-center gap-1.5 hover:text-[#DE0001] transition-colors group"
              >
                <span className="font-extrabold uppercase tracking-wide opacity-85">NSE</span>
                <span className="font-black text-white">
                  ₹47.92
                </span>
                <span className="inline-flex items-center text-rose-400 font-extrabold text-[11px] gap-0.5">
                  <TrendingDown size={13} className="stroke-[2.5]" />
                  <span>(-1.63%)</span>
                </span>
              </a>

              <span className="opacity-40 text-white">|</span>

              {/* BSE Ticker */}
              <a 
                href="https://www.bseindia.com/stock-share-price/aartech-solonics-ltd/aartech/542580/" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Bombay Stock Exchange: 542499 (Aartech Solonics Ltd)"
                className="flex items-center gap-1.5 hover:text-[#DE0001] transition-colors group"
              >
                <span className="font-extrabold uppercase tracking-wide opacity-85">BSE (542499)</span>
                <span className="font-black text-white">
                  ₹48.10
                </span>
                <span className="inline-flex items-center text-rose-400 font-extrabold text-[11px] gap-0.5">
                  <TrendingDown size={13} className="stroke-[2.5]" />
                  <span>(-1.81%)</span>
                </span>
              </a>
            </div>

            {/* Right Side: Aartech Solonics Scanned Topics (eB2B, Fraud Alert, Contact Us) */}
            <div className="flex items-center gap-4 xl:gap-6 text-xs uppercase tracking-wider font-extrabold">
              
              {/* 1. eB2B (Dropdown with Aartech Solonics B2B features) */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('eb2b')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  className={`flex items-center gap-1 text-white hover:text-[#DE0001] transition-colors focus:outline-none ${
                    activeDropdown === 'eb2b' ? 'text-[#DE0001]' : ''
                  }`}
                >
                  <span>eB2B</span>
                  <ChevronDown size={12} className={`transition-transform duration-200 ${activeDropdown === 'eb2b' ? 'rotate-180 text-[#DE0001]' : 'opacity-80'}`} />
                </button>

                {activeDropdown === 'eb2b' && (
                  <div className="absolute top-[calc(100%+8px)] right-0 w-[420px] bg-white rounded-xl shadow-2xl border border-slate-100 p-4 z-50 text-[#0C013D] animate-in fade-in slide-in-from-top-2 duration-150 normal-case">
                    <div className="px-3 py-1.5 border-b border-slate-100 mb-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#DE0001]">
                        Aartech Solonics B2B Portal
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-left">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block px-2 mb-1">
                          For Customers
                        </span>
                        <a 
                          href="#matrix" 
                          onClick={() => setActiveDropdown(null)} 
                          className="block p-2 rounded-lg hover:bg-slate-50 text-xs font-bold text-[#0C013D] hover:text-[#DE0001] transition-colors"
                        >
                          Product Datasheets & Drawings
                        </a>
                        <button 
                          onClick={() => { setActiveDropdown(null); onOpenInquiry(); }} 
                          className="w-full text-left p-2 rounded-lg hover:bg-slate-50 text-xs font-bold text-[#0C013D] hover:text-[#DE0001] transition-colors"
                        >
                          Technical RFQ Submission
                        </button>
                        <a 
                          href="#infrastructure" 
                          onClick={() => setActiveDropdown(null)} 
                          className="block p-2 rounded-lg hover:bg-slate-50 text-xs font-bold text-[#0C013D] hover:text-[#DE0001] transition-colors"
                        >
                          Testing & Quality Protocols (QAP)
                        </a>
                      </div>
                      <div className="border-l border-slate-100 pl-3">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block px-2 mb-1">
                          For Vendors & Suppliers
                        </span>
                        <a 
                          href="#contact" 
                          onClick={() => setActiveDropdown(null)} 
                          className="block p-2 rounded-lg hover:bg-slate-50 text-xs font-bold text-[#0C013D] hover:text-[#DE0001] transition-colors"
                        >
                              Vendor Empanelment
                        </a>
                        <a 
                          href="#investors" 
                          onClick={() => setActiveDropdown(null)} 
                          className="block p-2 rounded-lg hover:bg-slate-50 text-xs font-bold text-[#0C013D] hover:text-[#DE0001] transition-colors"
                        >
                          Partner Code of Conduct
                        </a>
                        <a 
                          href="#infrastructure" 
                          onClick={() => setActiveDropdown(null)} 
                          className="block p-2 rounded-lg hover:bg-slate-50 text-xs font-bold text-[#0C013D] hover:text-[#DE0001] transition-colors"
                        >
                          Plant Sourcing (Mandideep)
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <span className="opacity-40 text-white">/</span>

              {/* 2. Fraud Alert (Opens Aartech Solonics Cautionary Notice Modal) */}
              <button 
                onClick={() => setFraudModalOpen(true)}
                className="hover:text-[#DE0001] text-white transition-colors flex items-center gap-1"
                title="Aartech Solonics Corporate Fraud Advisory"
              >
                <span>Fraud Alert</span>
              </button>

              <span className="opacity-40 text-white">/</span>

              {/* 3. Contact Us (Dropdown with Aartech Solonics verified contacts) */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('contact')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a 
                  href="#contact" 
                  className={`flex items-center gap-1 text-white hover:text-[#DE0001] transition-colors ${
                    activeDropdown === 'contact' ? 'text-[#DE0001]' : ''
                  }`}
                >
                  <span>Contact Us</span>
                  <ChevronDown size={12} className={`transition-transform duration-200 ${activeDropdown === 'contact' ? 'rotate-180 text-[#DE0001]' : 'opacity-80'}`} />
                </a>

                {activeDropdown === 'contact' && (
                  <div className="absolute top-[calc(100%+8px)] right-0 w-76 bg-white rounded-xl shadow-2xl border border-slate-100 p-4 z-50 text-[#0C013D] animate-in fade-in slide-in-from-top-2 duration-150 normal-case text-left">
                    <div className="px-2 py-1 border-b border-slate-100 mb-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#DE0001]">
                        Direct Contacts
                      </span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <a href="tel:18004199409" className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 font-bold text-[#0C013D] hover:text-[#DE0001] transition-colors">
                        <Phone size={14} className="text-[#DE0001] shrink-0" />
                        <span>Toll Free: 1800 419 9409</span>
                      </a>
                      <a href="mailto:info@aartechsolonics.com" className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 font-bold text-[#0C013D] hover:text-[#DE0001] transition-colors">
                        <Mail size={14} className="text-[#DE0001] shrink-0" />
                        <span>info@aartechsolonics.com</span>
                      </a>
                      <a href="mailto:sales@aartechsolonics.com" className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 font-bold text-[#0C013D] hover:text-[#DE0001] transition-colors">
                        <Mail size={14} className="text-[#DE0001] shrink-0" />
                        <span>sales@aartechsolonics.com</span>
                      </a>
                      <div className="p-2 border-t border-slate-100 text-[11px] text-slate-500">
                        HQ: Arera Colony, Bhopal | Plants: Mandideep & Parwanoo
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

          {/* TIER 2: LOWER NAVBAR (Only tier shown on scroll down, with black font and white background) */}
          <div className={`w-full flex items-center justify-between transition-all duration-300 ${isScrolled ? 'pt-0' : 'pt-2.5 sm:pt-3'}`}>
            
            {/* Left Side: Brand Logo (Adaptive based on background pictures / scroll state) */}
            <div className="flex items-center shrink-0">
              <a href="/" className="flex items-center group relative h-11 sm:h-12 lg:h-13" aria-label="Aartech Solonics">
                {/* White logo for hero / background pictures */}
                <img 
                  src="/assets/logo-white.png" 
                  alt="Aartech Solonics" 
                  className={`h-11 sm:h-12 lg:h-13 w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
                    isScrolled ? 'opacity-0 absolute inset-0 pointer-events-none' : 'opacity-100'
                  }`}
                />
                {/* Standard colored logo for scrolled white navbar */}
                <img 
                  src="/assets/logo.webp" 
                  alt="Aartech Solonics" 
                  className={`h-11 sm:h-12 lg:h-13 w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
                    isScrolled ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
                  }`}
                />
              </a>
            </div>

            {/* Right Side (Desktop): Main Navigation + Sun + Search */}
            <nav className={`hidden lg:flex items-center gap-5 xl:gap-7 ${!isScrolled ? '[text-shadow:0_1px_3px_rgba(0,0,0,0.7)]' : ''}`} role="navigation">
              
              {/* 1. About */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('about')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={onOpenAbout}
                  className={`flex items-center gap-1.5 text-sm lg:text-[15px] font-semibold uppercase tracking-wider py-1.5 transition-colors focus:outline-none whitespace-nowrap hover:text-[#DE0001] ${
                    isScrolled ? 'text-black' : 'text-white'
                  }`}
                >
                  <span>About</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180 text-[#DE0001]' : isScrolled ? 'text-black/70' : 'text-white/80'}`} />
                </button>

                {activeDropdown === 'about' && (
                  <div className="absolute top-[calc(100%+6px)] left-0 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 p-3.5 z-50 text-[#0C013D] animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1.5 border-b border-slate-100 mb-1.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#DE0001]">About Aartech</span>
                    </div>
                    <a 
                      href="#about" 
                      onClick={() => { setActiveDropdown(null); onOpenAbout(); }}
                      className="block px-3 py-2 rounded-lg text-xs font-bold text-[#0C013D] hover:bg-slate-50 hover:text-[#DE0001] transition-colors"
                    >
                      Corporate Profile & Vision
                    </a>
                    <a 
                      href="#history" 
                      onClick={() => { setActiveDropdown(null); onOpenHistory(); }}
                      className="block px-3 py-2 rounded-lg text-xs font-bold text-[#0C013D] hover:bg-slate-50 hover:text-[#DE0001] transition-colors"
                    >
                      Our History (1982 to Present)
                    </a>
                    <a 
                      href="#about" 
                      onClick={() => { setActiveDropdown(null); onOpenAbout(); }}
                      className="block px-3 py-2 rounded-lg text-xs font-bold text-[#0C013D] hover:bg-slate-50 hover:text-[#DE0001] transition-colors"
                    >
                      Founder-Chairman & Leadership
                    </a>
                    <a 
                      href="#infrastructure" 
                      onClick={() => { setActiveDropdown(null); }}
                      className="block px-3 py-2 rounded-lg text-xs font-bold text-[#0C013D] hover:bg-slate-50 hover:text-[#DE0001] transition-colors"
                    >
                      Manufacturing Hubs (Mandideep & Parwanoo)
                    </a>
                  </div>
                )}
              </div>

              {/* 2. Businesses */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('businesses')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href="#businesses"
                  className={`flex items-center gap-1.5 text-sm lg:text-[15px] font-semibold uppercase tracking-wider py-1.5 transition-colors whitespace-nowrap hover:text-[#DE0001] ${
                    isScrolled ? 'text-black' : 'text-white'
                  }`}
                >
                  <span>Businesses</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'businesses' ? 'rotate-180 text-[#DE0001]' : isScrolled ? 'text-black/70' : 'text-white/80'}`} />
                </a>

                {activeDropdown === 'businesses' && (
                  <div className="absolute top-[calc(100%+6px)] -left-28 w-[540px] bg-white rounded-xl shadow-2xl border border-slate-100 p-4 z-50 text-[#0C013D] animate-in fade-in slide-in-from-top-2 duration-150 grid grid-cols-2 gap-2.5">
                    <a href="#businesses" onClick={() => setActiveDropdown(null)} className="p-3.5 rounded-lg hover:bg-slate-50 transition-colors group">
                      <div className="text-xs font-extrabold uppercase tracking-wider text-[#0C013D] group-hover:text-[#DE0001] flex items-center justify-between">
                        <span>Defense & Exploration</span>
                        <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 text-[#DE0001]" />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">Kranking ultracapacitors, rugged shelters & cold start.</p>
                    </a>
                    <a href="#businesses" onClick={() => setActiveDropdown(null)} className="p-3.5 rounded-lg hover:bg-slate-50 transition-colors group">
                      <div className="text-xs font-extrabold uppercase tracking-wider text-[#0C013D] group-hover:text-[#DE0001] flex items-center justify-between">
                        <span>Power Transmission</span>
                        <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 text-[#DE0001]" />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">BTS 2000 fast bus transfer & CLIP fault current limiters.</p>
                    </a>
                    <a href="#businesses" onClick={() => setActiveDropdown(null)} className="p-3.5 rounded-lg hover:bg-slate-50 transition-colors group">
                      <div className="text-xs font-extrabold uppercase tracking-wider text-[#0C013D] group-hover:text-[#DE0001] flex items-center justify-between">
                        <span>Renewable Energy</span>
                        <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 text-[#DE0001]" />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">Solar PV design, kinetic flywheel & hybrid storage units.</p>
                    </a>
                    <a href="#businesses" onClick={() => setActiveDropdown(null)} className="p-3.5 rounded-lg hover:bg-slate-50 transition-colors group">
                      <div className="text-xs font-extrabold uppercase tracking-wider text-[#0C013D] group-hover:text-[#DE0001] flex items-center justify-between">
                        <span>Heavy Metallurgy</span>
                        <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 text-[#DE0001]" />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">Continuous metallurgy, cement, refinery & chemical switchgear.</p>
                    </a>
                  </div>
                )}
              </div>

              {/* 3. Tailored Solutions */}
              <a 
                href="#tailored-solutions"
                className={`text-sm lg:text-[15px] font-semibold uppercase tracking-wider py-1.5 transition-colors whitespace-nowrap hover:text-[#DE0001] ${
                  isScrolled ? 'text-black' : 'text-white'
                }`}
              >
                Tailored Solutions
              </a>

              {/* 4. Sustainability */}
              <a 
                href="#infrastructure"
                className={`text-sm lg:text-[15px] font-semibold uppercase tracking-wider py-1.5 transition-colors whitespace-nowrap hover:text-[#DE0001] ${
                  isScrolled ? 'text-black' : 'text-white'
                }`}
              >
                Sustainability
              </a>

              {/* 5. Investors */}
              <a 
                href="#investors"
                className={`text-sm lg:text-[15px] font-semibold uppercase tracking-wider py-1.5 transition-colors whitespace-nowrap hover:text-[#DE0001] ${
                  isScrolled ? 'text-black' : 'text-white'
                }`}
              >
                Investors
              </a>

              {/* 6. Careers */}
              <a 
                href="#about"
                className={`text-sm lg:text-[15px] font-semibold uppercase tracking-wider py-1.5 transition-colors whitespace-nowrap hover:text-[#DE0001] ${
                  isScrolled ? 'text-black' : 'text-white'
                }`}
              >
                Careers
              </a>

              {/* 7. News & Media */}
              <a 
                href="#testimonials"
                className={`text-sm lg:text-[15px] font-semibold uppercase tracking-wider py-1.5 transition-colors whitespace-nowrap hover:text-[#DE0001] ${
                  isScrolled ? 'text-black' : 'text-white'
                }`}
              >
                News & Media
              </a>

              {/* Subtle Divider */}
              <div className={`h-4 w-px mx-1 ${isScrolled ? 'bg-black/20' : 'bg-white/35'}`} />

              {/* Sun Icon (Contrast Toggle) */}
              <button 
                onClick={toggleContrast}
                title="Switch Contrast Mode"
                className={`p-1.5 rounded-full transition-all duration-200 focus:outline-none ${
                  isScrolled ? 'hover:bg-black/10 text-black' : 'hover:bg-white/20 text-white'
                }`}
                aria-label="Switch Contrast Mode"
              >
                <Sun size={17} />
              </button>

              {/* Working Search Icon */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                title="Search Site"
                className={`p-1.5 rounded-full transition-all duration-200 focus:outline-none ${
                  searchOpen 
                    ? 'bg-[#DE0001] text-white' 
                    : isScrolled 
                      ? 'hover:bg-black/10 text-black' 
                      : 'hover:bg-white/20 text-white'
                }`}
                aria-label="Search"
              >
                <Search size={17} />
              </button>

            </nav>

            {/* Mobile Controls (Search + Hamburger) */}
            <div className="flex items-center gap-2.5 lg:hidden">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 rounded-full focus:outline-none transition-colors ${
                  isScrolled ? 'text-black hover:bg-black/10' : 'text-white hover:bg-white/15'
                }`}
                aria-label="Search"
              >
                <Search size={22} />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-full focus:outline-none transition-colors ${
                  isScrolled ? 'text-black hover:bg-black/10' : 'text-white hover:bg-white/15'
                }`}
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>

          </div>

          {/* Search Bar Drawer */}
          {searchOpen && (
            <div className="bg-white border-t border-slate-200 mt-3 py-3 px-4 shadow-xl text-[#0C013D] animate-in fade-in duration-200 rounded-xl">
              <div className="flex items-center gap-3 max-w-4xl mx-auto">
                <Search size={20} className="text-[#DE0001]" />
                <input
                  type="search"
                  autoFocus
                  placeholder="Search all of Aartech (e.g. BTS 2000, Ultracapacitors, Mandideep Hub, BSE: 542499)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-base font-semibold focus:outline-none text-[#0C013D]"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-700 px-2 py-1"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-white text-[#0C013D] border-t border-slate-100 p-6 mt-3 shadow-2xl rounded-2xl max-h-[85vh] overflow-y-auto">
              {/* Mobile Stock Ticker Pill */}
              <div className="p-3 bg-slate-50 rounded-xl mb-4 border border-slate-200/80 flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-slate-600">NSE</span>
                  <span className="font-black text-[#0C013D]">₹47.92</span>
                  <span className="text-rose-500 font-extrabold text-[11px]">(-1.63%)</span>
                </div>
                <div className="h-3 w-px bg-slate-300" />
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-slate-600">BSE (542499)</span>
                  <span className="font-black text-[#0C013D]">₹48.10</span>
                  <span className="text-rose-500 font-extrabold text-[11px]">(-1.81%)</span>
                </div>
              </div>

              {/* Utility shortcuts */}
              <div className="grid grid-cols-2 gap-2 mb-4 pb-4 border-b border-slate-100 text-xs font-bold">
                <button 
                  onClick={() => { setMobileMenuOpen(false); setFraudModalOpen(true); }}
                  className="p-2.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-center flex items-center justify-center gap-1"
                >
                  <AlertTriangle size={13} className="text-amber-600" />
                  <span>Fraud Alert</span>
                </button>
                <a 
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-slate-100 text-slate-800 text-center flex items-center justify-center gap-1"
                >
                  <Phone size={13} className="text-[#DE0001]" />
                  <span>Contact Us</span>
                </a>
              </div>

              <div className="flex flex-col space-y-3.5">
                <a
                  href="#about"
                  onClick={() => { setMobileMenuOpen(false); onOpenAbout(); }}
                  className="text-base font-bold uppercase tracking-wider hover:text-[#DE0001] py-1 border-b border-slate-100"
                >
                  About
                </a>
                <a
                  href="#history"
                  onClick={() => { setMobileMenuOpen(false); onOpenHistory(); }}
                  className="text-base font-bold uppercase tracking-wider hover:text-[#DE0001] py-1 border-b border-slate-100"
                >
                  Our History (1982 to Present)
                </a>
                <a
                  href="#businesses"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-bold uppercase tracking-wider hover:text-[#DE0001] py-1 border-b border-slate-100"
                >
                  Businesses
                </a>
                <a
                  href="#tailored-solutions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-bold uppercase tracking-wider hover:text-[#DE0001] py-1 border-b border-slate-100"
                >
                  Tailored Solutions
                </a>
                <a
                  href="#infrastructure"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-bold uppercase tracking-wider hover:text-[#DE0001] py-1 border-b border-slate-100"
                >
                  Sustainability
                </a>
                <a
                  href="#investors"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-bold uppercase tracking-wider hover:text-[#DE0001] py-1 border-b border-slate-100"
                >
                  Investors
                </a>
                <a
                  href="#testimonials"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-bold uppercase tracking-wider hover:text-[#DE0001] py-1 border-b border-slate-100"
                >
                  News & Media
                </a>

                <div className="pt-3">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenInquiry();
                    }}
                    className="w-full py-3.5 bg-[#DE0001] text-white font-bold uppercase tracking-wider rounded-full text-center text-sm shadow-lg"
                  >
                    Consult an Engineer
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </header>

      {/* Official Aartech Solonics Fraud Alert Cautionary Modal */}
      {fraudModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 font-Barlow">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 text-[#0C013D] relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setFraudModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 text-amber-600 mb-4">
              <ShieldAlert size={32} />
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#DE0001] block">
                  Public Cautionary Advisory
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase text-[#0C013D]">
                  Aartech Solonics Fraud Alert
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
              <p>
                <strong>Aartech Solonics Limited (BSE: 542499)</strong> cautions the public, job seekers, and business associates against unscrupulous individuals and fraudulent entities attempting to mislead the public using Aartech's name, brand assets, or executive identities.
              </p>

              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 space-y-2">
                <span className="font-extrabold text-[#0C013D] block text-xs uppercase tracking-wider">
                  Important Clarifications:
                </span>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700">
                  <li><strong>Recruitment Policy:</strong> Aartech Solonics never solicits registration fees, security deposits, or monetary charges at any stage of the recruitment or interview process.</li>
                  <li><strong>Procurement & Tenders:</strong> All authentic supplier RFQs and purchase orders originate strictly from official verified domains (<code>@aartechsolonics.com</code>).</li>
                  <li><strong>Whistle Blower Channel:</strong> Any suspected fraudulent solicitation, fake job offer, or unauthorized tender must be reported directly to our compliance desk.</li>
                </ul>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-extrabold text-[#0C013D] block">Ethics & Compliance Desk</span>
                  <span className="text-slate-500">Email: investor@aartechsolonics.com | info@aartechsolonics.com</span>
                </div>
                <a
                  href="tel:18004199409"
                  className="px-4 py-2 rounded-full bg-[#0C013D] text-white font-bold hover:bg-[#DE0001] transition-colors shrink-0"
                >
                  Call 1800 419 9409
                </a>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setFraudModalOpen(false)}
                className="px-6 py-2.5 bg-[#DE0001] text-white text-xs font-black uppercase tracking-wider rounded-full hover:bg-[#B80001] transition-colors"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

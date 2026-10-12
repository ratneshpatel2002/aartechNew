import React from 'react';

export default function Footer({ onOpenInquiry }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="w-full bg-[#0B132B] text-slate-300 pt-16 sm:pt-20 pb-10 px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 border-t border-slate-800">
      <div className="w-full">
        
        {/* Main Footer Columns Grid matching assetlast.png */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-14 border-b border-slate-800/80">
          
          {/* Column 1: Brand & Logo (Takes 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            {/* White Logo Card */}
            <div className="bg-white px-3.5 py-2.5 rounded-lg inline-block shadow-sm">
              <img 
                src="/assets/02_main_logo.webp" 
                alt="Aartech Solonics" 
                className="h-9 sm:h-10 w-auto object-contain"
              />
            </div>
            
            {/* Tagline */}
            <p className="text-sm sm:text-[15px] text-slate-400 font-Barlow leading-relaxed">
              Living Passions Through Engineering
            </p>

            {/* LinkedIn Official Link Badge */}
            <div className="pt-2">
              <a
                href="https://www.linkedin.com/company/aartech-solonics-limited/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with Aartech Solonics on LinkedIn"
                className="inline-flex items-center gap-3 px-3.5 py-2 rounded-none bg-slate-900/90 hover:bg-[#0A66C2]/15 border border-slate-700/80 hover:border-[#0A66C2] transition-all duration-300 group cursor-pointer shadow-sm"
              >
                {/* Official LinkedIn Bug Logo */}
                <svg
                  className="w-7 h-7 shrink-0 transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect width="24" height="24" rx="4" fill="#0A66C2" />
                  <path
                    d="M19 19H16.08V14.42C16.08 13.33 16.06 11.93 14.56 11.93C13.04 11.93 12.81 13.12 12.81 14.34V19H9.89V9.5H12.69V10.8H12.73C13.12 10.06 14.07 9.28 15.49 9.28C18.45 9.28 19 11.23 19 13.77V19ZM6.46 8.2C5.52 8.2 4.76 7.44 4.76 6.5C4.76 5.56 5.52 4.8 6.46 4.8C7.4 4.8 8.16 5.56 8.16 6.5C8.16 7.44 7.4 8.2 6.46 8.2ZM7.92 19H5V9.5H7.92V19Z"
                    fill="white"
                  />
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-Barlow font-semibold group-hover:text-slate-300 transition-colors">
                    Official Page
                  </span>
                  <span className="text-sm font-Barlow font-bold text-white group-hover:text-[#38bdf8] transition-colors leading-tight">
                    LinkedIn
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Column 2: EXPLORE */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-Barlow">
              EXPLORE
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-Barlow text-slate-300">
              <li>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('tailored-solutions')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Industries
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('tailored-solutions')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Products
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('tailored-solutions')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Solutions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('manufacturing')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  R&amp;D facilities
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('tailored-solutions')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Brands
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: COMPANY */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-Barlow">
              COMPANY
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-Barlow text-slate-300">
              <li>
                <button 
                  onClick={onOpenInquiry} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Media
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenInquiry} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Tenders
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenInquiry} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Investors
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenInquiry} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: GET IN TOUCH */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-Barlow">
              GET IN TOUCH
            </h3>
            <div className="space-y-2.5 text-xs sm:text-sm font-Barlow text-slate-300">
              <div>
                <a 
                  href="mailto:info@aartechsolonics.com" 
                  className="hover:text-white transition-colors block"
                >
                  info@aartechsolonics.com
                </a>
              </div>
              <div>
                <a 
                  href="mailto:sales@aartechsolonics.com" 
                  className="hover:text-white transition-colors block"
                >
                  sales@aartechsolonics.com
                </a>
              </div>
              <div>
                <a 
                  href="tel:18004199409" 
                  className="hover:text-white transition-colors block font-medium"
                >
                  1800 419 9409 &nbsp;&middot;&nbsp; Toll-free
                </a>
              </div>

              {/* Registered Office Address */}
              <div className="pt-2 text-xs text-slate-400 leading-relaxed font-Barlow">
                <p className="font-semibold text-slate-300 mb-0.5">Registered office</p>
                <p>&lsquo;Ashirwad&rsquo; E2/57, Arera Colony, Bhopal,</p>
                <p>Madhya Pradesh, India 462016</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-Barlow text-slate-400">
          <div>
            &copy; Aartech Solonics Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/company/aartech-solonics-limited/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Aartech Solonics on LinkedIn"
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors group"
            >
              <svg
                className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" rx="3" fill="#0A66C2" />
                <path
                  d="M19 19H16.08V14.42C16.08 13.33 16.06 11.93 14.56 11.93C13.04 11.93 12.81 13.12 12.81 14.34V19H9.89V9.5H12.69V10.8H12.73C13.12 10.06 14.07 9.28 15.49 9.28C18.45 9.28 19 11.23 19 13.77V19ZM6.46 8.2C5.52 8.2 4.76 7.44 4.76 6.5C4.76 5.56 5.52 4.8 6.46 4.8C7.4 4.8 8.16 5.56 8.16 6.5C8.16 7.44 7.4 8.2 6.46 8.2ZM7.92 19H5V9.5H7.92V19Z"
                  fill="white"
                />
              </svg>
              <span className="font-Barlow font-medium">LinkedIn</span>
            </a>
            <button 
              onClick={onOpenInquiry} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button 
              onClick={onOpenInquiry} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Cookie Policy
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

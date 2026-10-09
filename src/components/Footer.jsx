import React from 'react';
import { Linkedin } from 'lucide-react';

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

            {/* LinkedIn Link */}
            <div className="pt-2">
              <a
                href="https://www.linkedin.com/company/aartech-solonics-limited/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-300 hover:text-white transition-colors group"
              >
                <Linkedin size={16} className="text-[#DE0001] fill-current group-hover:scale-110 transition-transform" />
                <span className="font-Barlow font-medium">LinkedIn</span>
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

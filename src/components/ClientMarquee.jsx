import React from 'react';
import { clients } from '../data/siteData';

export default function ClientMarquee() {
  // Duplicate for seamless infinite loop
  const doubleClients = [...clients, ...clients];

  return (
    <section className="py-14 bg-white border-y border-slate-200 overflow-hidden relative">
      <div className="container mb-8 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-[#DE0001]">
          Industry Partners & Public Utilities
        </span>
        <h2 className="text-xl md:text-2xl font-extrabold uppercase text-[#0C013D] tracking-tight mt-1">
          Trusted by Fortune 500 Utilities & Navratna Enterprises
        </h2>
      </div>

      {/* Gradient edge masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Infinite scrolling row */}
      <div className="flex overflow-hidden">
        <div className="marquee-track flex items-center gap-12 py-3">
          {doubleClients.map((client, idx) => (
            <div 
              key={idx}
              className="flex items-center justify-center px-5 py-3 sm:px-6 sm:py-4 rounded-none border border-slate-100 bg-white hover:border-[#DE0001]/40 hover:shadow-md transition-all duration-300 w-60 sm:w-72 lg:w-80 h-24 sm:h-28 lg:h-32 shrink-0 group"
              title={client.name}
            >
              <img 
                src={client.logo} 
                alt={client.name}
                className="max-h-[52px] sm:max-h-[64px] lg:max-h-[74px] max-w-[85%] w-auto object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

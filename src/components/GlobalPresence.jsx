import React from 'react';

export default function GlobalPresence() {
  return (
    <section id="presence" className="py-10 sm:py-14 lg:py-20 bg-[#F0F0F1] text-[#0C013D] w-full overflow-hidden">
      {/* Title Header matching Aartech website design & Antonio font */}
      <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 mb-6 sm:mb-8 lg:mb-10">
        <h2 className="font-antonio text-3xl sm:text-4xl lg:text-[46px] text-[#C80001] font-semibold tracking-wide uppercase leading-tight">
          Our Global Presence
        </h2>
      </div>

      {/* Map Container - Zoomed out comfortably to fit screen gracefully */}
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        {/* Desktop Map - Zoomed out */}
        <img
          src="/assets/map_desktop.png"
          alt="Aartech Global Presence Map"
          className="w-full max-h-[560px] lg:max-h-[580px] object-contain hidden md:block select-none"
          loading="eager"
        />

        {/* Mobile Map - Zoomed out */}
        <img
          src="/assets/map_mobile.png"
          alt="Aartech Global Presence Mobile Map"
          className="w-full max-h-[420px] object-contain block md:hidden select-none"
          loading="eager"
        />
      </div>
    </section>
  );
}

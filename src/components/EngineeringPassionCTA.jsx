import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function EngineeringPassionCTA({ onOpenInquiry }) {
  return (
    <section id="engineering-passion" className="w-full bg-[#FAF3E3] text-[#0C013D] relative overflow-hidden py-20 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 border-t border-[#E8DFC8]">
      <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
        
        {/* Left Headline Block */}
        <div className="max-w-3xl">
          {/* Category Tag */}
          <div className="flex items-center gap-3 mb-4 sm:mb-5">
            <span className="w-8 h-[2px] bg-[#C89B3C]" />
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.22em] text-[#0C013D]/80 uppercase font-Barlow">
              LET'S ENGINEER WHAT'S NEXT
            </span>
          </div>

          {/* Editorial Serif Headline */}
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-[56px] xl:text-[64px] font-normal text-[#0C013D] leading-[1.12] tracking-tight">
            Your challenge. Our engineering passion.
          </h2>
        </div>

        {/* Right CTA Pill Button */}
        <div className="shrink-0 self-start lg:self-center">
          <button
            type="button"
            onClick={onOpenInquiry}
            className="inline-flex items-center gap-3 px-8 sm:px-9 py-3.5 sm:py-4 rounded-full border border-[#0C013D] text-[#0C013D] text-sm sm:text-base font-medium font-Barlow hover:bg-[#0C013D] hover:text-white transition-all duration-300 shadow-sm group cursor-pointer"
          >
            <span>Talk to our team</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}

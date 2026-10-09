import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function LivingPassions({ onOpenInquiry }) {
  return (
    <section id="about" className="w-full bg-[#FDF2DF] text-[#0C013D] relative overflow-hidden">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-stretch">
        
        {/* Left Column (Warm Cream Canvas) */}
        <div className="bg-[#FDF2DF] px-6 sm:px-12 lg:px-16 xl:px-20 py-10 sm:py-14 lg:py-16 xl:py-20 flex flex-col justify-between relative">
          
          {/* Top Content Block */}
          <div>
            {/* Tag: — ABOUT US */}
            <div className="flex items-center gap-3 mb-5 sm:mb-7">
              <span className="w-7 h-[1.5px] bg-[#9E8160]" />
              <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.25em] text-[#0C013D] uppercase font-Barlow">
                ABOUT US
              </span>
            </div>

            {/* Headline in Editorial Serif: Living Passions Through Engineering */}
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-[52px] xl:text-[58px] text-[#C80001] font-normal leading-[1.12] mb-5 sm:mb-6 tracking-tight">
              Living Passions<br />
              Through<br />
              Engineering
            </h2>

            {/* Description Body Text */}
            <p className="text-slate-700 text-sm sm:text-base lg:text-[17px] leading-relaxed max-w-lg mb-7 sm:mb-9 font-Barlow">
              Over the years, Aartech has evolved into a close-knit team specializing in many domains. Every team member contributes to the growth of the company by applying their personal passions to the world of engineering.
            </p>

            {/* Pill Button: Meet Aartech → */}
            <div>
              <button
                type="button"
                onClick={onOpenInquiry}
                className="inline-flex items-center gap-3 px-7 py-3 rounded-full border border-[#0C013D] text-[#0C013D] text-sm sm:text-base font-medium font-Barlow hover:bg-[#0C013D] hover:text-white transition-all duration-300 group shadow-sm hover:shadow"
              >
                <span>Meet Aartech</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Bottom Milestones Block */}
          <div className="mt-8 sm:mt-12 lg:mt-14">
            {/* Horizontal Line Divider */}
            <div className="w-full h-px bg-[#0C013D]/15 mb-6 sm:mb-8" />

            {/* Milestones Row */}
            <div className="grid grid-cols-2 gap-6 sm:gap-10">
              {/* 1982 */}
              <div>
                <div className="font-editorial text-3xl sm:text-4xl lg:text-[44px] text-[#0C013D] font-normal mb-1.5 leading-none">
                  1982
                </div>
                <p className="text-xs sm:text-[13px] text-slate-600 font-Barlow leading-snug max-w-[200px]">
                  Founded as an Application Engineering Specialist
                </p>
              </div>

              {/* 1992 */}
              <div>
                <div className="font-editorial text-3xl sm:text-4xl lg:text-[44px] text-[#0C013D] font-normal mb-1.5 leading-none">
                  1992
                </div>
                <p className="text-xs sm:text-[13px] text-slate-600 font-Barlow leading-snug max-w-[200px]">
                  Became a public limited company
                </p>
              </div>
            </div>
          </div>

          {/* Center Vertical Dashed Divider on Desktop */}
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[1px] border-r-2 border-dashed border-[#AFD1E2] pointer-events-none" />
        </div>

        {/* Right Column (Team Group Photo - Full Height) */}
        <div className="w-full h-full min-h-[360px] sm:min-h-[460px] lg:min-h-full overflow-hidden bg-slate-100 relative">
          <img
            src="/assets/about_team_photo_2x.jpg"
            alt="Aartech Solonics Engineering Team"
            className="w-full h-full object-cover object-top block select-none"
            loading="eager"
          />
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { Calendar, ShieldCheck, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HistorySection({ onOpenInquiry }) {
  const milestones = [
    {
      year: "1982",
      title: "Foundation as Application Engineering Specialists",
      subtitle: "Bhopal, Madhya Pradesh",
      desc: "Founded by passionate engineering specialists with the conviction to solve non-standard, custom industrial challenges where off-the-shelf equipment failed. Won major business and national recognition in thermal power stations."
    },
    {
      year: "1992",
      title: "Public Limited Incorporation & BSE Listing",
      subtitle: "BSE Scrip Code: 542499",
      desc: "Successfully transitioned into a publicly listed enterprise on the Bombay Stock Exchange. Expanded institutional governance and dedicated R&D infrastructure for heavy switchgear."
    },
    {
      year: "2000+",
      title: "BTS 2000 Microprocessor Breakthrough",
      subtitle: "Parwanoo, Himachal Pradesh Facility",
      desc: "Engineered India’s benchmark Fast Bus Transfer System (BTS 2000), enabling microsecond transfer of critical station auxiliary loads in nuclear, thermal, and hydro generating stations."
    },
    {
      year: "2012+",
      title: "Defense & Kranking Ultracapacitors",
      subtitle: "Sub-Zero Military Deployments",
      desc: "Pioneered high-rate discharge Kranking Ultracapacitors for armored defense vehicles, heavy locomotives, and remote radar stations operating in extreme Himalayan sub-zero environments."
    },
    {
      year: "Present",
      title: "Global Reach Across 15+ Countries",
      subtitle: "12,000 sq. m Mandideep & Parwanoo Hubs",
      desc: "Operating dual world-class manufacturing campuses, delivering turnkey applied engineering across 9 major industries: Defense, Power Transmission, Renewables, Heavy Engineering, Healthcare, and Waste Management."
    }
  ];

  return (
    <section id="history" className="py-20 lg:py-28 bg-[#0C013D] text-white relative overflow-hidden">
      {/* Background blueprint pattern */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-20 pointer-events-none" />

      <div className="container relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#DE0001] mb-2">
            <Calendar size={16} />
            <span>Four Decades of Engineering Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-white tracking-tight">
            Our History (1982 to Present)
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-2">
            From our founding in 1982 to becoming an internationally respected, BSE-listed technology pioneer trusted by sovereign utilities and defense forces.
          </p>
        </div>

        {/* Milestone Timeline (RIL-style clean editorial cards) */}
        <div className="relative border-l-2 border-[#DE0001]/40 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative group">
              
              {/* Timeline Pin Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-[#0C013D] border-3 border-[#DE0001] group-hover:scale-125 transition-transform flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>

              {/* Milestone Card */}
              <div className="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-8 hover:bg-white/10 hover:border-[#DE0001]/50 transition-all duration-300 backdrop-blur-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#DE0001] tracking-tight">
                    {m.year}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-1 rounded bg-white/10">
                    {m.subtitle}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-3">
                  {m.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl">
                  {m.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-sm text-slate-300">
            Learn more about our governance, founder vision, and corporate disclosures.
          </div>
          <button
            onClick={onOpenInquiry}
            className="btn btn-primary text-xs"
          >
            <span>Partner with Aartech Solonics</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
}

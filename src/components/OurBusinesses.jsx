import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Zap, Layers, Cpu, Wrench } from 'lucide-react';

const businesses = [
  {
    id: "defense",
    category: "DEFENSE & AEROSPACE",
    title: "Defense & Exploration Systems",
    desc: "Engineered ultra-reliability systems for armed forces, naval vessels, and remote exploration. Breakthrough cold-start Kranking Ultracapacitors delivering instantaneous starting power in sub-zero terrains.",
    image: "/assets1/rocket.jpg",
    stat: "High-G Shock & Sub-Zero Rated",
    products: ["Kranking Ultracapacitors", "Bestcase Rugged Enclosures", "Mobile Power Backup"]
  },
  {
    id: "power",
    category: "UTILITY & GRID RELIABILITY",
    title: "Power Transmission & Distribution",
    desc: "Protecting national thermal, nuclear, and hydro generating stations. Microprocessor-based Fast Bus Transfer Systems (BTS 2000) that switch critical auxiliary power buses in microseconds without process disruption.",
    image: "/assets1/hall.jpg",
    stat: "Microsecond Transfer Benchmark",
    products: ["BTS 2000 Fast Bus Transfer", "CLIP Fault Current Limiters", "Control & Relay Panels"]
  },
  {
    id: "renewable",
    category: "CLEAN ENERGY & STORAGE",
    title: "Renewable Energy & Microgrids",
    desc: "Complete applied engineering for large-scale utility solar, distributed microgrids, and kinetic flywheel energy storage. Ensuring frequency regulation and power quality across intermittent green power sources.",
    image: "/assets1/pdfd.jpg",
    stat: "Frequency Regulation & PV Design",
    products: ["Solar PV Design & Services", "Flywheel Storage", "Hybrid Ultracapacitor Units"]
  },
  {
    id: "heavy-eng",
    category: "CONTINUOUS PROCESS PROTECTION",
    title: "Heavy Engineering & Metallurgy",
    desc: "Zero-failure electrical architecture for continuous process plants including steel mills, petrochemical refineries, cement plants, and heavy manufacturing where millisecond power dips cost millions.",
    image: "/assets1/mac.jpg",
    stat: "Zero Failure Tolerance",
    products: ["AC & DC UPS Systems", "Load Limiters", "Process Continuity Relay Suites"]
  },
  {
    id: "environment",
    category: "ENVIRONMENTAL & HEALTHCARE",
    title: "Waste Management & Specialized Systems",
    desc: "Advanced decentralized solid waste treatment units, medical power continuity apparatus, and customized plastic protective casing engineered for precision industrial deployment.",
    image: "/assets1/serv.jpg",
    stat: "Decentralized Sustainable Tech",
    products: ["Solid Waste Treatment Units", "Customized Plastic Casing", "Healthcare Power Systems"]
  }
];

export default function OurBusinesses({ onOpenInquiry }) {
  const [activeBiz, setActiveBiz] = useState(businesses[0]);

  return (
    <section id="businesses" className="py-20 lg:py-28 bg-[#F8FAFC] relative">
      <div className="container">
        
        {/* RIL-Style Section Title Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="section-tag">Conglomerate Portfolio</div>
            <h2 className="section-title">Our Businesses</h2>
          </div>
          <p className="section-desc">
            Aartech’s multi-domain operations safeguard national grid stability, defense preparedness, renewable energy transitions, and heavy industrial output.
          </p>
        </div>

        {/* Business Selector Pill Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {businesses.map((biz) => {
            const isSelected = activeBiz.id === biz.id;
            return (
              <button
                key={biz.id}
                onClick={() => setActiveBiz(biz)}
                className={`px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 focus:outline-none ${
                  isSelected
                    ? 'bg-[#0C013D] text-white shadow-lg -translate-y-0.5'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {biz.title}
              </button>
            );
          })}
        </div>

        {/* Featured Business Deep-Dive (RIL Showcase Layout) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Visual Showcase (7 cols) */}
          <div className="lg:col-span-7 relative h-[360px] sm:h-[440px] lg:h-[500px] overflow-hidden bg-slate-900 group">
            <img
              src={activeBiz.image}
              alt={activeBiz.title}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C013D]/80 via-[#0C013D]/30 to-transparent" />

            {/* Float Metric Tag */}
            <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-[#0C013D]/95 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#DE0001] block">
                Engineering Standard
              </span>
              <span className="text-base font-bold uppercase tracking-wide">
                {activeBiz.stat}
              </span>
            </div>
          </div>

          {/* Business Editorial Info (5 cols) */}
          <div className="lg:col-span-5 p-8 sm:p-12 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#DE0001] block">
              {activeBiz.category}
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#0C013D] tracking-tight leading-tight">
              {activeBiz.title}
            </h3>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {activeBiz.desc}
            </p>

            {/* Proprietary Systems List */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0C013D] block">
                Proprietary Product Offerings:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeBiz.products.map((prod, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-50 border border-slate-200 text-xs font-semibold text-[#0C013D]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DE0001]" />
                    <span>{prod}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <a
                href="#matrix"
                className="btn btn-primary text-xs"
              >
                <span>View Linked Solutions</span>
                <ArrowRight size={14} />
              </a>

              <button
                onClick={onOpenInquiry}
                className="text-xs font-bold uppercase tracking-wider text-[#0C013D] hover:text-[#DE0001] transition-colors"
              >
                Request Technical RFP
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

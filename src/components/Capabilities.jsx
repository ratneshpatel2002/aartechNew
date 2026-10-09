import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { capabilities } from '../data/siteData';
import { Factory, Wrench, Lightbulb, CheckCircle2, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

const facilityList = [
  {
    id: "unit1",
    tag: "CORE MANUFACTURING CAMPUS",
    name: "Manufacturing Hub Unit 1: Mandideep, M.P.",
    location: "Mandideep Industrial Area, 20 km from Bhopal",
    image: "/assets1/view.jpg",
    specs: [
      "12,000 sq. meters total campus with 1,500 sq. meters built-up engineering floor",
      "Houses precision machinery, automated test benches, and dedicated SSD warehouse",
      "Specialized assembly bays for heavy switchgear, relay panels, and ultracapacitor banks",
      "Rigorous Quality Assurance Plan (QAP) protocol compliant with global standards"
    ]
  },
  {
    id: "unit2",
    tag: "ADVANCED SYSTEMS FACILITY",
    name: "Manufacturing Hub Unit 2: Parwanoo, H.P.",
    location: "Parwanoo Industrial Corridor, Himachal Pradesh",
    image: "/assets1/mac.jpg",
    specs: [
      "Specialized high-technology manufacturing center for flagship BTS 2000 systems",
      "Microprocessor-based fast bus transfer SSD assembly with microsecond response calibration",
      "Factory Acceptance Test (FAT) protocols developed during design phase",
      "Custom testing rigs simulating real grid frequency deviations and phase angle shifts"
    ]
  },
  {
    id: "rnd",
    tag: "RESEARCH & APPLICATION ENGINEERING",
    name: "R&D Innovation & Simulation Lab",
    location: "Aartech Technology Center, Bhopal, M.P.",
    image: "/assets1/pdfd.jpg",
    specs: [
      "Application Engineering Specialists conducting custom electrical transient modeling",
      "State-of-the-art CAD/firmware simulation suites for sub-cycle fault interruption",
      "Breakthrough Kranking Ultracapacitor development for extreme military environments",
      "Customer wish-list engineering with zero deviation from operational requirements"
    ]
  },
  {
    id: "commissioning",
    tag: "FIELD DEPLOYMENT SQUAD",
    name: "Turnkey SSD Commissioning & Support",
    location: "On-site Deployment Across 15+ Countries",
    image: "/assets1/serv2.jpg",
    specs: [
      "Dedicated, certified field engineering squad assigned to every client project",
      "Rapid on-site commissioning, cold & hot testing during scheduled plant shutdowns",
      "Comprehensive operator training, documentation handover, and lifecycle audits",
      "Direct field intelligence feedback loop enhancing iterative R&D design"
    ]
  }
];

export default function Capabilities({ onOpenInquiry }) {
  const [activeFacility, setActiveFacility] = useState(facilityList[0]);

  return (
    <section id="infrastructure" className="py-20 lg:py-28 bg-white relative border-b border-slate-200">
      <div className="container">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="section-tag">Manufacturing & Infrastructure</div>
            <h2 className="section-title">World-Class Engineering Hubs</h2>
          </div>
          <p className="section-desc">
            Dual manufacturing hubs in Mandideep (M.P.) and Parwanoo (H.P.), backed by dedicated simulation labs and on-site commissioning squads.
          </p>
        </div>

        {/* Hub Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {facilityList.map((fac) => {
            const isCurrent = activeFacility.id === fac.id;
            return (
              <button
                key={fac.id}
                onClick={() => setActiveFacility(fac)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 focus:outline-none flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-[#0C013D] text-white border-[#0C013D] shadow-lg -translate-y-0.5'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                }`}
              >
                <div>
                  <span className={`text-[9px] font-extrabold uppercase tracking-widest block mb-1 ${
                    isCurrent ? 'text-[#DE0001]' : 'text-slate-500'
                  }`}>
                    {fac.tag}
                  </span>
                  <div className="text-xs sm:text-sm font-bold uppercase tracking-tight line-clamp-1">
                    {fac.name.split(':')[0]}
                  </div>
                </div>
                <div className={`text-[11px] font-medium mt-2 flex items-center gap-1 ${
                  isCurrent ? 'text-slate-300' : 'text-slate-500'
                }`}>
                  <MapPin size={12} className={isCurrent ? 'text-[#DE0001]' : 'text-slate-400'} />
                  <span className="truncate">{fac.location.split(',')[0]}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Hub Feature Display (RIL-style) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFacility.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="bg-slate-50 rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center"
          >
            {/* Visual Photo (5 cols) */}
            <div className="lg:col-span-5 relative h-[320px] sm:h-[400px] lg:h-[480px] overflow-hidden bg-slate-900 group">
              <img
                src={activeFacility.image}
                alt={activeFacility.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C013D]/90 via-[#0C013D]/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#DE0001] bg-white/10 px-2.5 py-1 rounded backdrop-blur-sm">
                  {activeFacility.tag}
                </span>
                <div className="text-sm font-bold text-slate-200 mt-2 flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#DE0001]" />
                  <span>{activeFacility.location}</span>
                </div>
              </div>
            </div>

            {/* Specifications & Capabilities (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#DE0001] block mb-1">
                  Infrastructure Specifications
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#0C013D] tracking-tight">
                  {activeFacility.name}
                </h3>
              </div>

              <div className="space-y-3">
                {activeFacility.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                    <CheckCircle2 size={18} className="text-[#DE0001] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {spec}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenInquiry}
                  className="btn btn-primary text-xs"
                >
                  <span>Request Facility Audit / RFP</span>
                  <ArrowRight size={14} />
                </button>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  <span>QAP Standards Monitored</span>
                </div>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

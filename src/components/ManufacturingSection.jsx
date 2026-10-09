import React, { useState } from 'react';
import { Factory, Cpu, ShieldCheck, CheckCircle2, MapPin, ArrowRight, Layers, Sliders, Award, Wrench, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const facilities = [
  {
    id: "unit1",
    tag: "CORE MANUFACTURING CAMPUS",
    title: "Unit 1: Mandideep, Madhya Pradesh",
    subtitle: "Heavy Switchgear & Core SSD Manufacturing",
    badge: "12,000 m² Campus",
    location: "Mandideep Industrial Area, 20 km from Bhopal",
    icon: Factory,
    image: "/assets/service_3.webp",
    stats: [
      { label: "Campus Area", value: "12,000 m²" },
      { label: "Built-Up Floor", value: "1,500 m²" },
      { label: "Location", value: "20 km from Bhopal" },
      { label: "Facility Type", value: "Heavy SSD Hub" }
    ],
    features: [
      "Located in Mandideep industrial corridor, 20 kms from Bhopal",
      "Occupies 12,000 sq. meters of land with 1,500 sq. meters of built-up area",
      "Houses heavy precision machinery, equipment, and centralized SSD warehouse",
      "Dedicated assembly bays for heavy switchgear, control & relay panels, and SSD units",
      "Supports diverse multi-disciplinary application engineering product lines"
    ],
    qaTitle: "Quality Assurance (QAP Protocols)",
    qaPoints: [
      "Uncompromising focus on product quality despite high degree of customization",
      "Rigorous engineering diligence applied across all manufacturing activities",
      "Custom Quality Assurance Plan (QAP) protocols formulated per client SSD specifications",
      "Formal QAP submission for customer clearance and approval as standard practice",
      "Independent quality assurance audits monitor compliance and zero-deviation benchmarks"
    ]
  },
  {
    id: "unit2",
    tag: "ADVANCED SYSTEMS FACILITY",
    title: "Unit 2: Parwanoo, Himachal Pradesh",
    subtitle: "BTS 2000 Fast Bus Transfer SSD Center",
    badge: "BTS 2000 SSD Facility",
    location: "Parwanoo Industrial Corridor, Himachal Pradesh",
    icon: Cpu,
    image: "/assets/mac.jpg",
    stats: [
      { label: "Specialization", value: "BTS 2000 SSD" },
      { label: "Architecture", value: "Microprocessor" },
      { label: "Testing Rig", value: "FAT Protocols" },
      { label: "Response Time", value: "< Sub-Cycle" }
    ],
    features: [
      "Situated in Parwanoo, Himachal Pradesh high-precision manufacturing zone",
      "Specialized high-technology manufacturing center for flagship BTS 2000 systems",
      "LT microprocessor-based fast bus transfer system specialized SSD assembly line",
      "Climate-controlled clean testing benches and precision calibration rigs",
      "Engineered for mission-critical power generation, nuclear, and process utilities"
    ],
    qaTitle: "Testing Facility (FAT Protocols)",
    qaPoints: [
      "Customized multi-frequency testing arrangements formulated for diverse requirements",
      "Factory Acceptance Test (FAT) protocol developed during initial engineering design",
      "Advanced simulation benches replicating grid frequency shifts and phase angle drops",
      "Comprehensive pre-dispatch customer witness testing and certification handover"
    ]
  }
];

const engineeringServices = [
  {
    id: "commissioning",
    tabLabel: "Commissioning Support",
    tag: "SSD COMMISSIONING & FIELD SUPPORT",
    title: "Commissioning & Field Engineering",
    subtitle: "On-Site Deployment, System Solutions & Operational Handover",
    badge: "100% On-Site Support",
    location: "Customer Sites Globally & Across India",
    icon: Wrench,
    image: "/assets/commissioning.webp",
    stats: [
      { label: "Support Teams", value: "Dedicated SSD" },
      { label: "Deployment", value: "Client Site" },
      { label: "Response", value: "Swift & Agile" },
      { label: "Handover", value: "Full Training" }
    ],
    col1Title: "SSD Commissioning Support Protocols",
    col1Points: [
      "Every SSD has a dedicated team of highly qualified and experienced personnel",
      "Assistance in commissioning system solutions at the customer's location",
      "Swift and responsive support provided across all project execution stages",
      "Comprehensive on-site training and orientation delivered as needed"
    ],
    col2Title: "Customer Feedback & Continuous Enhancement",
    col2Points: [
      "Insights from commissioning activities influence on design and engineering efforts",
      "Used to enhance system solutions based on real-world experience",
      "Direct communication channel between site engineers and technical councils",
      "Real-world field validation feeding continuously into next-gen development"
    ]
  },
  {
    id: "rnd",
    tabLabel: "Research & Development",
    tag: "RESEARCH & DEVELOPMENT HUB",
    title: "Research & Development",
    subtitle: "Design, Specification, 3D Modeling & Interface Engineering",
    badge: "Continuous Innovation",
    location: "Aartech Advanced Engineering & Simulation Suites",
    icon: Cpu,
    image: "/assets/research_development.webp",
    stats: [
      { label: "Software Tools", value: "Latest CAD/CAE" },
      { label: "Solutions", value: "Custom SSD" },
      { label: "Compliance", value: "Global Standards" },
      { label: "Core Pillar", value: "Innovation" }
    ],
    col1Title: "Design & Engineering Capabilities",
    col1Points: [
      "Each SSD conducts distinct design and engineering tasks",
      "Meets custom-specific requirements for desired application solutions",
      "Comprehensive study of design, specification, and interface data",
      "Address additional interface requirements proactively",
      "Adherence to customer wish-lists is a priority"
    ],
    col2Title: "Engineering Process & Best Practices",
    col2Points: [
      "Utilizes the latest engineering software tools and simulation environments",
      "Best practices and applicable standards guide the entire process",
      "We emphasize innovation & customer feedback across development cycles",
      "Iterative prototype engineering with rigorous testing clearances"
    ]
  }
];

export default function ManufacturingSection({ onOpenInquiry }) {
  const [activeTab, setActiveTab] = useState("unit1");
  const [activeServiceTab, setActiveServiceTab] = useState("commissioning");

  const activeFacility = facilities.find(f => f.id === activeTab) || facilities[0];
  const IconComp = activeFacility.icon;

  const activeService = engineeringServices.find(s => s.id === activeServiceTab) || engineeringServices[0];
  const ServiceIcon = activeService.icon;

  return (
    <section id="manufacturing" className="py-16 sm:py-20 lg:py-24 bg-white text-[#0C013D] relative overflow-hidden border-b border-slate-200">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="max-w-3xl">
            {/* Tag matching Aartech website */}
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#B80001]" />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#B80001] uppercase font-Barlow">
                MANUFACTURING & INFRASTRUCTURE
              </span>
            </div>

            <h2 className="font-antonio text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#0C013D] uppercase tracking-wide leading-tight mb-4">
              Manufacturing Hubs
            </h2>

            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-Barlow max-w-2xl">
              Aartech Solonics operates dual state-of-the-art manufacturing hubs in Mandideep (M.P.) and Parwanoo (H.P.), 
              backed by rigorous Quality Assurance Plans (QAP) and specialized Factory Acceptance Test (FAT) protocols.
            </p>
          </div>

          {/* Quick Credibility Pill */}
          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 shadow-sm self-start lg:self-end">
            <div className="w-10 h-10 rounded-lg bg-[#B80001]/10 flex items-center justify-center text-[#B80001]">
              <Award size={22} />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider font-Barlow">Standard Compliance</div>
              <div className="text-sm font-bold text-[#0C013D] font-Barlow">QAP & FAT Verified Since 1982</div>
            </div>
          </div>
        </div>

        {/* Tab Switcher: Unit 1 vs Unit 2 */}
        <div className="flex items-center justify-center flex-wrap gap-3 mb-8">
          {facilities.map((fac) => {
            const isActive = activeTab === fac.id;
            return (
              <button
                key={fac.id}
                onClick={() => setActiveTab(fac.id)}
                className={`px-5 py-3 rounded-xl font-Barlow text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#0C013D] text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-[#0C013D]'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#DE0001]' : 'bg-slate-400'}`} />
                <span>{fac.title.split(':')[0]} — {fac.title.split(':')[1]?.trim().split(',')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Facility Detail View with Rotating #0C013D Border */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-2xl p-[3px] overflow-hidden shadow-xl mb-12 bg-slate-100"
          >
            {/* Animated Rotating Gradient Border with #0C013D */}
            <div 
              className="absolute top-1/2 left-1/2 w-[200vmax] h-[200vmax] animate-spin-border pointer-events-none"
              style={{
                background: 'conic-gradient(from 0deg at 50% 50%, #0C013D 0deg, #DE0001 90deg, #0C013D 180deg, #DE0001 270deg, #0C013D 360deg)',
              }}
            />

            {/* Inner Content Card */}
            <div className="relative bg-white rounded-[13px] p-6 sm:p-8 lg:p-10 z-10 w-full h-full">
            {/* Facility Header Row - Centered Logo and Unit Title */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pb-6 border-b border-slate-200 mb-8 text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#0C013D] text-white flex items-center justify-center shrink-0 shadow-md">
                <IconComp size={26} />
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-antonio text-[#0C013D] uppercase tracking-wide">
                {activeFacility.title}
              </h3>
            </div>

            {/* Content Columns: Infrastructure Details & Quality Assurance / Testing */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              
              {/* Left Column: Infrastructure & Floor Features */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0C013D] font-Barlow mb-4 pb-3 border-b border-slate-100">
                  <Layers size={16} className="text-[#B80001]" />
                  <span>Manufacturing Infrastructure & Floor Capabilities</span>
                </div>

                <ul className="space-y-3">
                  {activeFacility.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-Barlow">
                      <CheckCircle2 size={16} className="text-[#B80001] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: QAP / FAT Testing Rig Protocol */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0C013D] font-Barlow mb-4 pb-3 border-b border-slate-100">
                  <ShieldCheck size={16} className="text-[#B80001]" />
                  <span>{activeFacility.qaTitle}</span>
                </div>

                <ul className="space-y-3">
                  {activeFacility.qaPoints.map((qa, qIdx) => (
                    <li key={qIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-Barlow">
                      <CheckCircle2 size={16} className="text-[#0C013D] shrink-0 mt-0.5" />
                      <span>{qa}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Technical Machinery Panoramic Image */}
            <div className="mt-8 rounded-xl overflow-hidden border border-slate-200 bg-white relative">
              <div className="h-44 sm:h-56 lg:h-64 w-full relative overflow-hidden">
                <img
                  src={activeFacility.image}
                  alt={activeFacility.title}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
              </div>
            </div>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* Section Divider - Denser Prominent Dividing Line */}
        <div className="relative my-14 sm:my-20">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-[2.5px] sm:h-[3px] bg-slate-400/80 rounded-full" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-5 py-1 text-xs font-bold uppercase tracking-widest text-slate-700 font-Barlow flex items-center gap-2 border border-slate-300 rounded-full shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#B80001]" />
              Engineering Excellence & Innovation
              <span className="w-2 h-2 rounded-full bg-[#B80001]" />
            </span>
          </div>
        </div>

        {/* Section Header: Commissioning & Research Development */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="max-w-3xl">
            {/* Tag matching Aartech website */}
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#B80001]" />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#B80001] uppercase font-Barlow">
                COMMISSIONING & RESEARCH DEVELOPMENT
              </span>
            </div>

            <h2 className="font-antonio text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#0C013D] uppercase tracking-wide leading-tight mb-4">
              Field Commissioning & R&D
            </h2>

            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-Barlow max-w-2xl">
              From responsive on-site customer commissioning to custom application research and cutting-edge SSD development, Aartech Solonics delivers end-to-end engineering excellence.
            </p>
          </div>

          {/* Quick Credibility Pill */}
          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 shadow-sm self-start lg:self-end">
            <div className="w-10 h-10 rounded-lg bg-[#0C013D]/10 flex items-center justify-center text-[#0C013D]">
              <Compass size={22} />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider font-Barlow">Lifecycle Execution</div>
              <div className="text-sm font-bold text-[#0C013D] font-Barlow">Field Handover & Innovation</div>
            </div>
          </div>
        </div>

        {/* Tab Switcher: Commissioning Support vs Research & Development */}
        <div className="flex items-center justify-center flex-wrap gap-3 mb-8">
          {engineeringServices.map((svc) => {
            const isActive = activeServiceTab === svc.id;
            return (
              <button
                key={svc.id}
                onClick={() => setActiveServiceTab(svc.id)}
                className={`px-5 py-3 rounded-xl font-Barlow text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#0C013D] text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-[#0C013D]'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#DE0001]' : 'bg-slate-400'}`} />
                <span>{svc.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Active Service Detail View with Rotating #0C013D Border */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeServiceTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-2xl p-[3px] overflow-hidden shadow-xl bg-slate-100"
          >
            {/* Animated Rotating Gradient Border with #0C013D */}
            <div 
              className="absolute top-1/2 left-1/2 w-[200vmax] h-[200vmax] animate-spin-border pointer-events-none"
              style={{
                background: 'conic-gradient(from 0deg at 50% 50%, #0C013D 0deg, #DE0001 90deg, #0C013D 180deg, #DE0001 270deg, #0C013D 360deg)',
              }}
            />

            {/* Inner Content Card */}
            <div className="relative bg-white rounded-[13px] p-6 sm:p-8 lg:p-10 z-10 w-full h-full">
            {/* Service Header Row - Centered Logo and Title */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pb-6 border-b border-slate-200 mb-8 text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#0C013D] text-white flex items-center justify-center shrink-0 shadow-md">
                <ServiceIcon size={26} />
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-antonio text-[#0C013D] uppercase tracking-wide">
                {activeService.title}
              </h3>
            </div>

            {/* Content Columns: Left Column & Right Column */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              
              {/* Left Column */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0C013D] font-Barlow mb-4 pb-3 border-b border-slate-100">
                  <Layers size={16} className="text-[#B80001]" />
                  <span>{activeService.col1Title}</span>
                </div>

                <ul className="space-y-3">
                  {activeService.col1Points.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-Barlow">
                      <CheckCircle2 size={16} className="text-[#B80001] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0C013D] font-Barlow mb-4 pb-3 border-b border-slate-100">
                  <ShieldCheck size={16} className="text-[#B80001]" />
                  <span>{activeService.col2Title}</span>
                </div>

                <ul className="space-y-3">
                  {activeService.col2Points.map((qa, qIdx) => (
                    <li key={qIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-Barlow">
                      <CheckCircle2 size={16} className="text-[#0C013D] shrink-0 mt-0.5" />
                      <span>{qa}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Panoramic Image Banner */}
            <div className="mt-8 rounded-xl overflow-hidden border border-slate-200 bg-white relative">
              <div className="h-44 sm:h-56 lg:h-64 w-full relative overflow-hidden">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
              </div>
            </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

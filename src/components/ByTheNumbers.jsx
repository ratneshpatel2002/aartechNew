import React from 'react';
import { Layers, Globe, ShieldCheck, Cpu, Trophy, Clock } from 'lucide-react';

export default function ByTheNumbers() {
  const stats = [
    {
      value: "1982",
      label: "YEAR ESTABLISHED",
      sub: "Over 4 decades of public engineering credibility and technical leadership",
      icon: Clock
    },
    {
      value: "15+",
      label: "COUNTRIES WORLDWIDE",
      sub: "Global installations operating across Asia, Middle East, Africa, and Americas",
      icon: Globe
    },
    {
      value: "9",
      label: "MAJOR INDUSTRIES",
      sub: "Covering 33 specialized industrial sectors from defense to nuclear power",
      icon: Layers
    },
    {
      value: "11+",
      label: "PATENTED PRODUCTS",
      sub: "Proprietary switchgear, ultracapacitors, and fast bus transfer systems",
      icon: Cpu
    },
    {
      value: "100%",
      label: "QAP PROTOCOL",
      sub: "Custom quality assurance plans audited down to component levels",
      icon: ShieldCheck
    },
    {
      value: "BSE",
      label: "SCRIP CODE 542499",
      sub: "Publicly traded on the Bombay Stock Exchange with strong governance",
      icon: Trophy
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#0C013D] text-white relative overflow-hidden">
      {/* Background blueprint pattern */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-20 pointer-events-none" />

      <div className="container relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#DE0001] block mb-2">
            Aartech by the Numbers
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-white tracking-tight">
            Scale, Precision & Enduring Impact
          </h2>
          <p className="text-slate-300 text-base mt-2">
            Measurable engineering excellence trusted by sovereign utilities, defense institutions, and global industry.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div 
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-[#DE0001]/50 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#DE0001]/20 text-[#DE0001] flex items-center justify-center border border-[#DE0001]/30 group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Aartech Metric
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-1">
                  {s.value}
                </div>

                <div className="text-xs font-bold uppercase tracking-widest text-[#DE0001] mb-2">
                  {s.label}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {s.sub}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

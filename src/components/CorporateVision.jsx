import React from 'react';
import { Quote, ArrowRight, ShieldCheck, CheckCircle2, Award } from 'lucide-react';

export default function CorporateVision({ onOpenInquiry }) {
  return (
    <section className="py-20 lg:py-24 bg-white border-b border-slate-200 relative overflow-hidden">
      <div className="container">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Prestigious Vision Statement */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#DE0001]">
              <span className="w-2 h-2 rounded-full bg-[#DE0001]" />
              <span>Corporate Vision & Heritage</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-[#0C013D] leading-tight tracking-tight">
              Living Passions Through Engineering
            </h2>

            <div className="relative pl-6 border-l-4 border-[#DE0001] space-y-3">
              <p className="text-lg sm:text-xl text-[#0C013D] font-medium leading-relaxed italic">
                “Founded in 1982 as an Application Engineering Specialist company, Aartech Solonics was built on a singular conviction: to solve the nation’s most complex electrical and defense challenges with precision and zero tolerance for failure.”
              </p>
            </div>

            <p className="text-slate-600 text-base leading-relaxed max-w-3xl">
              Public listed on the Bombay Stock Exchange (BSE: 542499) since 1992, Aartech has grown into a multi-discipline engineering conglomerate trusted by Indian defense forces, public utilities, and policymakers across 15+ countries. Every breakthrough system we engineer carries the passion and technical diligence of our specialized teams.
            </p>

            {/* Credibility Ribbon */}
            <div className="pt-4 flex flex-wrap items-center gap-8 text-xs font-bold uppercase tracking-wider text-[#0C013D]">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#DE0001]" />
                <span>Established 1982 (40+ Years)</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={18} className="text-[#DE0001]" />
                <span>BSE Listed: 542499</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-[#DE0001]" />
                <span>QAP & ISO Certified Protocol</span>
              </div>
            </div>
          </div>

          {/* Right Column: Corporate Highlights Card (RIL-style) */}
          <div className="lg:col-span-4">
            <div className="bg-[#0C013D] text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden border border-white/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#DE0001]/20 rounded-full blur-2xl pointer-events-none" />

              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#DE0001] block mb-2">
                At a Glance
              </span>

              <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-6">
                Specialized Engineering Leadership
              </h3>

              <div className="space-y-4 divide-y divide-white/10 text-xs">
                <div className="pt-3 first:pt-0 flex items-center justify-between">
                  <span className="text-slate-300 font-semibold">Corporate Status:</span>
                  <span className="font-bold text-white uppercase">Public Limited</span>
                </div>
                <div className="pt-3 flex items-center justify-between">
                  <span className="text-slate-300 font-semibold">Listing:</span>
                  <span className="font-bold text-white uppercase">BSE (Scrip: 542499)</span>
                </div>
                <div className="pt-3 flex items-center justify-between">
                  <span className="text-slate-300 font-semibold">Core Specialization:</span>
                  <span className="font-bold text-white uppercase">Application Engineering</span>
                </div>
                <div className="pt-3 flex items-center justify-between">
                  <span className="text-slate-300 font-semibold">Operational Reach:</span>
                  <span className="font-bold text-white uppercase">15+ Countries Worldwide</span>
                </div>
                <div className="pt-3 flex items-center justify-between">
                  <span className="text-slate-300 font-semibold">Industrial Verticals:</span>
                  <span className="font-bold text-white uppercase">9 Sectors / 33 Sub-sectors</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/15">
                <button
                  onClick={onOpenInquiry}
                  className="w-full btn btn-primary text-xs"
                >
                  <span>Connect with Executive Advisory</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

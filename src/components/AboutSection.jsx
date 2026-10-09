import React from 'react';
import { 
  ShieldCheck, Award, FileText, Download, TrendingUp, 
  ExternalLink, Building2, UserCheck, Calendar, ArrowRight 
} from 'lucide-react';

export default function AboutSection({ onOpenInquiry }) {
  const reports = [
    { title: "Annual Report 2025-26", date: "August 2026", type: "Financial Report", size: "3.4 MB" },
    { title: "Quarterly Financial Results (Q1)", date: "July 2026", type: "BSE Disclosure", size: "1.8 MB" },
    { title: "Shareholding Pattern & Governance", date: "June 2026", type: "Regulatory Filing", size: "1.2 MB" },
    { title: "Notice of 42nd Annual General Meeting", date: "September 2026", type: "Notice", size: "950 KB" }
  ];

  return (
    <section id="investors" className="py-20 lg:py-28 bg-[#F8FAFC] relative border-b border-slate-200">
      <div className="container">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="section-tag">Investor Relations & Corporate Governance</div>
            <h2 className="section-title">Shareholder Value & Transparency</h2>
          </div>
          <p className="section-desc">
            A public limited enterprise listed on the Bombay Stock Exchange (BSE: 542499) with over four decades of strict corporate compliance and sustained engineering growth.
          </p>
        </div>

        {/* Top Ticker & Performance Card (RIL-style) */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md mb-12 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Exchange & Security
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-extrabold text-[#0C013D]">
                BSE: 542499
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 text-xs font-bold border border-emerald-500/20">
                ACTIVE
              </span>
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">Aartech Solonics Limited</div>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Listing History
            </span>
            <div className="text-xl sm:text-2xl font-extrabold text-[#0C013D]">
              Since 1992
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">34 Years of Public Trust</div>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Registrar & Transfer Agent
            </span>
            <div className="text-sm font-bold text-[#0C013D]">
              Bigshare Services Pvt. Ltd.
            </div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">Investor Grievance Redressal</div>
          </div>

          <div className="flex justify-start md:justify-end">
            <button
              onClick={onOpenInquiry}
              className="btn btn-navy text-xs w-full md:w-auto"
            >
              <span>Investor Desk Contact</span>
              <ExternalLink size={14} />
            </button>
          </div>
        </div>

        {/* 2-Column Split: Regulatory Filings & Corporate Heritage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Financial Reports & Disclosures (RIL-style download cards) */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-base font-bold uppercase tracking-wider text-[#0C013D] mb-4 flex items-center gap-2">
              <FileText size={18} className="text-[#DE0001]" />
              <span>Latest Disclosures & Annual Reports</span>
            </h3>

            <div className="space-y-3">
              {reports.map((rep, idx) => (
                <div 
                  key={idx}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#DE0001]/40 hover:shadow-md transition-all duration-200 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#DE0001]/10 text-[#DE0001] flex items-center justify-center shrink-0">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0C013D] group-hover:text-[#DE0001] transition-colors">
                        {rep.title}
                      </h4>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span>{rep.type}</span>
                        <span>•</span>
                        <span>{rep.date}</span>
                        <span>•</span>
                        <span className="font-semibold text-slate-600">{rep.size}</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href="#investors"
                    className="p-2 rounded-lg bg-slate-50 text-slate-600 group-hover:bg-[#DE0001] group-hover:text-white transition-colors"
                    title="Download Report"
                  >
                    <Download size={16} />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Chairman's Message & Core Heritage */}
          <div className="lg:col-span-6">
            <div className="bg-[#0C013D] text-white rounded-2xl p-8 shadow-xl relative overflow-hidden h-full flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#DE0001] block mb-2">
                  Leadership Communication
                </span>
                <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-4">
                  Chairman's Address to Shareholders
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  “Our mission since 1982 has never wavered: to remain dedicated Application Engineering Specialists. By continuously investing in microprocessor-based fast bus transfer systems and patented ultracapacitor storage, Aartech is securing vital utility grids across India and 15+ partner nations.”
                </p>
                <div className="text-xs font-bold text-slate-200">
                  — Executive Council, Aartech Solonics Limited
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-slate-400">
                  Head Office: "Ashirwad", E2/57, Arera Colony, Bhopal, M.P.
                </div>
                <button
                  onClick={onOpenInquiry}
                  className="text-xs font-bold uppercase tracking-wider text-[#DE0001] hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Shareholder Inquiries</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

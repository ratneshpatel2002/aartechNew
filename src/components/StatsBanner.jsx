import React from 'react';
import { quickStats } from '../data/siteData';
import { Layers, Cpu, Wrench, Building2 } from 'lucide-react';

const icons = [Layers, Cpu, Wrench, Building2];

export default function StatsBanner() {
  return (
    <div className="relative -mt-6 z-20 container">
      <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-6 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {quickStats.map((stat, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div 
                key={idx} 
                className={`flex items-start gap-4 ${idx !== 0 ? 'sm:pl-6 pt-4 sm:pt-0' : ''}`}
              >
                <div className="w-12 h-12 rounded-lg bg-[#DE0001]/10 text-[#DE0001] flex items-center justify-center shrink-0 border border-[#DE0001]/20">
                  <Icon size={24} />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold text-[#0C013D] tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-xs font-bold text-[#DE0001] uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">
                    {stat.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

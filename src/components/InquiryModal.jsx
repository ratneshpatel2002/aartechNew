import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function InquiryModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    segment: 'Fast Bus Transfer System (BTS 2000)',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070024]/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-xl w-full p-6 sm:p-8 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#DE0001]">
              Aartech Solonics Technical Advisory
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold uppercase text-[#0C013D] tracking-tight mt-0.5">
              Consult an Application Engineer
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 size={36} />
            </div>
            <h4 className="text-xl font-bold uppercase text-[#0C013D]">
              Consultation Request Received
            </h4>
            <p className="text-sm text-slate-600 max-w-sm mt-2 leading-relaxed">
              Thank you, <strong>{formData.name}</strong>. Our senior technical application specialist will review your specifications and contact you within 24 hours.
            </p>
            <div className="mt-4 text-xs font-semibold text-slate-500">
              For urgent grid emergencies: <strong className="text-[#0C013D]">1800 419 9409</strong>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-6 btn btn-navy text-xs"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0C013D] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Er. Rajesh Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#DE0001]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0C013D] mb-1">
                  Official Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#DE0001]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0C013D] mb-1">
                  Company / Utility
                </label>
                <input
                  type="text"
                  placeholder="e.g. NTPC / State Discom"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#DE0001]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0C013D] mb-1">
                  Phone / Mobile *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#DE0001]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0C013D] mb-1">
                Area of Technical Interest
              </label>
              <select
                value={formData.segment}
                onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#DE0001] bg-white font-semibold text-[#0C013D]"
              >
                <option>Fast Bus Transfer System (BTS 2000)</option>
                <option>Kranking Ultracapacitors (Locomotive & Engine Start)</option>
                <option>CLIP Fault Current Limiters</option>
                <option>Control & Relay Panels</option>
                <option>Solar Design & Engineering</option>
                <option>Solid Waste Treatment Systems</option>
                <option>Custom Industrial Application Engineering</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0C013D] mb-1">
                Project Scope or Requirements
              </label>
              <textarea
                rows={3}
                placeholder="Mention voltage rating, plant capacity, or existing bus setup..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#DE0001]"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span>NDA & Technical confidentiality protected</span>
              </div>
              <button type="submit" className="btn btn-primary text-xs">
                <span>Submit RFP Specs</span>
                <Send size={14} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

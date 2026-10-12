import React, { useState, useRef, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';

export default function LivingPassions({ onOpenInquiry }) {
  const [selectedYear, setSelectedYear] = useState('all');
  
  const photoRef = useRef(null);

  // Handle milestone year selection with zoom & focal pan
  const handleSelectYear = useCallback((year) => {
    setSelectedYear((prev) => (prev === year ? 'all' : year));
  }, []);

  // Subtle interactive parallax on mouse move
  const handlePointerMove = useCallback((e) => {
    if (e.pointerType !== 'mouse' || !photoRef.current) return;
    const rect = photoRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      const px = (x / rect.width - 0.5) * -12;
      const py = (y / rect.height - 0.5) * -8;
      photoRef.current.style.setProperty('--px', `${px}px`);
      photoRef.current.style.setProperty('--py', `${py}px`);
    }
  }, []);

  // Reset parallax on pointer leave
  const handlePointerLeave = useCallback(() => {
    if (!photoRef.current) return;
    photoRef.current.style.setProperty('--px', '0px');
    photoRef.current.style.setProperty('--py', '0px');
  }, []);

  return (
    <section 
      id="about" 
      className="aartech-about-hero border-b border-[#2E2A57]"
      data-year={selectedYear}
    >
      {/* High-Clarity Team Photo with Focal Zoom & Seamless Edge Blend */}
      <div 
        ref={photoRef}
        className="aartech-about-photo"
        id="photo"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {/* Crystal-clear full-colour photo layer (No tint, zero sepia) */}
        <div 
          className="aartech-about-layer" 
          role="img" 
          aria-label="The Aartech engineering team seated outdoors"
          style={{ backgroundImage: "url('/assets/about_demo_team_clear.jpg')" }}
        />
        {/* Soft edge blend into website theme canvas */}
        <div className="aartech-about-blend" />
      </div>

      {/* Main Content & Narrative Block */}
      <div className="aartech-about-content">
        <div className="aartech-about-copy">
          {/* Tag: — ABOUT US */}
          <div className="flex items-center gap-3 mb-4 sm:mb-5">
            <span className="w-8 h-[2px] bg-[#C4A467]" />
            <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.25em] text-[#C4A467] uppercase font-Barlow tracking-widest">
              ABOUT US
            </span>
          </div>

          {/* Heading in original Aartech font (Antonio) with rising animation */}
          <h2 className="aartech-about-h1">
            <span><i>Living Passions</i></span>
            <span><i>Through</i></span>
            <span><i>Engineering</i></span>
          </h2>

          {/* Description Lead Text in original Barlow */}
          <p className="aartech-about-lead">
            Over the years, Aartech has evolved into a close-knit team specializing in many domains. Every team member contributes to the growth of the company by applying their personal passions to the world of engineering.
          </p>

          {/* Action CTA Button (Strictly sharp corners: rounded-none) */}
          <div>
            <button
              type="button"
              onClick={onOpenInquiry}
              className="aartech-about-btn group"
            >
              <span>Meet Aartech</span>
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>

          {/* Horizontal Rule Divider */}
          <div className="aartech-about-rule" />

          {/* Milestones Group */}
          <div className="aartech-about-stats" role="group" aria-label="Company milestones">
            <button
              type="button"
              className="aartech-about-stat"
              data-year="1982"
              aria-pressed={selectedYear === '1982'}
              onClick={() => handleSelectYear('1982')}
            >
              <b>1982</b>
              <small>Founded as an Application Engineering Specialist</small>
            </button>

            <button
              type="button"
              className="aartech-about-stat"
              data-year="1992"
              aria-pressed={selectedYear === '1992'}
              onClick={() => handleSelectYear('1992')}
            >
              <b>1992</b>
              <small>Became a public limited company</small>
            </button>
          </div>

          {/* Clean Milestone Hint */}
          <div className="aartech-about-hint">
            Select a year to focus on key company milestones.
          </div>
        </div>
      </div>
    </section>
  );
}

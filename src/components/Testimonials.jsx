import React, { useState, useEffect, useCallback, useRef } from 'react';
import { testimonials } from '../data/siteData';

export default function Testimonials() {
  const [startIndex, setStartIndex] = useState(0);
  const [isBusy, setIsBusy] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const [modalIndex, setModalIndex] = useState(null);

  const total = testimonials.length;
  const SHOW_COUNT = 3;
  const timerRef = useRef(null);
  const touchStartXRef = useRef(null);

  // Pad numbers for display like 01 / 06
  const pad = (n) => String(n).padStart(2, '0');

  // Change slide with transition animation
  const goTo = useCallback((nextIndex, dir = 1) => {
    if (isBusy) return;
    const normalized = (nextIndex + total) % total;
    if (normalized === startIndex) return;

    setIsBusy(true);
    setDirection(dir);

    // Give time for transition out, then swap and transition back in
    setTimeout(() => {
      setStartIndex(normalized);
      setTimeout(() => {
        setIsBusy(false);
      }, 350);
    }, 280);
  }, [isBusy, startIndex, total]);

  const handleNext = useCallback(() => {
    goTo(startIndex + 1, 1);
  }, [goTo, startIndex]);

  const handlePrev = useCallback(() => {
    goTo(startIndex - 1, -1);
  }, [goTo, startIndex]);

  // Auto-advance slideshow every 7 seconds when not paused and modal closed
  useEffect(() => {
    if (isPaused || modalIndex !== null) return;
    timerRef.current = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(timerRef.current);
  }, [isPaused, modalIndex, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalIndex !== null) {
        if (e.key === 'Escape') {
          setModalIndex(null);
        } else if (e.key === 'ArrowRight') {
          setModalIndex((prev) => (prev + 1) % total);
        } else if (e.key === 'ArrowLeft') {
          setModalIndex((prev) => (prev - 1 + total) % total);
        }
        return;
      }

      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalIndex, total, handleNext, handlePrev]);

  // Prevent background scroll when modal is active
  useEffect(() => {
    if (modalIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalIndex]);

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (modalIndex !== null) return;
    if (deltaX < -50) {
      handleNext();
    } else if (deltaX > 50) {
      handlePrev();
    }
  };

  // 3 currently visible cards in the echelon stack
  const visibleCards = Array.from({ length: SHOW_COUNT }, (_, k) => {
    const idx = (startIndex + k) % total;
    return {
      item: testimonials[idx],
      index: idx,
      isStaggered: k === 1, // Card 2 is staggered horizontally
    };
  });

  const activeModalClient = modalIndex !== null ? testimonials[modalIndex] : null;

  return (
    <section
      id="testimonials"
      className="t2-section py-16 sm:py-24 lg:py-28 bg-[#FFFFFF] relative border-y border-[#0C013D]/15 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Architectural Grid Lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0C013D 1px, transparent 1px),
            linear-gradient(to bottom, #0C013D 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
        aria-hidden="true"
      />

      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ================= LEFT INTRO COLUMN ================= */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            {/* Blueprint Section Tag */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-[3px] bg-[#C80001]" />
              <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.28em] text-[#C80001] uppercase font-Barlow">
                TESTIMONIALS
              </span>
            </div>

            {/* Main Editorial Headline */}
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-[58px] font-bold text-[#0C013D] leading-[1.04] tracking-tight mb-5">
              Trust, in our customers’ words.
            </h2>

            {/* Subtitle Copy */}
            <p className="text-[#0C013D]/80 text-base sm:text-lg font-medium leading-relaxed max-w-[34ch] mb-8 sm:mb-10 font-Barlow">
              Real feedback from the people who work with us every day. Select a card to read the full story.
            </p>

            {/* Navigation Controls: Joined Arrows & Interactive Pips */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-6">
              
              {/* Joined 3px Solid Border Arrows */}
              <div 
                className="flex border-[3px] border-[#0C013D] bg-white select-none"
                role="group" 
                aria-label="Testimonial controls"
              >
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous testimonials"
                  className="w-14 h-14 flex items-center justify-center bg-white text-[#0C013D] border-r-[3px] border-[#0C013D] hover:bg-[#C80001] hover:text-white active:scale-95 transition-colors duration-150 cursor-pointer"
                >
                  <svg className="w-6 h-6 fill-none stroke-current stroke-[3]" viewBox="0 0 24 24">
                    <path d="M15 4 7 12l8 8" strokeLinecap="square" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next testimonials"
                  className="w-14 h-14 flex items-center justify-center bg-white text-[#0C013D] hover:bg-[#C80001] hover:text-white active:scale-95 transition-colors duration-150 cursor-pointer"
                >
                  <svg className="w-6 h-6 fill-none stroke-current stroke-[3]" viewBox="0 0 24 24">
                    <path d="m9 4 8 8-8 8" strokeLinecap="square" />
                  </svg>
                </button>
              </div>

              {/* Square Pips: Exactly matching Testimonials-2.html */}
              <div 
                className="flex items-center gap-2" 
                role="group" 
                aria-label="Jump to testimonial"
              >
                {testimonials.map((_, n) => {
                  // Active if within the 3 visible cards window
                  const isActive = ((n - startIndex + total) % total) < SHOW_COUNT;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => goTo(n)}
                      aria-label={`Start at testimonial ${n + 1}`}
                      className={`w-[22px] h-[22px] border-[3px] border-[#0C013D] transition-all duration-200 cursor-pointer hover:-translate-y-0.5 ${
                        isActive ? 'bg-[#0C013D]' : 'bg-white'
                      }`}
                    />
                  );
                })}
              </div>

            </div>

            {/* Quick Indicator Subtext */}
            <div className="mt-6 flex items-center gap-3 text-xs font-semibold tracking-wider text-[#0C013D]/60 uppercase font-Barlow">
              <span>Client Slide {pad(startIndex + 1)} of {pad(total)}</span>
              <span>•</span>
              <span className="text-[#C80001]">Click card for complete story</span>
            </div>

          </div>


          {/* ================= RIGHT STAGGERED 3D CARDS ================= */}
          <div className="lg:col-span-7">
            <div 
              className="t2-stack"
              aria-label="Customer testimonials"
            >
              {visibleCards.map(({ item, index, isStaggered }) => (
                <article
                  key={`${item.id}-${index}`}
                  role="button"
                  tabIndex={0}
                  aria-haspopup="dialog"
                  aria-label={`Read the full testimonial from ${item.name}`}
                  onClick={() => setModalIndex(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setModalIndex(index);
                    }
                  }}
                  className={`t2-card ${isStaggered ? 't2-stagger' : ''} ${
                    isBusy ? 't2-out' : ''
                  }`}
                  style={{
                    '--shift': direction > 0 ? '-36px' : '36px',
                  }}
                >
                  {/* Portrait Thumbnail Container - Enlarged Card */}
                  <div className="t2-face">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={`Portrait of ${item.name}`} 
                        loading="eager"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <span>{item.ini || item.name.slice(0, 2).toUpperCase()}</span>
                    )}
                    <div className="absolute bottom-0 inset-x-0 bg-[#0C013D]/85 py-0.5 text-[10px] text-center font-bold tracking-widest uppercase text-white">
                      CLIENT
                    </div>
                  </div>

                  {/* Testimonial Quote & Author Info Column */}
                  <div className="flex flex-col justify-between min-w-0 py-0.5">
                    <blockquote className="t2-quote font-Barlow mb-3">
                      “{item.text}”
                    </blockquote>

                    {/* Author Line, Role Pill & Read Action */}
                    <div className="t2-by">
                      <b>{item.name}</b>
                      <span className="t2-role-tag">
                        {item.role} • {item.company}
                      </span>
                      <em>Read full story →</em>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

        </div>

      </div>


      {/* ================= MODAL DIALOG POPUP ================= */}
      {modalIndex !== null && activeModalClient && (
        <div
          className="t2-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="t2ModalName"
          onClick={(e) => {
            // Close if clicking outside the modal box
            if (e.target.classList.contains('t2-overlay')) {
              setModalIndex(null);
            }
          }}
        >
          <div className="t2-pop">
            
            {/* Top Right Close Button */}
            <button
              type="button"
              className="t2-pop-close"
              onClick={() => setModalIndex(null)}
              aria-label="Close testimonial popup"
            >
              <svg className="w-6 h-6 fill-none stroke-current stroke-[3]" viewBox="0 0 24 24">
                <path d="m5 5 14 14M19 5 5 19" strokeLinecap="square" />
              </svg>
            </button>

            {/* Modal Inner Grid */}
            <div className="t2-pop-in">
              
              {/* Photo Column on Red Backdrop */}
              <div className="t2-pop-photo">
                <div className="t2-big">
                  {activeModalClient.image ? (
                    <img
                      src={activeModalClient.image}
                      alt={activeModalClient.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{activeModalClient.ini || 'AS'}</span>
                  )}
                </div>
              </div>

              {/* Text & Details Column */}
              <div className="t2-pop-text">
                
                {/* Sector / Role Tag Pill */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-[#0C013D] text-white px-3.5 py-1 text-xs font-bold tracking-[0.2em] uppercase font-Barlow">
                    {activeModalClient.role} • {activeModalClient.company}
                  </span>
                  {activeModalClient.sector && (
                    <span className="border border-[#0C013D]/20 text-[#0C013D] px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase font-Barlow hidden sm:inline-block">
                      {activeModalClient.sector}
                    </span>
                  )}
                </div>

                {/* Big Customer Name */}
                <h3 
                  id="t2ModalName"
                  className="font-Barlow font-extrabold text-3xl sm:text-4xl lg:text-[46px] text-[#0C013D] leading-[1.05] tracking-tight pr-14"
                >
                  {activeModalClient.name}
                </h3>

                {/* Solid Red Divider Rule */}
                <div className="h-1.5 w-20 bg-[#C80001] flex-none" />

                {/* Full Testimonial Story Paragraphs */}
                <div className="font-editorial text-[#0C013D] text-lg sm:text-[20px] leading-relaxed font-normal flex-grow space-y-4">
                  {activeModalClient.full && activeModalClient.full.length > 0 ? (
                    activeModalClient.full.map((p, pIdx) => (
                      <p key={pIdx} className="relative">
                        {pIdx === 0 && (
                          <span className="text-[#C80001] font-bold text-4xl leading-none mr-2 align-middle">
                            “
                          </span>
                        )}
                        {p}
                      </p>
                    ))
                  ) : (
                    <p className="relative">
                      <span className="text-[#C80001] font-bold text-4xl leading-none mr-2 align-middle">
                        “
                      </span>
                      {activeModalClient.text}
                    </p>
                  )}
                </div>

                {/* Verified Credibility Footnote */}
                <div className="bg-[#F8FAFC] border-l-4 border-[#0C013D] p-3 text-xs text-[#0C013D]/70 font-Barlow flex items-center justify-between">
                  <span>Verified Client Partner • Aartech Solonics Industrial Deployment</span>
                  <span className="font-bold text-[#C80001]">Zero-Failure Record</span>
                </div>

                {/* Modal Navigation Footer */}
                <div className="pt-4 border-t border-dashed border-[#0C013D]/40 flex items-center justify-between gap-4 mt-auto">
                  <span className="font-Barlow font-extrabold text-xl tracking-wider text-[#0C013D]">
                    {pad(modalIndex + 1)} / {pad(total)}
                  </span>

                  <div className="flex border-[3px] border-[#0C013D] bg-white">
                    <button
                      type="button"
                      onClick={() => setModalIndex((prev) => (prev - 1 + total) % total)}
                      aria-label="Previous client testimonial"
                      className="w-12 h-12 flex items-center justify-center bg-white text-[#0C013D] border-r-[3px] border-[#0C013D] hover:bg-[#C80001] hover:text-white transition-colors duration-150 cursor-pointer"
                    >
                      <svg className="w-5 h-5 fill-none stroke-current stroke-[3]" viewBox="0 0 24 24">
                        <path d="M15 4 7 12l8 8" strokeLinecap="square" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalIndex((prev) => (prev + 1) % total)}
                      aria-label="Next client testimonial"
                      className="w-12 h-12 flex items-center justify-center bg-white text-[#0C013D] hover:bg-[#C80001] hover:text-white transition-colors duration-150 cursor-pointer"
                    >
                      <svg className="w-5 h-5 fill-none stroke-current stroke-[3]" viewBox="0 0 24 24">
                        <path d="m9 4 8 8-8 8" strokeLinecap="square" />
                      </svg>
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}

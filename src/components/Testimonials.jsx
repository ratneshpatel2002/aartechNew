import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '../data/siteData';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = testimonials.length;

  // Auto-advance slideshow every 6 seconds if not hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  // On desktop, display 2 items at a time: currentIndex and (currentIndex + 1) % total
  const firstItem = testimonials[currentIndex];
  const secondIndex = (currentIndex + 1) % total;
  const secondItem = testimonials[secondIndex];

  return (
    <section 
      id="testimonials" 
      className="py-14 sm:py-20 lg:py-24 bg-[#0C013D] text-white relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 relative z-10">
        
        {/* Top Header Box - Dotted Blueprint Frame matching assettest.png */}
        <div className="border border-dashed border-white/20 p-6 sm:p-8 lg:p-10 mb-8 sm:mb-10 relative">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              {/* Overline Tag: — TESTIMONIALS */}
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-[1.5px] bg-white/80" />
                <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.25em] text-white/90 uppercase font-Barlow">
                  TESTIMONIALS
                </span>
              </div>

              {/* Main Headline in Playfair Display Serif */}
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[46px] text-[#C80001] font-normal leading-tight tracking-tight">
                Trust, in our customers’ words.
              </h2>
            </div>

            {/* Slideshow Navigation Arrows & Indicator */}
            <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
              <span className="text-xs font-semibold text-blue-200/80 tracking-widest font-Barlow hidden sm:inline-block mr-2">
                {currentIndex + 1} / {total}
              </span>

              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full border border-dashed border-white/40 hover:border-white bg-white/5 hover:bg-white/15 flex items-center justify-center text-white transition-all duration-200 cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full border border-dashed border-white/40 hover:border-white bg-white/5 hover:bg-white/15 flex items-center justify-center text-white transition-all duration-200 cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials Slide Show Row (2 Cards on Desktop, 1 on Mobile) */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch"
            >
              {/* Card 1 */}
              <div className="border border-dashed border-white/20 p-6 sm:p-8 lg:p-9 flex flex-col justify-between bg-white/[0.02] hover:bg-white/[0.04] transition-colors relative h-full">
                {/* Big Segment: Photo & Name */}
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5 sm:gap-6 pb-6 border-b border-dashed border-white/20">
                  <div className="w-32 h-44 sm:w-36 sm:h-52 lg:w-40 lg:h-56 rounded-none overflow-hidden border-2 border-white/30 shadow-2xl shrink-0 bg-white/10">
                    <img
                      src={firstItem.image}
                      alt={firstItem.name}
                      className="w-full h-full object-cover object-top select-none"
                      loading="eager"
                    />
                  </div>
                  <div className="text-center sm:text-left flex flex-col justify-center">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-200/70 font-Barlow mb-2">
                      Client Leader
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-[30px] font-extrabold text-white font-Barlow tracking-tight leading-snug">
                      {firstItem.name}
                    </h3>
                  </div>
                </div>

                {/* Lower Segment: About Them (Designation, Company & Testimonial Quote) */}
                <div className="pt-6 flex flex-col justify-between flex-grow">
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs sm:text-sm font-semibold text-blue-100 font-Barlow">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-300" />
                      <span>{firstItem.role}, {firstItem.company}</span>
                    </span>
                  </div>

                  <p className="font-editorial text-base sm:text-lg lg:text-[19px] text-white/95 font-normal leading-relaxed italic flex-grow">
                    “{firstItem.text}”
                  </p>
                </div>
              </div>

              {/* Card 2 (Visible on lg screens and above) */}
              <div className="border border-dashed border-white/20 p-6 sm:p-8 lg:p-9 flex-col justify-between bg-white/[0.02] hover:bg-white/[0.04] transition-colors relative h-full hidden lg:flex">
                {/* Big Segment: Photo & Name */}
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5 sm:gap-6 pb-6 border-b border-dashed border-white/20">
                  <div className="w-32 h-44 sm:w-36 sm:h-52 lg:w-40 lg:h-56 rounded-none overflow-hidden border-2 border-white/30 shadow-2xl shrink-0 bg-white/10">
                    <img
                      src={secondItem.image}
                      alt={secondItem.name}
                      className="w-full h-full object-cover object-top select-none"
                      loading="eager"
                    />
                  </div>
                  <div className="text-center sm:text-left flex flex-col justify-center">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-200/70 font-Barlow mb-2">
                      Client Leader
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-[30px] font-extrabold text-white font-Barlow tracking-tight leading-snug">
                      {secondItem.name}
                    </h3>
                  </div>
                </div>

                {/* Lower Segment: About Them (Designation, Company & Testimonial Quote) */}
                <div className="pt-6 flex flex-col justify-between flex-grow">
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs sm:text-sm font-semibold text-blue-100 font-Barlow">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-300" />
                      <span>{secondItem.role}, {secondItem.company}</span>
                    </span>
                  </div>

                  <p className="font-editorial text-base sm:text-lg lg:text-[19px] text-white/95 font-normal leading-relaxed italic flex-grow">
                    “{secondItem.text}”
                  </p>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots Indicator */}
        <div className="flex items-center justify-center gap-2 mt-8 sm:mt-10">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                currentIndex === idx 
                  ? 'w-8 bg-white' 
                  : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

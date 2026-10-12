import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const backgroundSlides = [
  {
    id: 1,
    image: "/assets1/main.jpg",
    alt: "Aartech Solonics Flagship Industrial Campus & Manufacturing Complex",
    tag: "AARTECH SOLONICS HEADQUARTERS & MANUFACTURING"
  },
  {
    id: 2,
    image: "/assets1/rocket.jpg",
    alt: "Defense, Aerospace & Kranking Ultracapacitor Energy Systems",
    tag: "DEFENSE & AEROSPACE SYSTEMS"
  },
  {
    id: 3,
    image: "/assets1/view.jpg",
    alt: "Aartech Solonics Mandideep Infrastructure & Industrial Campus",
    tag: "MANDIDEEP MANUFACTURING CAMPUS"
  },
  {
    id: 4,
    image: "/assets1/hall.jpg",
    alt: "Heavy Switchgear & High-Voltage Assembly Testing Hall",
    tag: "SWITCHGEAR & HIGH VOLTAGE TESTING"
  },
  {
    id: 5,
    image: "/assets1/mac.jpg",
    alt: "Automated Precision CNC Machinery & Manufacturing Infrastructure",
    tag: "PRECISION CNC INFRASTRUCTURE"
  },
  {
    id: 6,
    image: "/assets1/serv.jpg",
    alt: "Turnkey Substation Engineering & Fast Bus Transfer Field Services",
    tag: "SUBSTATION & BTS 2000 FIELD SERVICES"
  },
  {
    id: 7,
    image: "/assets1/pdfd.jpg",
    alt: "Applied Power Electronics & Pulse Energy R&D Laboratories",
    tag: "ADVANCED R&D & PULSE POWER LABS"
  },
  {
    id: 8,
    image: "/assets1/serv2.jpg",
    alt: "Industrial Control & Power Transmission Engineering Support",
    tag: "CONTROL & RELAY SYSTEM INTEGRATION"
  },
  {
    id: 9,
    image: "/assets1/_DSC6397.jpg",
    alt: "High-Reliability Industrial Automation & Production Floor",
    tag: "QUALITY-CONTROLLED AUTOMATION"
  },
  {
    id: 10,
    image: "/assets1/_DSC2324.jpg",
    alt: "Heavy-Duty Electrical Equipment & Switchgear Bays",
    tag: "HEAVY POWER ENGINEERING"
  },
  {
    id: 11,
    image: "/assets1/_DSC6431.jpg",
    alt: "Precision Industrial Assembly & Testing Bays",
    tag: "ELECTRICAL APPARATUS ASSEMBLY"
  },
  {
    id: 12,
    image: "/assets1/_DSC7046.jpg",
    alt: "Field Commissioning & Turnkey Deployment Support",
    tag: "GLOBAL FIELD OPERATIONS"
  }
];

export default function Hero({ onOpenAbout, onOpenHistory }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % backgroundSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + backgroundSlides.length) % backgroundSlides.length);
  }, []);

  // Continuous auto-rotation every 4 seconds (not paused on mouse hover)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Preload next and previous slide images for buttery-smooth transitions
  useEffect(() => {
    const nextIdx = (currentIndex + 1) % backgroundSlides.length;
    const prevIdx = (currentIndex - 1 + backgroundSlides.length) % backgroundSlides.length;
    const imgNext = new Image();
    imgNext.src = backgroundSlides[nextIdx].image;
    const imgPrev = new Image();
    imgPrev.src = backgroundSlides[prevIdx].image;
  }, [currentIndex]);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    setTouchStartX(null);
  };

  return (
    <section 
      id="hero-banner"
      className="relative w-full h-screen min-h-[660px] max-h-[1080px] overflow-hidden flex items-center justify-center text-white bg-black pt-44 sm:pt-48 lg:pt-52 xl:pt-56 cursor-default"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Sliding Background Images - Clearly Visible with Translucent Film Overlay */}
      <div className="absolute inset-0 z-0 bg-black overflow-hidden cursor-default">
        <AnimatePresence mode="sync">
          <motion.div
            key={backgroundSlides[currentIndex].id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.88, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full cursor-default"
          >
            <img 
              src={backgroundSlides[currentIndex].image} 
              alt={backgroundSlides[currentIndex].alt}
              className="w-full h-full object-cover object-center filter brightness-95 contrast-105 cursor-default"
            />
          </motion.div>
        </AnimatePresence>

        {/* Clean Translucent Dark Film Overlay for crisp image clarity */}
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />
        
        {/* Subtle Bottom Gradient Framing only */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 pointer-events-none" />
      </div>

      {/* Hero Content - Placed on the Left Side with Clean Padding */}
      <div className="w-full max-w-[1520px] mx-auto relative z-10 text-left px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl lg:max-w-4xl flex flex-col items-start text-left"
        >
          {/* Main Headline: "Living Passion Through Engineering" in Manrope-Light font with text cursor */}
          <h1 className="font-manrope-light font-light text-white text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[5.5rem] leading-[1.08] tracking-tight mb-8 sm:mb-10 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] cursor-text select-text">
            Living Passion Through Engineering
          </h1>

          {/* Layered Rectangular Transparent Buttons (modeled after assetbutton.jpg white banner) */}
          <ul className="flex flex-wrap items-center justify-start gap-4 sm:gap-6 list-none p-0 m-0">
            <li>
              <a
                href="#about"
                onClick={(e) => {
                  if (onOpenAbout) {
                    e.preventDefault();
                    onOpenAbout();
                  }
                }}
                className="group relative inline-flex items-center justify-center p-[4px] border border-white/40 bg-black/25 hover:border-white transition-all duration-300 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.35)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.55)] hover:-translate-y-0.5 rounded-none"
              >
                <div className="relative flex items-center justify-center px-6 py-2.5 sm:px-7 sm:py-3 border border-white/80 bg-white/[0.07] group-hover:bg-[#DE0001] group-hover:border-[#DE0001] transition-all duration-300 rounded-none pr-8 sm:pr-9">
                  <span className="text-white text-[15px] sm:text-[17px] font-semibold tracking-wider uppercase drop-shadow-sm">
                    About Us
                  </span>
                  <ArrowRight size={16} className="ml-2.5 text-white transition-transform duration-300 group-hover:translate-x-1" />
                  
                  {/* Curled Folded Dog-Ear Corner from assetbutton design */}
                  <div className="absolute -bottom-[1px] -right-[1px] w-3.5 h-3.5 pointer-events-none overflow-hidden">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Crease shadow */}
                      <polygon points="0,14 14,0 14,14" fill="rgba(0,0,0,0.4)" />
                      {/* Curled flap with smooth edge and gradient fill */}
                      <path
                        d="M0 14 Q 5 5 14 0 L 0 0 Z"
                        fill="url(#dogEarAbout)"
                        stroke="rgba(255,255,255,0.85)"
                        strokeWidth="0.75"
                      />
                      <defs>
                        <linearGradient id="dogEarAbout" x1="0" y1="0" x2="14" y2="14" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#ffffff" stopOpacity="0.95" />
                          <stop offset="100%" stopColor="#d1d5db" stopOpacity="0.75" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a
                href="#history"
                onClick={(e) => {
                  if (onOpenHistory) {
                    e.preventDefault();
                    onOpenHistory();
                  }
                }}
                className="group relative inline-flex items-center justify-center p-[4px] border border-white/40 bg-black/25 hover:border-white transition-all duration-300 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.35)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.55)] hover:-translate-y-0.5 rounded-none"
              >
                <div className="relative flex items-center justify-center px-6 py-2.5 sm:px-7 sm:py-3 border border-white/80 bg-white/[0.07] group-hover:bg-[#DE0001] group-hover:border-[#DE0001] transition-all duration-300 rounded-none pr-8 sm:pr-9">
                  <span className="text-white text-[15px] sm:text-[17px] font-semibold tracking-wider uppercase drop-shadow-sm">
                    Our History
                  </span>
                  <ArrowRight size={16} className="ml-2.5 text-white transition-transform duration-300 group-hover:translate-x-1" />
                  
                  {/* Curled Folded Dog-Ear Corner from assetbutton design */}
                  <div className="absolute -bottom-[1px] -right-[1px] w-3.5 h-3.5 pointer-events-none overflow-hidden">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Crease shadow */}
                      <polygon points="0,14 14,0 14,14" fill="rgba(0,0,0,0.4)" />
                      {/* Curled flap with smooth edge and gradient fill */}
                      <path
                        d="M0 14 Q 5 5 14 0 L 0 0 Z"
                        fill="url(#dogEarHistory)"
                        stroke="rgba(255,255,255,0.85)"
                        strokeWidth="0.75"
                      />
                      <defs>
                        <linearGradient id="dogEarHistory" x1="0" y1="0" x2="14" y2="14" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#ffffff" stopOpacity="0.95" />
                          <stop offset="100%" stopColor="#d1d5db" stopOpacity="0.75" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

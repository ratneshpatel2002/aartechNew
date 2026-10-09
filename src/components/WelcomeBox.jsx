import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CAROUSEL_IMAGES = [
  {
    src: '/assets/40_image_0.jpg',
    alt: 'Aartech Solonics All-Hands Engineering Team',
  },
  {
    src: '/assets/41_image_1.jpg',
    alt: 'Aartech Solonics Campus Team Infrastructure',
  },
  {
    src: '/assets/39_image_2.jpg',
    alt: 'Aartech Solonics Core Electrical & Switchgear Engineers',
  },
];

export default function WelcomeBox({ onOpenInquiry, onOpenAbout }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const bodyRef = useRef(null);
  const buttonRef = useRef(null);
  const carouselContainerRef = useRef(null);

  // Active slide index for the team carousel
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance carousel every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = (e) => {
    e?.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  };

  // GSAP Entrance animation on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reset',
        },
      });

      // 1. Title & Subtitle slide in smoothly from the left
      tl.from([titleRef.current, subtitleRef.current], {
        x: -70,
        opacity: 0,
        duration: 0.8,
        stagger: 0.18,
        ease: 'power3.out',
      })
      // 2. Body narrative and button animate from below
      .from([bodyRef.current, buttonRef.current], {
        y: 45,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      }, '-=0.4')
      // 3. Carousel container gently resolves without disturbing image stability
      .from(carouselContainerRef.current, {
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
      }, '-=0.6');

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="welcome" 
      className="bg-white text-black relative w-full overflow-hidden"
    >
      {/* Anchor identifier for navbar navigation */}
      <span id="about" className="absolute -top-24 left-0 block h-0 w-0 pointer-events-none" />

      {/* Container matching exact Aartechassets.html specifications */}
      <div className="fullPage lg:px-20 max-container lg:my-[3.8rem] w-[100%] lg:pt-0 lg:pb-0 pt-10 pb-[2rem] px-5 sm:px-10">
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:gap-8">
          
          {/* Left Column: Authentic Aartech About Us Narrative */}
          <div className="flex flex-col justify-between w-full lg:w-2/3">
            <div>
              {/* Title from Aartechassets.html */}
              <div 
                ref={titleRef} 
                className="title lg:text-4xl md:text-3xl text-[28px] text-box-red font-normal font-antonio lg:mb-9 mb-4 uppercase tracking-normal will-change-transform"
              >
                About Us
              </div>

              {/* Subtitle from Aartechassets.html */}
              <div 
                ref={subtitleRef} 
                className="font-semibold text-box-red lg:text-[24px] md:text-[22px] leading-[28.8px] text-[20px] font-Barlow lg:mb-[24px] mb-2 will-change-transform"
              >
                Living Passions Through Engineering
              </div>

              {/* Body Text from Aartechassets.html */}
              <div 
                ref={bodyRef} 
                className="font-Barlow lg:font-normal font-medium lg:leading-7 text-lightBlack lg:max-w-[820px] lg:text-[20px] md:text-[18px] sm:text-[14px] text-base w-auto leading-[22.4px] sm:leading-4 will-change-transform"
              >
                Aartech Solonics was founded in 1982 with the aim of becoming an “Application Engineering Specialist” company. It won many laurels &amp; major businesses with this approach. It became a public limited company in 1992. We are trusted by the Indian government agencies and policymakers of many other countries. With our future-ready mindset, we assist them in ushering in the right techniques for the challenges at hand.
                <br /><br />
                Over the years, Aartech has evolved into a close-knit team specializing in many domains. Every team member contributes individually to the growth of the company by applying their personal Passions to the world of Engineering.
              </div>
            </div>

            {/* KNOW MORE Button matching Aartechassets.html */}
            <div ref={buttonRef} className="will-change-transform">
              <button 
                onClick={onOpenAbout}
                className="flex items-center justify-center lg:w-[189px] w-[145px] sm:w-[120px] whitespace-nowrap lg:h-[49px] h-[44px] border-[1px] border-black lg:text-[18px] md:text-[16px] sm:text-[12px] font-bold lg:px-[39px] px-[20px] lg:mb-0 mb-4 lg:mt-[28px] mt-4 font-Barlow text-base hover:text-box-red hover:border-box-red tracking-wider transition-colors duration-200 cursor-pointer uppercase select-none"
                aria-label="Know more about Aartech Solonics"
              >
                KNOW MORE
              </button>
            </div>
          </div>

          {/* Right Column: Authentic Carousel of Aartech Team & Engineers */}
          <div 
            ref={carouselContainerRef}
            className="flex justify-center items-center w-full lg:w-1/3 max-w-[450px] min-w-[300px] 2xl:w-[470px] sm:ml-2 2xl:h-[410px] mt-6 lg:mt-0 lg:justify-center lg:items-center mx-auto lg:mx-0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="w-full flex flex-col items-center">
              
              {/* Carousel Viewport Frame */}
              <div className="relative w-full aspect-square max-w-[450px] overflow-hidden bg-slate-100 shadow-md border border-slate-200 group">
                
                {/* Image Slides */}
                {CAROUSEL_IMAGES.map((img, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                      idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full aspect-square object-cover block select-none"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                ))}

                {/* Left Arrow Button */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-black shadow-md flex items-center justify-center transition-all duration-200 opacity-80 group-hover:opacity-100 hover:scale-105 cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Right Arrow Button */}
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-black shadow-md flex items-center justify-center transition-all duration-200 opacity-80 group-hover:opacity-100 hover:scale-105 cursor-pointer"
                  aria-label="Next slide"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Pagination Dots matching Aartechassets.html: active red dot, inactive dots with black border */}
              <div className="mt-3">
                <ul className="flex justify-center items-center gap-2 w-full">
                  {CAROUSEL_IMAGES.map((_, dotIdx) => {
                    const isActive = dotIdx === currentSlide;
                    return (
                      <li key={dotIdx} className="leading-none">
                        <button
                          type="button"
                          onClick={() => setCurrentSlide(dotIdx)}
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                            isActive
                              ? 'bg-box-red border-[1px] border-box-red scale-110'
                              : 'bg-gray-100 border-[1px] border-black hover:bg-gray-300'
                          }`}
                          aria-label={`Go to slide ${dotIdx + 1}`}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

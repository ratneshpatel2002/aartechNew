import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function FloatingWidgets() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScroll(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!showScroll) return null;

  return (
    <aside aria-label="Quick Actions" className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="w-11 h-11 rounded-full bg-[#0C013D] text-white flex items-center justify-center shadow-lg hover:bg-[#DE0001] transition-all duration-300 hover:scale-110 focus:outline-none"
      >
        <ArrowUp size={18} />
      </button>
    </aside>
  );
}

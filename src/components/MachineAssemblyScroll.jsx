import React, { useEffect, useRef, useState, useCallback } from 'react';
import { PARTS_CONFIG, Z_ORDER, MACHINE_PARTS_URIS, W, H } from '../data/machinePartsData';

// Cubic easing function identical to reference2/Machine assembly on scroll new.html
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function MachineAssemblyScroll({ parentSectionRef = null }) {
  const rigRef = useRef(null);
  const imgsRef = useRef([]);
  const loadedCountRef = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const animStateRef = useRef({
    target: 0,
    cur: 0,
    raf: 0,
  });

  // Calculate scroll progress exclusively while pinned in the second page
  const getProgress = useCallback(() => {
    const track = document.getElementById('assembly-scroll-track') || parentSectionRef?.current || document.getElementById('tailored-solutions');
    if (!track) return 0;

    const stage = document.getElementById('assembly-stage') || track.firstElementChild;
    const trackRect = track.getBoundingClientRect();

    // Determine sticky top offset (matches CSS sticky top-16 / top-20)
    let stickyTop = 72;
    if (stage) {
      const computed = window.getComputedStyle(stage);
      const topVal = parseFloat(computed.top);
      if (!isNaN(topVal) && topVal > 0) {
        stickyTop = topVal;
      }
    }

    // 1. The model must remain completely disassembled until coming to the second page
    if (trackRect.top >= stickyTop) {
      return 0;
    }

    // 2. While pinned in the second page, scroll drives the assembly from 0 to 1
    const stageHeight = stage ? stage.offsetHeight : window.innerHeight;
    const maxScroll = Math.max(1, track.offsetHeight - stageHeight);
    const curScroll = stickyTop - trackRect.top;

    // 3. Assemble from 0.0 to 1.0; capped at 1.0 when scrolling down to subsequent pages
    return Math.min(1, Math.max(0, curScroll / maxScroll));
  }, [parentSectionRef]);

  // Direct 60fps / 120fps transform update of all part image layers
  const updateScene = useCallback((p) => {
    PARTS_CONFIG.forEach((pt, i) => {
      const el = imgsRef.current[i];
      if (!el) return;
      const [a, b] = pt.at;
      const t = Math.min(1, Math.max(0, (p - a) / (b - a)));
      const k = 1 - ease(t);
      const tx = ((pt.off[0] * k) / W) * 100;
      const ty = ((pt.off[1] * k) / H) * 100;
      el.style.transform = `translate(${tx}%, ${ty}%)`;
    });
  }, []);

  // Continuous animation frame loop with lerp smoothing identical to new reference HTML
  const tick = useCallback(() => {
    const s = animStateRef.current;
    const reduceMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    s.cur += (s.target - s.cur) * (reduceMotion ? 1 : 0.12);

    if (Math.abs(s.target - s.cur) < 0.0005) {
      s.cur = s.target;
    }

    updateScene(s.cur);

    if (s.cur !== s.target) {
      s.raf = requestAnimationFrame(tick);
    } else {
      s.raf = 0;
    }
  }, [updateScene]);

  // Scroll listener
  const onScroll = useCallback(() => {
    const s = animStateRef.current;
    s.target = getProgress();
    if (!s.raf) {
      s.raf = requestAnimationFrame(tick);
    }
  }, [getProgress, tick]);

  // Handle individual image load
  const handleImageLoad = () => {
    loadedCountRef.current += 1;
    if (loadedCountRef.current >= PARTS_CONFIG.length) {
      setIsLoaded(true);
      const initialProgress = getProgress();
      animStateRef.current.target = initialProgress;
      animStateRef.current.cur = initialProgress;
      updateScene(initialProgress);
    }
  };

  useEffect(() => {
    // Check if images are already cached/complete on mount
    let completedCount = 0;
    imgsRef.current.forEach((img) => {
      if (img && img.complete && img.naturalWidth > 0) {
        completedCount++;
      }
    });

    if (completedCount >= PARTS_CONFIG.length) {
      setIsLoaded(true);
      const initialProgress = getProgress();
      animStateRef.current.target = initialProgress;
      animStateRef.current.cur = initialProgress;
      updateScene(initialProgress);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    // Initial positioning
    const initialP = getProgress();
    animStateRef.current.target = initialP;
    animStateRef.current.cur = initialP;
    updateScene(initialP);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (animStateRef.current.raf) {
        cancelAnimationFrame(animStateRef.current.raf);
      }
    };
  }, [getProgress, onScroll, updateScene]);

  return (
    <div className="relative w-full bg-transparent select-none">
      {/* 
        Clean 7-layer CAD assembly model from reference2/Machine assembly on scroll new.html:
        - 100% full, unclipped transparent PNG layers
        - Back to front z-ordering: [5, 6, 3, 4, 2, 0, 1]
        - Settle timings at: [start, end] and exploded offsets off: [dx, dy]
        - No HUD text ("Electric machine", "Scroll to assemble", etc.)
        - No progress bar/line
      */}
      <div
        ref={rigRef}
        className={`relative w-full select-none transition-opacity duration-400 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1200 / 896',
          overflow: 'visible',
        }}
      >
        {Z_ORDER.map((partIdx, orderIndex) => {
          const part = PARTS_CONFIG[partIdx];
          return (
            <img
              key={part.n}
              ref={(el) => {
                if (el) imgsRef.current[partIdx] = el;
              }}
              src={MACHINE_PARTS_URIS[partIdx]}
              alt={part.n}
              draggable={false}
              onLoad={handleImageLoad}
              className="absolute inset-0 w-full h-full pointer-events-none select-none"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                willChange: 'transform',
                zIndex: orderIndex + 1,
                userSelect: 'none',
                WebkitUserDrag: 'none',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

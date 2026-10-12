import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { AARTECH_TOPICS_LIST, getTopicByIdOrName } from '../data/curiositiesTopicsData';

// Easing matching Small Curiosities.html
const EASE = 'cubic-bezier(.7,0,.2,1)';

const ICON = {
  left: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-[1.05em] h-[1.05em] shrink-0">
      <path d="M15 6l-6 6 6 6" />
    </svg>
  ),
  right: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-[1.05em] h-[1.05em] shrink-0">
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
};

function radiusFrom(x, y) {
  return Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) + 4;
}

export default function SegmentExplorerModal({
  isOpen,
  onClose,
  initialItem = null,
  clickCoords = null
}) {
  const containerRef = useRef(null);
  const [currentTopic, setCurrentTopic] = useState(() => getTopicByIdOrName(initialItem || 'defense & exploration'));
  const [isIn, setIsIn] = useState(false);
  const isAnimatingRef = useRef(false);

  // Update current topic when initialItem changes
  useEffect(() => {
    if (initialItem) {
      setCurrentTopic(getTopicByIdOrName(initialItem));
    }
  }, [initialItem]);

  // Lock body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  // Handle circular clip-path expansion on open
  useEffect(() => {
    if (!isOpen) {
      setIsIn(false);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const x = clickCoords?.x ?? (window.innerWidth / 2);
    const y = clickCoords?.y ?? (window.innerHeight / 2);
    const r = radiusFrom(x, y);

    const from = `circle(0px at ${x}px ${y}px)`;
    const to = `circle(${r}px at ${x}px ${y}px)`;

    el.style.clipPath = from;
    isAnimatingRef.current = true;

    const anim = el.animate(
      [{ clipPath: from }, { clipPath: to }],
      { duration: 1000, easing: EASE, fill: 'forwards' }
    );

    const timer = setTimeout(() => {
      setIsIn(true);
    }, 380);

    anim.finished
      .then(() => {
        el.style.clipPath = 'none';
        isAnimatingRef.current = false;
        const titleEl = el.querySelector('.title');
        if (titleEl) titleEl.focus({ preventScroll: true });
      })
      .catch(() => {
        isAnimatingRef.current = false;
      });

    return () => {
      clearTimeout(timer);
      try {
        anim.cancel();
      } catch (e) {}
    };
  }, [isOpen, clickCoords]);

  // Handle circular clip-path shrink on close
  const handleClose = useCallback(() => {
    if (isAnimatingRef.current) return;
    const el = containerRef.current;
    if (!el) {
      onClose();
      return;
    }

    isAnimatingRef.current = true;
    setIsIn(false);

    const backBtn = el.querySelector('.btn.back');
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    if (backBtn) {
      const b = backBtn.getBoundingClientRect();
      x = b.left + b.width / 2;
      y = b.top + b.height / 2;
    } else if (clickCoords) {
      x = clickCoords.x;
      y = clickCoords.y;
    }

    const r = radiusFrom(x, y);
    const from = `circle(${r}px at ${x}px ${y}px)`;
    const to = `circle(0px at ${x}px ${y}px)`;

    el.style.clipPath = from;

    const anim = el.animate(
      [{ clipPath: from }, { clipPath: to }],
      { duration: 850, easing: EASE, fill: 'forwards' }
    );

    anim.finished
      .then(() => {
        isAnimatingRef.current = false;
        onClose();
      })
      .catch(() => {
        isAnimatingRef.current = false;
        onClose();
      });
  }, [clickCoords, onClose]);

  // Next topic navigation with circular expansion ripple
  const handleNext = (e) => {
    if (isAnimatingRef.current) return;
    const currentList = AARTECH_TOPICS_LIST;
    const idx = currentList.findIndex((t) => t.id === currentTopic.id || t.name.toLowerCase() === (currentTopic.name || '').toLowerCase());
    const nextIdx = idx >= 0 ? (idx + 1) % currentList.length : 0;
    const nextItem = currentList[nextIdx];

    const el = containerRef.current;
    if (!el) {
      setCurrentTopic(nextItem);
      return;
    }

    const r = e.currentTarget.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const rad = radiusFrom(cx, cy);

    setIsIn(false);
    isAnimatingRef.current = true;

    const from = `circle(0px at ${cx}px ${cy}px)`;
    const to = `circle(${rad}px at ${cx}px ${cy}px)`;
    el.style.clipPath = from;

    setCurrentTopic(nextItem);

    const anim = el.animate(
      [{ clipPath: from }, { clipPath: to }],
      { duration: 900, easing: EASE, fill: 'forwards' }
    );

    setTimeout(() => {
      setIsIn(true);
    }, 350);

    anim.finished
      .then(() => {
        el.style.clipPath = 'none';
        isAnimatingRef.current = false;
      })
      .catch(() => {
        isAnimatingRef.current = false;
      });
  };

  // Keyboard navigation (ESC to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  // Split title into words for animated sliding reveal
  const titleWords = (currentTopic.title || '').split(' ');
  const currentIdx = AARTECH_TOPICS_LIST.findIndex((t) => t.id === currentTopic.id || t.name.toLowerCase() === (currentTopic.name || '').toLowerCase());
  const nextIdx = currentIdx >= 0 ? (currentIdx + 1) % AARTECH_TOPICS_LIST.length : 0;
  const nextTopic = AARTECH_TOPICS_LIST[nextIdx];

  const modalContent = (
    <section
      ref={containerRef}
      className={`topic ${isIn ? 'in' : ''}`}
      aria-label={currentTopic.name}
      style={{
        '--bg': currentTopic.bg,
        '--fg': currentTopic.fg
      }}
    >
      {/* Background SVG Scenic Artwork from Small Curiosities */}
      {currentTopic.art && (
        <div
          dangerouslySetInnerHTML={{ __html: currentTopic.art() }}
          className="contents"
        />
      )}

      {/* Top Navigation Bar: Back & Next Buttons (Strictly rounded-none) */}
      <div className="bar">
        <button className="btn back" type="button" onClick={handleClose}>
          {ICON.left}
          <span>All topics</span>
        </button>
        <button className="btn next" type="button" onClick={handleNext}>
          <span>Next: {nextTopic ? nextTopic.name : 'Next Topic'}</span>
          {ICON.right}
        </button>
      </div>

      {/* Main Body: Title with sliding words, Lede paragraph, and 3 Notes */}
      <div className="body">
        <h2 className="title" tabIndex={-1}>
          {titleWords.map((word, i) => (
            <span key={i} className="w">
              <span style={{ '--i': i }}>{word}</span>
              {i < titleWords.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h2>

        <p className="lede fade" style={{ '--i': 0 }}>
          {currentTopic.lede}
        </p>

        <ul className="notes">
          {(currentTopic.notes || []).map((note, i) => (
            <li key={i} className="fade" style={{ '--i': i + 1 }}>
              <strong>{note[0]}</strong>
              <span>{note[1]}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
}

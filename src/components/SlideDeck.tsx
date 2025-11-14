import React, { useRef, useState, useEffect } from 'react';
import './SlideDeck.css';

interface SlideDeckProps {
  children: React.ReactNode[];
}

export const SlideDeck: React.FC<SlideDeckProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDots, setShowDots] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const totalSlides = React.Children.count(children);

  const scrollToSlide = (index: number) => {
    if (containerRef.current) {
      const slideHeight = window.innerHeight;
      containerRef.current.scrollTo({
        top: index * slideHeight,
        behavior: 'smooth'
      });
    }
  };

  const nextSlide = () => {
    const next = Math.min(currentSlide + 1, totalSlides - 1);
    setCurrentSlide(next);
    scrollToSlide(next);
  };

  const prevSlide = () => {
    const prev = Math.max(currentSlide - 1, 0);
    setCurrentSlide(prev);
    scrollToSlide(prev);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, totalSlides]);

  // Update current slide based on scroll position
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const slideHeight = window.innerHeight;
      const scrollTop = container.scrollTop;
      const newSlide = Math.round(scrollTop / slideHeight);
      setCurrentSlide(newSlide);

      // Show dots when scrolling
      setShowDots(true);

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Hide dots after 2 seconds of no scrolling
      scrollTimeoutRef.current = setTimeout(() => {
        setShowDots(false);
      }, 2000);
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    scrollToSlide(index);
  };

  return (
    <div className="slide-deck">
      <div className="slide-container" ref={containerRef}>
        {React.Children.toArray(children)}
      </div>

      <div className={`slide-dots ${showDots ? 'visible' : ''}`}>
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="slide-number">
        {currentSlide + 1} / {totalSlides}
      </div>

      {(currentSlide === 0 || currentSlide === 1) && (
        <div className="keyboard-hint">
          Scroll, use arrow keys (↑↓), or press space to navigate
        </div>
      )}

      <div className="slide-footer-left">
        v1.0<br />
        Last Update: 10/28/25
      </div>

      <div className="slide-footer-right">
        Report by: Mike Amato
      </div>
    </div>
  );
};

'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScrollNavigationProps {
  containerId: string;
}

export function ScrollNavigation({ containerId }: ScrollNavigationProps) {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);

  // Check scroll position and update arrow visibility
  const checkScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    // Show left arrow if scrolled right
    setShowLeftArrow(scrollLeft > 10);

    // Show right arrow if there's more content to the right
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  // Set up scroll listener
  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    containerRef.current = container;

    // Initial check
    checkScroll();

    // Add scroll listener
    container.addEventListener('scroll', checkScroll);

    // Add resize listener to recalculate on window resize
    window.addEventListener('resize', checkScroll);

    return () => {
      container.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [containerId]);

  // Scroll left
  const scrollLeft = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });
  };

  // Scroll right
  const scrollRight = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Left Arrow */}
      <AnimatePresence>
        {showLeftArrow && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.3)]
                       flex items-center justify-center
                       hover:scale-110 active:scale-95 transition-transform duration-200"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Right Arrow */}
      <AnimatePresence>
        {showRightArrow && (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.3)]
                       flex items-center justify-center
                       hover:scale-110 active:scale-95 transition-transform duration-200"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-black" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

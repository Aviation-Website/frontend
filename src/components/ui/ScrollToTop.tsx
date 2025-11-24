"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Visibility check
      if (currentScrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Direction check
      if (currentScrollY < lastScrollY.current) {
        setIsScrollingUp(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsScrollingUp(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const lenis = (window as unknown as { lenis?: { scrollTo: (n: number) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20, rotate: 180 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: isScrollingUp ? 0 : 180 }}
          exit={{ opacity: 0, scale: 0.5, y: 20, rotate: 180 }}
          whileHover={{ scale: 1.5, rotate: 0 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex items-center justify-center rounded-full bg-transparent transition-colors cursor-pointer"
          aria-label="Scroll to top"
        >
          <Image 
            src="/Logo/toTop.svg" 
            alt="toTop" 
            className="h-20 w-20 pointer-events-none select-none" 
            width={50} 
            height={50} 
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

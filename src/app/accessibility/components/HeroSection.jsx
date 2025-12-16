"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const HeroSection = () => {
  const [isSticky, setIsSticky] = useState(false);
  const heroRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = heroRef.current?.offsetHeight || 400;
      const isScrollingUp = scrollPosition < lastScrollY.current;

      // Activate sticky when scrolled past 70% of hero section
      if (scrollPosition > heroHeight * 0.7) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      lastScrollY.current = scrollPosition;
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Original Hero Section */}
      <div ref={heroRef} className="relative">
        <img
          src="/images/accessibility/banner.jpeg"
          className="w-full h-[400px] lg:h-[650px] object-cover"
          style={{ backgroundPosition: "top" }}
          alt="Accessibility banner"
        />
        {/* Overlay to darken the image */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="text-center px-[15px]">
            <h1 className="text-white text-[30px] sm:text-[62px] font-medium mb-4">
              ACCESSIBILITY
            </h1>
          </div>
        </div>
      </div>

      {/* Sticky Header - appears when scrolling */}
      <AnimatePresence>
        {isSticky && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{
              duration: 0.35,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="fixed top-0 left-0 right-0 z-50"
          >
            <div className="relative w-full">
              {/* Gradient background with backdrop blur */}
              <div className="absolute inset-0 bg-[#101828]/90 backdrop-blur-lg" />

              {/* Content */}
              <div className="relative flex items-center justify-center max-sm:h-[68px] h-[80px] px-4">
                <motion.h1
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="text-white text-[22px] sm:text-[32px] lg:text-[38px] font-medium tracking-wide"
                >
                  ACCESSIBILITY
                </motion.h1>
              </div>

              {/* Elegant bottom border with gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px]">
                <div className="h-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

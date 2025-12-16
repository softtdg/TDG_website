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
      <div ref={heroRef} className="relative">
        <video
          src="/videos/TDG Web Home V2.mp4"
          className="w-full h-[400px] md:h-[100vh] object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="text-center">
          <img
            src="/images/home/tdg-logo.png"
            alt=""
            className="w-[80vw] max-w-[492px] h-auto sm:w-[60vw] md:w-[50vw] lg:w-[492px] lg:h-[297px]"
          />
        </div>
      </div> */}

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
                    className="text-white text-[22px] sm:text-[32px] lg:text-[38px] font-medium tracking-wide hidden lg:block"
                  >
                    {/* TDG - Transit Design Group */}
                  </motion.h1>

                  <motion.h1
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="text-white text-[22px] sm:text-[32px] lg:text-[38px] font-medium tracking-wide lg:hidden"
                  >
                    {/* TDG */}
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
      </div>
    </>
  );
};

// import React from "react";

// export const HeroSection = () => {
//   return (
//     <div className="relative">
//       <img
//         src="/images/home/hero-section1.png"
//         className="w-full h-[100vh] object-cover"
//       />
//       <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
//         <div className="text-center">
//           <img
//             src="/images/home/tdg-logo.png"
//             alt=""
//             className="w-[80vw] max-w-[492px] h-auto sm:w-[60vw] md:w-[50vw] lg:w-[492px] lg:h-[297px]"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

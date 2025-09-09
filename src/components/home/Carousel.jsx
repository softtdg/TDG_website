"use client";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const images = [
  { src: "/images/defense.png", title: "LED Tech" },
  { src: "/images/cerousel/image.png", title: "Emergency" },
  { src: "/images/cerousel/image4.png", title: "Transport" },
  { src: "/images/cerousel/image3.png", title: "LED Tech" },
  { src: "/images/cerousel/image2.png", title: "Innovation" },
];

export default function Carousel() {
  const [index, setIndex] = useState(1); // start from 2nd (center)
  const [isMobile, setIsMobile] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsLargeScreen(width >= 1280);
      setWindowWidth(width);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  // Touch handlers for mobile swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-8 sm:py-16 md:py-20 lg:py-[100px] w-full bg-[#161C25] text-white px-4 sm:px-6 lg:px-8">
      {/* <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-bold mb-8 sm:mb-12 md:mb-16 lg:mb-[100px] text-center">
        OUR WORLD
      </h2> */}

      {/* Carousel Wrapper */}
      <div className="relative flex items-center justify-center w-full max-w-5xl">
        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="hidden sm:block absolute cursor-pointer left-2 sm:left-4 md:left-8 custom-1515:left-[-250px] z-[50] p-2 sm:p-3 md:p-4 backdrop-blur-sm border border-[#0356C2] rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(3, 86, 194, 0.7) 0%, rgba(3, 86, 194, 0) 100%)",
          }}
        >
          <ArrowBackIcon className="text-white text-lg sm:text-xl md:text-2xl" />
        </button>

        {/* Slides */}
        <div
          className="flex items-center justify-center w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[641px] overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {images.map((img, i) => {
            // For screens below xl (mobile and tablet), show simple one-by-one carousel
            if (!isLargeScreen) {
              if (i === index) {
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute z-30"
                  >
                    <div className="relative w-[320px] h-[340px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={img.src}
                        alt={img.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Title & Action */}
                      {/* <div
                        className="absolute bottom-0 top-0 left-0 flex items-end pb-4 sm:pb-6 md:pb-8 justify-between w-full pl-3 sm:pl-4 md:pl-5 pr-4 sm:pr-6 md:pr-8"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(0, 58, 93, 0.1) 0%, rgba(0, 40, 64, 0) 47.12%, rgba(1, 19, 31, 0.4) 100%)",
                        }}
                      >
                        <p className="text-lg sm:text-xl md:text-2xl font-semibold">
                          {img.title}
                        </p>
                        <button className="p-1 sm:p-2">
                          <img
                            src="/icons/detail-arrow.svg"
                            alt=""
                            className="w-12 h-12"
                          />
                        </button>
                      </div> */}
                    </div>
                  </motion.div>
                );
              }
              return null; // Don't render other images on small screens
            }

            // For large screens (xl+), show your DEFAULT 3D carousel
            let position = i - index;
            if (position < -2) position += images.length;
            if (position > 2) position -= images.length;

            // Create evenly spaced layout with proper scaling
            let scale, zIndex, opacity, translateX;

            if (position === 0) {
              // Current image - largest and centered
              scale = 1;
              zIndex = "z-30";
              opacity = "opacity-100";
              translateX = 0;
            } else if (position === -1) {
              // Previous image - medium size, left side
              scale = 0.8;
              zIndex = "z-20";
              opacity = "opacity-90";
              translateX = -280;
            } else if (position === -2) {
              // Two images back - smaller, further left
              scale = 0.6;
              zIndex = "z-10";
              opacity = "opacity-70";
              translateX = -450;
            } else if (position === 1) {
              // Next image - medium size, right side
              scale = 0.8;
              zIndex = "z-20";
              opacity = "opacity-90";
              translateX = 280;
            } else if (position === 2) {
              // Two images forward - smaller, further right
              scale = 0.6;
              zIndex = "z-10";
              opacity = "opacity-70";
              translateX = 450;
            } else {
              // Hidden images
              scale = 0.6;
              zIndex = "z-0";
              opacity = "opacity-0";
              translateX = 0;
            }

            // Responsive adjustments for mobile - only scale down translateX for mobile
            const mobileScale = isMobile ? scale * 0.8 : scale;
            const mobileTranslateX = isMobile ? translateX * 0.6 : translateX;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: opacity === "opacity-0" ? 0 : 1,
                  scale: mobileScale,
                  x: mobileTranslateX,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className={`absolute ${zIndex} ${opacity}`}
                style={{
                  transform: `translateX(${mobileTranslateX}px) scale(${mobileScale})`,
                }}
              >
                <div
                  className="relative w-[280px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[800px] lg:h-[500px] xl:w-[1200px] xl:h-[750px] rounded-xl overflow-hidden shadow-lg"
                  style={{
                    width: `${windowWidth - 600}px`,
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Title & Action - only show on current image */}
                  {/* {position === 0 && (
                    <div
                      className="absolute bottom-0 top-0 left-0 flex items-end pb-4 sm:pb-6 md:pb-8 lg:pb-[30px] justify-between w-full pl-3 sm:pl-4 md:pl-5 lg:pl-[20px] pr-4 sm:pr-6 md:pr-8 lg:pr-[50px]"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0, 58, 93, 0.1) 0%, rgba(0, 40, 64, 0) 47.12%, rgba(1, 19, 31, 0.4) 100%)",
                      }}
                    >
                      <p className="text-lg sm:text-xl md:text-2xl lg:text-[36px] font-semibold">
                        {img.title}
                      </p>
                      <button className="p-1 sm:p-2">
                        <img
                          src="/icons/detail-arrow.svg"
                          alt=""
                          className="w-auto h-auto"
                        />
                      </button>
                    </div>
                  )} */}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="hidden sm:block absolute cursor-pointer right-2 sm:right-4 md:right-8 lg:right-8 custom-1515:right-[-250px] z-[50] p-2 sm:p-3 md:p-4 backdrop-blur-sm border border-[#0356C2] rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(3, 86, 194, 0.7) 0%, rgba(3, 86, 194, 0) 100%)",
          }}
        >
          <ArrowForwardIcon className="text-white text-lg sm:text-xl md:text-2xl" />
        </button>
      </div>

      {/* Dots - Positioned above everything */}
      {/* <div className="flex mt-6 sm:mt-8 md:mt-10 lg:mt-[50px] space-x-2 relative z-[100]">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 ${
              i === index ? "bg-white" : "bg-gray-500 hover:bg-gray-400"
            }`}
          />
        ))}
      </div> */}
    </div>
  );
}

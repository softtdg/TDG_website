"use client";
import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

export const LightingInMotionSection = () => {
  const [expandedSection, setExpandedSection] = useState("railways");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const sections = {
    railways: {
      title: "RAILWAYS",
      description:
        "TDG offers customized and innovative solutions for both interior and exterior lighting systems for the global rail industry. With LED drivers in service since 1999 and an LED main lighting system in service since 2003, TDG has over 100,000 hours of actual in car performance from its systems. There are nearly one million TDG LED drivers in service globally in the rail industry.",
      image: "/images/home/l2.jpg",
    },
    defense: {
      title: "DEFENSE",
      description:
        "Advanced lighting solutions for defense applications including military vehicles, aircraft, and specialized equipment. Our cutting-edge LED technology ensures reliability and performance in the most demanding environments.",
      image: "/images/home/projects/1.jpg",
    },
    support: {
      title: "SUPPORT",
      description:
        "Comprehensive technical support and maintenance services for all our lighting systems. Our expert team provides 24/7 assistance to ensure optimal performance and minimal downtime for your operations.",
      image: "/images/home/projects/2.jpg",
    },
  };

  // Get current image based on expanded section, default to railways
  const getCurrentImage = () => {
    if (expandedSection && sections[expandedSection]) {
      return sections[expandedSection].image;
    }
    return sections.railways.image;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      className="w-full bg-white py-10 sm:py-20 px-4 sm:px-6 lg:px-[50px]"
      ref={ref}
    >
      <div className="max-w-[100%] mx-auto">
        {/* OLD CODE - COMMENTED OUT FOR BACKUP */}
        {/* 
        <div className="flex flex-col lg:flex-row gap-7 mb-7 lg:min-h-[350px]">
          <div className="flex-[2] flex">
            <img
              src="/images/home/l1.jpg"
              alt="Modern train interior with LED lighting"
              className="w-full h-full object-cover rounded-[30px]"
              style={{ minHeight: "100%", maxHeight: "400px" }}
            />
          </div>
          <div className="flex flex-1 items-stretch">
            <div className="bg-[#F5E0AD] rounded-[30px] p-6 sm:p-16 text-center w-full shadow-lg flex flex-col justify-center h-full">
              <div className="mb-5">
                <img
                  src="/images/home/setting.svg"
                  alt=""
                  className="w-[60px] h-[60px] block mx-auto"
                />
              </div>
              <h2 className="text-[40px] font-bold text-black mb-2">
                SINCE 1989
              </h2>
              <p className="text-[15px] text-black">Ride the TDG Experience</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex flex-1 flex-col justify-center">
            <div className="flex items-center gap-2">
              <div className="w-20 h-0.5 bg-[black] mb-6"></div>
              <p className="text-sm font-bold text-[black] uppercase tracking-widest mb-6">
                LIGHTING IN MOTION
              </p>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-black uppercase mb-8 leading-tight">
              LIGHTING THE WAY FORWARD
            </h1>
            <p className="text-xl text-gray-800 mb-10 leading-relaxed max-w-lg">
              TDG is fully conversant with North American, European, Japanese
              and other global emergency rail safety standards.
            </p>
            <button className="bg-gray-100 hover:bg-gray-200 text-black font-bold uppercase px-10 py-4 rounded-lg transition-colors duration-200 w-fit border border-gray-300 shadow-sm">
              READ MORE
            </button>
          </div>
          <div className="relative flex-1">
            <img
              src="/images/home/l2.jpg"
              alt="Traditional train interior"
              className="w-full h-[450px] object-cover rounded-[30px]"
            />
          </div>
        </div>
        */}

        {/* NEW UI - COLLAPSIBLE SECTIONS */}
        <motion.div
          className="flex flex-col lg:flex-row gap-8 lg:min-h-[900px]"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Left - Dynamic Image */}
          <motion.div
            className="flex-[1.1] flex relative order-2 lg:order-1"
            variants={itemVariants}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={expandedSection || "railways"}
                src={getCurrentImage()}
                alt={
                  expandedSection === "defense"
                    ? "Defense lighting solutions"
                    : expandedSection === "support"
                    ? "Support services"
                    : "Modern train interior with LED lighting"
                }
                className="rounded-[0px] w-full lg:h-[900px] object-cover"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              />
            </AnimatePresence>
          </motion.div>

          {/* Right - Collapsible Content */}
          <motion.div
            className="flex-1 flex flex-col justify-center sm:px-[30px] order-1 lg:order-2"
            variants={itemVariants}
          >
            {/* Debug info */}
            {/* <div className="mb-4 p-2 bg-gray-100 text-xs">
              Current expandedSection: {expandedSection || "null"}
            </div> */}
            {Object.entries(sections).map(([key, section], index) => (
              <motion.div
                key={key}
                className="mb-6"
                variants={itemVariants}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Section Header */}
                <motion.button
                  onClick={() => {
                    const newExpandedSection =
                      expandedSection === key ? null : key;
                    setExpandedSection(newExpandedSection || "railways");
                  }}
                  className="w-full text-left flex items-center justify-between py-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.h3
                    className={`text-2xl lg:text-[70px] font-bold uppercase transition-colors duration-300 ${
                      expandedSection === key ? "text-[#0356C2]" : "text-black"
                    }`}
                    transition={{ duration: 0.2 }}
                  >
                    {section.title}
                  </motion.h3>
                </motion.button>

                {/* Collapsible Content */}
                <motion.div
                  className="overflow-hidden"
                  initial={false}
                  animate={{
                    height: expandedSection === key ? "auto" : 0,
                    opacity: expandedSection === key ? 1 : 0,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <div className="pb-4">
                    <motion.p
                      className="text-[black] leading-relaxed text-sm lg:text-[20px]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: expandedSection === key ? 1 : 0,
                        y: expandedSection === key ? 0 : 20,
                      }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {section.description}
                    </motion.p>
                  </div>
                </motion.div>

                {/* Separator Line */}
                {index < Object.keys(sections).length - 1 && (
                  <motion.div
                    className="border-t border-[black] my-4 lg:my-8"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

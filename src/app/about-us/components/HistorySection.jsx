"use client";
import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export const HistorySection = () => {
  const [expandedSection, setExpandedSection] = useState("railways");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Timeline data based on the provided image, with a description for each year
  const timeline = [
    { year: "1989", description: "Company founded and began operations." },
    {
      year: "2000",
      description: "Entered new markets and expanded product lines.",
    },
    {
      year: "2003",

      description: "First LED Lighting System Deployed",
    },
    {
      year: "2005",
      description: "Launched next-generation lighting solutions.",
    },
    {
      year: "2012",
      description: "Achieved major milestone in global installations.",
    },
    {
      year: "2014",
      description: "Introduced advanced energy-efficient systems.",
    },
    { year: "2015", description: "Expanded into new international regions." },
    {
      year: "2017",
      description: "Awarded for innovation in transit lighting.",
    },
    {
      year: "2019",
      description: "Surpassed one million LED drivers in service.",
    },
    {
      year: "2020",
      description: "Adapted to new industry standards and challenges.",
    },
    {
      year: "2025",
      description: "Vision for the future: continued growth and innovation.",
    },
  ];

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
      <div className="text-center pt-[50px] pb-[50px] sm:pb-[150px]">
        {/* Our Product Label */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-0.5 bg-[#000000]"></div>
          <span className="text-[#000000] text-[13px] font-bold uppercase tracking-widest mx-4">
            LED history
          </span>
          <div className="w-16 h-0.5 bg-[#000000]"></div>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl lg:text-6xl font-bold text-black uppercase leading-[60px] sm:leading-[80px]">
          TDG TRANSIT DESIGN <br /> GROUP HISTORY
        </h1>
      </div>
      <div className="max-w-[100%] mx-auto">
        {/* NEW UI - COLLAPSIBLE SECTIONS */}
        <motion.div
          className="flex flex-col lg:flex-row gap-8 lg:min-h-[1000px]"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Left - Train Image */}
          <motion.div className="flex-[1.1] flex" variants={itemVariants}>
            {/* <motion.img
              src="/images/about-us/history.jpg"
              alt="Modern train interior with LED lighting"
              className="rounded-[0px] w-full lg:h-[1000px] object-cover object-left-[100px]"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            /> */}
            <div className="bg-gray-200 rounded-[0px] w-full lg:h-[1000px] h-[300px] flex items-center justify-center">
              <span className="text-gray-500 font-bold text-xl"></span>
            </div>
          </motion.div>

          {/* Right - Collapsible Content */}
          <motion.div
            className="flex-1 flex flex-col justify-center sm:px-[30px]"
            variants={itemVariants}
          >
            {/* Debug info */}
            {/* <div className="mb-4 p-2 bg-gray-100 text-xs">
              Current expandedSection: {expandedSection || "null"}
            </div> */}
            {Object.entries(timeline).map(([key, section], index) => (
              <motion.div
                key={key}
                className="mb-2"
                variants={itemVariants}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Section Header */}
                <motion.button
                  onClick={() => {
                    const newExpandedSection =
                      expandedSection === key ? null : key;

                    setExpandedSection(newExpandedSection);
                  }}
                  className="w-full text-left flex items-center justify-between py-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.h3
                    className={`text-2xl lg:text-[25px] font-bold uppercase transition-colors duration-300 ${
                      expandedSection === key ? "text-[#0356C2]" : "text-black"
                    }`}
                    transition={{ duration: 0.2 }}
                  >
                    {section.year}
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
                      className="text-[black] leading-relaxed text-sm lg:text-[15px]"
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
                {index < Object.keys(timeline).length - 1 && (
                  <motion.div
                    className="border-t border-[black] my-2"
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

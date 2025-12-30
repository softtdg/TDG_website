"use client";
import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export const HistorySection = () => {
  const [expandedSection, setExpandedSection] = useState("railways");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Timeline data based on the provided image, with title and description for each year
  const timeline = [
    {
      year: "1989",
      title: "Company founded and began operations.",
      description:
        "TDG Transit Design Group was established with a vision to revolutionize transit lighting systems. Our founding marked the beginning of a journey dedicated to innovation and excellence in public transportation infrastructure.",
    },
    {
      year: "2000",
      title: "Entered new markets and expanded product lines.",
      description:
        "The new millennium brought significant expansion opportunities. We successfully entered multiple international markets and introduced a comprehensive range of lighting solutions tailored for various transit applications.",
    },
    {
      year: "2003",
      title: "First LED Lighting System Deployed",
      description:
        "This groundbreaking year saw the deployment of our first LED lighting system, marking a pivotal shift towards energy-efficient and sustainable lighting solutions in the transit industry.",
    },
    {
      year: "2005",
      title: "Launched next-generation lighting solutions.",
      description:
        "Our commitment to innovation led to the launch of advanced lighting technologies that set new industry standards for performance, reliability, and energy efficiency in transit environments.",
    },
    {
      year: "2012",
      title: "Achieved major milestone in global installations.",
      description:
        "We reached a significant milestone with installations spanning across multiple continents, solidifying our position as a global leader in transit lighting solutions.",
    },
    {
      year: "2014",
      title: "Introduced advanced energy-efficient systems.",
      description:
        "Our engineering team developed cutting-edge energy-efficient systems that reduced power consumption while maintaining superior lighting quality and reliability.",
    },
    {
      year: "2015",
      title: "Expanded into new international regions.",
      description:
        "Strategic expansion into new international markets strengthened our global presence and allowed us to serve transit agencies worldwide with our innovative solutions.",
    },
    {
      year: "2017",
      title: "Awarded for innovation in transit lighting.",
      description:
        "Our dedication to innovation and excellence was recognized with prestigious industry awards, highlighting our contributions to advancing transit lighting technology.",
    },
    {
      year: "2019",
      title: "Surpassed one million LED drivers in service.",
      description:
        "We achieved the remarkable milestone of over one million LED drivers deployed in service, demonstrating the trust and reliability that transit agencies place in our products.",
    },
    {
      year: "2020",
      title: "Adapted to new industry standards and challenges.",
      description:
        "Facing unprecedented global challenges, we adapted our operations and continued to deliver reliable solutions while meeting evolving industry standards and customer needs.",
    },
    {
      year: "2025",
      title: "Vision for the future: continued growth and innovation.",
      description:
        "Looking ahead, we remain committed to pushing the boundaries of transit lighting technology, with a focus on sustainability, smart systems, and continued innovation to shape the future of public transportation.",
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
      <div className="text-center pt-[20px] lg:pt-[50px] pb-[0px]">
        {/* Our Product Label */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[3px] text-[#2d4a86] mb-3">
            TDG TRANSIT DESIGN GROUP HISTORY
          </h2>
          <div className="h-1 w-20 bg-[#f4c806] mx-auto rounded-full"></div>
        </div>
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
                  className="w-full text-left flex items-center justify-between py-1 lg:py-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <motion.h3
                      className={`text-2xl lg:text-[25px] font-bold uppercase transition-colors duration-300 flex-shrink-0 ${
                        expandedSection === key
                          ? "text-[#0356C2]"
                          : "text-black"
                      }`}
                      transition={{ duration: 0.2 }}
                    >
                      {section.year}
                    </motion.h3>
                    {/* Title with right-to-left animation */}
                    <motion.div
                      className="overflow-hidden flex-1 min-w-0"
                      initial={false}
                      animate={{
                        opacity: expandedSection === key ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.span
                        className={`text-lg lg:text-[20px] font-semibold block whitespace-wrap ${
                          expandedSection === key
                            ? "text-[#0356C2]"
                            : "text-transparent"
                        }`}
                        initial={false}
                        animate={{
                          x: expandedSection === key ? 0 : 50,
                          opacity: expandedSection === key ? 1 : 0,
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        {section.title}
                      </motion.span>
                    </motion.div>
                  </div>
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
                      transition={{ duration: 0.3, delay: 0.2 }}
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

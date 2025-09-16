"use client";
import React, { useState } from "react";

export const TDGOfferingSection = () => {
  const [activeCategory, setActiveCategory] = useState("light-rail");

  const categories = {
    "light-rail": {
      title: "LIGHT RAIL",
      description:
        "Our lighting solutions are engineered specifically for light rail systems, ensuring reliable performance, energy efficiency, and compliance with the highest industry standards.",
      image: "/images/home/light-rail.jpg",
    },
    locomotive: {
      title: "LOCOMOTIVE",
      description:
        "Advanced lighting systems for locomotive applications, designed to withstand harsh operating conditions while providing optimal visibility and safety for railway operations.",
      image: "/images/home/light-rail.jpg",
    },
    commuter: {
      title: "COMMUTER",
      description:
        "Comprehensive lighting solutions for commuter rail systems, focusing on passenger comfort, safety, and energy efficiency for urban transportation networks.",
      image: "/images/home/light-rail.jpg",
    },
    "heavy-rail": {
      title: "HEAVY RAIL",
      description:
        "Robust lighting systems engineered for heavy rail applications, ensuring durability, reliability, and compliance with stringent safety standards for freight and passenger operations.",
      image: "/images/home/light-rail.jpg",
    },
  };

  return (
    <div className="w-full bg-white py-10 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1300px] mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Our Product Label */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-0.5 bg-[#000000]"></div>
            <span className="text-[#000000] text-[13px] font-bold uppercase tracking-widest mx-4">
              OUR PRODUCT
            </span>
            <div className="w-16 h-0.5 bg-[#000000]"></div>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl lg:text-6xl font-bold text-black uppercase">
            TDG OFFERING
          </h1>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-between gap-4 lg:gap-8 mb-12 border-b border-[#DBE2E7]">
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`relative sm:px-18 px-6 py-3 max-sm:w-full text-[18px] sm:text-[23px] font-bold uppercase transition-all duration-300 ${
                activeCategory === key
                  ? "text-black"
                  : "text-[#000000] hover:text-black"
              }`}
            >
              {category.title}
              {activeCategory === key && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F5E0AD] rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-8 lg:min-h-[500px]">
          {/* Left - Image */}
          <div className="flex-1">
            <img
              src={categories[activeCategory].image}
              alt={`${categories[activeCategory].title} lighting system`}
              className="w-full object-cover rounded-[30px]"
            />
          </div>

          {/* Right - Content */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="">
              {/* Category Title */}
              <h2 className="text-3xl lg:text-6xl font-bold text-black uppercase mb-6">
                {categories[activeCategory].title}
              </h2>

              {/* Description */}
              <p className="text-[#000000]  text-base lg:text-[15px] mb-8">
                {categories[activeCategory].description}
              </p>

              {/* Read More Button */}
              <button className="bg-[#DBE2E7] text-[13px] hover:bg-gray-300 text-[#000000] font-bold px-8 py-4 rounded-lg transition-colors duration-200 w-fit">
                READ MORE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

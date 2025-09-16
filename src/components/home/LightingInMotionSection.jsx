"use client";
import React, { useState } from "react";

export const LightingInMotionSection = () => {
  const [expandedSection, setExpandedSection] = useState("railways");

  const sections = {
    railways: {
      title: "RAILWAYS",
      description:
        "TDC offers customized and innovative solutions for both interior and exterior lighting systems for the global rail industry. With LED drivers in service since 1999 and an LED main lighting system in service since 2003, TDC has over 100,000 hours of actual in car performance from its systems. There are nearly one million TDC LED drivers in service globally in the rail industry.",
    },
    defense: {
      title: "DEFENSE",
      description:
        "Advanced lighting solutions for defense applications including military vehicles, aircraft, and specialized equipment. Our cutting-edge LED technology ensures reliability and performance in the most demanding environments.",
    },
    support: {
      title: "SUPPORT",
      description:
        "Comprehensive technical support and maintenance services for all our lighting systems. Our expert team provides 24/7 assistance to ensure optimal performance and minimal downtime for your operations.",
    },
  };

  return (
    <div className="w-full bg-white py-10 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1300px] mx-auto">
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
        <div className="flex flex-col lg:flex-row gap-8 lg:min-h-[775px]">
          {/* Left - Train Image */}
          <div className="flex-1 flex">
            <img
              src="/images/home/l2.jpg"
              alt="Modern train interior with LED lighting"
              className="rounded-[30px] w-full lg:h-[775px]"
            />
          </div>

          {/* Right - Collapsible Content */}
          <div className="flex-1 flex flex-col justify-center">
            {Object.entries(sections).map(([key, section], index) => (
              <div key={key} className="mb-6">
                {/* Section Header */}
                <button
                  onClick={() =>
                    setExpandedSection(expandedSection === key ? null : key)
                  }
                  className="w-full text-left flex items-center justify-between py-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                >
                  <h3 className="text-2xl lg:text-[60px] font-bold text-black uppercase">
                    {section.title}
                  </h3>
                  {/* <div className="ml-4">
                    <svg
                      className={`w-6 h-6 transform transition-transform duration-200 ${
                        expandedSection === key ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div> */}
                </button>

                {/* Collapsible Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedSection === key
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pb-4">
                    <p className="text-gray-700 leading-relaxed text-sm lg:text-[15px]">
                      {section.description}
                    </p>
                  </div>
                </div>

                {/* Separator Line */}
                {index < Object.keys(sections).length - 1 && (
                  <div className="border-t border-gray-300 my-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

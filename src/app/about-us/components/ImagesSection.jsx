"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react"; // nice icons

export const ImagesSection = () => {
  const panels = [
    {
      id: "smt",
      title: "SMT",
      description:
        "Surface Mount Technology solutions for advanced rail systems",
      image: "/images/about-us/i1.jpg",
      alt: "Modern light rail train with SMT technology",
    },
    {
      id: "standards",
      title: "STANDARDS",
      description: "Meeting global rail safety and performance standards",
      image: "/images/about-us/i2.jpg",
      alt: "High-speed train at station platform",
    },
    {
      id: "testing",
      title: "TESTING",
      description: "Comprehensive testing facilities for rail lighting systems",
      image: "/images/about-us/i3.jpg",
      alt: "Modern train interior with testing equipment",
    },
    {
      id: "testing2",
      title: "TESTING2",
      description: "Comprehensive testing facilities for rail lighting systems",
      image: "/images/about-us/i4.png",
      alt: "Modern train interior with testing equipment",
    },
  ];

  return (
    <div className="w-full bg-white py-16 sm:py-24">
      <div className="max-w-[100%] mx-auto relative">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-[23px] font-bold text-[#000000] uppercase mb-4">
            Vertical Integration
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {/* Panel 1 */}
          <div className="relative group h-[300px] lg:h-[533px] overflow-hidden">
            <img
              src="/images/about-us/i1.jpg"
              alt="Aerial view of manufacturing facility"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
              <div>
                <h3 className="text-white text-[15px] font-semibold uppercase mb-1 tracking-wide">
                  DECADES-READY, MULTI-SITE, TECHNOLOGY MANUFACTURING FACILITIES
                </h3>
                <p className="text-white text-xs font-medium opacity-80">
                  North America, Europe, Asia
                </p>
              </div>
            </div>
          </div>
          {/* Panel 2 */}
          <div className="relative group h-[300px] lg:h-[533px] overflow-hidden">
            <img
              src="/images/about-us/i2.jpg"
              alt="Interior of a modern train"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ filter: "brightness(0.7)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
              <div>
                <h3 className="text-white text-[15px] font-semibold uppercase mb-1 tracking-wide">
                  PCB MANUFACTURING AND ASSEMBLY
                </h3>
                <p className="text-white text-xs font-medium opacity-80">
                  In-house SMT lines, automated optical inspection, and
                  functional testing
                </p>
              </div>
            </div>
          </div>
          {/* Panel 3 */}
          <div className="relative group h-[300px] lg:h-[533px] overflow-hidden">
            <img
              src="/images/about-us/i3.jpg"
              alt="Train on elevated tracks in city"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
              <div>
                <h3 className="text-white text-[15px] font-semibold uppercase mb-1 tracking-wide">
                  FULL VERTICAL PART MANUFACTURING CAPABILITIES
                </h3>
                <p className="text-white text-xs font-medium opacity-80">
                  Plastics, metals, electronics, and final assembly
                </p>
              </div>
            </div>
          </div>
          {/* Panel 4 */}
          <div className="relative group h-[300px] lg:h-[533px] overflow-hidden">
            <img
              src="/images/about-us/i4.png"
              alt="Close-up of LED circuit boards"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
              <div>
                <h3 className="text-white text-[15px] font-semibold uppercase mb-1 tracking-wide">
                  MATERIAL SUPPLY CHAIN FOR ELECTRICAL COMPONENTS GLOBALLY
                </h3>
                <p className="text-white text-xs font-medium opacity-80">
                  Sourcing, logistics, and quality control for critical parts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

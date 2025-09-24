"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react"; // nice icons

export const OurWorldSection = () => {
  const panels = [
    {
      id: "smt",
      title: "SMT",
      description:
        "Surface Mount Technology solutions for advanced rail systems",
      image: "/images/home/u1.jpg",
      alt: "Modern light rail train with SMT technology",
    },
    {
      id: "standards",
      title: "STANDARDS",
      description: "Meeting global rail safety and performance standards",
      image: "/images/home/u2.jpg",
      alt: "High-speed train at station platform",
    },
    {
      id: "testing",
      title: "TESTING",
      description: "Comprehensive testing facilities for rail lighting systems",
      image: "/images/home/u3.jpg",
      alt: "Modern train interior with testing equipment",
    },
    {
      id: "testing2",
      title: "TESTING2",
      description: "Comprehensive testing facilities for rail lighting systems",
      image: "/images/home/u3.jpg",
      alt: "Modern train interior with testing equipment",
    },
    {
      id: "smt2",
      title: "SMT2",
      description:
        "Surface Mount Technology solutions for advanced rail systems",
      image: "/images/home/u1.jpg",
      alt: "Modern light rail train with SMT technology",
    },
    {
      id: "standards2",
      title: "STANDARDS2",
      description: "Meeting global rail safety and performance standards",
      image: "/images/home/u2.jpg",
      alt: "High-speed train at station platform",
    },
  ];

  return (
    <div className="w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-[50px]">
      <div className="max-w-[100%] mx-auto relative">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-6xl font-bold text-[#0E54C4] uppercase mb-4">
            OUR WORLD
          </h2>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 3 },
          }}
          navigation={{
            prevEl: ".prev-btn",
            nextEl: ".next-btn",
          }}
          className="relative"
        >
          {panels.map((panel) => (
            <SwiperSlide key={panel.id}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden transition-all duration-500">
                  {/* Image */}
                  <div className="relative h-[300px] lg:h-[700px] overflow-hidden">
                    <img
                      src={panel.image}
                      alt={panel.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
                <h3 className="text-[#000000] text-2xl lg:text-3xl text-center font-bold uppercase my-3">
                  {panel.title}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Prev / Next Transparent & Blur Buttons */}
        <button className="prev-btn absolute top-1/2 left-2 z-10 -translate-y-1/2 bg-white/20 backdrop-blur-md rounded-full p-3 hover:bg-white/40 transition">
          <ChevronLeft className="text-black w-6 h-6" />
        </button>
        <button className="next-btn absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-white/20 backdrop-blur-md rounded-full p-3 hover:bg-white/40 transition">
          <ChevronRight className="text-black w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

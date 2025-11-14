"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react"; // nice icons

export const OurWorldSection = () => {
  const router = useRouter();

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
      href: "/safety-standards",
    },
    {
      id: "testing",
      title: "TESTING",
      description: "Comprehensive testing facilities for rail lighting systems",
      image: "/images/home/u3.jpg",
      alt: "Modern train interior with testing equipment",
      href: "/testing",
    },

    {
      id: "Certification",
      title: "CERTIFICATION",
      description: "Certification for rail lighting systems",
      image: "/images/home/u4.jpg",
      alt: "Certification for rail lighting systems",
      href: "/safety-standards#certification",
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
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          loop
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
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
              <button
                type="button"
                onClick={() => panel.href && router.push(panel.href)}
                className="group block w-full cursor-pointer focus:outline-none"
              >
                <div className="relative group h-[300px] lg:h-[700px] overflow-hidden">
                  <img
                    src={panel.image}
                    alt={panel.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 group-hover:from-black/10 via-black/30 group-hover:via-black/10 to-transparent group-hover:bg-white/80 transition-all duration-700 flex flex-col justify-end group-hover:justify-end group-hover:pb-15 group-hover:items-center p-6">
                    <div className="transition-all duration-700 group-hover:text-center transform translate-y-0 group-hover:-translate-y-0">
                      <h3 className="text-white group-hover:text-black text-[16px] lg:text-[20px] font-bold uppercase mb-1 tracking-wide transition-all duration-700 transform translate-y-0 group-hover:-translate-y-4">
                        {panel.title}
                      </h3>
                      <p className="text-white group-hover:text-black text-[13px] font-semibold opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 max-h-0 group-hover:max-h-40 overflow-hidden transform translate-y-4 group-hover:translate-y-0">
                        {panel.description}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
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

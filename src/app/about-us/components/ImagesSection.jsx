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
      id: "facilities",
      title: "DECADES-READY, MULTI-SITE, TECHNOLOGY MANUFACTURING FACILITIES",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi vero accusantium perferendis! Illo omnis cumque quod aliquam, voluptas officia hic unde eligendi fuga pariatur aut sed? Ab expedita a voluptatibus.",
      image: "/images/about-us/i1.jpg",
      alt: "Aerial view of manufacturing facility",
      hasBrightnessFilter: false,
    },
    {
      id: "pcb",
      title: "PCB MANUFACTURING AND ASSEMBLY",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi vero accusantium perferendis! Illo omnis cumque quod aliquam, voluptas officia hic unde eligendi fuga pariatur aut sed? Ab expedita a voluptatibus.",
      image: "/images/about-us/i2.jpg",
      alt: "Interior of a modern train",
      hasBrightnessFilter: true,
    },
    {
      id: "manufacturing",
      title: "FULL VERTICAL PART MANUFACTURING CAPABILITIES",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi vero accusantium perferendis! Illo omnis cumque quod aliquam, voluptas officia hic unde eligendi fuga pariatur aut sed? Ab expedita a voluptatibus.",
      image: "/images/about-us/i3.jpg",
      alt: "Train on elevated tracks in city",
      hasBrightnessFilter: false,
    },
    {
      id: "supply-chain",
      title: "MATERIAL SUPPLY CHAIN FOR ELECTRICAL COMPONENTS GLOBALLY",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi vero accusantium perferendis! Illo omnis cumque quod aliquam, voluptas officia hic unde eligendi fuga pariatur aut sed? Ab expedita a voluptatibus.",
      image: "/images/about-us/i4.png",
      alt: "Close-up of LED circuit boards",
      hasBrightnessFilter: false,
    },
    {
      id: "supply-chain2",
      title: "MATERIAL SUPPLY CHAIN FOR ELECTRICAL COMPONENTS GLOBALLY",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi vero accusantium perferendis! Illo omnis cumque quod aliquam, voluptas officia hic unde eligendi fuga pariatur aut sed? Ab expedita a voluptatibus.",
      image: "/images/about-us/i4.png",
      alt: "Close-up of LED circuit boards",
      hasBrightnessFilter: false,
    },
  ];

  return (
    <div className="w-full bg-white py-16 sm:py-24">
      <div className="max-w-[100%] mx-auto relative px-[8px]">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-[23px] font-bold text-[#000000] uppercase mb-4">
            Vertical Integration
          </h2>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={8}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
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
                <div className="relative group h-[300px] lg:h-[533px] overflow-hidden">
                  <img
                    src={panel.image}
                    alt={panel.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={
                      panel.hasBrightnessFilter
                        ? { filter: "brightness(0.7)" }
                        : {}
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 group-hover:from-black/10 via-black/30 group-hover:via-black/10 to-transparent group-hover:bg-white/80 transition-all duration-700 flex flex-col justify-end group-hover:justify-end group-hover:pb-15 group-hover:items-center p-6">
                    <div className="transition-all duration-700 group-hover:text-center transform translate-y-0 group-hover:-translate-y-0">
                      <h3 className="text-white group-hover:text-black text-[16px] font-bold uppercase mb-1 tracking-wide transition-all duration-700 transform translate-y-0 group-hover:-translate-y-4">
                        {panel.title}
                      </h3>
                      <p className="text-white group-hover:text-black text-[13px] font-semibold opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 max-h-0 group-hover:max-h-40 overflow-hidden transform translate-y-4 group-hover:translate-y-0">
                        {panel.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Prev / Next Transparent & Blur Buttons */}
        <button className="prev-btn absolute top-1/2 left-3 z-10 -translate-y-1/2 bg-white/30 backdrop-blur-md rounded-full p-3 hover:bg-white/40 transition">
          <ChevronLeft className="text-black w-6 h-6" />
        </button>
        <button className="next-btn absolute top-1/2 right-3 z-10 -translate-y-1/2 bg-white/30 backdrop-blur-md rounded-full p-3 hover:bg-white/40 transition">
          <ChevronRight className="text-black w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

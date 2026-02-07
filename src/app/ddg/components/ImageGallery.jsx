"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const ImageGallery = () => {
    const images = [
        {
            id: "naval",
            title: "NAVAL OPERATIONS",
            description:
                "Advanced maritime defence solutions including shipboard systems, radar integration, and naval command infrastructure designed for blue-water operations.",
            image: "/images/ddg/USCGC_Polar_Sea_WAGB_11-small.jpg",
            alt: "Naval Defence System",
        },
        {
            id: "mission",
            title: "MISSION SYSTEMS",
            description:
                "Mission-critical defence technology engineered for operational excellence and national security requirements across land, sea, and air domains.",
            image: "/images/ddg/cvvl7q6gna691.jpg",
            alt: "Defence Technology",
        },
        {
            id: "engineering",
            title: "PRECISION ENGINEERING",
            description:
                "Advanced manufacturing and engineering capabilities ensuring every defence system meets the highest standards of quality, reliability, and performance.",
            image: "/images/ddg/Din Machine 3.jpg",
            alt: "Advanced Machinery",
        },
        {
            id: "maritime",
            title: "MARITIME DEFENCE",
            description:
                "Comprehensive maritime defence systems providing superior protection and operational capabilities for naval forces worldwide.",
            image: "/images/ddg/AdobeStock_51700385.jpeg",
            alt: "Maritime Defence",
        },
        {
            id: "command",
            title: "COMMAND CENTERS",
            description:
                "Integrated command centers with real-time situational awareness, secure communications, and advanced decision support systems.",
            image: "/images/ddg/AdobeStock_401090356_Editorial_Use_Only.jpeg",
            alt: "Command Center",
        },
        {
            id: "ground",
            title: "GROUND SYSTEMS",
            description:
                "Comprehensive ground-based defence infrastructure including mobile command posts, field communications, and tactical operations centers.",
            image: "/images/ddg/AdobeStock_1581302549_Editorial_Use_Only.jpeg",
            alt: "Ground Systems",
        },
    ];

    return (
        <div className="w-full bg-white py-16 px-[8px]">
            <div className="max-w-[100%] mx-auto relative">
                {/* Section Title */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[3px] text-[#2d4a86] mb-3">
                        DEFENCE SYSTEMS IN ACTION
                    </h2>
                    <div className="h-1 w-20 bg-[#f4c806] mx-auto rounded-full"></div>
                </div>
                <div className="relative">
                    {/* Swiper Carousel */}
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={8}
                        slidesPerView={1}
                        loop
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            1024: { slidesPerView: 4 },
                        }}
                        navigation={{
                            prevEl: ".prev-btn",
                            nextEl: ".next-btn",
                        }}
                        className="relative"
                    >
                        {images.map((image) => (
                            <SwiperSlide key={image.id}>
                                <button
                                    type="button"
                                    className="group block w-full cursor-pointer focus:outline-none"
                                >
                                    <div className="relative group h-[300px] lg:h-[450px] overflow-hidden">
                                        <Image
                                            src={image.image}
                                            alt={image.alt}
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 25vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            quality={85}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 group-hover:from-black/10 via-black/30 group-hover:via-black/10 to-transparent group-hover:bg-white/80 transition-all duration-700 flex flex-col justify-end group-hover:justify-end group-hover:pb-15 group-hover:items-center p-6">
                                            <div className="transition-all duration-700 group-hover:text-center transform translate-y-0 group-hover:-translate-y-0">
                                                <h3 className="text-white group-hover:text-black text-[16px] lg:text-[20px] font-bold uppercase mb-1 tracking-wide transition-all duration-700 transform translate-y-0 group-hover:-translate-y-4">
                                                    {image.title}
                                                </h3>
                                                <p className="text-white group-hover:text-black text-[13px] font-semibold opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 max-h-0 group-hover:max-h-40 overflow-hidden transform translate-y-4 group-hover:translate-y-0">
                                                    {image.description}
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
                        <ChevronLeft className="text-white w-6 h-6" />
                    </button>
                    <button className="next-btn absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-white/20 backdrop-blur-md rounded-full p-3 hover:bg-white/40 transition">
                        <ChevronRight className="text-white w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

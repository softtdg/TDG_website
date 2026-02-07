"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export const CapabilitiesSection = () => {
    const [selectedCapability, setSelectedCapability] = useState(null);

    const capabilities = [
        {
            id: "naval",
            title: "NAVAL DEFENCE SYSTEMS",
            description: "Advanced maritime defence solutions including shipboard systems, radar integration, and naval command infrastructure designed for blue-water operations.",
            image: "/images/ddg/AdobeStock_51700385.jpeg",
            alt: "Naval Defence Systems",
            features: [
                "Shipboard combat systems",
                "Radar integration",
                "Naval command infrastructure",
                "Blue-water operations",
            ],
            stats: {
                range: "500+ km",
                uptime: "99.9%",
            },
        },
        {
            id: "command",
            title: "COMMAND & CONTROL",
            description: "Integrated command centers with real-time situational awareness, secure communications, and advanced decision support systems for mission-critical operations.",
            image: "/images/ddg/AdobeStock_401090356_Editorial_Use_Only.jpeg",
            alt: "Command & Control Systems",
            features: [
                "Real-time situational awareness",
                "Secure communications",
                "Decision support systems",
                "Mission-critical operations",
            ],
            stats: {
                response: "< 0.5s",
                reliability: "99.9%",
            },
        },
        {
            id: "ground",
            title: "GROUND SYSTEMS",
            description: "Comprehensive ground-based defence infrastructure including mobile command posts, field communications, and tactical operations centers.",
            image: "/images/ddg/AdobeStock_1581302549_Editorial_Use_Only.jpeg",
            alt: "Ground Defence Systems",
            features: [
                "Mobile command posts",
                "Field communications",
                "Tactical operations centers",
                "Rugged deployment",
            ],
            stats: {
                mobility: "24/7",
                coverage: "360°",
            },
        },
        {
            id: "technology",
            title: "ADVANCED TECHNOLOGY",
            description: "Cutting-edge defence technology including AI-powered systems, advanced sensors, and next-generation communication protocols for superior operational capability.",
            image: "/images/ddg/AdobeStock_250559627.jpeg",
            alt: "Advanced Defence Technology",
            features: [
                "AI-powered systems",
                "Advanced sensors",
                "Next-gen communications",
                "Superior capability",
            ],
            stats: {
                ai: "Real-time",
                "encryption": "256-bit",
            },
        },
        {
            id: "radar",
            title: "RADAR SYSTEMS",
            description: "State-of-the-art radar technology with enhanced detection capabilities and multi-target tracking for superior situational awareness across all domains.",
            image: "/images/ddg/cvvl7q6gna691.jpg",
            alt: "Radar Systems",
            features: [
                "Enhanced detection",
                "Multi-target tracking",
                "All-weather operation",
                "Superior awareness",
            ],
            stats: {
                detection: "99.9%",
                range: "500+ km",
            },
        },
        {
            id: "engineering",
            title: "PRECISION ENGINEERING",
            description: "Advanced manufacturing and engineering capabilities ensuring every defence system meets the highest standards of quality, reliability, and performance.",
            image: "/images/ddg/Din Machine 3.jpg",
            alt: "Precision Engineering",
            features: [
                "ISO 9001 certified",
                "Quality assurance",
                "Reliability testing",
                "Performance optimization",
            ],
            stats: {
                quality: "ISO 9001",
                uptime: "99.9%",
            },
        },
    ];

    return (
        <section className="pt-20 sm:pt-24 pb-14 bg-gradient-to-b from-white via-[#F5F7FA] to-white">
            <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold uppercase tracking-[3px] text-[#2d4a86] mb-4">
                        COMPREHENSIVE DEFENCE SOLUTIONS
                    </h2>
                    <div className="h-1 w-24 bg-[#f4c806] mx-auto rounded-full mb-6"></div>
                    <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                        Delivering mission-critical defence systems across multiple domains with proven reliability and advanced technology.
                    </p>
                </motion.div>

                {/* Capabilities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {capabilities.map((capability, index) => (
                        <motion.div
                            key={capability.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#DBE2E7] cursor-pointer"
                            onClick={() => setSelectedCapability(capability)}
                        >
                            {/* Image */}
                            <div className="relative h-[300px] lg:h-[350px] overflow-hidden">
                                <Image
                                    src={capability.image}
                                    alt={capability.alt}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    quality={90}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#101828]/90 via-[#101828]/50 to-transparent"></div>

                                {/* Stats Badge */}
                                <div className="absolute top-4 right-4 bg-[#f4c806]/90 backdrop-blur-sm px-3 py-1.5 rounded">
                                    <div className="text-white text-xs font-bold uppercase">
                                        {Object.values(capability.stats)[0]}
                                    </div>
                                </div>

                                {/* Title Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="text-white font-bold text-xl lg:text-2xl uppercase tracking-wide mb-2">
                                        {capability.title}
                                    </h3>
                                    <div className="h-1 w-12 bg-[#f4c806] rounded-full"></div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <p className="text-gray-600 leading-relaxed mb-4 text-sm lg:text-base">
                                    {capability.description}
                                </p>

                                {/* Features List */}
                                <div className="space-y-2 mb-4">
                                    {capability.features.slice(0, 3).map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-[#f4c806] rounded-full flex-shrink-0"></div>
                                            <span className="text-xs lg:text-sm text-gray-600">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Stats Row */}
                                <div className="flex items-center justify-between pt-4 border-t border-[#DBE2E7]">
                                    {Object.entries(capability.stats).map(([key, value], idx) => (
                                        <div key={idx} className="text-center">
                                            <div className="text-lg font-bold text-[#2d4a86]">{value}</div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wider">{key}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Hover Accent */}
                            <div className="absolute inset-0 border-2 border-[#f4c806] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Detailed Modal */}
            <AnimatePresence>
                {selectedCapability && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
                        onClick={() => setSelectedCapability(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-5xl w-full bg-white rounded-lg overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Image */}
                            <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
                                <Image
                                    src={selectedCapability.image}
                                    alt={selectedCapability.alt}
                                    fill
                                    className="object-cover"
                                    quality={95}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#101828]/80 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <h3 className="text-white font-bold text-3xl lg:text-4xl uppercase tracking-wide mb-2">
                                        {selectedCapability.title}
                                    </h3>
                                    <div className="h-1 w-16 bg-[#f4c806] rounded-full"></div>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8">
                                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                    {selectedCapability.description}
                                </p>

                                {/* Features Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    {selectedCapability.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-3 p-4 bg-[#F5F7FA] rounded-lg">
                                            <div className="w-2 h-2 bg-[#f4c806] rounded-full mt-1.5 flex-shrink-0"></div>
                                            <span className="text-gray-700 font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#DBE2E7]">
                                    {Object.entries(selectedCapability.stats).map(([key, value], idx) => (
                                        <div key={idx} className="text-center p-4 bg-gradient-to-br from-[#2d4a86]/10 to-white rounded-lg">
                                            <div className="text-3xl font-bold text-[#2d4a86] mb-1">{value}</div>
                                            <div className="text-sm text-gray-600 uppercase tracking-wider">{key}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedCapability(null)}
                                className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center text-[#101828] transition-colors shadow-lg"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const TechnologySection = () => {
    const technologies = [
        {
            title: "Advanced Radar Systems",
            description:
                "State-of-the-art radar technology with enhanced detection capabilities and multi-target tracking for superior situational awareness.",
            specs: [
                "Multi-target tracking",
                "Enhanced detection range",
                "All-weather operation",
            ],
        },
        {
            title: "Secure Communications",
            description:
                "Military-grade encrypted communication systems ensuring secure data transmission and command coordination in all operational environments.",
            specs: [
                "256-bit encryption",
                "Real-time coordination",
                "Multi-channel support",
            ],
        },
        {
            title: "Integrated Sensor Networks",
            description:
                "Comprehensive sensor integration providing real-time intelligence, surveillance, and reconnaissance capabilities across all domains.",
            specs: [
                "24/7 monitoring",
                "Multi-domain coverage",
                "Real-time intelligence",
            ],
        },
        {
            title: "AI-Powered Analytics",
            description:
                "Artificial intelligence and machine learning systems for predictive analysis, threat assessment, and automated decision support.",
            specs: [
                "Predictive analysis",
                "Threat assessment",
                "Automated decisions",
            ],
        },
    ];

    return (
        <section className="py-10 sm:py-14  bg-gradient-to-b from-white to-[#F5F7FA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold uppercase tracking-[3px] text-[#2d4a86] mb-4">
                        CUTTING-EDGE TECHNOLOGY
                    </h2>
                    <div className="h-1 w-24 bg-[#f4c806] mx-auto rounded-full mb-6"></div>
                    <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                        Our defence systems leverage the latest advancements in technology
                        to deliver superior performance, reliability, and operational effectiveness.
                    </p>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {/* Technology Cards - 2 columns */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {technologies.map((tech, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white border border-[#DBE2E7] p-6 hover:shadow-lg transition-shadow"
                            >
                                {/* Title */}
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="w-1 h-12 bg-[#2d4a86]"></div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-[#2d4a86] mb-2">
                                            {tech.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    {tech.description}
                                </p>

                                {/* Specs List */}
                                <div className="space-y-2">
                                    {tech.specs.map((spec, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-[#f4c806] rounded-full"></div>
                                            <span className="text-xs text-gray-600">{spec}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Image Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-1"
                    >
                        <div className="relative h-full min-h-[500px] bg-[#101828] border-2 border-[#2d4a86] overflow-hidden">
                            <Image
                                src="/images/ddg/Din Machine 3.jpg"
                                alt="Advanced Defence Technology"
                                fill
                                className="object-cover opacity-80"
                                quality={90}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#101828]/60 to-[#101828]/90"></div>

                            {/* Overlay Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-6">
                                <div className="border-l-4 border-[#f4c806] pl-4">
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        Precision Engineering
                                    </h3>
                                    <p className="text-white/80 text-sm leading-relaxed">
                                        Advanced manufacturing capabilities ensuring the highest standards of quality and reliability.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Technical Specifications Bar */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-[#101828] border-t-4 border-[#f4c806] p-8"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { label: "Detection Range", value: "500+ km" },
                            { label: "Response Time", value: "< 0.5s" },
                            { label: "Uptime", value: "99.9%" },
                            { label: "Certification", value: "ISO 9001" },
                        ].map((spec, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl font-bold text-[#f4c806] mb-2">{spec.value}</div>
                                <div className="text-sm text-white/70 uppercase tracking-wider">{spec.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div> */}
            </div>
        </section>
    );
};

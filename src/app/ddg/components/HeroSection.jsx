"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const HeroSection = () => {
    return (
        <div className="relative w-full h-[80vh] min-h-[500px] max-h-[800px]">
            {/* Background Image with TDG Style Overlay */}
            <div className="absolute inset-0">
                <Image
                    src="/images/ddg/USCGC_Polar_Sea_WAGB_11-small.jpg"
                    alt="DDG Defence Systems"
                    fill
                    className="bg-bottom bg-no-repeat"
                    priority
                    quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#101828]/85 via-[#101828]/75 to-[#101828]/90"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl sm:text-5xl lg:text-7xl font-medium text-white mb-6 tracking-[3px] uppercase"
                    >
                        DDG DEFENCE SYSTEMS
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed"
                    >
                        Cutting-edge defence technology solutions engineered for mission-critical
                        operations and national security excellence.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        <div className="px-6 py-3 bg-[#2d4a86]/40 backdrop-blur-sm border border-[#2d4a86]/60 rounded">
                            <span className="text-white text-sm font-semibold uppercase tracking-wider">
                                Mission-Ready Solutions
                            </span>
                        </div>
                        <div className="px-6 py-3 bg-[#2d4a86]/40 backdrop-blur-sm border border-[#2d4a86]/60 rounded">
                            <span className="text-white text-sm font-semibold uppercase tracking-wider">
                                Advanced Technology
                            </span>
                        </div>
                        <div className="px-6 py-3 bg-[#2d4a86]/40 backdrop-blur-sm border border-[#2d4a86]/60 rounded">
                            <span className="text-white text-sm font-semibold uppercase tracking-wider">
                                Proven Reliability
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};


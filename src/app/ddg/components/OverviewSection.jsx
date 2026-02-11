"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const OverviewSection = () => {
    const capabilities = [
        "Naval Defence Systems",
        "Command & Control Centers",
        "Ground Operations Infrastructure",
        "Airborne Defence Platforms",
        "Integrated Sensor Networks",
        "Cybersecurity Solutions",
    ];

    return (
        <section id="defence-systems-excellence" className="pt-20 sm:pt-24">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-[#153f79] tracking-[3px]">
                        <span className="text-[#101828]">DEFENCE SYSTEMS</span>{" "}
                        <span className="text-[#153f79]">EXCELLENCE</span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-4">
                        DDG Defence Systems represents the pinnacle of military technology and engineering excellence.
                        Our comprehensive solutions meet the most demanding operational requirements of modern armed forces worldwide.
                    </p>
                    <div className="h-1 w-24 bg-[#e76423] mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-5">
                    {/* Main Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2 relative h-[400px] lg:h-[600px] overflow-hidden shadow-2xl"
                    >
                        <Image
                            src="/images/ddg/cvvl7q6gna691.jpg"
                            alt="Defence Systems Technology"
                            fill
                            className="object-cover"
                            quality={90}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#101828]/70 via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                                Mission-Critical Technology
                            </h3>
                            <p className="text-white/90 text-lg">
                                Engineered for operational excellence and national security
                            </p>
                        </div>
                    </motion.div>

                    {/* Stats & Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <div className="bg-white p-6 shadow-lg border-l-4 border-[#153f79]">
                            <div className="text-5xl font-bold text-[#153f79] mb-2">25+</div>
                            <div className="text-sm text-gray-600 font-semibold uppercase tracking-wider">Years Experience</div>
                        </div>
                        <div className="bg-white p-6 shadow-lg border-l-4 border-[#e76423]">
                            <div className="text-5xl font-bold text-[#153f79] mb-2">50+</div>
                            <div className="text-sm text-gray-600 font-semibold uppercase tracking-wider">Active Projects</div>
                        </div>
                        <div className="bg-white p-6 shadow-lg border-l-4 border-[#153f79]">
                            <div className="text-5xl font-bold text-[#153f79] mb-2">100+</div>
                            <div className="text-sm text-gray-600 font-semibold uppercase tracking-wider">Countries Served</div>
                        </div>
                    </motion.div>
                </div>

                {/* Capabilities Grid */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="text-2xl font-bold text-[#153f79] mb-6 text-center">Core Capabilities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {capabilities.map((capability, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="bg-white p-4 border border-[#DBE2E7] hover:border-[#153f79] hover:shadow-md transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-[#f4c806] rounded-full"></div>
                                    <span className="text-gray-700 font-medium text-sm">{capability}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div> */}
            </div>
        </section>
    );
};


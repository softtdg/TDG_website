"use client";
import React from "react";
import Image from "next/image";

export const DDGFooter = () => {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerHeight = 69;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <footer id="contact" className="bg-[#101828] text-white">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Logo & Description */}
                    <div className="lg:col-span-1">
                        <div className="mb-4">
                            <img
                                src="/images/ddg/DDG Logo Final (Building Sign) W.png"
                                alt="DDG Logo"
                                className="h-12 w-auto"
                            />
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            Cutting-edge defence technology solutions engineered for mission-critical operations and national security excellence.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold text-base uppercase tracking-wider mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <button
                                    onClick={() => scrollToSection("home")}
                                    className="text-gray-400 hover:text-white text-sm transition-colors text-left"
                                >
                                    Home
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection("defence-systems-excellence")}
                                    className="text-gray-400 hover:text-white text-sm transition-colors text-left"
                                >
                                    Defence Systems Excellence
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection("comprehensive-defence-solutions")}
                                    className="text-gray-400 hover:text-white text-sm transition-colors text-left"
                                >
                                    Comprehensive Defence Solutions
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h3 className="text-white font-semibold text-base uppercase tracking-wider mb-4">
                            Contact Us
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <svg
                                    className="w-5 h-5 text-[#e76423] mt-0.5 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                                <a
                                    href="tel:+1234567890"
                                    className="text-gray-400 hover:text-white text-sm transition-colors"
                                >
                                    +1 (234) 567-890
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg
                                    className="w-5 h-5 text-[#e76423] mt-0.5 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                <a
                                    href="mailto:info@ddgdesigngroup.com"
                                    className="text-gray-400 hover:text-white text-sm transition-colors"
                                >
                                    info@ddgdesigngroup.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 mt-12 pt-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm text-center sm:text-left">
                            © {new Date().getFullYear()} DDG Design Group. All rights reserved.
                        </p>
                        <div className="flex items-center gap-4">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Privacy Policy
                            </a>
                            <span className="text-gray-600">|</span>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};


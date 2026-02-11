"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function DDGLayout({ children }) {
    const router = useRouter();

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerHeight = 69; // Match the pt-[69px] padding
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="ddg-layout">
            {/* Custom DDG Header - TDG Style */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[white] border-b border-[#DBE2E7] shadow-lg">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 sm:h-17">
                        {/* Left: Back Button + DDG Logo */}
                        <div className="flex items-center gap-3 sm:gap-4">
                            <button
                                onClick={() => router.push("/")}
                                className="flex items-center gap-2"
                            >
                                <img
                                    src="/images/ddg/DDG Logo Final (Building Sign).png"
                                    alt="DDG Logo"
                                    className="h-10 sm:h-14 w-auto hover:opacity-90 transition-opacity cursor-pointer"
                                />
                            </button>
                        </div>

                        {/* Right: Navigation Links */}
                        <nav className="flex items-center gap-4 sm:gap-8">
                            <button
                                onClick={() => scrollToSection("home")}
                                className="text-sm text-[#627084] hover:text-[#153f79] transition-colors"
                            >
                                Home
                            </button>
                            <button
                                onClick={() => scrollToSection("defence-systems-excellence")}
                                className="text-sm text-[#627084] hover:text-[#153f79] transition-colors"
                            >
                                Excellence
                            </button>
                            <button
                                onClick={() => scrollToSection("comprehensive-defence-solutions")}
                                className="text-sm text-[#627084] hover:text-[#153f79] transition-colors"
                            >
                                Solutions
                            </button>
                            <button
                                onClick={() => scrollToSection("contact")}
                                className="px-6 py-3 bg-[#e76423] text-white text-sm rounded hover:bg-[#d55a1f] transition-colors"
                            >
                                Get in Touch
                            </button>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Content with top padding for fixed header */}
            <div className="pt-[69px]">
                {children}
            </div>
        </div>
    );
}


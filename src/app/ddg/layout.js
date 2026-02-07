"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function DDGLayout({ children }) {
    const router = useRouter();

    return (
        <div className="ddg-layout">
            {/* Custom DDG Header - TDG Style */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#101828]/95 backdrop-blur-lg border-b border-[#DBE2E7] shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 sm:h-20">
                        {/* Left: Back Button + DDG Logo */}
                        <div className="flex items-center gap-3 sm:gap-4">
                            <button
                                onClick={() => router.push("/")}
                                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                                aria-label="Back to home"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                                <span className="hidden sm:inline text-xs font-medium uppercase tracking-wider">Home</span>
                            </button>
                            <div className="h-4 w-px bg-white/20"></div>
                            <button
                                onClick={() => router.push("/")}
                                className="flex items-center gap-2"
                            >
                                <img
                                    src="/images/ddg/DDG B Logo White.png"
                                    alt="DDG Logo"
                                    className="h-10 sm:h-14 w-auto hover:opacity-90 transition-opacity cursor-pointer"
                                />
                            </button>
                            <div className="hidden md:block h-6 w-px bg-white/20 ml-2"></div>
                            <h1 className="hidden md:block text-sm sm:text-base font-bold text-white uppercase tracking-[3px] ml-2">
                                DEFENCE SYSTEMS
                            </h1>
                        </div>

                        {/* Right: Status Badge */}
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#2d4a86]/30 border border-[#2d4a86]/50 rounded">
                            <div className="w-2 h-2 bg-[#f4c806] rounded-full"></div>
                            <span className="text-white text-xs font-semibold uppercase tracking-wider hidden sm:inline">
                                OPERATIONAL
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content with top padding for fixed header */}
            <div className="pt-[80px]">
                {children}
            </div>
        </div>
    );
}


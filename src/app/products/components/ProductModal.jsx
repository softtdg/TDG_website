"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

// Helper function to create slug from product name
const createSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export const ProductModal = ({ cardTitle, products, onClose }) => {
  const handleProductClick = (product, category) => {
    const slug = createSlug(product.name);
    const url = `/products/${slug}?category=${encodeURIComponent(category)}`;
    window.open(url, "_blank");
  };
  useEffect(() => {
    // Save current scroll position
    const scrollY = window.scrollY;

    // Get current styles
    const originalBodyOverflow = document.body.style.overflow;
    // const originalBodyPosition = document.body.style.position;
    // const originalBodyTop = document.body.style.top;
    // const originalHtmlOverflow = document.documentElement.style.overflow;

    // Disable scrolling on body and html
    document.body.style.overflow = "hidden";
    // document.body.style.position = "fixed";
    // document.body.style.top = `-${scrollY}px`;
    // document.body.style.width = "100%";
    // document.documentElement.style.overflow = "hidden";

    return () => {
      // Restore original styles
      document.body.style.overflow = originalBodyOverflow;
      // document.body.style.position = originalBodyPosition;
      // document.body.style.top = originalBodyTop;
      // document.body.style.width = "";
      // document.documentElement.style.overflow = originalHtmlOverflow;

      // Restore scroll position
    };
  }, []);
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-0 sm:px-4 py-0 sm:py-6 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative bg-white shadow-2xl w-full h-full sm:max-w-[1300px] sm:w-full sm:max-h-[95vh] sm:h-auto overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute text-[22px] z-50 right-4 top-4 sm:right-6 sm:top-6 inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/90 hover:text-[#111827]"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0356C2] via-[#0E54C4] to-[#0356C2] px-4 py-4 sm:px-8 sm:py-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-wide">
            {cardTitle}
          </h2>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto h-[calc(100vh-120px)] sm:max-h-[calc(95vh-120px)] px-4 py-6 sm:px-6 sm:py-8">
          <div className="flex flex-col gap-6">
            {products.map((product, index) => (
              <motion.div
                key={index}
                onClick={() => handleProductClick(product, cardTitle)}
                className="group bg-gray-50 overflow-hidden border border-gray-200 transition-all duration-300 cursor-pointer gap-6 flex flex-col md:flex-row relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
              >
                {/* Hover overlay indicator */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-[#0E54C4] text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <span className="text-sm font-semibold">View Details</span>
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Product Image */}
                <div className="relative w-full md:w-[400px] h-[250px] sm:h-[300px] overflow-hidden bg-gray-200 flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4 sm:p-6 flex-1 relative">
                  <h3 className="text-xl md:text-2xl font-bold text-[#111827] mb-3 group-hover:text-[#0E54C4] transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-base md:text-[17px] leading-relaxed text-[#4B5563]">
                    {product.description}
                  </p>
                  {/* Click indicator arrow */}
                  <div className="mt-4 flex items-center text-[#0E54C4]  transition-opacity duration-300">
                    <span className="text-sm font-medium mr-2">
                      Click to explore
                    </span>
                    <svg
                      className="w-5 h-5 animate-pulse"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

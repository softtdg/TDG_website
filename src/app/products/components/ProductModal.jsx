"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

export const ProductModal = ({
  cardTitle,
  products,
  onClose,
  onProductClick,
}) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative bg-white shadow-2xl max-w-[1500px] w-full max-h-[95vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute z-50 bg-black/85 right-6 top-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/90 hover:text-[#111827]"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0356C2] via-[#0E54C4] to-[#0356C2] px-8 py-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide">
            {cardTitle}
          </h2>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-120px)] px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={index}
                onClick={() => onProductClick(product, cardTitle)}
                className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Product Image */}
                <div className="relative w-full h-64 overflow-hidden bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-[#111827] mb-3">
                    {product.name}
                  </h3>
                  <p className="text-base md:text-[17px] leading-relaxed text-[#4B5563]">
                    {product.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

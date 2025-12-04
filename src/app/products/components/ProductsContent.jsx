"use client";

/**
 * PRODUCT 3D MODEL FILE FORMAT REQUIREMENTS:
 *
 * Request from the company: GLTF (.gltf) or GLB (.glb) format files
 *
 * Why these formats?
 * - GLTF/GLB are optimized for web performance
 * - Small file sizes (GLB is binary, even smaller)
 * - Support materials, textures, and animations
 * - Industry standard for web-based 3D models
 * - Excellent support in Three.js and React Three Fiber
 *
 * Alternative formats (if GLTF/GLB not available):
 * - OBJ + MTL (older format, needs conversion)
 * - FBX (requires conversion to GLTF/GLB)
 * - STL (mainly for 3D printing, limited material support)
 *
 * File placement: Place 3D model files in /public/models/ directory
 * Example: /public/models/headlight-hl3000.glb
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductModal } from "./ProductModal";
import { ProductDetailModal } from "./ProductDetailModal";
import {
  productData,
  productSections,
  introductionText,
} from "../consant/productsConstants";

export const ProductsContent = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCardClick = (cardTitle) => {
    setSelectedCard(cardTitle);
    setSelectedProduct(null);
  };

  const handleProductClick = (product, cardTitle) => {
    setSelectedProduct({ ...product, category: cardTitle });
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
    setSelectedProduct(null);
  };

  const handleCloseProductModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-16 ">
        {/* Introduction Paragraph */}
        <motion.div
          className="mb-12 md:mb-16 mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-base sm:text-lg md:text-[21px] leading-relaxed text-[#111827]">
            {introductionText}
          </p>
        </motion.div>

        {/* Product Sections */}
        {productSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            className="mb-20 md:mb-24"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: sectionIndex * 0.2 }}
          >
            {/* Section Title Banner */}
            <div className="mb-8">
              <div className="relative bg-gradient-to-r from-[#E6F2FF] via-[#D0E7FF] to-[#E6F2FF] py-6 px-6 shadow-sm border-l-4 border-[#0356C2]">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#111827] uppercase tracking-wide text-center">
                  {section.title}
                </h3>
              </div>
            </div>

            {/* Cards Grid */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 ${
                section.items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
              }`}
            >
              {section.items.map((item, itemIndex) => (
                <motion.div
                  key={itemIndex}
                  onClick={() => handleCardClick(item.title)}
                  className="bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: sectionIndex * 0.2 + itemIndex * 0.1,
                  }}
                  whileHover={{ y: -5 }}
                >
                  {/* Image */}
                  <div className="relative w-full h-48 md:h-56 overflow-hidden bg-gray-200">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h4 className="text-xl md:text-2xl font-bold text-[#111827] mb-3 uppercase tracking-wide">
                      {item.title}
                    </h4>
                    <p className="text-base md:text-[17px] leading-relaxed text-[#4B5563]">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Category Product Modal */}
        <AnimatePresence>
          {selectedCard && productData[selectedCard] && !selectedProduct && (
            <ProductModal
              cardTitle={selectedCard}
              products={productData[selectedCard]}
              onClose={handleCloseModal}
              onProductClick={handleProductClick}
            />
          )}
        </AnimatePresence>

        {/* Individual Product Detail Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <ProductDetailModal
              product={selectedProduct}
              onClose={handleCloseProductModal}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

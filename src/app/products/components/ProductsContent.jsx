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

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  introductionText,
  productData,
  productSections,
} from "../consant/productsConstants";
import { ProductModal } from "./ProductModal";

// Helper function to create slug from product name
const createSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

// Helper function to find product by slug and category
const findProductBySlug = (slug, category) => {
  if (!category || !productData[category]) return null;
  const products = productData[category];
  return products.find((product) => createSlug(product.name) === slug) || null;
};

const ProductsContentInner = ({ Model3D }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState(null);
  const [initialProduct, setInitialProduct] = useState(null);

  // Check URL on mount and when URL changes to open modals if needed
  useEffect(() => {
    const category = searchParams.get("category");
    const productSlug = searchParams.get("product");

    if (category && productSlug) {
      // Find the product
      const product = findProductBySlug(productSlug, category);
      if (product) {
        setSelectedCard(category);
        setInitialProduct({ product, category });
      } else {
        // Product not found, clear modals
        setSelectedCard(null);
        setInitialProduct(null);
      }
    } else if (category && productData[category]) {
      // Only category is specified
      setSelectedCard(category);
      setInitialProduct(null);
    } else {
      // No category or product in URL, close modals
      setSelectedCard(null);
      setInitialProduct(null);
    }
  }, [searchParams]);

  const handleCardClick = (cardTitle) => {
    setSelectedCard(cardTitle);
    // Update URL with category only
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", cardTitle);
    params.delete("product"); // Remove product param when opening category modal
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
    setInitialProduct(null);
    // Clear URL params
    router.push("/products", { scroll: false });
  };

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1500px] px-3 py-16 max-sm:py-8">
        {/* Introduction Paragraph */}
        <motion.div
          className="mb-12 md:mb-16 mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[17px] sm:text-lg md:text-[21px] leading-relaxed text-[#111827]">
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
              <div className="relative rounded-[5px] bg-gradient-to-r from-[#E6F2FF] via-[#D0E7FF] to-[#E6F2FF] py-6 px-6 shadow-sm border-l-4 border-[#0356C2]">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[#111827] uppercase tracking-wide text-center">
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
                  className="bg-white shadow-md rounded-[5px] overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer flex flex-col h-full"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: sectionIndex * 0.2 + itemIndex * 0.1,
                  }}
                  whileHover={{ y: -5 }}
                >
                  {/* Image */}
                  <div className="relative w-full h-48 md:h-56 overflow-hidden bg-gray-200 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h4 className="text-xl md:text-2xl font-semibold text-[#111827] mb-3 uppercase tracking-wide">
                      {item.title}
                    </h4>
                    <p className="text-base md:text-[17px] leading-relaxed text-[#4B5563] mb-4 flex-grow">
                      {item.description}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(item.title);
                      }}
                      className="w-full mt-auto bg-[#0E54C4] hover:bg-[#084c93] active:bg-[#063d7a] text-white font-semibold py-3 px-6 rounded-[5px] transition-all duration-200 text-sm sm:text-base shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0E54C4] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Category Product Modal */}
        <AnimatePresence>
          {selectedCard && productData[selectedCard] && (
            <ProductModal
              cardTitle={selectedCard}
              products={productData[selectedCard]}
              onClose={handleCloseModal}
              Model3D={Model3D}
              initialProduct={initialProduct}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export const ProductsContent = ({ Model3D }) => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0356C2] mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading products...</p>
          </div>
        </div>
      }
    >
      <ProductsContentInner Model3D={Model3D} />
    </Suspense>
  );
};

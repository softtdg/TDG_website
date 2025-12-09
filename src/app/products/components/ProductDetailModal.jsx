"use client";

import { motion } from "framer-motion";
import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import {
  defaultProductSpecs,
  productSpecs,
} from "../consant/productsConstants";
import { Model3D } from "../page";

export const ProductDetailModal = ({ product, onClose }) => {
  useEffect(() => {
    // Save current scroll position
    const scrollY = window.scrollY;

    // Get current styles
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPosition = document.body.style.position;
    const originalBodyTop = document.body.style.top;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    // Disable scrolling on body and html
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.documentElement.style.overflow = "hidden";

    return () => {
      // Restore original styles
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.position = originalBodyPosition;
      document.body.style.top = originalBodyTop;
      document.body.style.width = "";
      document.documentElement.style.overflow = originalHtmlOverflow;

      // Restore scroll position
      window.scrollTo(0, scrollY);
    };
  }, []);

  // Get product specifications or use defaults
  const specs = productSpecs[product.name] || defaultProductSpecs;

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/45 px-0 sm:px-4 py-0 sm:py-6 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative bg-white shadow-2xl w-full h-full sm:max-w-[1600px] sm:w-full sm:max-h-[98vh] sm:h-auto overflow-hidden"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute z-50 bg-black/85 right-4 top-4 sm:right-6 sm:top-6 inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/90 hover:text-[#111827]"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0356C2] via-[#0E54C4] to-[#0356C2] px-4 py-4 sm:px-8 sm:py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm md:text-base text-white/80 uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                {product.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto h-[calc(100vh-140px)] sm:max-h-[calc(98vh-180px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 md:p-8">
            {/* Left Column - 3D Model */}
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                <h3 className="text-lg sm:text-xl font-bold text-[#111827] mb-3 sm:mb-4 uppercase tracking-wide">
                  3D Model View
                </h3>
                <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] bg-white rounded-lg overflow-hidden">
                  <Suspense
                    fallback={
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0356C2] mx-auto mb-4"></div>
                          <p className="text-gray-600">Loading 3D Model...</p>
                        </div>
                      </div>
                    }
                  >
                    <Canvas
                      camera={{ position: [0, 0, 5], fov: 30 }}
                      style={{ background: "transparent" }}
                    >
                      <ambientLight intensity={0.5} />
                      <directionalLight position={[5, 5, 5]} intensity={1} />
                      <directionalLight
                        position={[-5, -5, -5]}
                        intensity={0.5}
                      />
                      <pointLight position={[0, 0, 5]} intensity={0.5} />
                      <Model3D url={product.model || "/3dModels/demo.glb"} />
                      <OrbitControls
                        enableZoom={true}
                        enablePan={false}
                        enableRotate={true}
                        minDistance={2}
                        maxDistance={10}
                        autoRotate={false}
                      />
                      <Environment preset="city" />
                    </Canvas>
                  </Suspense>
                </div>
                <p className="text-sm text-gray-600 mt-3 italic">
                  * Interactive 3D model - Click and drag to rotate, scroll to
                  zoom
                </p>
              </div>

              {/* Product Image */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                <h3 className="text-lg sm:text-xl font-bold text-[#111827] mb-3 sm:mb-4 uppercase tracking-wide">
                  Product Image
                </h3>
                <div className="relative w-full h-48 sm:h-64 md:h-80 overflow-hidden rounded-lg border border-gray-300">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Product Details */}
            <div className="space-y-4 sm:space-y-6">
              {/* Description */}
              <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
                <h3 className="text-lg sm:text-xl font-bold text-[#111827] mb-3 sm:mb-4 uppercase tracking-wide">
                  Description
                </h3>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#4B5563]">
                  {product.description}
                </p>
              </div>

              {/* Specifications */}
              <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
                <h3 className="text-lg sm:text-xl font-bold text-[#111827] mb-3 sm:mb-4 uppercase tracking-wide">
                  Technical Specifications
                </h3>
                <ul className="space-y-3">
                  {specs.specifications.map((spec, index) => (
                    <li
                      key={index}
                      className="flex items-start text-sm sm:text-base text-[#4B5563]"
                    >
                      <span className="text-[#0356C2] mr-3 mt-1">•</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features */}
              <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
                <h3 className="text-lg sm:text-xl font-bold text-[#111827] mb-3 sm:mb-4 uppercase tracking-wide">
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {specs.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start text-sm sm:text-base text-[#4B5563]"
                    >
                      <span className="text-[#0356C2] mr-3 mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

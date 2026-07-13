"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"
import { defaultProductSpecs, productSpecs } from "../consant/productsConstants"
import { Product3DModelView } from "./Product3DModelView"

export const ProductDetailModal = ({ product, category, onClose }) => {
  if (!product || !category) {
    return null
  }

  // Memoize product specifications to avoid recalculation on every render
  const specs = useMemo(
    () => ({
      specifications:
        product.specifications && product.specifications.length > 0
          ? product.specifications
          : productSpecs[product.name]?.specifications ||
            defaultProductSpecs.specifications,
      features:
        product.features && product.features.length > 0
          ? product.features
          : productSpecs[product.name]?.features ||
            defaultProductSpecs.features,
    }),
    [product.specifications, product.features, product.name],
  )

  // Download handlers
  const handleDownloadSpecs = () => {
    // Create a text file with product specifications
    const content = `Product: ${
      product.name
    }\nCategory: ${category}\n\nDescription:\n${
      product.description
    }\n\nTechnical Specifications:\n${specs.specifications.join(
      "\n",
    )}\n\nKey Features:\n${specs.features.join("\n")}`
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${product.name.replace(/\s+/g, "_")}_Specifications.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleDownloadModel = () => {
    // Download the 3D model file
    const modelUrl = product.model || "/3dModels/demo.glb"
    const link = document.createElement("a")
    link.href = modelUrl
    link.download = `${product.name.replace(/\s+/g, "_")}_3D_Model.glb`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-[99] bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        style={{ willChange: "opacity" }}
      />

      {/* Modal */}
      <motion.div
        className="fixed top-[20px] left-[20px] right-[20px] bottom-[20px] sm:top-[30px] sm:bottom-[30px] xl:left-[200px] xl:right-[200px] z-[100] bg-gray-50 overflow-y-auto rounded-xl shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        {/* Fixed Header */}
        <div className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 shadow-lg rounded-t-xl">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 sm:gap-6 py-3 sm:py-4">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group flex-shrink-0"
              >
                <svg
                  className="w-5 h-5 transform transition-transform group-hover:rotate-90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span className="font-medium text-sm sm:text-base hidden sm:inline">
                  Close
                </span>
              </button>

              {/* Separator */}
              <div className="h-6 w-px bg-gray-700"></div>

              {/* Category Badge */}
              <span className="inline-block px-3 py-1 bg-[#0356C2] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded flex-shrink-0">
                {category}
              </span>

              {/* Separator */}
              <div className="h-6 w-px bg-gray-700"></div>

              {/* Product Title */}
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white uppercase tracking-wide truncate flex-1 min-w-0">
                {product.name}
              </h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12 sm:pb-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - 3D Model */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ willChange: "auto" }}
              >
                <Product3DModelView
                  modelUrl={product.model}
                  // modelUrl={
                  //   product.name === "LED Headlight System HL-3000"
                  //     ? "/3dModels/DemoLIght_GLB.glb"
                  //     : product.name === "High-Power Headlight HL-5000"
                  //       ? "/3dModels/light_demo.glb"
                  //       : "/3dModels/demo.glb"
                  // }
                  title="3D Model View"
                  showTitle={true}
                  delayMs={2000}
                />
              </motion.div>

              {/* Product Image */}
              <motion.div
                className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sm:p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ willChange: "auto" }}
              >
                {/* Section Header with Accent */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-1 w-12 bg-[#0356C2] rounded-full"></div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wide">
                    Product Image
                  </h2>
                </div>
                <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>

            {/* Right Column - Product Details */}
            <div className="space-y-8">
              {/* Description */}
              <motion.div
                className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sm:p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ willChange: "auto" }}
              >
                {/* Section Header with Accent */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-1 w-12 bg-[#0356C2] rounded-full"></div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wide">
                    Description
                  </h2>
                </div>
                <p className="text-base sm:text-lg leading-relaxed text-gray-700">
                  {product.description}
                </p>
              </motion.div>

              {/* Specifications */}
              <motion.div
                className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sm:p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{ willChange: "auto" }}
              >
                {/* Section Header with Accent */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-1 w-12 bg-[#0356C2] rounded-full"></div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wide">
                    Technical Specifications
                  </h2>
                </div>
                <ul className="space-y-4">
                  {specs.specifications.map((spec, index) => (
                    <li
                      key={index}
                      className="flex items-start text-base text-gray-700"
                    >
                      <span className="text-[#0356C2] mr-4 mt-1.5 font-bold text-lg">
                        •
                      </span>
                      <span className="flex-1 leading-relaxed">{spec}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Features */}
              <motion.div
                className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sm:p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{ willChange: "auto" }}
              >
                {/* Section Header with Accent */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-1 w-12 bg-[#0356C2] rounded-full"></div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wide">
                    Key Features
                  </h2>
                </div>
                <ul className="space-y-4">
                  {specs.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start text-base text-gray-700"
                    >
                      <span className="text-[#0356C2] mr-4 mt-1.5 font-bold text-lg">
                        ✓
                      </span>
                      <span className="flex-1 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Download Buttons */}
              <motion.div
                className=""
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                style={{ willChange: "auto" }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Download Specs Button */}
                  <button
                    onClick={handleDownloadSpecs}
                    className="group relative flex items-center justify-center gap-3 bg-[#0356C2] hover:bg-[#0248A0] text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0356C2] focus:ring-offset-2 transform hover:-translate-y-0.5"
                  >
                    <svg
                      className="w-5 h-5 transition-transform group-hover:scale-110"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span className="text-sm sm:text-base">
                      Download Specs Sheet
                    </span>
                  </button>

                  {/* Download 3D Model Button */}
                  <button
                    onClick={handleDownloadModel}
                    className="group relative flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-[#0356C2] border-2 border-[#0356C2] hover:border-[#0248A0] font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0356C2] focus:ring-offset-2 transform hover:-translate-y-0.5"
                  >
                    <svg
                      className="w-5 h-5 transition-transform group-hover:scale-110"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <span className="text-sm sm:text-base">
                      Download 3D Model
                    </span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

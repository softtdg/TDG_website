"use client";

import { motion } from "framer-motion";
import { Suspense, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import {
  defaultProductSpecs,
  productSpecs,
  productData,
} from "../consant/productsConstants";
import * as THREE from "three";

// 3D Model Component
export const Model3D = ({ url }) => {
  const { scene } = useGLTF(url);

  // Calculate bounding box to center and scale the model
  useEffect(() => {
    if (!scene) return;

    // Calculate bounding box
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    // Center the model
    scene.position.sub(center);

    // Scale to fit (adjust scale factor as needed)
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scale = 2 / maxDim; // Adjust this value to control model size
      scene.scale.multiplyScalar(scale);
    }
  }, [scene]);

  return <primitive object={scene} />;
};

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

const ProductDetailContent = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = params.slug;
  const category = searchParams.get("category");

  // Find the product
  const product = findProductBySlug(slug, category);

  // Redirect to products page if product not found
  useEffect(() => {
    if (!product || !category) {
      router.push("/products");
    }
  }, [product, category, router]);

  if (!product || !category) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h1>
          <button
            onClick={() => router.push("/products")}
            className="text-[#0356C2] hover:underline"
          >
            Return to Products
          </button>
        </div>
      </div>
    );
  }

  // Get product specifications or use defaults
  const specs = productSpecs[product.name] || defaultProductSpecs;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div
        className="px-4 py-6 sm:px-8 sm:py-8"
        style={{
          background: "linear-gradient(120deg, #15345C 0%, #235891 100%)", // professional blue gradient
        }}
      >
        <div className="max-w-[1600px] mx-auto">
          {/* <button
            onClick={() => router.push("/products")}
            className="mb-4 text-white hover:text-gray-200 transition-colors flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
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
            Back to Products
          </button> */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm md:text-base text-white/80 font-medium uppercase tracking-wide mb-2">
                {category}
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase">
                {product.name}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {/* Left Column - 3D Model */}
          <div className="space-y-6 sm:space-y-8">
            <motion.div
              className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827] mb-4 sm:mb-6 uppercase tracking-wide">
                3D Model View
              </h2>
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
                    <directionalLight position={[-5, -5, -5]} intensity={0.5} />
                    <pointLight position={[0, 0, 5]} intensity={0.5} />
                    <Model3D url={product.model || "/3dModels/demo.glb"} />
                    <OrbitControls
                      enableZoom={true}
                      enablePan={false}
                      enableRotate={true}
                      minDistance={2}
                      maxDistance={10}
                      autoRotate={true}
                    />
                    <Environment preset="city" />
                  </Canvas>
                </Suspense>
              </div>
              <p className="text-sm text-gray-600 mt-4 italic">
                * Interactive 3D model - Click and drag to rotate, scroll to
                zoom
              </p>
            </motion.div>

            {/* Product Image */}
            <motion.div
              className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827] mb-4 sm:mb-6 uppercase tracking-wide">
                Product Image
              </h2>
              <div className="relative w-full h-48 sm:h-64 md:h-80 overflow-hidden rounded-lg border border-gray-300">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6 sm:space-y-8">
            {/* Description */}
            <motion.div
              className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827] mb-4 sm:mb-6 uppercase tracking-wide">
                Description
              </h2>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#4B5563]">
                {product.description}
              </p>
            </motion.div>

            {/* Specifications */}
            <motion.div
              className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827] mb-4 sm:mb-6 uppercase tracking-wide">
                Technical Specifications
              </h2>
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
            </motion.div>

            {/* Features */}
            <motion.div
              className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827] mb-4 sm:mb-6 uppercase tracking-wide">
                Key Features
              </h2>
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
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductDetailPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0356C2] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product details...</p>
          </div>
        </div>
      }
    >
      <ProductDetailContent />
    </Suspense>
  );
};

export default ProductDetailPage;

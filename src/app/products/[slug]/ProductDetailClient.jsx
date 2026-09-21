"use client";

import { motion } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import {
  defaultProductSpecs,
  productSpecs,
} from "../consant/productsConstants";
import * as THREE from "three";
import { fetchProducts, groupProductsByCategory } from "@/lib/api";

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
const findProductBySlug = (slug, category, productData) => {
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
  const [showVisibleModel, setShowVisibleModel] = useState(false);
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch products from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const products = await fetchProducts();
        const grouped = groupProductsByCategory(products);
        setProductData(grouped);
      } catch (error) {
        console.error("Error loading products:", error);
        setProductData({});
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Find the product
  const product = findProductBySlug(slug, category, productData);

  // Redirect to products page if product not found (after loading)
  useEffect(() => {
    if (!loading && (!product || !category)) {
      router.push("/products");
    }
  }, [product, category, router, loading]);

  // Show visible model after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVisibleModel(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0356C2] mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product || !category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-xl shadow-md border border-gray-200 p-8 sm:p-12 max-w-md mx-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => router.push("/products")}
            className="bg-[#0356C2] hover:bg-[#0248A0] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0356C2] focus:ring-offset-2"
          >
            Return to Products
          </button>
        </div>
      </div>
    );
  }

  // Get product specifications from API or use defaults/static specs
  const specs = {
    specifications: product.specifications && product.specifications.length > 0
      ? product.specifications
      : (productSpecs[product.name]?.specifications || defaultProductSpecs.specifications),
    features: product.features && product.features.length > 0
      ? product.features
      : (productSpecs[product.name]?.features || defaultProductSpecs.features),
  };

  // Download handlers
  const handleDownloadSpecs = () => {
    // Create a text file with product specifications
    const content = `Product: ${
      product.name
    }\nCategory: ${category}\n\nDescription:\n${
      product.description
    }\n\nTechnical Specifications:\n${specs.specifications.join(
      "\n"
    )}\n\nKey Features:\n${specs.features.join("\n")}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${product.name.replace(/\s+/g, "_")}_Specifications.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadModel = () => {
    // Download the 3D model file
    const modelUrl = product.model || "/3dModels/demo.glb";
    const link = document.createElement("a");
    link.href = modelUrl;
    link.download = `${product.name.replace(/\s+/g, "_")}_3D_Model.glb`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-800 shadow-lg">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 sm:gap-6 py-3 sm:py-4">
            {/* Back Button */}
            <button
              onClick={() => router.push("/products")}
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group flex-shrink-0"
            >
              <svg
                className="w-5 h-5 transform transition-transform group-hover:-translate-x-1"
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
              <span className="font-medium text-sm sm:text-base hidden sm:inline">
                Back
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

      {/* Content with top padding to account for fixed header */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - 3D Model */}
          <div className="space-y-8">
            <motion.div
              className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sm:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Section Header with Accent */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-1 w-12 bg-[#0356C2] rounded-full"></div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wide">
                  3D Model View
                </h2>
              </div>

              {showVisibleModel && (
                <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                  <Suspense
                    fallback={
                      <div className="w-full h-full flex items-center justify-center bg-gray-50">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0356C2] mx-auto mb-4"></div>
                          <p className="text-gray-600 font-medium">
                            Loading 3D Model...
                          </p>
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
              )}
              {!showVisibleModel && (
                <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0356C2] mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">
                      Loading 3D Model...
                    </p>
                  </div>
                </div>
              )}
              <p className="text-sm text-gray-500 mt-4 italic">
                * Interactive 3D model - Click and drag to rotate, scroll to
                zoom
              </p>
            </motion.div>

            {/* Product Image */}
            <motion.div
              className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sm:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
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
            >
              {/* Section Header with Accent */}
              {/* <div className="flex items-center gap-4 mb-6">
                <div className="h-1 w-12 bg-[#0356C2] rounded-full"></div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wide">
                  Downloads
                </h2>
              </div> */}
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
                  <span className="text-sm sm:text-base">Download Specs</span>
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

      <div className="h-[2px] opacity-0">
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
              autoRotate={false}
            />
            <Environment preset="city" />
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
};

const ProductDetailPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0356C2] mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">
              Loading product details...
            </p>
          </div>
        </div>
      }
    >
      <ProductDetailContent />
    </Suspense>
  );
};

export default ProductDetailPage;

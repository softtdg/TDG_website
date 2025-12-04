"use client";
import React from "react";
import { HeroSection } from "./components/HeroSection";
import { ProductsContent } from "./components/ProductsContent";

const page = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ProductsContent />
    </div>
  );
};

export default page;

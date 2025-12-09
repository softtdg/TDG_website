"use client";
import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";
import { HeroSection } from "./components/HeroSection";
import { ProductsContent } from "./components/ProductsContent";

const page = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ProductsContent />
      <div className="h-[2px] opacity-0"></div>
    </div>
  );
};

export default page;

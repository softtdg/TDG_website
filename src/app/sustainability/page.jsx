"use client";
import React from "react";
import { HeroSection } from "./components/HeroSection";
import { SustainabilityContent } from "./components/SustainabilityContent";

const page = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <SustainabilityContent />
    </div>
  );
};

export default page;


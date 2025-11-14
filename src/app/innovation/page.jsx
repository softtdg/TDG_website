"use client";
import React from "react";
import { HeroSection } from "./components/HeroSection";
import { InnovationContent } from "./components/InnovationContent";

const page = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <InnovationContent />
    </div>
  );
};

export default page;

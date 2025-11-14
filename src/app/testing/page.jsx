"use client";
import React from "react";
import { HeroSection } from "./components/HeroSection";
import { TestingContent } from "./components/TestingContent";

const page = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <TestingContent />
    </div>
  );
};

export default page;

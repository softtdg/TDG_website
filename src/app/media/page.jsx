"use client";
import React from "react";
import { HeroSection } from "./components/HeroSection";
import { MediaContent } from "./components/MediaContent";

const page = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <MediaContent />
    </div>
  );
};

export default page;

"use client";
import React from "react";
import { HeroSection } from "./components/HeroSection";
import { ComingSoon } from "@/components/ComingSoon";
// Restore this import and swap it back in below to bring the page live
// import { InnovationContent } from "./components/InnovationContent";

const page = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ComingSoon />
      {/* <InnovationContent /> */}
    </div>
  );
};

export default page;

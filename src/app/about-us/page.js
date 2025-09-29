import React from "react";
import { HeroSection } from "./components/HeroSection";
import { HistorySection } from "./components/HistorySection";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <HistorySection />
    </div>
  );
};

export default AboutUs;

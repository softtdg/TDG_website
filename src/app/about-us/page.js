import React from "react";
import { HeroSection } from "./components/HeroSection";
import { HistorySection } from "./components/HistorySection";
import { ImagesSection } from "./components/ImagesSection";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <HistorySection />
      <ImagesSection />
    </div>
  );
};

export default AboutUs;

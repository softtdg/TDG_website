import React from "react";
import { HeroSection } from "./components/HeroSection";
import { OverviewSection } from "./components/OverviewSection";
import { CapabilitiesSection } from "./components/CapabilitiesSection";
import { ImageGallery } from "./components/ImageGallery";
import { TechnologySection } from "./components/TechnologySection";

const DDGPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <OverviewSection />
      <CapabilitiesSection />
      <TechnologySection />
      <ImageGallery />
    </div>
  );
};

export default DDGPage;


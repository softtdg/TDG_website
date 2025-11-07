"use client";
import React from "react";
import { HeroSection } from "./components/HeroSection";
import { RequirementsSection } from "./components/RequirementsSection";
import { StandardsSection } from "./components/CertificationSection";
import { CertificatesSection } from "./components/CertificatesSection";

const page = () => {
  return (
    <div>
      <HeroSection />
      <RequirementsSection />
      <StandardsSection />
      <CertificatesSection />
    </div>
  );
};

export default page;

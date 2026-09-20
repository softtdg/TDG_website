"use client";
import React from "react";
import { notFound } from "next/navigation";
import { HeroSection } from "./components/HeroSection";
import { ComingSoon } from "@/components/ComingSoon";
// Restore this import and swap it back in below to bring the page live
// import { InnovationContent } from "./components/InnovationContent";

const page = () => {
  // Section is not live yet, so the route behaves as if it doesn't exist.
  // Delete this call to bring the page back.
  notFound();

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ComingSoon />
      {/* <InnovationContent /> */}
    </div>
  );
};

export default page;

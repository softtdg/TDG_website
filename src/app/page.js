"use client";
import { motion } from "framer-motion";
import Carousel from "@/components/home/Carousel";
import { HeroSection } from "@/components/home/HeroSection";
import { LightingInMotionSection } from "@/components/home/LightingInMotionSection";
import { OurWorldSection } from "@/components/home/OurWorldSection";
import { TDGProjectsSection } from "@/components/home/TDGProjectsSection";
import { TDGOfferingSection } from "@/components/home/TDGOfferingSection";
import RailwaysSection from "@/components/home/RailwaysSection";

export default function Home() {
  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.8,
  };

  return (
    <motion.div
      className="min-h-screen"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {/* <video
        src="/videos/TDG Web Home V2.mp4"
        autoPlay
        loop
        muted
        className="w-full h-[100vh] object-cover"
      /> */}
      <HeroSection />
      <LightingInMotionSection />
      <OurWorldSection />
      {/* <TDGProjectsSection /> */}
      {/* <TDGOfferingSection />  */}
      {/* <RailwaysSection />
      <Carousel /> */}
    </motion.div>
  );
}

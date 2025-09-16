import Carousel from "@/components/home/Carousel";
import { HeroSection } from "@/components/home/HeroSection";
import { LightingInMotionSection } from "@/components/home/LightingInMotionSection";
import { TDGProjectsSection } from "@/components/home/TDGProjectsSection";
import { TDGOfferingSection } from "@/components/home/TDGOfferingSection";
import RailwaysSection from "@/components/home/RailwaysSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* <video
        src="/videos/TDG Web Home V2.mp4"
        autoPlay
        loop
        muted
        className="w-full h-[100vh] object-cover"
      /> */}
      <HeroSection />
      <LightingInMotionSection />
      <TDGProjectsSection />
      <TDGOfferingSection />
      {/* <RailwaysSection />
      <Carousel /> */}
    </div>
  );
}

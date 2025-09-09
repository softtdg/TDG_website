import Carousel from "@/components/home/Carousel";
import RailwaysSection from "@/components/home/RailwaysSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <video
        src="/videos/TDG Web Home V2.mp4"
        autoPlay
        loop
        muted
        className="w-full h-[100vh] object-cover"
      />
      <RailwaysSection />
      <Carousel />
    </div>
  );
}

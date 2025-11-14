import React from "react";

export const HeroSection = () => {
  return (
    <div className="relative">
      <img
        src="/images/about-us/hero-bg.png"
        className="w-full h-[650px] object-cover"
        style={{ backgroundPosition: "top" }}
      />
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-4xl sm:text-[62px] lg:text-6xl font-medium mb-4">
            INNOVATION
          </h1>
        </div>
      </div>
    </div>
  );
};

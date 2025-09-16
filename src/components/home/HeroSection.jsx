import React from "react";

export const HeroSection = () => {
  return (
    <div className="relative">
      <img
        src="/images/home/hero-section.png"
        className="w-full h-[100vh] object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="text-center">
          <img
            src="/images/home/tdg-logo.png"
            alt=""
            className="w-[80vw] max-w-[492px] h-auto sm:w-[60vw] md:w-[50vw] lg:w-[492px] lg:h-[297px]"
          />
        </div>
      </div>
    </div>
  );
};

import React from "react";

export const HeroSection = () => {
  return (
    <div className="relative">
      <img
        src="/images/products/banner.jpg"
        className="w-full h-[650px] object-cover"
        style={{ backgroundPosition: "top" }}
        alt=""
      />
      {/* Overlay to darken the image */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="text-center px-[15px]">
          <h1 className="text-white text-[30px] sm:text-[62px] font-medium mb-4">
            SUSTAINABILITY
          </h1>
        </div>
      </div>
    </div>
  );
};

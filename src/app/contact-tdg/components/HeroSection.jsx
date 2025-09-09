import React from "react";

export const HeroSection = () => {
  return (
    <div className="relative">
      <img
        src="/images/contact/Contact-Page-Banner-Image.jpg"
        className="w-full h-[92vh] object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-4xl sm:text-[62px] lg:text-6xl font-semibold mb-4">
            CONTACT TDG
          </h1>
        </div>
      </div>
    </div>
  );
};

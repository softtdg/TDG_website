import React from "react";

/**
 * Placeholder shown in place of a page's real content while that section is
 * still being finished. To bring a page back, swap this out for its content
 * component again - each page keeps the original import commented above it.
 */
export const ComingSoon = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:py-32 lg:py-40 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[3px] text-[#2d4a86] mb-3">
          Coming Soon!
        </h2>
        <div className="h-1 w-20 bg-[#f4c806] mx-auto rounded-full"></div>
      </div>
    </section>
  );
};

export default ComingSoon;

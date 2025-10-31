import React from "react";

export const HeroSection = () => {
  return (
    <div
      className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] flex items-center justify-center"
      style={{
        background: "linear-gradient(120deg, #15345C 0%, #235891 100%)", // professional blue gradient
      }}
    >
      <div className="text-center w-full flex items-center justify-center h-full">
        <h1 className="text-white text-4xl sm:text-[62px] lg:text-6xl font-medium mb-4 drop-shadow-lg">
          CAREER
        </h1>
      </div>
    </div>
  );
};

// import React from "react";

// export const HeroSection = () => {
//   return (
//     <div className="relative">
//       <img
//         src="/images/about-us/hero-bg.png"
//         className="w-full h-[650px] object-cover"
//         style={{ backgroundPosition: "top" }}
//       />
//       <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-white text-4xl sm:text-[62px] lg:text-6xl font-bold mb-4">
//             CAREER
//           </h1>
//         </div>
//       </div>
//     </div>
//   );
// };

"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export const LightingInMotionSection = () => {
  const [expandedSection, setExpandedSection] = useState("railways");
  const [isDesktop, setIsDesktop] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const router = useRouter();

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const sections = {
    railways: {
      title: "RAILWAYS",
      description:
        "TDG offers customized and innovative solutions for both interior and exterior lighting systems for the global rail industry. With LED drivers in service since 1999 and an LED main lighting system in service since 2003, TDG has over 100,000 hours of actual in car performance from its systems. There are nearly one million TDG LED drivers in service globally in the rail industry.",
      image: "/images/home/l2.jpg",
    },
    defense: {
      title: "DEFENSE",
      description:
        "Advanced lighting solutions for defense applications including military vehicles, aircraft, and specialized equipment. Our cutting-edge LED technology ensures reliability and performance in the most demanding environments.",
      image: "/images/home/projects/1.jpg",
    },
    support: {
      title: "SUPPORT",
      description:
        "Comprehensive technical support and maintenance services for all our lighting systems. Our expert team provides 24/7 assistance to ensure optimal performance and minimal downtime for your operations.",
      image: "/images/home/projects/2.jpg",
    },
  };

  // Get current image based on expanded section, default to railways
  const getCurrentImage = () => {
    if (expandedSection && sections[expandedSection]) {
      return sections[expandedSection].image;
    }
    return sections.railways.image;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      className="w-full bg-white py-10 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
      ref={ref}
    >
      <div className="max-w-[1650px] mx-auto">
        {/* OLD CODE - COMMENTED OUT FOR BACKUP */}
        {/* ... */}

        {/* NEW UI - COLLAPSIBLE SECTIONS */}

        <motion.div
          className="flex flex-col lg:flex-row gap-6 lg:gap-10 lg:min-h-[650px]"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Desktop - Left Dynamic Image (hidden on mobile) */}
          <motion.div
            className="hidden lg:flex lg:w-[45%] relative"
            variants={itemVariants}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={expandedSection || "railways"}
                src={getCurrentImage()}
                alt={
                  expandedSection === "defense"
                    ? "Defense lighting solutions"
                    : expandedSection === "support"
                    ? "Support services"
                    : "Modern train interior with LED lighting"
                }
                className="rounded-lg w-full h-[650px] object-cover shadow-lg"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              />
            </AnimatePresence>
          </motion.div>

          {/* Content Section */}
          <motion.div
            className="flex-1 flex flex-col justify-center lg:pl-6"
            variants={itemVariants}
          >
            {Object.entries(sections).map(([key, section], index) => {
              // On mobile (< lg), always expanded; on desktop (>= lg), use collapsible behavior
              const isExpanded = !isDesktop || expandedSection === key;

              return (
                <motion.div
                  key={key}
                  className="mb-3 lg:mb-4"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Section Header - Title */}
                  <motion.button
                    onClick={() => {
                      // Only allow collapsing/expanding on desktop
                      if (isDesktop) {
                        const newExpandedSection =
                          expandedSection === key ? null : key;
                        setExpandedSection(newExpandedSection || "railways");
                      }
                    }}
                    className={`w-full text-left flex items-center justify-between py-2 lg:py-3 transition-colors duration-200 ${
                      isDesktop
                        ? "hover:bg-gray-50 cursor-pointer rounded-lg px-2"
                        : "cursor-default"
                    }`}
                    whileHover={isDesktop ? { scale: 1.01 } : {}}
                    whileTap={isDesktop ? { scale: 0.99 } : {}}
                  >
                    <motion.h3
                      className={`text-xl sm:text-2xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-[2px] transition-colors duration-300 ${
                        isDesktop && expandedSection === key
                          ? "text-[#2d4a86]"
                          : "text-gray-900"
                      }`}
                      transition={{ duration: 0.2 }}
                    >
                      {section.title}
                    </motion.h3>
                  </motion.button>

                  {/* Content - Always visible on mobile, collapsible on desktop */}
                  <motion.div
                    className="overflow-hidden"
                    initial={false}
                    animate={{
                      height: isExpanded ? "auto" : 0,
                      opacity: isExpanded ? 1 : 0,
                    }}
                    transition={{
                      duration: isDesktop ? 0.4 : 0,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="pb-3 lg:pb-4 px-2">
                      {/* Mobile Image - Show on mobile, hide on desktop */}
                      <motion.div
                        className="mb-4 lg:hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: isExpanded ? 1 : 0,
                          y: isExpanded ? 0 : 20,
                        }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                      >
                        <img
                          src={section.image}
                          alt={
                            key === "defense"
                              ? "Defense lighting solutions"
                              : key === "support"
                              ? "Support services"
                              : "Modern train interior with LED lighting"
                          }
                          className="w-full h-[200px] sm:h-[250px] object-cover rounded-lg shadow-md"
                        />
                      </motion.div>

                      {/* Description */}
                      <motion.p
                        className="text-gray-700 leading-relaxed text-sm lg:text-base mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: isExpanded ? 1 : 0,
                          y: isExpanded ? 0 : 20,
                        }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        {section.description}
                      </motion.p>

                      {/* Links for Railways section */}
                      {key === "railways" && isExpanded && (
                        <motion.div
                          className="flex flex-col sm:flex-row gap-3 mt-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: isExpanded ? 1 : 0,
                            y: isExpanded ? 0 : 20,
                          }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        >
                          <motion.button
                            onClick={() => {
                              router.push("/media");
                            }}
                            className="group inline-flex items-center justify-between text-sm py-2.5 px-4 font-medium text-[#2d4a86] transition-all duration-300 bg-[#edeff3] border-l-4 border-[#2d4a86] rounded-r-lg shadow-sm hover:shadow-md"
                          >
                            <span>View Railway Projects</span>
                            <motion.svg
                              className="ml-2 w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              whileHover={{ x: 3 }}
                              transition={{ duration: 0.2 }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </motion.svg>
                          </motion.button>

                          <motion.button
                            onClick={() => {
                              router.push("/products");
                            }}
                            className="group inline-flex items-center justify-between text-sm py-2.5 px-4 font-medium text-[#2d4a86] transition-all duration-300 bg-[#edeff3] border-l-4 border-[#2d4a86] rounded-r-lg shadow-sm hover:shadow-md"
                          >
                            <span>View Products</span>
                            <motion.svg
                              className="ml-2 w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              whileHover={{ x: 3 }}
                              transition={{ duration: 0.2 }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </motion.svg>
                          </motion.button>
                        </motion.div>
                      )}

                      {/* Content for Support section */}
                      {key === "support" && isExpanded && (
                        <motion.div
                          className="flex flex-col sm:flex-row sm:items-center gap-3 mt-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: isExpanded ? 1 : 0,
                            y: isExpanded ? 0 : 20,
                          }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        >
                          <motion.p
                            className="text-gray-700 text-sm font-medium"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                              opacity: isExpanded ? 1 : 0,
                              y: isExpanded ? 0 : 20,
                            }}
                            transition={{ duration: 0.3, delay: 0.25 }}
                          >
                            Call{" "}
                            <a
                              href="tel:+19056089539"
                              className="font-semibold text-[#2d4a86] hover:underline"
                            >
                              +1 905-608-9539
                            </a>
                          </motion.p>

                          <motion.button
                            className="group inline-flex items-center justify-between text-sm py-2.5 px-4 font-medium text-[#2d4a86] transition-all duration-300 bg-[#edeff3] border-l-4 border-[#2d4a86] rounded-r-lg shadow-sm hover:shadow-md"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                              opacity: isExpanded ? 1 : 0,
                              y: isExpanded ? 0 : 20,
                            }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                            onClick={() => {
                              router.push("/contact-tdg");
                            }}
                          >
                            <span>Find Support in Your Region</span>
                            <motion.svg
                              className="ml-2 w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              whileHover={{ x: 3 }}
                              transition={{ duration: 0.2 }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </motion.svg>
                          </motion.button>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>

                  {/* Separator Line */}
                  {index < Object.keys(sections).length - 1 && (
                    <motion.div
                      className="border-t border-gray-200 my-3 lg:my-4"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// // "use client";
// // import React, { useRef } from "react";
// // import { motion, useInView } from "framer-motion";
// // import { useRouter } from "next/navigation";

// // export const LightingInMotionSection = () => {
// //   const ref = useRef(null);
// //   const isInView = useInView(ref, { once: true, margin: "-100px" });
// //   const router = useRouter();

// //   const sections = [
// //     {
// //       key: "railways",
// //       title: "RAILWAYS",
// //       description:
// //         "TDG offers customized and innovative solutions for both interior and exterior lighting systems for the global rail industry. With LED drivers in service since 1999 and an LED main lighting system in service since 2003, TDG has over 100,000 hours of actual in car performance from its systems. There are nearly one million TDG LED drivers in service globally in the rail industry.",
// //       image: "/images/home/l2.jpg",
// //       links: [
// //         { text: "View Railway Projects", href: "/media" },
// //         { text: "Explore Products", href: "/products" },
// //       ],
// //       imagePosition: "left", // Image on left, text on right
// //     },
// //     {
// //       key: "defense",
// //       title: "DEFENSE",
// //       description:
// //         "TDG provides advanced, customized lighting solutions for defense applications across land, air, and sea. Our robust LED systems are engineered to endure extreme environments and critical missions, delivering unmatched reliability and performance for military vehicles and specialized equipment worldwide.",
// //       image: "/images/home/projects/1.jpg",
// //       links: [{ text: "Learn More", href: "/products" }],
// //       imagePosition: "right", // Image on right, text on left
// //     },
// //     {
// //       key: "support",
// //       title: "SUPPORT",
// //       description:
// //         "Comprehensive technical support and maintenance services for all our lighting systems. Our expert team provides 24/7 assistance to ensure optimal performance and minimal downtime for your operations.",
// //       image: "/images/home/projects/2.jpg",
// //       links: [{ text: "Contact Support", href: "/contact-tdg" }],
// //       phone: "+1 905-608-9539",
// //       imagePosition: "left", // Image on left, text on right
// //     },
// //   ];

// //   return (
// //     <div
// //       className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
// //       ref={ref}
// //     >
// //       <div className="max-w-7xl mx-auto">
// //         {/* Section Header */}
// //         <motion.div
// //           className="mb-12 lg:mb-16"
// //           initial={{ opacity: 0, y: 30 }}
// //           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
// //           transition={{ duration: 0.6 }}
// //         >
// //           <div className="flex justify-center items-center gap-2 mb-4">
// //             <div className="w-12 h-0.5 bg-[#0356C2]"></div>
// //             <span className="text-xs font-semibold text-[#0356C2] uppercase tracking-widest">
// //               Lighting in Motion
// //             </span>
// //           </div>
// //           <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 text-center">
// //             Lighting the Way
// //             <span className="block text-[#0356C2]">Forward</span>
// //           </h2>
// //           <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto text-center">
// //             TDG is fully conversant with North American, European, Japanese and
// //             other global emergency rail safety standards.
// //           </p>
// //         </motion.div>

// //         {/* Three Sections with Alternating Layout */}
// //         <div className="space-y-20 lg:space-y-45">
// //           {sections.map((section, index) => {
// //             const isImageLeft = section.imagePosition === "left";

// //             return (
// //               <motion.div
// //                 key={section.key}
// //                 className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
// //                   isImageLeft ? "lg:grid-flow-dense" : ""
// //                 }`}
// //                 initial={{ opacity: 0, y: 40 }}
// //                 animate={
// //                   isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
// //                 }
// //                 transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
// //               >
// //                 {/* Image */}
// //                 <div
// //                   className={`${
// //                     isImageLeft
// //                       ? "order-1 lg:col-start-1"
// //                       : "order-1 lg:order-2"
// //                   }`}
// //                 >
// //                   <img
// //                     src={section.image}
// //                     alt={section.title}
// //                     className="w-full h-[300px] sm:h-[350px] lg:h-[450px] object-cover rounded-lg shadow-lg"
// //                   />
// //                 </div>

// //                 {/* Content */}
// //                 <div
// //                   className={`${
// //                     isImageLeft
// //                       ? "order-2 lg:col-start-2"
// //                       : "order-2 lg:order-1"
// //                   }`}
// //                 >
// //                   <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
// //                     {section.title}
// //                   </h3>
// //                   <p className="text-gray-600 leading-relaxed mb-6 text-base lg:text-lg">
// //                     {section.description}
// //                   </p>

// //                   {/* Phone for Support */}
// //                   {section.phone && (
// //                     <p className="text-sm lg:text-base text-gray-700 mb-4">
// //                       For immediate assistance:{" "}
// //                       <a
// //                         href={`tel:${section.phone.replace(/\s/g, "")}`}
// //                         className="font-semibold text-[#0356C2] hover:underline"
// //                       >
// //                         {section.phone}
// //                       </a>
// //                     </p>
// //                   )}

// //                   {/* Links */}
// //                   <div className="flex flex-col sm:flex-row gap-3">
// //                     {section.links.map((link, linkIndex) => (
// //                       <button
// //                         key={linkIndex}
// //                         onClick={() => router.push(link.href)}
// //                         className="px-6 py-3 bg-[#0356C2] text-white font-semibold rounded-lg hover:bg-[#0E54C4] transition-colors duration-200 text-sm lg:text-base"
// //                       >
// //                         {link.text}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { motion, useInView, AnimatePresence } from "framer-motion";
// import { useRouter } from "next/navigation";

// export const LightingInMotionSection = () => {
//   const [expandedSection, setExpandedSection] = useState("railways");
//   const [isDesktop, setIsDesktop] = useState(false);
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });
//   const router = useRouter();

//   // Detect screen size
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsDesktop(window.innerWidth >= 1024);
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   const sections = {
//     railways: {
//       title: "RAILWAYS",
//       description:
//         "TDG offers customized and innovative solutions for both interior and exterior lighting systems for the global rail industry. With LED drivers in service since 1999 and an LED main lighting system in service since 2003, TDG has over 100,000 hours of actual in car performance from its systems. There are nearly one million TDG LED drivers in service globally in the rail industry.",
//       image: "/images/home/l2.jpg",
//     },
//     defense: {
//       title: "DEFENSE",
//       description:
//         "Advanced lighting solutions for defense applications including military vehicles, aircraft, and specialized equipment. Our cutting-edge LED technology ensures reliability and performance in the most demanding environments.",
//       image: "/images/home/projects/1.jpg",
//     },
//     support: {
//       title: "SUPPORT",
//       description:
//         "Comprehensive technical support and maintenance services for all our lighting systems. Our expert team provides 24/7 assistance to ensure optimal performance and minimal downtime for your operations.",
//       image: "/images/home/projects/2.jpg",
//     },
//   };

//   // Get current image based on expanded section, default to railways
//   const getCurrentImage = () => {
//     if (expandedSection && sections[expandedSection]) {
//       return sections[expandedSection].image;
//     }
//     return sections.railways.image;
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     <div
//       className="w-full bg-white py-10 sm:py-20 px-4 sm:px-6 lg:px-[50px]"
//       ref={ref}
//     >
//       <div className="max-w-[100%] mx-auto">
//         {/* OLD CODE - COMMENTED OUT FOR BACKUP */}
//         {/* ... */}

//         {/* NEW UI - COLLAPSIBLE SECTIONS */}

//         <motion.div
//           className="flex flex-col lg:flex-row gap-8 lg:min-h-[900px]"
//           variants={containerVariants}
//           initial="hidden"
//           animate={isInView ? "visible" : "hidden"}
//         >
//           {/* Desktop - Left Dynamic Image (hidden on mobile) */}
//           <motion.div
//             className="hidden lg:flex flex-[1.1] relative"
//             variants={itemVariants}
//           >
//             <AnimatePresence mode="wait">
//               <motion.img
//                 key={expandedSection || "railways"}
//                 src={getCurrentImage()}
//                 alt={
//                   expandedSection === "defense"
//                     ? "Defense lighting solutions"
//                     : expandedSection === "support"
//                     ? "Support services"
//                     : "Modern train interior with LED lighting"
//                 }
//                 className="rounded-[0px] w-full lg:h-[900px] object-cover"
//                 initial={{ opacity: 0, x: -30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: 30 }}
//                 transition={{ duration: 0.5, ease: "easeInOut" }}
//                 whileHover={{
//                   scale: 1.02,
//                   transition: { duration: 0.3 },
//                 }}
//               />
//             </AnimatePresence>
//           </motion.div>

//           {/* Content Section */}
//           <motion.div
//             className="flex-1 flex flex-col justify-center sm:px-[30px]"
//             variants={itemVariants}
//           >
//             {Object.entries(sections).map(([key, section], index) => {
//               // On mobile (< lg), always expanded; on desktop (>= lg), use collapsible behavior
//               const isExpanded = !isDesktop || expandedSection === key;

//               return (
//                 <motion.div
//                   key={key}
//                   className="mb-6"
//                   variants={itemVariants}
//                   whileHover={{ x: 10 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   {/* Section Header - Title */}
//                   <motion.button
//                     onClick={() => {
//                       // Only allow collapsing/expanding on desktop
//                       if (isDesktop) {
//                         const newExpandedSection =
//                           expandedSection === key ? null : key;
//                         setExpandedSection(newExpandedSection || "railways");
//                       }
//                     }}
//                     className={`w-full text-left flex items-center justify-between py-4 transition-colors duration-200 ${
//                       isDesktop
//                         ? "hover:bg-gray-50 cursor-pointer"
//                         : "cursor-default"
//                     }`}
//                     whileHover={isDesktop ? { scale: 1.02 } : {}}
//                     whileTap={isDesktop ? { scale: 0.98 } : {}}
//                   >
//                     <motion.h3
//                       className={`text-2xl lg:text-[70px] font-bold uppercase transition-colors duration-300 ${
//                         isDesktop && expandedSection === key
//                           ? "text-[#0356C2]"
//                           : "text-black"
//                       }`}
//                       transition={{ duration: 0.2 }}
//                     >
//                       {section.title}
//                     </motion.h3>
//                   </motion.button>

//                   {/* Content - Always visible on mobile, collapsible on desktop */}
//                   <motion.div
//                     className="overflow-hidden"
//                     initial={false}
//                     animate={{
//                       height: isExpanded ? "auto" : 0,
//                       opacity: isExpanded ? 1 : 0,
//                     }}
//                     transition={{
//                       duration: isDesktop ? 0.5 : 0,
//                       ease: "easeInOut",
//                     }}
//                   >
//                     <div className="pb-4">
//                       {/* Mobile Image - Show on mobile, hide on desktop */}
//                       <motion.div
//                         className="mb-6 lg:hidden"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{
//                           opacity: isExpanded ? 1 : 0,
//                           y: isExpanded ? 0 : 20,
//                         }}
//                         transition={{ duration: 0.3, delay: 0.05 }}
//                       >
//                         <img
//                           src={section.image}
//                           alt={
//                             key === "defense"
//                               ? "Defense lighting solutions"
//                               : key === "support"
//                               ? "Support services"
//                               : "Modern train interior with LED lighting"
//                           }
//                           className="w-full h-[250px] sm:h-[300px] object-cover rounded-lg"
//                         />
//                       </motion.div>

//                       {/* Description */}
//                       <motion.p
//                         className="text-[black] leading-relaxed text-sm lg:text-[20px] mb-6"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{
//                           opacity: isExpanded ? 1 : 0,
//                           y: isExpanded ? 0 : 20,
//                         }}
//                         transition={{ duration: 0.3, delay: 0.1 }}
//                       >
//                         {section.description}
//                       </motion.p>

//                       {/* Links for Railways section */}
//                       {key === "railways" && isExpanded && (
//                         <motion.div
//                           className="flex flex-col gap-4 mt-6"
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{
//                             opacity: isExpanded ? 1 : 0,
//                             y: isExpanded ? 0 : 20,
//                           }}
//                           transition={{ duration: 0.3, delay: 0.2 }}
//                         >
//                           <motion.button
//                             onClick={() => {
//                               router.push("/media");
//                             }}
//                             className="group relative inline-flex items-center sm:w-[500px] justify-between text-sm lg:text-[16px] py-3 px-4 sm:px-5 font-semibold text-[#0356C2] transition-all duration-300 bg-gradient-to-r from-[#E6F2FF] via-[#D0E7FF] to-[#E6F2FF] border-l-4 border-[#0E54C4] rounded-r-lg shadow-sm"
//                           >
//                             <span>
//                               View TDG's latest railway projects{" "}
//                               {/* <span className="font-bold underline">
//                                 click here
//                               </span> */}
//                             </span>
//                             <motion.svg
//                               className="ml-2 w-4 h-4"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                               whileHover={{ x: 3 }}
//                               transition={{ duration: 0.2 }}
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M9 5l7 7-7 7"
//                               />
//                             </motion.svg>
//                           </motion.button>

//                           <motion.button
//                             onClick={() => {
//                               router.push("/products");
//                             }}
//                             className="group relative inline-flex items-center sm:w-[500px] justify-between text-sm lg:text-[16px] py-3 px-4 sm:px-5 font-semibold text-[#0356C2] transition-all duration-300 bg-gradient-to-r from-[#E6F2FF] via-[#D0E7FF] to-[#E6F2FF] border-l-4 border-[#0E54C4] rounded-r-lg shadow-sm"
//                           >
//                             <span className="">
//                               View TDG's product offering{" "}
//                               {/* <span className="font-bold underline">
//                                 click here
//                               </span> */}
//                             </span>
//                             <motion.svg
//                               className="ml-2 w-4 h-4"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                               whileHover={{ x: 3 }}
//                               transition={{ duration: 0.2 }}
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M9 5l7 7-7 7"
//                               />
//                             </motion.svg>
//                           </motion.button>
//                         </motion.div>
//                       )}

//                       {/* Content for Support section */}
//                       {key === "support" && isExpanded && (
//                         <motion.div
//                           className="flex flex-col gap-4 mt-6"
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{
//                             opacity: isExpanded ? 1 : 0,
//                             y: isExpanded ? 0 : 20,
//                           }}
//                           transition={{ duration: 0.3, delay: 0.2 }}
//                         >
//                           <motion.p
//                             className="text-[black] text-sm lg:text-[18px] font-medium"
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{
//                               opacity: isExpanded ? 1 : 0,
//                               y: isExpanded ? 0 : 20,
//                             }}
//                             transition={{ duration: 0.3, delay: 0.25 }}
//                           >
//                             For immediate assistance please call{" "}
//                             <span className="font-semibold text-[#0356C2]">
//                               +1 905-608-9539
//                             </span>
//                           </motion.p>

//                           <motion.button
//                             className="group relative inline-flex items-center sm:w-[500px] justify-between text-sm lg:text-[16px] py-3 px-4 sm:px-5 font-semibold text-[#0356C2] transition-all duration-300 bg-gradient-to-r from-[#E6F2FF] via-[#D0E7FF] to-[#E6F2FF] border-l-4 border-[#0E54C4] rounded-r-lg shadow-sm"
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{
//                               opacity: isExpanded ? 1 : 0,
//                               y: isExpanded ? 0 : 20,
//                             }}
//                             transition={{ duration: 0.3, delay: 0.3 }}
//                             onClick={() => {
//                               router.push("/contact-tdg");
//                             }}
//                           >
//                             <span>
//                               Find TDG support in your region{" "}
//                               {/* <span className="font-bold underline">
//                                 click here
//                               </span> */}
//                             </span>
//                             <motion.svg
//                               className="ml-2 w-4 h-4"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                               whileHover={{ x: 3 }}
//                               transition={{ duration: 0.2 }}
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M9 5l7 7-7 7"
//                               />
//                             </motion.svg>
//                           </motion.button>
//                         </motion.div>
//                       )}
//                     </div>
//                   </motion.div>

//                   {/* Separator Line */}
//                   {index < Object.keys(sections).length - 1 && (
//                     <motion.div
//                       className="border-t border-[black] my-4 lg:my-8"
//                       initial={{ scaleX: 0 }}
//                       animate={{ scaleX: 1 }}
//                       transition={{ duration: 0.5, delay: 0.3 }}
//                     />
//                   )}
//                 </motion.div>
//               );
//             })}
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

"use client";

import React, { useMemo, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const standardsData = [
  {
    title: "North American Commuter Rail Standards",
    items: [
      "APTA RP-E-012-99: Passenger Car Lighting",
      "APTA RP-E-012-99: Passenger Car Lighting System Recommendations",
      "APTA SS-E-013-99 Rev. 1: Emergency Lighting Design Standard for Passenger Cars",
      "APTA SS-PS-004-99 Rev. 2: Low-Location Exit Path Marking Standard",
      "APTA SS-PS-002-98 Rev. 3: Standard for Emergency Egress/Access Signage on Rail Equipment",
    ],
  },
  {
    title: "North American Rail & Metro Standards",
    items: [
      "APTA RT-S-VIM-020-08: Emergency Lighting Design for Rail Transit Vehicles",
      "APTA RT-S-VIM-021-08: Emergency Signage Standard for Rail Vehicles",
      "APTA RT-S-VIM-022-08: Low Location Emergency Path Marking for Rail Vehicles",
    ],
  },
  {
    title: "North American Locomotive Regulations",
    items: [
      "AAR S-580: Emergency Lighting & Locomotive Crashworthiness Standard",
    ],
  },
  {
    title: "European Rail Standards",
    items: [
      "EN 13272 Railway Applications – Electrical Lighting for Rolling Stock in Public Transportation Systems",
      "GM/RT2130 – Standard for Vehicle Safety, Security, and Evacuation Procedures",
      "ECE Regulation No. 48, 98, 112",
      "GM/RC2531 – Recommendations for Rail Vehicle Emergency Lighting",
    ],
  },
  {
    title: "Japanese Rail Standards",
    items: [
      "JIS E4016 Illuminance for Railway Rolling Stock – Recommended Levels and Measuring Method",
    ],
  },
  {
    title: "British Rail Standards",
    items: [
      "GM/RC2531 “Recommendations for Rail Vehicle Emergency Lighting”",
      "GM/RT2130 “Vehicle Fire Safety”",
      "DIN 67510-2 “Photoluminescent pigments and products – Part 2: Measurement of phosphorescent products on site”",
      "NR – GM/RT2161 “Requirements for Driving Cabs of Railway Vehicles”",
      "BS EN 1838:2013 “Lighting applications. Emergency lighting”",
    ],
  },
];

const AccordionItem = ({ title, items, isOpen, onToggle }) => {
  const gradientSummaryStyles = useMemo(
    () =>
      isOpen
        ? "bg-gradient-to-r from-[#E6F2FF] via-[#D0E7FF] to-[#E6F2FF] shadow-sm text-black border-l-4 border-[#0E54C4]"
        : "bg-[#F5F5F5] text-black hover:bg-[#E6F2FF]",
    [isOpen]
  );

  return (
    <Accordion
      expanded={isOpen}
      onChange={onToggle}
      disableGutters
      square={false}
      elevation={0}
      sx={{
        borderRadius: "0px",
        border: "1px solid transparent",
        "&::before": { display: "none" },
        overflow: "hidden",
        my: 3,
        backgroundColor: "#F5F5F5",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon className="text-black" />}
        className={`${
          isOpen ? "!border-l-4 !border-[#0E54C4]" : ""
        } flex w-full items-center justify-between px-6 py-4 text-left text-base font-semibold uppercase tracking-wide transition-colors ${gradientSummaryStyles}`}
      >
        <h3 className="text-[18px] font-bold leading-relaxed">{title}</h3>
      </AccordionSummary>
      <AccordionDetails className="bg-[#F5F5F5] !px-2 sm:!px-6 !pb-6 !pt-4 sm:!pt-6 text-black">
        <ul className="list-disc pl-6 text-[17px]  leading-relaxed text-[#000000]">
          {items.map((item) => (
            <li key={item} className="mb-2">
              {item}
            </li>
          ))}
        </ul>
      </AccordionDetails>
    </Accordion>
  );
};

export const StandardsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleToggle = (index) => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="bg-white py-2 sm:py-8 ">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:gap-12 lg:gap-16 px-3 sm:px-6 lg:px-8 lg:flex-row lg:items-stretch">
        <div className="flex-1 space-y-8">
          {standardsData.map(({ title, items }, index) => (
            <AccordionItem
              key={title}
              title={title}
              items={items}
              isOpen={index === activeIndex}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// import React, { useState, useRef, useEffect } from "react";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";

// const standardsData = [
//   {
//     title: "North American Commuter Rail Standards",
//     items: [
//       "APTA RP-E-012-99: Passenger Car Lighting",
//       "APTA RP-E-012-99: Passenger Car Lighting System Recommendations",
//       "APTA SS-E-013-99 Rev. 1: Emergency Lighting Design Standard for Passenger Cars",
//       "APTA SS-PS-004-99 Rev. 2: Low-Location Exit Path Marking Standard",
//       "APTA SS-PS-002-98 Rev. 3: Standard for Emergency Egress/Access Signage on Rail Equipment",
//     ],
//   },
//   {
//     title: "North American Rail & Metro Standards",
//     items: [
//       "APTA RT-S-VIM-020-08: Emergency Lighting Design for Rail Transit Vehicles",
//       "APTA RT-S-VIM-021-08: Emergency Signage Standard for Rail Vehicles",
//       "APTA RT-S-VIM-022-08: Low Location Emergency Path Marking for Rail Vehicles",
//     ],
//   },
//   {
//     title: "North American Locomotive Regulations",
//     items: [
//       "AAR S-580: Emergency Lighting & Locomotive Crashworthiness Standard",
//     ],
//   },
//   {
//     title: "European Rail Standards",
//     items: [
//       "EN 13272 Railway Applications – Electrical Lighting for Rolling Stock in Public Transportation Systems",
//       "GM/RT2130 – Standard for Vehicle Safety, Security, and Evacuation Procedures",
//       "ECE Regulation No. 48, 98, 112",
//       "GM/RC2531 – Recommendations for Rail Vehicle Emergency Lighting",
//     ],
//   },
//   {
//     title: "Japanese Rail Standards",
//     items: [
//       "JIS E4016 Illuminance for Railway Rolling Stock – Recommended Levels and Measuring Method",
//     ],
//   },
//   {
//     title: "British Rail Standards",
//     items: [
//       "GM/RC2531 “Recommendations for Rail Vehicle Emergency Lighting”",
//       "GM/RT2130 “Vehicle Fire Safety”",
//       "DIN 67510-2 “Photoluminescent pigments and products – Part 2: Measurement of phosphorescent products on site”",
//       "NR – GM/RT2161 “Requirements for Driving Cabs of Railway Vehicles”",
//       "BS EN 1838:2013 “Lighting applications. Emergency lighting”",
//     ],
//   },
// ];

// // const AccordionItem = ({ title, items, isOpen, onToggle }) => {
// //   const contentRef = useRef(null);

// //   useEffect(() => {
// //     if (!contentRef.current) return;

// //     if (isOpen) {
// //       contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
// //     } else {
// //       contentRef.current.style.maxHeight = "0px";
// //     }
// //   }, [isOpen]);

// //   return (
// //     <div className="space-y-3 border-b border-[#e5e7eb] pb-6 last:border-b-0">
// //       <button
// //         type="button"
// //         onClick={onToggle}
// //         className={`flex w-full items-center justify-between text-left text-lg font-bold uppercase tracking-wide transition-colors duration-200 focus:outline-none ${
// //           isOpen ? "text-[#1155CC]" : "text-[#000000]"
// //         }`}
// //       >
// //         <span>{title}</span>
// //         <span className="ml-4 flex h-8 w-8 items-center justify-center rounded-full border border-current text-base transition-transform duration-200">
// //           {isOpen ? (
// //             <RemoveIcon fontSize="small" />
// //           ) : (
// //             <AddIcon fontSize="small" />
// //           )}
// //         </span>
// //       </button>
// //       <div
// //         ref={contentRef}
// //         className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
// //       >
// //         <ul className="mt-2 list-disc pl-6 text-[14px] text-[#000000]">
// //           {items.map((item) => (
// //             <li key={item} className="mb-1">
// //               {item}
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };

// // export const StandardsSection = () => {
// //   const [activeIndex, setActiveIndex] = useState(2);

// //   const handleToggle = (index) => {
// //     setActiveIndex((prev) => (prev === index ? -1 : index));
// //   };

// //   return (
// //     <section className="bg-white py-[50px]">
// //       <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 lg:flex-row lg:items-stretch lg:gap-20">
// //         <div className="flex-1 space-y-8">
// //           {standardsData.map(({ title, items }, index) => (
// //             <AccordionItem
// //               key={title}
// //               title={title}
// //               items={items}
// //               isOpen={index === activeIndex}
// //               onToggle={() => handleToggle(index)}
// //             />
// //           ))}
// //         </div>

// //         <div className="flex-1 lg:flex">
// //           <div className="flex h-full w-full flex-col justify-center rounded-[0] bg-[#0000003b] p-[2px] text-white shadow-xl">
// //             <div className="flex h-full w-full flex-col justify-center rounded-[0] bg-gradient-to-br from-[#edeff5] via-[#dddfdf] to-[#dadfe9] px-10 py-16 text-[#0f1624] sm:px-12">
// //               {/* <p className="text-3xl md:text-[43px] font-bold uppercase leading-tight mb-2 opacity-90 mt-[50px]">
// //                 Dive in!
// //               </p>
// //               <p className="text-3xl md:text-[43px] font-bold uppercase leading-tight mb-2 opacity-90">
// //                 Explore your
// //               </p>
// //               <p className="text-3xl md:text-[43px] font-bold uppercase leading-tight mb-2 opacity-90">
// //                 certification
// //               </p>
// //               <p className="text-3xl md:text-[43px] font-bold uppercase leading-tight mb-2 opacity-90">
// //                 options.
// //               </p>
// //               <a
// //                 href="#"
// //                 className="mt-10 w-fit px-8 py-4 inline-flex shadow-2xl items-center rounded-[8px] bg-[#fff]   text-xs font-semibold uppercase tracking-widest text-[#1155CC] transition-colors duration-200 hover:bg-[#1155CC] hover:text-white"
// //               >
// //                 Discover More
// //               </a> */}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

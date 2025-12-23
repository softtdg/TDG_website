"use client";

import React, { useMemo, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const accordionItems = [
  {
    title: "Cleaning Material Resistance",
    description:
      "We simulate repeated exposure to common cleaning agents to verify that lens clarity and surface finishes remain intact after prolonged maintenance cycles.",
  },
  {
    title: "Colour Temp. Variation",
    description:
      "Our photometric rigs monitor colour temperature drift over time and under thermal load, ensuring consistent visual output across every luminaire batch.",
  },
  {
    title: "External Light Lumins Test",
    description:
      "Integrated light tunnels and calibrated sensors capture precise lumen output, allowing us to benchmark fixtures against international standards with real-world accuracy.",
    image: "/images/home/u2.jpg",
  },
  {
    title: "HailStone With Seed Test",
    description:
      "Impact chambers fire hill-stone projectiles that replicate severe weather, validating housing durability without compromising optics or seals.",
  },
  {
    title: "Hard Coating & Paint Test",
    description:
      "Samples are subjected to abrasion, chemical resistance, UV exposure, adhesion, gloss retention, and corrosion tests to ensure coatings and finishes remain protective and visually consistent in the toughest environments. High-speed footage documents every spray, bake, and curing phase so engineers can connect visual outcomes with lab readings and rapidly optimize formulations.",
    video: "/videos/TDG Web Home V2.mp4",
  },
  {
    title: "Power Supply Test",
    description:
      "Electrical benches stress-test drivers for efficiency, flicker control, and surge tolerance, validating performance across global voltage ranges.",
  },
  {
    title: "Rustle Project Test Inspection",
    description:
      "Dedicated environments expose assemblies to salt fog and humidity to reveal any early signs of corrosion or mechanical failure.",
  },
  {
    title: "Solid Ingress Test – Up To IP6X",
    description:
      "Pressurised dust chambers challenge product seals to confirm ingress protection ratings for particulate-heavy operating conditions. The recording highlights particulate flow patterns and pressure pulses, letting the team pinpoint exactly where seals need reinforcement.",
    video: "/videos/TDG Web Home V2.mp4",
  },
  {
    title: "Water Ingress – Perf. IPX7",
    description:
      "Submersion and water-jet procedures validate waterproofing to IPX7, ensuring reliable performance during flooding or heavy rainfall. Underwater angles capture how bubbles trail across gaskets, providing extra context as we refine drain paths and connector placement.",
    video: "/videos/TDG Web Home V2.mp4",
  },
  {
    title: "Strength Test",
    description:
      "Mechanical rigs apply static and dynamic loads to brackets and housings, preventing deformation during installation or transport.",
  },
  {
    title: "IK Impact Testing",
    description:
      "Specialized apparatus delivers controlled mechanical impacts to luminaires to verify compliance with IK ratings and ensure robust protection against vandalism or accidental damage.",
  },
  {
    title: "Visual Inspection",
    description:
      "Final inspection lines combine automated vision systems with expert technicians to confirm flawless aesthetics before shipping.",
  },
];

export const TestingContent = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-3 py-10 sm:py-14 md:py-16 lg:py-20 md:px-6 lg:px-10">
        <div className="mb-10 md:mb-16 lg:mb-20">
          <p className="mt-0 md:mt-8 text-[17px] sm:text-lg md:text-[20px] lg:text-[21px] leading-relaxed">
            TDG's in-house testing facilities allow us to ensure every product
            meets the highest standards of quality and reliability. Our
            environmental chambers simulate real-world temperature and humidity
            conditions, while our IP testing equipment verifies protection
            against water and dust. Combined with dedicated lighting and
            electrical test setups, these capabilities let us validate
            performance, refine designs quickly, and deliver dependable lighting
            solutions built to last.
          </p>
        </div>
        <div className="overflow-visible">
          {accordionItems.map((item, index) => (
            <AccordionItem
              key={item.title}
              item={item}
              index={index}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const AccordionItem = ({ item, index, activeIndex, setActiveIndex }) => {
  const isActive = activeIndex === index;

  const gradientSummaryStyles = useMemo(
    () =>
      isActive
        ? "!bg-[#edeff3] shadow-sm text-black border-l-4 border-[#0E54C4]"
        : "!bg-gray-50 !text-black hover:bg-gray-100",
    [isActive]
  );

  return (
    <Accordion
      expanded={isActive}
      onChange={() => setActiveIndex(isActive ? -1 : index)}
      disableGutters
      square={false}
      elevation={0}
      sx={{
        borderRadius: "0px",
        border: "1px solid transparent",
        "&::before": { display: "none" },
        overflow: "hidden",
        my: 3,
        backgroundColor: "transparent",
        p: 0,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon className="text-black" />}
        className={`${
          isActive
            ? "!border-l-4 !border-[#2d4a86]"
            : "border-b border-gray-200 !bg-gray-50"
        } !flex w-full !px-1 sm:!px-4 md:!px-5 !py-3 sm:!py-4 text-left transition-colors ${gradientSummaryStyles} min-h-[80px] sm:min-h-[85px]`}
      >
        <h2 className="text-[17px] md:text-lg lg:text-xl font-semibold uppercase text-[#000000] tracking-[1px] break-words flex-1">
          {item.title}
        </h2>
      </AccordionSummary>
      <AccordionDetails className="!bg-gray-50 !px-2 sm:!px-4 md:!px-5 !pb-4 sm:!pb-6 !pt-3 sm:!pt-4 text-[#0F172A]">
        {item.video ? (
          <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-stretch">
            <div className="flex w-full md:max-w-[400px] md:max-h-[300px] justify-center items-center flex-shrink-0 mb-4 md:mb-0">
              <video
                src={item.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full max-w-[300px] object-cover"
              />
            </div>
            <div className="flex-1 flex items-center">
              <p className="text-[17px] leading-relaxed !text-[#000000]">
                {item.description}
              </p>
            </div>
          </div>
        ) : item.image ? (
          <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-stretch">
            <div className="flex w-full md:max-w-[400px] md:max-h-[300px] justify-center items-center flex-shrink-0 mb-4 md:mb-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 flex items-center">
              <p className="text-[17px] leading-relaxed !text-[#000000]">
                {item.description}
              </p>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-[17px] leading-relaxed !text-[#000000]">
              {item.description}
            </p>
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

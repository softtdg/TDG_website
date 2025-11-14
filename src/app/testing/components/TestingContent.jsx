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
    title: "Hard Coating Test",
    description:
      "Coating samples undergo abrasion, chemical resistance, and UV exposure assessments to guarantee long-lasting protection in the field.",
  },
  {
    title: "Paint Test",
    description:
      "We evaluate paint adhesion, gloss retention, and corrosion resistance to confirm the finish survives harsh outdoor environments. High-speed footage documents every spray, bake, and curing phase so engineers can correlate visual outcomes with lab readings and tune the coating recipe faster.",
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
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 lg:px-10">
        <div className="mb-12 md:mb-20">
          <p className="mt-6 md:mt-8 text-[21px] leading-relaxed">
            TDG’s in-house testing facilities allow us to ensure every product
            meets the highest standards of quality and reliability. Our
            environmental chambers simulate real-world temperature and humidity
            conditions, while our IP testing equipment verifies protection
            against water and dust. Combined with dedicated lighting and
            electrical test setups, these capabilities let us validate
            performance, refine designs quickly, and deliver dependable lighting
            solutions built to last.
          </p>
        </div>
        <div className="overflow-hidden">
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
        ? "bg-gradient-to-r from-[#E6F2FF] via-[#D0E7FF] to-[#E6F2FF] shadow-sm text-black border-l-4 border-[#0E54C4]"
        : "bg-[#F5F5F5] text-black hover:bg-[#E6F2FF]",
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
        backgroundColor: "#F5F5F5",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon className="text-black" />}
        className={`${
          isActive ? "!border-l-4 !border-[#0E54C4]" : ""
        } flex w-full items-center justify-between px-6 py-3 text-left text-base font-semibold uppercase tracking-wide transition-colors ${gradientSummaryStyles}`}
      >
        <h2 className="text-[18px] leading-relaxed font-bold">{item.title}</h2>
      </AccordionSummary>
      <AccordionDetails className="bg-[#F5F5F5] !px-6 !pb-6 !pt-6 text-black transition-[padding] duration-500 ease-in-out">
        {item.video ? (
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <div className="flex w-full flex-1 items-center justify-center rounded-lg">
              <video
                src={item.video}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover max-h-[317px]"
              />
            </div>
            <div className="flex flex-1 items-center">
              <p className="text-[17px] leading-relaxed !text-[#000000]">
                {item.description}
              </p>
            </div>
          </div>
        ) : item.image ? (
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <div className="flex w-full items-center justify-center rounded-lg flex-1">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover max-h-[317px]"
              />
            </div>
            <div className="flex flex-1 items-center">
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

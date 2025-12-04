"use client";

import React, { useMemo, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const accordionItems = [
  {
    title: "ADVANCED CIRCUIT DESIGN",
    description:
      "Imagine multiple and separate functions that allow an LED fixture to accept AC and DC voltages in one unit. Saving your space for technology that meets increasing economic and environmental needs.",
    image: "/images/innovation/img1.jpg",
  },
  {
    title: "LED PCB PRODUCTION",
    description:
      "Consider the largest proportion of LED fixture assembly in one company, in the industry. Assuring you of breadth and depth in LED expertise.",
    image: "/images/innovation/img2.jpg",
  },
  {
    title: "LED Light Engine / Drivers",
    description:
      "Think of LED lights that last more than 200,000 hours, nearly twice what other companies offer. Slashing your maintenance, replacement, and energy consumption costs.",
    image: "/images/innovation/img3.jpg",
  },
  {
    title: "ADVANCED CIRCUIT PROTECTION",
    description:
      "Look for surge and polarity protection, and dimming capability. Increasing your product life and giving you greater flexibility.",
    image: "/images/innovation/img4.jpg",
  },
  {
    title: "OPTIMAL LENSES",
    description:
      "Our proprietary polycarbonate lens formulation also offers a “light box” effect with LED systems eliminating the “hot spots” and “zebra striping” which can occur with other LED systems while still meeting the industry’s most stringent flame, smoke and toxicity requirements.",
  },
  {
    title: "PRECISE QUALITY",
    description:
      "TDG products are industry proven and designed for the rail industry by designers and engineers in the rail industry. We strive to meet the highest global quality standards to assure a high quality and low maintenance product with every delivery.",
  },
  {
    title: "HIGH EFFICIENCY",
    description:
      "TDG designs many of its lighting systems to operate beyond 200,000 hours with efficiency as low as 2W per foot of main lighting, while still meeting many global rail standards for normal light level requirements.",
  },
  {
    title: "SAFETY FIRST",
    description:
      "Since 1989, TDG has worked almost exclusively in the rail industry, working with builders and railroads to meet a number of global rail standards for illumination, durability, and performance.",
  },
  {
    title: "RAPID PROTOTYPING",
    description:
      "TDG uses a combination of rapid prototyping and traditional manufacturing processes to quickly bring new products to market. This allows us to quickly iterate on designs and quickly bring new products to market.",
  },
  {
    title: "3D PRINTING",
    description:
      "TDG uses 3D printing to quickly bring new products to market. This allows us to quickly iterate on designs and quickly bring new products to market.",
  },
  {
    title: "PROTOTYPE PCBs",
    description:
      "TDG uses prototype PCBs to quickly bring new products to market. This allows us to quickly iterate on designs and quickly bring new products to market.",
  },
  {
    title: "PROTOTYPE FIXTURES",
    description:
      "TDG uses prototype fixtures to quickly bring new products to market. This allows us to quickly iterate on designs and quickly bring new products to market.",
  },
];

export const InnovationContent = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 lg:px-10">
        <div className="mb-12 md:mb-20">
          <p className="mt-6 md:mt-8 text-[21px] leading-relaxed">
            Transit Design Group (TDG) provides customized, innovative interior
            and exterior lighting solutions for the global rail industry, with
            LED drivers in service since 1999 and complete LED lighting systems
            operating since 2003, giving them over 100,000 hours of proven
            in-car performance. With nearly a million LED drivers in service
            worldwide, TDG’s latest systems deliver up to 200,000 hours of
            operation and as much as 80% energy savings compared to incandescent
            and fluorescent options, offering low-maintenance and
            environmentally friendly solutions for both new and retrofit
            applications. By collaborating closely with end customers to achieve
            fuel, electricity, and maintenance savings, and by pioneering the
            use of OLED technology in rail lighting since 2015, TDG continues to
            lead the industry toward a lighter, thinner, and more dynamic future
            in lighting.
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

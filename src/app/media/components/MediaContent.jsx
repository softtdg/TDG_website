"use client";

import React, { useMemo, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const mediaSections = [
  {
    title: "NEWS",
    items: [
      {
        image: "/images/home/l2.jpg",
        title: "TDG Launches Next-Generation LED Lighting System",
        description:
          "TDG Transit Design Group introduces its latest energy-efficient LED lighting solution, designed to exceed 200,000 hours of operation while reducing energy consumption by up to 80% compared to traditional systems.",
        date: "March 15, 2024",
      },
      {
        image: "/images/home/projects/1.jpg",
        title: "Global Railway Partnership Expansion",
        description:
          "TDG announces strategic partnerships with leading railway operators across North America and Europe, expanding its reach in sustainable transportation lighting solutions.",
        date: "February 28, 2024",
      },
      {
        image: "/images/home/projects/2.jpg",
        title: "Innovation Award for Sustainable Design",
        description:
          "TDG receives recognition for its commitment to environmental sustainability and innovative lighting technologies that contribute to reduced carbon footprints in the rail industry.",
        date: "January 10, 2024",
      },
      {
        image: "/images/innovation/img1.jpg",
        title: "New Manufacturing Facility Opens",
        description:
          "TDG opens state-of-the-art manufacturing facility to meet growing demand for LED lighting systems, incorporating advanced production technologies and sustainable practices.",
        date: "December 5, 2023",
      },
    ],
  },
  {
    title: "REFERENCES",
    items: [
      {
        image: "/images/innovation/img2.jpg",
        title: "Technical Specifications Guide",
        description:
          "Comprehensive reference document covering TDG's complete product line, including technical specifications, installation guidelines, and performance metrics for railway lighting systems.",
        category: "Technical Documentation",
      },
      {
        image: "/images/innovation/img3.jpg",
        title: "Case Study: Metro Rail Implementation",
        description:
          "Detailed analysis of TDG's LED lighting system implementation in a major metropolitan rail network, showcasing energy savings, maintenance reduction, and passenger satisfaction improvements.",
        category: "Case Study",
      },
      {
        image: "/images/innovation/img4.jpg",
        title: "Industry Standards Compliance",
        description:
          "Reference guide detailing TDG's compliance with international railway safety and environmental standards, including certifications and testing protocols.",
        category: "Compliance",
      },
      {
        image: "/images/standards/banner.jpg",
        title: "Product Catalog 2024",
        description:
          "Complete product catalog featuring TDG's latest lighting solutions for trains, buses, and transportation infrastructure, with detailed specifications and application examples.",
        category: "Product Catalog",
      },
    ],
  },
  {
    title: "EVENTS",
    items: [
      {
        image: "/images/home/u1.jpg",
        title: "Railway Technology Expo 2024",
        description:
          "TDG will be showcasing its latest LED lighting innovations at the Railway Technology Expo in Berlin. Visit our booth to see live demonstrations and meet our engineering team.",
        date: "June 12-15, 2024",
        location: "Berlin, Germany",
      },
      {
        image: "/images/home/u2.jpg",
        title: "Sustainable Transportation Summit",
        description:
          "Join TDG at the Sustainable Transportation Summit where we'll present our latest research on energy-efficient lighting solutions and their impact on reducing carbon emissions.",
        date: "September 8-10, 2024",
        location: "Toronto, Canada",
      },
      {
        image: "/images/home/u3.jpg",
        title: "International Rail Conference",
        description:
          "TDG experts will be presenting technical sessions on advanced LED lighting systems and their applications in modern railway infrastructure at this year's International Rail Conference.",
        date: "November 20-22, 2024",
        location: "London, UK",
      },
      {
        image: "/images/about-us/i1.jpg",
        title: "Product Launch Webinar",
        description:
          "Attend our online webinar to learn about TDG's newest product line, featuring interactive Q&A sessions with our technical team and virtual product demonstrations.",
        date: "May 25, 2024",
        location: "Online",
      },
    ],
  },
];

export const MediaContent = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1500px] px-4 py-16 md:px-8 lg:px-10">
        {/* Introduction Text */}
        <div className="mb-12 md:mb-20">
          <p className="mt-6 md:mt-8 text-[21px] leading-relaxed text-[#111827]">
            Stay informed with the latest articles, industry references, news
            updates, and upcoming events related to advanced lighting and
            interior solutions for trains, buses, commercial buildings, and
            maritime vessels. Explore TDG's contributions to the transportation
            industry and discover how our innovative lighting technologies are
            shaping the future of sustainable transit design.
          </p>
        </div>

        {/* Collapsible Sections */}
        <div className="overflow-hidden">
          {mediaSections.map((section, index) => (
            <MediaAccordionItem
              key={section.title}
              section={section}
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

const MediaAccordionItem = ({
  section,
  index,
  activeIndex,
  setActiveIndex,
}) => {
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
        <h2 className="text-[18px] leading-relaxed font-bold">
          {section.title}
        </h2>
      </AccordionSummary>
      <AccordionDetails className="bg-[#F5F5F5] !px-6 !pb-6 !pt-6 text-black transition-[padding] duration-500 ease-in-out">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {section.items.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className="bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative w-full h-[300px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#111827] mb-3">
                  {item.title}
                </h3>
                <p className="text-[17px] leading-relaxed text-[#4B5563] mb-4">
                  {item.description}
                </p>
                <div className="flex items-center justify-between text-sm text-[#6B7280]">
                  {item.date && (
                    <span className="font-medium">{item.date}</span>
                  )}
                  {item.location && (
                    <span className="font-medium">{item.location}</span>
                  )}
                  {item.category && (
                    <span className="font-medium bg-[#E6F2FF] px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

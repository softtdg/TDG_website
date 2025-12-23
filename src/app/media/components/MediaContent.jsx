"use client";

import React, { useMemo, useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { fetchAllMediaSections } from "@/lib/api";

// Default/fallback data structure
const defaultMediaSections = [
  {
    title: "NEWS",
    items: [],
  },
  {
    title: "REFERENCES",
    items: [],
  },
  {
    title: "EVENTS",
    items: [],
  },
];

export const MediaContent = () => {
  const [openIndices, setOpenIndices] = useState([]);
  const [mediaSections, setMediaSections] = useState(defaultMediaSections);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMediaData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAllMediaSections();

        // Transform API data to match the component structure
        setMediaSections([
          {
            title: "NEWS",
            items: data.news || [],
          },
          {
            title: "REFERENCES",
            items: data.references || [],
          },
          {
            title: "EVENTS",
            items: data.events || [],
          },
        ]);
      } catch (err) {
        console.error("Error loading media data:", err);
        setError("Failed to load media content. Please try again later.");
        // Keep default empty sections on error
        setMediaSections(defaultMediaSections);
      } finally {
        setLoading(false);
      }
    };

    loadMediaData();
  }, []);

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-3 py-10 sm:py-14 md:py-16 lg:py-20 md:px-6 lg:px-10">
        {/* Introduction Text */}
        <div className="mb-10 md:mb-16 lg:mb-20">
          <p className="mt-0 md:mt-8 text-[17px] sm:text-lg md:text-[20px] lg:text-[21px] leading-relaxed">
            Stay informed with the latest articles, industry references, news
            updates, and upcoming events related to advanced lighting and
            interior solutions for trains, buses, commercial buildings, and
            maritime vessels. Explore TDG's contributions to the transportation
            industry and discover how our innovative lighting technologies are
            shaping the future of sustainable transit design.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">Loading media content...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-10">
            <p className="text-lg text-red-600">{error}</p>
          </div>
        )}

        {/* Collapsible Sections */}
        {!loading && !error && (
          <div className="overflow-hidden">
            {mediaSections.map((section, index) => (
              <MediaAccordionItem
                key={section.title}
                section={section}
                index={index}
                openIndices={openIndices}
                setOpenIndices={setOpenIndices}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading &&
          !error &&
          mediaSections.every((s) => s.items.length === 0) && (
            <div className="text-center py-10">
              <p className="text-lg text-gray-600">
                No media content available at this time.
              </p>
            </div>
          )}
      </div>
    </section>
  );
};

const MediaAccordionItem = ({
  section,
  index,
  openIndices,
  setOpenIndices,
}) => {
  const isActive = openIndices.includes(index);

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
      onChange={() => {
        setOpenIndices((prev) => {
          if (isActive) {
            return prev.filter((i) => i !== index);
          } else {
            return [...prev, index];
          }
        });
      }}
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
        <h2 className="text-[17px] md:text-lg lg:text-xl font-semibold text-[#000000] tracking-[1.5px] break-words flex-1">
          {section.title}
        </h2>
      </AccordionSummary>
      <AccordionDetails className="!bg-gray-50 !px-2 sm:!px-4 md:!px-5 !pb-4 sm:!pb-6 !pt-3 sm:!pt-4 text-[#0F172A]">
        <div className="flex flex-col gap-6 mt-4">
          {section.items.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className="bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row"
            >
              <div className="relative w-[400px] h-[300px] overflow-hidden flex-shrink-0">
                <img
                  src={item.image || "/images/home/l2.jpg"}
                  alt={item.title || "Media item"}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback to default image if image fails to load
                    e.target.src = "/images/home/l2.jpg";
                  }}
                />
              </div>
              <div className="p-4 sm:p-6 flex-1">
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

"use client";
import React from "react";

const OtherOfficesCards = ({ locations, selectedLocationId, onSelect }) => {
  const defaultExcludedEmail = "sales_canada@tdgdesign.com";
  const toLower = (v) => String(v || "").toLowerCase();

  const otherLocations = (locations || []).filter((loc) => {
    // Exclude by ID if selectedLocationId is provided
    if (selectedLocationId !== undefined && selectedLocationId !== null) {
      if (loc.id === selectedLocationId) return false;
    }

    // Also check by email: exclude Canada if it's the selected location
    // This is a safety check for when IDs might not align
    const isCanada = toLower(loc.email) === defaultExcludedEmail;
    if (isCanada) {
      // If no selectedLocationId provided, exclude Canada (default state)
      if (selectedLocationId === undefined || selectedLocationId === null) {
        return false;
      }
      // If selectedLocationId is provided, only exclude if this Canada location's ID matches
      // (Otherwise, if a different office is selected, Canada should appear in the list)
    }

    return true;
  });

  const handleSelect = (location) => {
    if (onSelect) onSelect(location);
    // Smooth scroll to contact details after state updates
    // Delay slightly to ensure DOM updates
    setTimeout(() => {
      const el = document.getElementById("contact-details-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  if (otherLocations.length === 0) return null;

  return (
    <div className="max-w-[1300px] mx-auto py-10 sm:pt-[100px] sm:pb-[150px]">
      <div className="mb-6 sm:mb-15">
        <h2 className="text-center text-3xl font-extrabold uppercase tracking-[6px] text-[#111827] sm:text-[50px]">
          Global Sites
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
        {otherLocations.map((location) => (
          <button
            key={location.id}
            type="button"
            onClick={() => handleSelect(location)}
            className="group relative overflow-hidden text-left w-full rounded-[24px] p-8 bg-white border-2 border-[#F0F0F0] hover:border-[#0E54C4]/30 shadow-[0_8px_24px_rgba(14,84,196,0.05)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0E54C4]/10"
          >
            <div className="flex h-full flex-col gap-3">
              <div className="flex items-start gap-4">
                {/* <div
                  className="mt-1 w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "#F48C06" }}
                /> */}
                <div className="flex-1">
                  <h4 className="mb-3 text-[18px] sm:text-[20px] font-semibold leading-[1.4] group-hover:text-[#F48C06] text-[#0E54C4]">
                    {location.name}
                  </h4>

                  <p className="pl-7 text-[12px] font-semibold text-gray-900 uppercase">
                    {String(location.email || "").toUpperCase()}
                  </p>
                </div>
              </div>

              <p className="pl-7 text-[15px] leading-7 text-gray-600">
                {location.address}
              </p>

              <div className="mt-auto pl-7 flex items-center text-sm font-semibold text-[#0E54C4]">
                <span className="mr-3 tracking-wide">CONTACT NOW</span>
                <svg
                  className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 10H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default OtherOfficesCards;

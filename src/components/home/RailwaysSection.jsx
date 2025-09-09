"use client";

import React, { useState } from "react";
import { Button } from "@mui/material";
import EastIcon from "@mui/icons-material/East";

const RailwaysSection = () => {
  const [expandedSections, setExpandedSections] = useState({
    railways: true,
    defense: false,
    support: false,
  });

  const [hoveredSection, setHoveredSection] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);

  const toggleSection = (section) => {
    // If the clicked section is already open, close it
    if (expandedSections[section]) {
      setExpandedSections({
        railways: false,
        defense: false,
        support: false,
      });
      return;
    }

    // First close all sections
    setExpandedSections({
      railways: false,
      defense: false,
      support: false,
    });

    // Then after a delay, open the clicked section
    setTimeout(() => {
      setExpandedSections({
        railways: section === "railways",
        defense: section === "defense",
        support: section === "support",
      });
    }, 300); // 300ms delay for smooth transition
  };

  const handleMouseEnter = (section) => {
    setHoveredSection(section);

    // If the section is already open and we're re-entering it, don't trigger animation
    if (expandedSections[section]) {
      return;
    }

    // Only trigger close-then-open sequence if section is not already open
    // First close all sections
    setExpandedSections({
      railways: false,
      defense: false,
      support: false,
    });

    // Force animation refresh
    setAnimationKey((prev) => prev + 1);

    // Then after a delay, open the hovered section
    setTimeout(() => {
      setExpandedSections({
        railways: section === "railways",
        defense: section === "defense",
        support: section === "support",
      });
    }, 300); // 300ms delay for smooth transition
  };

  const handleMouseLeave = (section) => {
    setHoveredSection(null);
    // Keep the last hovered section open - don't collapse anything
  };

  return (
    <div className="bg-white text-gray-900 max-w-[1905px] mx-auto">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 w-full">
          <img
            alt="Front view of a red and white Caltrain train at a station platform with tracks and overhead wires visible"
            className="w-full h-full object-cover"
            src="/images/railways-section.png"
          />
        </div>
        <div className="lg:w-1/2 w-full px-4 sm:px-6 md:px-[100px] py-8 sm:py-10 md:py-20 flex flex-col min-h-[600px]">
          {/* Railways Section */}
          <div
            className="mb-8"
            onMouseEnter={() => handleMouseEnter("railways")}
            onMouseLeave={() => handleMouseLeave("railways")}
          >
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("railways")}
            >
              <h2 className="text-[28px] sm:text-[35px] md:text-[42px] font-semibold">
                Railways
              </h2>
            </div>

            <div
              key={`railways-${animationKey}`}
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                expandedSections.railways
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="pt-4">
                <p
                  className="text-[16px] sm:text-[17px] md:text-[18px] max-w-[687px] font-medium mb-4 sm:mb-6 text-[#070707c9]"
                  style={{ lineHeight: "185%" }}
                >
                  TDG offers customized and innovative solutions for both
                  interior and exterior lighting systems for the global rail
                  industry. With LED drivers in service since 1999 and an LED
                  main lighting system in service since 2003, TDG has over
                  100,000 hours of actual in car performance from its systems.
                  There are nearly one million TDG LED drivers in service
                  globally in the rail industry.{" "}
                </p>
                <p
                  className="text-[16px] sm:text-[17px] md:text-[18px] max-w-[687px] font-medium mb-4 sm:mb-6 text-[#070707c9]"
                  style={{ lineHeight: "185%" }}
                >
                  Our current generation systems offer over 200,000 hours of
                  operation and they operate at an energy saving of up to 80%
                  when compared to existing incandescent and fluorescent
                  options. These solutions allow us to work with our end
                  customer to strive for fuel, electricity, or maintenance
                  savings.{" "}
                </p>

                <Button
                  className="w-fit !h-[50px] sm:!h-[55px] md:!h-[60px] !text-[16px] sm:!text-[18px] md:!text-[20px] !rounded-[100px] !bg-[#0356C2] !px-[20px] sm:!px-[25px] md:!px-[30px]"
                  variant="contained"
                  sx={{ borderColor: "#ffffff", borderWidth: "2px" }}
                >
                  <span className="m-font flex capitalize !font-semibold !text-white items-center gap-2">
                    learn more <EastIcon />
                  </span>
                </Button>
              </div>
            </div>
          </div>

          <hr className="border-[#161C25] opacity-30 border-1 mb-4 sm:mb-6" />

          {/* Defense Section */}
          <div
            className="mb-8"
            onMouseEnter={() => handleMouseEnter("defense")}
            onMouseLeave={() => handleMouseLeave("defense")}
          >
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("defense")}
            >
              <h3 className="text-[28px] sm:text-[35px] md:text-[42px] font-semibold">
                Defense
              </h3>
            </div>

            <div
              key={`defense-${animationKey}`}
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                expandedSections.defense
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="pt-4">
                <p
                  className="text-[16px] sm:text-[17px] md:text-[18px] max-w-[687px] font-medium mb-4 sm:mb-6 text-[#070707c9]"
                  style={{ lineHeight: "185%" }}
                >
                  TDG provides cutting-edge lighting solutions for defense
                  applications, ensuring optimal visibility and safety in
                  critical military operations. Our specialized LED systems are
                  designed to meet the rigorous demands of defense environments,
                  offering superior durability and performance.
                </p>
                <p
                  className="text-[16px] sm:text-[17px] md:text-[18px] max-w-[687px] font-medium mb-4 sm:mb-6 text-[#070707c9]"
                  style={{ lineHeight: "185%" }}
                >
                  With advanced thermal management and rugged construction, our
                  defense lighting solutions operate reliably in extreme
                  conditions while maintaining energy efficiency and reducing
                  maintenance requirements.
                </p>

                <Button
                  className="w-fit !h-[50px] sm:!h-[55px] md:!h-[60px] !text-[16px] sm:!text-[18px] md:!text-[20px] !rounded-[100px] !bg-[#0356C2] !px-[20px] sm:!px-[25px] md:!px-[30px]"
                  variant="contained"
                  sx={{ borderColor: "#ffffff", borderWidth: "2px" }}
                >
                  <span className="m-font flex capitalize !font-semibold !text-white items-center gap-2">
                    learn more <EastIcon />
                  </span>
                </Button>
              </div>
            </div>
          </div>

          <hr className="border-[#161C25] opacity-30 border-1 mb-4 sm:mb-6" />

          {/* Support Section */}
          <div
            className="mb-8"
            onMouseEnter={() => handleMouseEnter("support")}
            onMouseLeave={() => handleMouseLeave("support")}
          >
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("support")}
            >
              <h3 className="text-[28px] sm:text-[35px] md:text-[42px] font-semibold">
                Support
              </h3>
            </div>

            <div
              key={`support-${animationKey}`}
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                expandedSections.support
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="pt-4">
                <p
                  className="text-[16px] sm:text-[17px] md:text-[18px] max-w-[687px] font-medium mb-4 sm:mb-6 text-[#070707c9]"
                  style={{ lineHeight: "185%" }}
                >
                  Our comprehensive support services ensure seamless operation
                  and maximum uptime for all TDG lighting systems. We provide
                  24/7 technical assistance, preventive maintenance programs,
                  and rapid response solutions to keep your operations running
                  smoothly.
                </p>
                <p
                  className="text-[16px] sm:text-[17px] md:text-[18px] max-w-[687px] font-medium mb-4 sm:mb-6 text-[#070707c9]"
                  style={{ lineHeight: "185%" }}
                >
                  From initial installation to ongoing maintenance and upgrades,
                  our expert team delivers reliable support tailored to your
                  specific needs, ensuring optimal performance and longevity of
                  your lighting systems.
                </p>

                <Button
                  className="w-fit !h-[50px] sm:!h-[55px] md:!h-[60px] !text-[16px] sm:!text-[18px] md:!text-[20px] !rounded-[100px] !bg-[#0356C2] !px-[20px] sm:!px-[25px] md:!px-[30px]"
                  variant="contained"
                  sx={{ borderColor: "#ffffff", borderWidth: "2px" }}
                >
                  <span className="m-font flex capitalize !font-semibold !text-white items-center gap-2">
                    learn more <EastIcon />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RailwaysSection;

import React from "react";
import { Button } from "@mui/material";
import EastIcon from "@mui/icons-material/East";

const RailwaysSection = () => {
  return (
    <div className="bg-white text-gray-900 max-w-[1905px] mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 w-full">
          <img
            alt="Front view of a red and white Caltrain train at a station platform with tracks and overhead wires visible"
            className="w-full h-full object-cover"
            src="/images/railways-section.png"
          />
        </div>
        <div className="md:w-1/2 w-full px-4 sm:px-6 md:px-[100px] py-8 sm:py-10 md:py-20 flex flex-col">
          <h2 className="text-[28px] sm:text-[35px] md:text-[42px] font-semibold mb-6 sm:mb-8">
            Railways
          </h2>
          <p
            className="text-[16px] sm:text-[17px] md:text-[18px] max-w-[687px] font-medium mb-4 sm:mb-6 text-[#070707c9]"
            style={{ lineHeight: "185%" }}
          >
            TDG offers customized and innovative solutions for both interior and
            exterior lighting systems for the global rail industry. With LED
            drivers in service since 1999 and an LED main lighting system in
            service since 2003, TDG has over 100,000 hours of actual in car
            performance from its systems. There are nearly one million TDG LED
            drivers in service globally in the rail industry.{" "}
          </p>
          <p
            className="text-[16px] sm:text-[17px] md:text-[18px] max-w-[687px] font-medium mb-8 sm:mb-[50px] text-[#070707c9]"
            style={{ lineHeight: "185%" }}
          >
            Our current generation systems offer over 200,000 hours of operation
            and they operate at an energy saving of up to 80% when compared to
            existing incandescent and fluorescent options. These solutions allow
            us to work with our end customer to strive for fuel, electricity, or
            maintenance savings.{" "}
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

          <hr className="border-[#161C25] opacity-30 border-1 mb-4 sm:mb-6 mt-[30px] sm:mt-[40px] md:mt-[50px]" />
          <h3 className="text-[28px] sm:text-[35px] md:text-[42px] font-semibold mb-3 sm:mb-4 cursor-pointer">
            Defense
          </h3>
          <hr className="border-[#161C25] opacity-30 border-1 mb-4 sm:mb-6" />
          <h3 className="text-[28px] sm:text-[35px] md:text-[42px] font-semibold cursor-pointer">
            Support
          </h3>
        </div>
      </div>
    </div>
  );
};

export default RailwaysSection;

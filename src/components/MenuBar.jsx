"use client";
import React, { useState } from "react";
import { Button } from "@mui/material";

const MenuBar = () => {
  const [currentImage, setCurrentImage] = useState("/images/railways.png");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const navigationItems = [
    {
      name: "Railways",
      image: "/images/railways.png",
      href: "#",
    },
    {
      name: "Defense",
      image: "/images/defense.png",
      href: "#",
    },
    {
      name: "Support",
      image: "/images/support.png",
      href: "#",
    },
    {
      name: "Safety & Innovation",
      image: "/images/safety.png",
      href: "#",
    },
    {
      name: "Contacts",
      image: "/images/contacts.png",
      href: "#",
    },
  ];

  const handleImageChange = (imagePath) => {
    setCurrentImage(imagePath);
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      // Start closing animation
      setIsClosing(true);
      // Wait for animation to complete then hide menu
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsClosing(false);
      }, 500); // Match the animation duration
    } else {
      setIsMenuOpen(true);
    }
  };

  return (
    <div>
      <Button
        className="m-font !absolute !top-[20px] sm:!top-[25px] lg:!top-[30px] !left-[20px] sm:!left-[50px] lg:!left-[170px] !z-[100] !w-[100px] sm:!w-[120px] lg:!w-[140px] !h-[45px] sm:!h-[50px] lg:!h-[60px] !text-[16px] sm:!text-[18px] lg:!text-[20px] !rounded-[100px]"
        variant="outlined"
        sx={{ borderColor: "#ffffff", borderWidth: "2px" }}
        onClick={toggleMenu}
      >
        <span className="flex !font-semibold !text-white items-center gap-1 sm:gap-2">
          MENU{" "}
          <img
            src="/icons/menu.svg"
            alt="menu"
            className="w-[18px] h-[14px] sm:w-[20px] sm:h-[16px] lg:w-[24px] lg:h-[18px]"
          />
        </span>
      </Button>

      {(isMenuOpen || isClosing) && (
        <div
          className={`fixed z-[120] top-[0] left-[0] bottom-[0] right-[0] ${
            isClosing ? "animate-slideUp" : "animate-slideDown"
          }`}
        >
          <div
            className={`h-[80px] sm:h-[100px] lg:h-[120px] flex items-center justify-center bg-[#FFFFFF] ${
              isClosing ? "animate-slideUpHeader" : "animate-slideDownHeader"
            }`}
            style={{ borderBottom: "2px solid #161C2580" }}
          >
            <Button
              className="m-font !fixed !top-[20px] sm:!top-[25px] lg:!top-[30px] !left-[20px] sm:!left-[50px] lg:!left-[170px] !w-[100px] sm:!w-[120px] lg:!w-[140px] !h-[45px] sm:!h-[50px] lg:!h-[60px] !text-[16px] sm:!text-[18px] lg:!text-[20px] !rounded-[100px]"
              variant="outlined"
              sx={{ borderColor: "#000000", borderWidth: "2px" }}
              onClick={toggleMenu}
            >
              <span className="flex !font-semibold !text-black items-center gap-1 sm:gap-2">
                MENU{" "}
                <img
                  src="/icons/close.svg"
                  alt="menu"
                  className="w-[18px] h-[14px] sm:w-[20px] sm:h-[16px] lg:w-[24px] lg:h-[18px]"
                />
              </span>
            </Button>
            <div className="w-[100px] h-[60px] sm:w-[120px] sm:h-[70px] lg:w-[150px] lg:h-[90px]">
              <img src="/icons/logo.svg" alt="" className="w-full h-full" />
            </div>
          </div>

          <main className="flex min-h-[calc(100vh-80px)]">
            <nav className="w-full lg:w-[533px] border-r border-gray-300 bg-white px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 pl-[20px] sm:pl-[40px] lg:pl-[70px] pr-[20px] sm:pr-[25px] lg:pr-[30px] flex flex-col text-lg font-normal text-black">
              {navigationItems.map((item, index) => (
                <a
                  key={index}
                  className={`flex items-center justify-between text-[24px] sm:text-[28px] lg:text-[34px] transition-all duration-300 group h-[80px] sm:h-[100px] lg:h-[120px] ${
                    currentImage === item.image
                      ? "font-semibold text-[#0356C2] border-b-2 border-[#0356C2]"
                      : "font-medium hover:font-semibold hover:text-[#0356C2] hover:border-b-2 hover:border-[#0356C2]"
                  }`}
                  href={item.href}
                  onMouseEnter={() => handleImageChange(item.image)}
                  onMouseLeave={() => handleImageChange("/images/railways.png")}
                >
                  {item.name}
                  {currentImage === item.image && (
                    <img
                      src="/icons/right-arrow.svg"
                      alt=""
                      className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] lg:w-auto lg:h-auto"
                    />
                  )}
                </a>
              ))}
            </nav>
            <div className="flex-1 hidden lg:block">
              <img
                alt="Dynamic content image"
                className="w-full h-full object-cover transition-opacity duration-300"
                src={currentImage}
              />
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default MenuBar;

"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";

const MenuBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentImage, setCurrentImage] = useState("/images/home/u1.jpg");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Hide menu bar on product detail pages
  if (pathname?.startsWith("/products/") && pathname !== "/products") {
    return null;
  }

  const navigationItems = [
    {
      name: "Products",
      image: "/images/home/u1.jpg",
      href: "/products",
    },
    {
      name: "Innovation",
      image: "/images/innovation/img1.jpg",
      href: "/innovation",
    },
    {
      name: "Testing",
      image: "/images/home/u3.jpg",
      href: "/testing",
    },
    {
      name: "Standards & Certification",
      image: "/images/home/u2.jpg",
      href: "/safety-standards",
    },
    {
      name: "About Us",
      image: "/images/about-us/i1.jpg",
      href: "/about-us",
    },
    {
      name: "Contacts",
      image: "/images/contacts.png",
      href: "/contact-tdg",
    },
  ];

  // Get current navigation item based on pathname
  const getCurrentNavigationItem = () => {
    const currentItem = navigationItems.find((item) => {
      // Handle hash routes by checking if pathname matches the base path
      if (item.href.includes("#")) {
        const basePath = item.href.split("#")[0];
        return pathname === basePath || pathname === item.href;
      }
      return item.href === pathname;
    });
    return currentItem || navigationItems[0]; // Default to SMT if no match
  };

  // Update current image when pathname changes
  // useEffect(() => {
  //   const currentItem = getCurrentNavigationItem();
  //   setCurrentImage(currentItem.image);
  // }, [pathname]);

  const handleImageChange = (imagePath) => {
    setCurrentImage(imagePath);
  };

  const handleNavigation = (href) => {
    if (href !== "#") {
      router.push(href);
      // Close menu after navigation
      setIsClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsClosing(false);
      }, 300);
    }
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
        className="m-font !absolute !top-[20px] sm:!top-[25px] lg:!top-[30px] !left-[20px] sm:!left-[50px]    !z-[100] !w-[100px] sm:!w-[120px] lg:!w-[140px] !h-[45px] sm:!h-[50px] lg:!h-[60px] !text-[16px] sm:!text-[18px] lg:!text-[20px] !rounded-[10px]"
        variant="outlined"
        sx={{
          borderColor: "transparent",
          borderWidth: "1px",
          backgroundColor: "#DBE2E74D",
        }}
        onClick={toggleMenu}
      >
        <span className="flex !font-semibold !text-white items-center gap-1 sm:gap-2">
          MENU{" "}
          <img
            src="/icons/menu3.svg"
            alt="menu"
            className="w-[18px] h-[14px] sm:w-[20px] sm:h-[16px] lg:w-[24px] lg:h-[18px]"
          />
        </span>
      </Button>

      <Button
        className="m-font !absolute !top-[20px] sm:!top-[25px] lg:!top-[30px] !right-[20px] sm:!right-[50px] !z-[100] !w-[120px] lg:!w-[150px] !h-[50px] lg:!h-[60px] !text-[16px] sm:!text-[18px] lg:!text-[20px] !rounded-[10px]"
        variant="outlined"
        sx={{
          borderColor: "transparent",
          borderWidth: "1px",
          backgroundColor: "transparent",
        }}
        onClick={() => router.push("/")}
      >
        <img src="/icons/logo.png" alt="" />
      </Button>

      {/* <Button
        className="m-font !absolute !top-[20px] sm:!top-[25px] lg:!top-[30px] !left-[20px] sm:!left-[50px] lg:!left-[170px] !z-[100] !w-[100px] sm:!w-[120px] lg:!w-[140px] !h-[45px] sm:!h-[50px] lg:!h-[60px] !text-[16px] sm:!text-[18px] lg:!text-[20px] !rounded-[100px]"
        variant="outlined"
        sx={{ borderColor: "transparent", borderWidth: "2px" }}
        onClick={toggleMenu}
      >
        <img
          src="/icons/menu2.svg"
          alt="menu"
          className="w-[64px] h-[64px] sm:w-[64px] sm:h-[64px] lg:w-[64px] lg:h-[64px]"
        />
      </Button> */}

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
              className="m-font !fixed !top-[20px] sm:!top-[25px] lg:!top-[30px] !left-[20px] sm:!left-[50px] !w-[100px] sm:!w-[120px] lg:!w-[140px] !h-[45px] sm:!h-[50px] lg:!h-[60px] !text-[16px] sm:!text-[18px] lg:!text-[20px] !rounded-[10px] !bg-[#f4f8ff] !shadow-none"
              variant="contained"
              sx={{ border: "1px solid #000000", backgroundColor: "#f4f8ff" }}
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

            <Button
              className="m-font !fixed !top-[20px] sm:!top-[25px] lg:!top-[30px] !right-[20px] sm:!right-[50px] !z-[100] !w-[120px] lg:!w-[150px] !h-[50px] lg:!h-[60px] !text-[16px] sm:!text-[18px] lg:!text-[20px] !rounded-[10px]"
              variant="outlined"
              sx={{
                borderColor: "transparent",
                borderWidth: "1px",
                backgroundColor: "transparent",
              }}
              onClick={() => router.push("/")}
            >
              <img src="/icons/logo.svg" alt="" />
            </Button>
            {/* <div className="w-[100px] h-[60px] sm:w-[120px] sm:h-[70px] lg:w-[150px] lg:h-[90px]">
              <img src="/icons/logo.svg" alt="" className="w-full h-full" />
            </div> */}
          </div>

          <main className="flex min-h-[calc(100vh-80px)]">
            <nav className="w-full lg:w-[633px] border-r border-gray-300 bg-white px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 pl-[20px] sm:pl-[40px] lg:pl-[70px] pr-[20px] sm:pr-[25px] lg:pr-[30px] flex flex-col text-lg font-normal text-black">
              {navigationItems.map((item, index) => {
                // Check if this item is active (handle hash routes)
                const isActive = (() => {
                  if (item.href.includes("#")) {
                    const basePath = item.href.split("#")[0];
                    return pathname === basePath || pathname === item.href;
                  }
                  return pathname === item.href;
                })();

                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between text-[24px] sm:text-[28px] lg:text-[34px] transition-all duration-300 group h-[80px] sm:h-[100px] lg:h-[120px] cursor-pointer ${
                      isActive
                        ? "font-semibold text-[#0356C2] border-b-2 border-[#0356C2]"
                        : "font-medium hover:font-semibold hover:text-[#0356C2] hover:border-b-2 hover:border-[#0356C2]"
                    }`}
                    onClick={() => handleNavigation(item.href)}
                    onMouseEnter={() => handleImageChange(item.image)}
                    onMouseLeave={() => {
                      const currentItem = getCurrentNavigationItem();
                      setCurrentImage(currentItem.image);
                    }}
                  >
                    {item.name}
                    {isActive && (
                      <img
                        src="/icons/right-arrow.svg"
                        alt=""
                        className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] lg:w-auto lg:h-auto"
                      />
                    )}
                  </div>
                );
              })}
            </nav>
            <div className="flex-1 hidden lg:block">
              {/* <img
                alt="Dynamic content image"
                className="w-full h-full object-cover transition-opacity duration-300"
                src={currentImage}
              /> */}
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                {/* Image placeholder: grey box */}
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default MenuBar;

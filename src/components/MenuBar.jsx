"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@mui/material"
import { useRouter, usePathname } from "next/navigation"

const MenuBar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [currentImage, setCurrentImage] = useState(
    "/images/home/light-rail.jpg",
  )
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  // Disable body scroll when sidebar is open
  useEffect(() => {
    if (isMenuOpen || isClosing) {
      // Save the current scroll position
      const scrollY = window.scrollY
      // Disable scroll
      // document.body.style.position = "fixed";
      // document.body.style.top = `-${scrollY}px`;
      // document.body.style.width = "100%";
      document.body.style.overflow = "hidden"

      return () => {
        // Re-enable scroll when component unmounts or menu closes
        document.body.style.position = ""
        document.body.style.top = ""
        document.body.style.width = ""
        document.body.style.overflow = ""
        window.scrollTo(0, scrollY)
      }
    }
  }, [isMenuOpen, isClosing])

  // Hide menu bar on product detail pages and DDG page (has custom header)
  if (pathname?.startsWith("/products/") && pathname !== "/products") {
    return null
  }
  if (pathname === "/ddg") {
    return null
  }

  // Icon component for menu items
  const MenuIcon = ({ name }) => {
    const iconSize = "w-5 h-5 sm:w-6 sm:h-6"
    const iconClass = `${iconSize} text-current transition-transform duration-300 group-hover:scale-110`

    switch (name) {
      case "Home":
        return (
          <svg
            className={iconClass}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        )
      case "Products":
        return (
          <svg
            className={iconClass}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        )
      case "Innovation":
        return (
          <svg
            className={iconClass}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        )
      case "Testing":
        return (
          <svg
            className={iconClass}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
      case "Standards & Certification":
        return (
          <svg
            className={iconClass}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
        )
      case "About Us":
        return (
          <svg
            className={iconClass}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
      case "Contacts":
        return (
          <svg
            className={iconClass}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        )
      case "DDG":
        return (
          <svg
            className={iconClass}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {/* Hull */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2 18h20M2 18l1-4h18l1 4"
            />
            {/* Bow */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2 18L4 14"
            />
            {/* Stern */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M22 18L20 14"
            />
            {/* Superstructure base */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18V12h12v6"
            />
            {/* Top deck */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12V8h8v4"
            />
            {/* Smokestack 1 */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 8V4h2v4"
            />
            {/* Smokestack 2 */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 8V4h2v4"
            />
            {/* Porthole 1 */}
            <circle cx="7" cy="16" r="1.5" strokeWidth={2} />
            {/* Porthole 2 */}
            <circle cx="10" cy="16" r="1.5" strokeWidth={2} />
            {/* Porthole 3 */}
            <circle cx="14" cy="16" r="1.5" strokeWidth={2} />
            {/* Porthole 4 */}
            <circle cx="17" cy="16" r="1.5" strokeWidth={2} />
          </svg>
        )
      default:
        return (
          <svg
            className={iconClass}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        )
    }
  }

  const navigationItems = [
    {
      name: "Home",
      image: "/images/home/light-rail.jpg",
      href: "/",
    },
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
      name: "DDG",
      image: "/images/ddg/USCGC_Polar_Sea_WAGB_11-small.jpg",
      href: "https://ddg-website-clyy.vercel.app/",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      name: "Contacts",
      image: "/images/contacts.png",
      href: "/contact-tdg",
    },
  ]

  // Get current navigation item based on pathname
  const getCurrentNavigationItem = () => {
    const currentItem = navigationItems.find((item) => {
      // Handle hash routes by checking if pathname matches the base path
      if (item.href.includes("#")) {
        const basePath = item.href.split("#")[0]
        return pathname === basePath || pathname === item.href
      }
      return item.href === pathname
    })
    return currentItem || navigationItems[0] // Default to Home if no match
  }

  // Update current image when pathname changes
  // useEffect(() => {
  //   const currentItem = getCurrentNavigationItem();
  //   setCurrentImage(currentItem.image);
  // }, [pathname]);

  const handleImageChange = (imagePath) => {
    setCurrentImage(imagePath)
  }

  const handleNavigation = (href, target, rel) => {
    if (href !== "#") {
      if (target && rel) {
        window.open(href, target, rel)
      } else {
        router.push(href)
      }
      // Close menu after navigation
      setIsClosing(true)
      setTimeout(() => {
        setIsMenuOpen(false)
        setIsClosing(false)
      }, 200) // Match the animation duration
    }
  }

  const toggleMenu = () => {
    if (isMenuOpen) {
      // Start closing animation
      setIsClosing(true)
      // Wait for animation to complete then hide menu
      setTimeout(() => {
        setIsMenuOpen(false)
        setIsClosing(false)
      }, 200) // Match the animation duration
    } else {
      setIsMenuOpen(true)
    }
  }

  return (
    <div>
      <Button
        className="m-font !fixed !top-[10px] sm:!top-[12.5px] !left-[10px] sm:!left-[50px] !z-[100] !w-[50px] sm:!w-[130px] !h-[45px] sm:!h-[55px] !text-[16px] sm:!text-[18px] lg:!text-[20px] !rounded-[3px] !backdrop-blur-md !shadow-lg hover:!bg-[#f6f9ff]/80 hover:!shadow-2xl transition-all duration-200"
        variant="outlined"
        sx={{
          backgroundColor: "#dbe2e738",
          boxShadow: "0 8px 24px 0 rgba(45,78,255,0.07)",
          backdropFilter: "blur(10px)",
          borderColor: "transparent",
        }}
        onClick={toggleMenu}
      >
        <span className="flex !font-semibold !text-white items-center gap-1 sm:gap-2 drop-shadow-sm">
          <span className="tracking-wide pr-1 max-sm:hidden">MENU</span>
          <span className="rounded-full flex items-center justify-center shadow-inner">
            <img
              src="/icons/menu3.svg"
              alt="menu"
              className="w-[18px] h-[14px] drop-shadow"
            />
          </span>
        </span>
      </Button>

      <Button
        className="m-font !fixed !top-[10px] sm:!top-[12px] !p-0 !right-[10px] sm:!right-[50px] !z-[100] w-[80px] sm:!w-[110px] !text-[16px] sm:!text-[18px] lg:!text-[20px] !rounded-[10px]"
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

      {/* Blurred backdrop overlay */}
      {(isMenuOpen || isClosing) && (
        <div
          className={`fixed z-[110] top-0 left-0 bottom-0 right-0 bg-black/50 backdrop-blur-sm ${
            isClosing ? "animate-fadeOut" : "animate-fadeIn"
          }`}
          onClick={toggleMenu}
        />
      )}

      {/* Side menu */}
      {(isMenuOpen || isClosing) && (
        <div
          className={`fixed z-[120] top-0 left-0 bottom-0 sm:top-[10px] sm:left-[10px] sm:bottom-[10px] rounded-[5px] w-full sm:w-[380px] lg:w-[420px] bg-white shadow-[0_4px_32px_0_rgba(255,255,255,0.20)] border border-gray-100 overflow-hidden ${
            isClosing ? "animate-slideOutLeft" : "animate-slideInLeft"
          }`}
        >
          <div className="h-full flex flex-col bg-white">
            {/* Header with TDG logo and close button */}
            <div className="h-[70px] sm:h-[85px] flex items-center justify-between px-5 border-b border-gray-200 bg-gradient-to-br bg-gray-100">
              {/* TDG Logo and Text */}
              <button
                onClick={() => {
                  router.push("/")
                  toggleMenu()
                }}
                className="flex items-center gap-2 sm:gap-3 hover:opacity-90 transition-all duration-200 group"
              >
                <div className="relative">
                  <img
                    src="/icons/logo.svg"
                    alt="TDG Logo"
                    className="w-[100px] transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
              </button>

              {/* Close Button */}
              <button
                onClick={toggleMenu}
                className="flex items-center justify-center w-[38px] h-[38px] sm:w-[45px] sm:h-[45px] rounded-[4px] bg-white hover:bg-[#f4f8ff] border border-gray-300 hover:border-[#2d4a86]/20 transition-all duration-200  hover:shadow-md group"
                aria-label="Close menu"
              >
                <svg
                  className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] text-gray-600 group-hover:text-[#2d4a86] transition-colors duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation items */}
            <nav className="flex-1 overflow-y-auto px-4 sm:px-5 lg:px-6 py-5 sm:py-6 lg:py-7 flex flex-col gap-2">
              {navigationItems.map((item, index) => {
                // Check if this item is active (handle hash routes)
                const isActive = (() => {
                  if (item.href.includes("#")) {
                    const basePath = item.href.split("#")[0]
                    return pathname === basePath || pathname === item.href
                  }
                  return pathname === item.href
                })()

                return (
                  <button
                    key={index}
                    className={`group relative flex items-center gap-3 sm:gap-4 lg:gap-4 px-4 py-3.5 sm:py-4 lg:py-4.5 rounded-[5px] transition-all duration-200 text-left w-full ${
                      isActive
                        ? "text-[#2d4a86] font-semibold bg-gradient-to-r from-[#f4f8ff] to-[#f0f5ff] border-l-4 border-[#2d4a86]"
                        : "text-gray-700 font-medium hover:text-[#2d4a86] hover:bg-gradient-to-r hover:from-gray-50 hover:to-[#f4f8ff]/50 border-l-4 border-transparent"
                    }`}
                    onClick={() =>
                      handleNavigation(item.href, item.target, item.rel)
                    }
                    onMouseEnter={() => handleImageChange(item.image)}
                    onMouseLeave={() => {
                      const currentItem = getCurrentNavigationItem()
                      setCurrentImage(currentItem.image)
                    }}
                  >
                    {/* Icon */}
                    <div
                      className={`flex-shrink-0 transition-colors duration-300 ${
                        isActive
                          ? "text-[#2d4a86]"
                          : "text-gray-500 group-hover:text-[#2d4a86]"
                      }`}
                    >
                      <MenuIcon name={item.name} />
                    </div>

                    {/* Text with underline effect */}
                    <span className="relative flex-1 text-[16px] sm:text-[17px] lg:text-[19px] tracking-wide font-medium">
                      {item.name}
                      {/* Underline animation matching footer */}
                      <span
                        className={`absolute bottom-[-2px] left-0 h-[2px] bg-[#2d4a86] transition-all duration-200 rounded-full ${
                          isActive ? "w-0" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </span>

                    {/* Right arrow for active item */}
                    {isActive && (
                      <div className="flex-shrink-0 opacity-80">
                        <svg
                          className="w-5 h-5 sm:w-5 sm:h-5 text-[#2d4a86]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}

export default MenuBar

import React from "react";

const Footer = () => {
  return (
    <footer
      className="relative bg-[#f9fafb] pt-12 sm:pt-16 md:pt-20 lg:pt-[100px] pb-6 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40"
      style={{
        background: "url(/images/footer-bg2.png)",
        backgroundPosition: "50% 72%",
        backgroundSize: "cover",
      }}
    >
      {/* Background overlay to reduce opacity */}
      {/* Top Section */}
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-6 sm:gap-8 md:gap-12 lg:gap-0 max-w-[1905px]">
        {/* Logo + Share */}
        <div className="flex flex-col md:items-center md:gap-6 z-10">
          <div className="flex-shrink-0">
            <img
              src="/icons/white-logo.svg"
              alt="TDG Transit Design Group logo with blue and gold swoosh"
              className="w-[200px] sm:w-[280px] md:w-[320px] lg:w-[350px] h-auto"
            />
          </div>
          <div className="mt-3 sm:mt-4 md:mt-6 lg:mt-0">
            <button
              type="button"
              className="cursor-pointer inline-flex font-semibold items-center gap-2 border-2 border-[#ffffff] text-[#161C25] text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px] rounded-full px-[8px] sm:px-[10px] py-[8px] sm:py-[10px] focus:outline-none"
            >
              <img
                src="/icons/white-in.svg"
                alt="TDG Transit Design Group logo with blue and gold swoosh"
                className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] md:w-[35px] md:h-[35px] lg:w-[38px] lg:h-[38px]"
              />
              <span className="pr-2 text-[#FFFFFF]">Share</span>
            </button>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row sm:gap-20 md:gap-32 lg:gap-50 text-sm text-[#FFFFFF] z-10">
          <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-8 mb-4 sm:mb-6 md:mb-0">
            <a
              href="#"
              className="hover:underline text-[18px] sm:text-[22px] md:text-[24px] lg:text-[26px] font-medium"
            >
              About Us
            </a>
            <a
              href="#"
              className="hover:underline text-[18px] sm:text-[22px] md:text-[24px] lg:text-[26px] font-medium"
            >
              Sustainability
            </a>
            <a
              href="#"
              className="hover:underline text-[18px] sm:text-[22px] md:text-[24px] lg:text-[26px] font-medium"
            >
              Career
            </a>
          </div>
          <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-8">
            <a
              href="#"
              className="hover:underline text-[18px] sm:text-[22px] md:text-[24px] lg:text-[26px] font-medium"
            >
              Contacts
            </a>
            <a
              href="#"
              className="hover:underline text-[18px] sm:text-[22px] md:text-[24px] lg:text-[26px] font-medium"
            >
              Media
            </a>
            <a
              href="#"
              className="hover:underline text-[18px] sm:text-[22px] md:text-[24px] lg:text-[26px] font-medium"
            >
              Products
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="mx-auto mt-12 sm:mt-16 md:mt-24 lg:mt-[150px] flex flex-col sm:flex-row sm:items-center sm:gap-4 md:gap-8 lg:gap-6 text-xs text-[#FFFFFF] z-10 max-w-[1905px]">
        <nav className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-4 font-semibold">
          <a
            href="#"
            className="hover:underline text-[16px] sm:text-[20px] md:text-[22px] lg:text-[24px]"
          >
            Privacy
          </a>
          <span className="text-[16px] sm:text-[20px] md:text-[22px] lg:text-[24px]">
            |
          </span>
          <a
            href="#"
            className="hover:underline text-[16px] sm:text-[20px] md:text-[22px] lg:text-[24px]"
          >
            Contacts
          </a>
          <span className="text-[16px] sm:text-[20px] md:text-[22px] lg:text-[24px]">
            |
          </span>
          <a
            href="#"
            className="hover:underline text-[16px] sm:text-[20px] md:text-[22px] lg:text-[24px]"
          >
            Accessibility
          </a>
        </nav>
      </div>

      {/* Copyright */}
      <div className="text-[16px] sm:text-[19px] md:text-[20px] lg:text-[22px] mx-auto mt-2 font-medium text-[#FFFFFF] z-10 py-6 sm:py-8 md:py-12 lg:py-[30px] max-w-[1905px]">
        <p>© TDG Transit Design Group 2025</p>
      </div>
    </footer>
  );
};

export default Footer;

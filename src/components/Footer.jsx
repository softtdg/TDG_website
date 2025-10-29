"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();

  const handleAboutUsClick = () => {
    router.push("/about-us");
  };

  const handleContactsClick = () => {
    router.push("/contact-tdg");
  };

  return (
    <footer className="relative w-full bg-[#0A2A5E] text-white px-6 lg:px-20 py-12 lg:py-16">
      {/* Background Wave */}
      <div className="absolute inset-0">
        <img
          src="/images/footer-bg.png" // use your footer wave background here
          alt="footer background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto pt-[90px] pb-[50px]">
        {/* First Row - Logo and Navigation Links */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 mb-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="/images/home/tdg-logo.png"
              alt="TDG Logo"
              className="w-[150px] lg:w-[202px] h-auto"
            />
          </div>

          {/* Right Section - Links */}
          <div className="grid grid-cols-2 gap-x-22 gap-y-6 text-sm font-medium">
            <button
              onClick={handleAboutUsClick}
              className="hover:text-gray-300 font-bold text-lg sm:text-2xl md:text-[26px] lg:text-[30px] text-left cursor-pointer"
            >
              About Us
            </button>
            <button
              onClick={handleContactsClick}
              className="hover:text-gray-300 text-left font-bold text-lg sm:text-2xl md:text-[26px] lg:text-[30px] cursor-pointer"
            >
              Contacts
            </button>
            <a
              href="#"
              className="hover:text-gray-300 font-bold text-lg sm:text-2xl md:text-[26px] lg:text-[30px]"
            >
              Sustainability
            </a>
            <a
              href="#"
              className="hover:text-gray-300 font-bold text-lg sm:text-2xl md:text-[26px] lg:text-[30px]"
            >
              Media
            </a>
            <a
              href="#"
              className="hover:text-gray-300 font-bold text-lg sm:text-2xl md:text-[26px] lg:text-[30px]"
            >
              Career
            </a>
            <a
              href="#"
              className="hover:text-gray-300 font-bold text-lg sm:text-2xl md:text-[26px] lg:text-[30px]"
            >
              Products
            </a>
          </div>
        </div>

        {/* Second Row - Privacy Links and Copyright */}
        <div className="flex flex-col gap-4 pt-[50px]">
          {/* Privacy Links */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm">
            <a
              href="#"
              className="hover:text-gray-300 font-bold text-lg sm:text-2xl md:text-[26px] lg:text-[30px]"
            >
              Privacy
            </a>
            <span className="font-bold text-lg sm:text-2xl md:text-[26px] lg:text-[30px]">
              |
            </span>
            <button
              onClick={handleContactsClick}
              className="hover:text-gray-300 font-bold text-lg sm:text-2xl md:text-[26px] lg:text-[30px] cursor-pointer"
            >
              Contacts
            </button>
            <span className="font-bold text-lg sm:text-2xl md:text-[26px] lg:text-[30px]">
              |
            </span>
            <a
              href="#"
              className="hover:text-gray-300 font-bold text-lg sm:text-2xl md:text-[26px] lg:text-[30px]"
            >
              Accessibility
            </a>
          </div>

          {/* Copyright */}
          <p className="font-bold text-center lg:text-left text-base sm:text-lg md:text-xl lg:text-[25px]">
            © TDG TRANSIT DESIGN GROUP 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// "use client";
// import React, { useState } from "react";

// const Footer = () => {
//   const [email, setEmail] = useState("");

//   const handleSubscribe = (e) => {
//     e.preventDefault();
//     // Handle subscription logic here
//     console.log("Subscribed with email:", email);
//     setEmail("");
//   };
//   return (
//     <div className="relative w-full py-[100px] sm:py-[200px] overflow-hidden">
//       {/* Background Image with Overlay */}
//       <div className="absolute inset-0">
//         <img
//           src="/images/footer.png"
//           alt="Modern train on tracks"
//           className="w-full h-full object-cover"
//         />
//         {/* <div className="absolute inset-0 bg-black bg-opacity-60"></div> */}
//       </div>

//       {/* Content - Centered Layout */}
//       <div className="relative z-10 w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
//         <div className="max-w-[1400px] mx-auto w-full">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20 items-center">
//             {/* Left Section - Branding and Social Media */}
//             <div className="flex flex-col items-center lg:items-start w-fit">
//               {/* TDG Logo */}
//               <div className="mb-8 w-full">
//                 <img
//                   src="/images/home/tdg-logo.png"
//                   alt="TDG Logo"
//                   className="w-[138px] h-auto block mx-auto"
//                 />
//               </div>

//               {/* Since 1989 */}
//               <div className="mb-8">
//                 <p
//                   className="uppercase text-[56px] leading-none font-bold text-transparent"
//                   style={{
//                     WebkitTextStroke: "1px #fff",
//                     color: "transparent",
//                     textStroke: "1px #fff",
//                     fontFamily: "inherit",
//                   }}
//                 >
//                   SINCE 1989
//                 </p>
//               </div>

//               {/* Social Media Icons */}
//               <div className="flex space-x-6">
//                 {/* Facebook */}
//                 <a
//                   href="#"
//                   className="w-[25px] h-[25px] rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
//                 >
//                   <img
//                     src="/icons/footer/insta.svg"
//                     alt="Facebook"
//                     className="w-full h-full"
//                   />
//                 </a>

//                 {/* Instagram */}
//                 <a
//                   href="#"
//                   className="w-[25px] h-[25px] rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
//                 >
//                   <img
//                     src="/icons/footer/facebook.svg"
//                     alt="Instagram"
//                     className="w-full h-full"
//                   />
//                 </a>

//                 {/* LinkedIn */}
//                 <a
//                   href="#"
//                   className="w-[25px] h-[25px] rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
//                 >
//                   <img
//                     src="/icons/footer/in.svg"
//                     alt="LinkedIn"
//                     className="w-full h-full"
//                   />
//                 </a>

//                 {/* Twitter */}
//                 <a
//                   href="#"
//                   className="w-[25px] h-[25px] rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
//                 >
//                   <img
//                     src="/icons/footer/twit.svg"
//                     alt="Twitter"
//                     className="w-full h-full"
//                   />
//                 </a>
//               </div>
//             </div>

//             {/* Middle Section - Important Links */}
//             <div className="flex flex-col items-center lg:items-start">
//               <h3 className="text-white text-[25px] font-bold uppercase mb-8 w-full max-sm:text-center">
//                 IMPORTANT LINKS
//               </h3>

//               <div className="grid grid-cols-2 gap-y-4 w-full">
//                 {/* Left Column */}
//                 <div className="space-y-4 w-[100%] md:w-[80%]">
//                   <a
//                     href="#"
//                     className="block text-white hover:text-gray-300 transition-colors duration-200 text-[15px]"
//                   >
//                     Home
//                   </a>
//                   <a
//                     href="#"
//                     className="block text-white hover:text-gray-300 transition-colors duration-200 text-[15px]"
//                   >
//                     Pages
//                   </a>
//                   <a
//                     href="#"
//                     className="block text-white hover:text-gray-300 transition-colors duration-200 text-[15px]"
//                   >
//                     About
//                   </a>
//                   <a
//                     href="#"
//                     className="block text-white hover:text-gray-300 transition-colors duration-200 text-[15px]"
//                   >
//                     Blog
//                   </a>
//                   <a
//                     href="#"
//                     className="block text-white hover:text-gray-300 transition-colors duration-200 text-[15px]"
//                   >
//                     Contact
//                   </a>
//                 </div>

//                 {/* Right Column */}
//                 <div className="space-y-4">
//                   <a
//                     href="#"
//                     className="block text-white hover:text-gray-300 transition-colors duration-200 text-[15px]"
//                   >
//                     Company Profile
//                   </a>
//                   <a
//                     href="#"
//                     className="block text-white hover:text-gray-300 transition-colors duration-200 text-[15px]"
//                   >
//                     Help Center
//                   </a>
//                   <a
//                     href="#"
//                     className="block text-white hover:text-gray-300 transition-colors duration-200 text-[15px]"
//                   >
//                     Career
//                   </a>
//                   <a
//                     href="#"
//                     className="block text-white hover:text-gray-300 transition-colors duration-200 text-[15px]"
//                   >
//                     Plans & Pricing
//                   </a>
//                   <a
//                     href="#"
//                     className="block text-white hover:text-gray-300 transition-colors duration-200 text-[15px]"
//                   >
//                     News & Blog
//                   </a>
//                 </div>
//               </div>
//             </div>

//             {/* Right Section - Email Update */}
//             <div className="flex flex-col items-center lg:items-start h-full">
//               <h3 className="text-white text-[25px] font-bold uppercase mb-8">
//                 EMAIL UPDATE
//               </h3>

//               <form onSubmit={handleSubscribe} className="w-full max-w-sm">
//                 <div className="mb-8">
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Email"
//                     className="w-full px-4 py-3 bg-transparent border border-[#E5E5E5] text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
//                     required
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-[#DBE2E7] hover:bg-gray-400 text-black font-bold uppercase px-6 py-3 rounded-lg transition-colors duration-200 text-[13px]"
//                 >
//                   SUBSCRIBE
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Footer;

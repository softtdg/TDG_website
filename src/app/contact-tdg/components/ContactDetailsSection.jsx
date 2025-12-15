// "use client";

// import React, { useState } from "react";
// import EastIcon from "@mui/icons-material/East";

// const ContactDetailsSection = ({ selectedLocation }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     website: "",
//     message: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // You can add API call or email service integration here
//   };

//   // Default location if none selected
//   const location = selectedLocation;

//   return (
//     <div id="contact-details-section" className="bg-white py-16">
//       <div className="max-w-[1300px] mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-sm:px-[15px]">
//           {/* Left Side - Contact Information and Form */}
//           <div className="flex flex-col justify-center">
//             <div className="space-y-8">
//               {/* Contact Information */}
//               <div className="space-y-6">
//                 <div className="space-y-1">
//                   <h2 className="text-[20px] sm:text-[25px] font-semibold text-[#F48C06] uppercase">
//                     {location.name}
//                   </h2>
//                   <p className="text-black font-bold text-[14px]">
//                     FOR SALES AND INQUIRIES:
//                   </p>

//                   <a
//                     href={`mailto:${location.email}`}
//                     className="text-[#0E54C4] font-bold  text-[14px] block hover:text-red-700 transition-colors mb-3 sm:mb-5 break-all"
//                   >
//                     {location.email.toUpperCase()}
//                   </a>

//                   <p className="text-black text-[14px] sm:text-[15px] break-words">
//                     {location.address}
//                   </p>
//                 </div>
//               </div>

//               {/* Contact Form */}
//               <div className="space-y-4">
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <div>
//                     <input
//                       type="text"
//                       name="name"
//                       placeholder="Name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-[#E5E5E5] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-[15px] sm:text-base"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <input
//                       type="email"
//                       name="email"
//                       placeholder="Email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-[#E5E5E5] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-[15px] sm:text-base"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <input
//                       type="url"
//                       name="website"
//                       placeholder="Website"
//                       value={formData.website}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-[#E5E5E5] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-[15px] sm:text-base"
//                     />
//                   </div>

//                   <div>
//                     <textarea
//                       name="message"
//                       placeholder="Message"
//                       value={formData.message}
//                       onChange={handleInputChange}
//                       rows={4}
//                       className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-[#E5E5E5] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none bg-white text-[15px] sm:text-base"
//                       required
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     className="w-full sm:w-auto bg-[#08294cea] hover:bg-[#08294c] text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg transition-colors duration-200 text-[13px] sm:text-[15px]"
//                   >
//                     CONTACT NOW
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Map */}
//           <div className="">
//             <div className="h-96 lg:h-[700px] overflow-hidden rounded-[0px] shadow-xl">
//               <iframe
//                 key={`${location?.map_lat}-${location?.map_lng}`}
//                 src={`https://maps.google.com/maps?q=${location.map_lat},${location.map_lng}&hl=en&z=15&output=embed`}
//                 style={{ width: "100%", height: "100%" }}
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//                 title={`Map of ${location.name}`}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactDetailsSection;

"use client";

import React, { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import SendIcon from "@mui/icons-material/Send";

const ContactDetailsSection = ({ selectedLocation }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add API call or email service integration here
  };

  // Default location if none selected
  const location = selectedLocation;

  return (
    <div
      id="contact-details-section"
      className="bg-gray-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Contact Information and Form */}
          <div className="flex flex-col justify-center space-y-5">
            {/* Contact Information Card */}
            <div className="bg-white shadow-md p-6 sm:p-8">
              <div className="space-y-4">
                {/* Office Name */}
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <BusinessIcon className="text-[#0356C2] text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      {location.name}
                    </h2>
                    <div className="h-1 w-16 bg-[#f48c06] rounded-full"></div>
                  </div>
                </div>

                {/* Sales Inquiries Label */}
                <div className="pt-2">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
                    For Sales and Inquiries
                  </p>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <EmailIcon className="text-[#0356C2] text-xl" />
                  </div>
                  <div className="flex-1">
                    <a
                      href={`mailto:${location.email}`}
                      className="text-[#0356C2] font-semibold text-base sm:text-lg hover:text-[#0248A0] transition-colors break-all inline-flex items-center gap-2 group"
                    >
                      {location.email}
                      <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </span>
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4 pt-2">
                  <div className="mt-1 flex-shrink-0">
                    <LocationOnIcon className="text-[#0356C2] text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      {location.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Card */}
            <div className="bg-white p-6 sm:p-8 border border-gray-200">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0356C2] focus:border-[#0356C2] outline-none transition-all bg-white text-base placeholder-gray-400 hover:border-gray-400"
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0356C2] focus:border-[#0356C2] outline-none transition-all bg-white text-base placeholder-gray-400 hover:border-gray-400"
                    required
                  />
                </div>

                <div>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    placeholder="Website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0356C2] focus:border-[#0356C2] outline-none transition-all bg-white text-base placeholder-gray-400 hover:border-gray-400"
                  />
                </div>

                <div>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0356C2] focus:border-[#0356C2] outline-none transition-all resize-none bg-white text-base placeholder-gray-400 hover:border-gray-400"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#003f92] hover:bg-[#0248A0] active:bg-[#023a7d] text-white font-semibold py-3.5 px-6 rounded-lg transition-all duration-200 text-base shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0356C2] focus:ring-offset-2 flex items-center justify-center gap-2"
                >
                  <span>Send Message</span>
                  <SendIcon className="text-lg" />
                </button>
              </form>
            </div>
          </div>

          {/* Right Side - Map */}
          <div className="lg:col-span-1 h-full">
            <div className="bg-white overflow-hidden border border-gray-200 h-full">
              <iframe
                key={`${location?.map_lat}-${location?.map_lng}`}
                src={`https://maps.google.com/maps?q=${location.map_lat},${location.map_lng}&hl=en&z=15&output=embed`}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${location.name}`}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsSection;

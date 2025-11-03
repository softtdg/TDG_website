"use client";

import React, { useState } from "react";
import EastIcon from "@mui/icons-material/East";

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
    <div id="contact-details-section" className="bg-white py-16">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-sm:px-[15px]">
          {/* Left Side - Contact Information and Form */}
          <div className="flex flex-col justify-center">
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-black font-bold text-[20px] sm:text-[23px]">
                    FOR SALES AND INQUIRIES:
                  </h2>

                  <a
                    href={`mailto:${location.email}`}
                    className="text-[#0E54C4] font-bold text-[18px] sm:text-[23px] block hover:text-red-700 transition-colors mb-3 sm:mb-5 break-all"
                  >
                    {location.email.toUpperCase()}
                  </a>

                  <p className="text-black text-[14px] sm:text-[15px] break-words">
                    {location.address}
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-[#E5E5E5] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-[15px] sm:text-base"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-[#E5E5E5] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-[15px] sm:text-base"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="url"
                      name="website"
                      placeholder="Website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-[#E5E5E5] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-[15px] sm:text-base"
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-[#E5E5E5] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none bg-white text-[15px] sm:text-base"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#0E54C4] hover:bg-[#0E54C4] text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg transition-colors duration-200 text-[13px] sm:text-[15px]"
                  >
                    CONTACT NOW
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Side - Map */}
          <div className="">
            <div className="h-96 lg:h-[700px] overflow-hidden rounded-[0px] shadow-xl">
              <iframe
                key={`${location?.map_lat}-${location?.map_lng}`}
                src={`https://maps.google.com/maps?q=${location.map_lat},${location.map_lng}&hl=en&z=15&output=embed`}
                style={{ width: "100%", height: "100%" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${location.name}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsSection;

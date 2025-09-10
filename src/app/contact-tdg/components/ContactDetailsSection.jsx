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
    console.log("Form submitted:", formData);
    // You can add API call or email service integration here
  };

  // Default location if none selected
  const location = selectedLocation || {
    name: "TDG Canada",
    address: "1.3770 Laird Rd Building A, Mississauga, ON L5L 0A7, Canada",
    email: "sales_canada@tdgdesign.com",
    phone: "+1 (905) 123-4567",
    lat: 43.6532,
    lng: -79.3832,
  };

  return (
    <div id="contact-details-section" className="bg-white py-16">
      <div className="max-w-[90%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Side - Map */}
          <div className="">
            <div className="h-96 lg:h-[700px] overflow-hidden">
              <iframe
                key={`${location.lat}-${location.lng}`}
                src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&hl=en&z=15&output=embed`}
                style={{ width: "100%", height: "100%" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${location.name}`}
              />
            </div>
          </div>

          {/* Right Side - Contact Information and Form */}
          <div className="">
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="pt-[50px]">
                    <p className="text-[#070707] font-medium text-center text-[22px] opacity-80">
                      {location.address}
                    </p>
                  </div>

                  <div className="text-[22px] font-bold text-center text-[#003A5D]">
                    FOR SALES AND INQUIRIES:{" "}
                    <a
                      href={`mailto:${location.email}`}
                      className="text-[#003A5D] hover:text-[#003A5D]"
                    >
                      {location.email.toUpperCase()}
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-transparent bg-[#F0F0F0] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
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
                      className="w-full px-4 py-3 border border-transparent bg-[#F0F0F0] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
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
                      className="w-full px-4 py-3 border border-transparent bg-[#F0F0F0] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={7}
                      className="w-full px-4 py-3 border border-transparent bg-[#F0F0F0] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-fit rounded-[100px] mx-auto bg-[#0356C2] hover:bg-blue-700 text-white font-[700] text-[20px] py-3 px-6 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    Submit Now
                    <EastIcon />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsSection;

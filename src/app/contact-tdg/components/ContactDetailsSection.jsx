"use client";

import React, { useState, useCallback } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
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

  const render = (status) => {
    switch (status) {
      case Status.LOADING:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-600">Loading map...</div>
          </div>
        );
      case Status.FAILURE:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-red-600">Error loading map</div>
          </div>
        );
      case Status.SUCCESS:
        return (
          <GoogleMap
            center={{
              lat: location.lat,
              lng: location.lng,
            }}
            zoom={15}
            mapTypeControl={true}
            streetViewControl={true}
            fullscreenControl={true}
            zoomControl={true}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "8px",
            }}
          >
            <Marker
              position={{
                lat: location.lat,
                lng: location.lng,
              }}
              title={location.name}
            />
          </GoogleMap>
        );
      default:
        return null;
    }
  };

  // GoogleMap component
  const GoogleMap = ({ center, zoom, children, style, ...options }) => {
    const ref = React.useRef(null);
    const [map, setMap] = React.useState();

    React.useEffect(() => {
      if (ref.current && !map) {
        setMap(
          new window.google.maps.Map(ref.current, {
            center,
            zoom,
            ...options,
          })
        );
      }
    }, [ref, map, center, zoom, options]);

    React.useEffect(() => {
      if (map) {
        map.setCenter(center);
        map.setZoom(zoom);
      }
    }, [map, center, zoom]);

    return (
      <div ref={ref} style={style}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { map });
          }
        })}
      </div>
    );
  };

  // Marker component
  const Marker = ({ position, map, title }) => {
    const [marker, setMarker] = React.useState();

    React.useEffect(() => {
      if (!marker && map) {
        setMarker(
          new window.google.maps.Marker({
            position,
            map,
            title,
          })
        );
      }
    }, [marker, map, position, title]);

    React.useEffect(() => {
      if (marker) {
        marker.setPosition(position);
        marker.setTitle(title);
      }
    }, [marker, position, title]);

    return null;
  };

  // Default location if none selected
  const location = selectedLocation || {
    name: "TDG Canada",
    address: "1.3770 Laird Rd Building A, Mississauga, ON L5L 0A7, Canada",
    email: "sales_canada@tdgdesign.com",
    phone: "+1 (905) 123-4567",
  };

  return (
    <div id="contact-details-section" className="bg-white py-16">
      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side - Map */}
          <div className="">
            <div className="h-96 lg:h-[700px] overflow-hidden">
              <Wrapper
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                render={render}
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
              <div className="space-y-6 px-[20px]">
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

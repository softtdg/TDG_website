"use client";

import { useState } from "react";
import { HeroSection } from "./components/HeroSection";
import Earth3D from "./components/Earth3D";
import ContactDetailsSection from "./components/ContactDetailsSection";
import MenuBar from "@/components/MenuBar";
import Footer from "@/components/Footer";

const ContactPage = () => {
  // Set TDG Canada as default selected location
  const [selectedLocation, setSelectedLocation] = useState({
    id: 1,
    name: "TDG Canada",
    city: "Mississauga",
    country: "Canada",
    address: "1.3770 Laird Rd Building A, Mississauga, ON L5L 0A7, Canada",
    phone: "+1 (905) 123-4567",
    email: "sales_canada@tdgdesign.com",
    lat: 43.589,
    lng: -79.6441,
    color: "#3B82F6",
  });

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <Earth3D onLocationSelect={handleLocationSelect} />
      <ContactDetailsSection selectedLocation={selectedLocation} />
    </div>
  );
};

export default ContactPage;

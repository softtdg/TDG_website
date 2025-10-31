"use client";

import { useState } from "react";
import { HeroSection } from "./components/HeroSection";
import Earth3D, { officeLocations } from "./components/Earth3D";
import ContactDetailsSection from "./components/ContactDetailsSection";
import OtherOfficesCards from "./components/OtherOfficesCards";
import MenuBar from "@/components/MenuBar";
import Footer from "@/components/Footer";

const ContactPage = () => {
  // Set TDG Canada as default selected location - find it from officeLocations
  const defaultCanadaLocation =
    officeLocations.find(
      (loc) => loc.email?.toLowerCase() === "sales_canada@tdgdesign.com"
    ) ||
    officeLocations.find((loc) => loc.id === 4) ||
    officeLocations[0];

  const [selectedLocation, setSelectedLocation] = useState(
    defaultCanadaLocation
  );

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* <HeroSection /> */}
      <Earth3D onLocationSelect={handleLocationSelect} />
      <ContactDetailsSection selectedLocation={selectedLocation} />
      <OtherOfficesCards
        locations={officeLocations}
        selectedLocationId={selectedLocation.id}
        onSelect={(loc) => setSelectedLocation(loc)}
      />
    </div>
  );
};

export default ContactPage;

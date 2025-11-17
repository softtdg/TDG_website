"use client";

import { useState, useEffect } from "react";
import { HeroSection } from "./components/HeroSection";
import Earth3D, { officeLocations } from "./components/Earth3D";
import ContactDetailsSection from "./components/ContactDetailsSection";
import OtherOfficesCards from "./components/OtherOfficesCards";
import MenuBar from "@/components/MenuBar";
import Footer from "@/components/Footer";

const ContactPage = () => {
  // State to store visitor's country
  const [visitorCountry, setVisitorCountry] = useState(null);
  const [countryDetectionLoading, setCountryDetectionLoading] = useState(true);

  // Detect visitor's country on component mount
  useEffect(() => {
    const detectCountry = async () => {
      try {
        // Method 1: ipapi.co (free tier: 1000 requests/month)
        // try {
        //   const response = await fetch("https://ipapi.co/json/");
        //   if (response.ok) {
        //     const data = await response.json();
        //     if (data.country_name) {
        //       setVisitorCountry(data.country_name);
        //       console.log("🌍 Visitor's Country Detected:", data.country_name);
        //       console.log("📍 Full Location Data:", {
        //         country: data.country_name,
        //         countryCode: data.country_code,
        //         city: data.city,
        //         region: data.region,
        //         ip: data.ip,
        //       });
        //       setCountryDetectionLoading(false);
        //       return;
        //     }
        //   }
        // } catch (error) {
        //   console.log("ipapi.co failed, trying alternative...");
        // }

        // // Method 2: ip-api.com (free tier: 45 requests/minute)
        // try {
        //   const response = await fetch("http://ip-api.com/json/");
        //   if (response.ok) {
        //     const data = await response.json();
        //     if (data.country) {
        //       setVisitorCountry(data.country);
        //       console.log("🌍 Visitor's Country Detected:", data.country);
        //       console.log("📍 Full Location Data:", {
        //         country: data.country,
        //         countryCode: data.countryCode,
        //         city: data.city,
        //         region: data.regionName,
        //         ip: data.query,
        //       });
        //       setCountryDetectionLoading(false);
        //       return;
        //     }
        //   }
        // } catch (error) {
        //   console.log("ip-api.com failed, trying alternative...");
        // }

        // Method 3: geojs.io (free, no API key)
        try {
          const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
          if (response.ok) {
            const data = await response.json();
            if (data.country) {
              setVisitorCountry(data.country);
              setCountryDetectionLoading(false);
              return;
            }
          }
        } catch (error) {
          console.log("geojs.io failed");
        }

        // If all methods fail
        console.warn("⚠️ Could not detect visitor's country");
        setCountryDetectionLoading(false);
      } catch (error) {
        console.error("Error detecting country:", error);
        setCountryDetectionLoading(false);
      }
    };

    detectCountry();
  }, []);

  // Set TDG Canada as default selected location initially
  const defaultCanadaLocation =
    officeLocations.find(
      (loc) => loc.email?.toLowerCase() === "sales_canada@tdgdesign.com"
    ) ||
    officeLocations.find((loc) => loc.id === 4) ||
    officeLocations[0];

  const [selectedLocation, setSelectedLocation] = useState(
    defaultCanadaLocation
  );

  // Update selected location when country is detected
  useEffect(() => {
    if (visitorCountry && !countryDetectionLoading) {
      const matchingLocation = officeLocations.find(
        (loc) =>
          loc.country.toLowerCase() === visitorCountry.toLowerCase() ||
          (visitorCountry.toLowerCase().includes("united states") &&
            loc.country.toLowerCase().includes("united states")) ||
          (visitorCountry.toLowerCase().includes("uk") &&
            loc.country.toLowerCase().includes("united kingdom"))
      );

      if (matchingLocation) {
        // console.log(
        //   `✅ Auto-selecting ${matchingLocation.name} based on visitor's country (${visitorCountry})`
        // );
        setSelectedLocation(matchingLocation);
      }
    }
  }, [visitorCountry, countryDetectionLoading]);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* <HeroSection /> */}
      <Earth3D
        onLocationSelect={handleLocationSelect}
        visitorCountry={visitorCountry}
      />
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

"use client";

import { useState } from "react";
import { HeroSection } from "./components/HeroSection";
import Earth3D from "./components/Earth3D";
import MenuBar from "@/components/MenuBar";
import Footer from "@/components/Footer";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
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
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You can add API call or email service integration here
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <Earth3D />
    </div>
  );
};

export default ContactPage;

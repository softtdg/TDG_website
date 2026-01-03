"use client";

import { motion } from "framer-motion";
import { HeroSection } from "@/components/home/HeroSection";
import { LightingInMotionSection } from "@/components/home/LightingInMotionSection";
import { OurWorldSection } from "@/components/home/OurWorldSection";

export default function Home() {
  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.8,
  };

  // Get base URL for structured data
  const baseUrl = "https://tdgdesign.com";

  // Structured Data for SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TDG Transit Design Group",
    url: baseUrl,
    logo: `${baseUrl}/icons/logo.svg`,
    description:
      "TDG Transit Design Group offers customized and innovative LED lighting solutions for both interior and exterior lighting systems for the global rail industry. With LED drivers in service since 1999 and an LED main lighting system in service since 2003, TDG has over 100,000 hours of actual in-car performance from its systems.",
    foundingDate: "1989",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Sales",
      availableLanguage: ["English"],
    },
    areaServed: "Worldwide",
    knowsAbout: [
      "LED Lighting Systems",
      "Rail Transit Lighting",
      "Interior Lighting",
      "Exterior Lighting",
      "Emergency Lighting",
      "Energy Efficient Lighting",
      "Railway Industry",
      "Public Transportation",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TDG Transit Design Group",
    url: baseUrl,
    description:
      "Leading provider of LED lighting solutions for the global rail industry. Innovative interior and exterior lighting systems with over 200,000 hours of operation and up to 80% energy savings.",
    publisher: {
      "@type": "Organization",
      name: "TDG Transit Design Group",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
    ],
  };

  return (
    <>
      {/* Structured Data for SEO - Written directly as script tags */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <motion.div
        className="min-h-screen"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {/* <video
          src="/videos/TDG Web Home V2.mp4"
          autoPlay
          loop
          muted
          className="w-full h-[100vh] object-cover"
        /> */}
        <HeroSection />
        <LightingInMotionSection />
        <OurWorldSection />
        {/* <TDGProjectsSection /> */}
        {/* <TDGOfferingSection />  */}
        {/* <RailwaysSection />
        <Carousel /> */}
      </motion.div>
    </>
  );
}

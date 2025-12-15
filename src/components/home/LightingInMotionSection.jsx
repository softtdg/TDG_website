"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";

export const LightingInMotionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const router = useRouter();

  const sections = [
    {
      key: "railways",
      title: "RAILWAYS",
      description:
        "TDG offers customized and innovative solutions for both interior and exterior lighting systems for the global rail industry. With LED drivers in service since 1999 and an LED main lighting system in service since 2003, TDG has over 100,000 hours of actual in car performance from its systems. There are nearly one million TDG LED drivers in service globally in the rail industry.",
      image: "/images/home/l2.jpg",
      links: [
        { text: "View Railway Projects", href: "/media" },
        { text: "Explore Products", href: "/products" },
      ],
      imagePosition: "left", // Image on left, text on right
    },
    {
      key: "defense",
      title: "DEFENSE",
      description:
        "TDG provides advanced, customized lighting solutions for defense applications across land, air, and sea. Our robust LED systems are engineered to endure extreme environments and critical missions, delivering unmatched reliability and performance for military vehicles and specialized equipment worldwide.",
      image: "/images/home/projects/1.jpg",
      links: [{ text: "Learn More", href: "/products" }],
      imagePosition: "right", // Image on right, text on left
    },
    {
      key: "support",
      title: "SUPPORT",
      description:
        "Comprehensive technical support and maintenance services for all our lighting systems. Our expert team provides 24/7 assistance to ensure optimal performance and minimal downtime for your operations.",
      image: "/images/home/projects/2.jpg",
      links: [{ text: "Contact Support", href: "/contact-tdg" }],
      phone: "+1 905-608-9539",
      imagePosition: "left", // Image on left, text on right
    },
  ];

  return (
    <div
      className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="w-12 h-0.5 bg-[#0356C2]"></div>
            <span className="text-xs font-semibold text-[#0356C2] uppercase tracking-widest">
              Lighting in Motion
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 text-center">
            Lighting the Way
            <span className="block text-[#0356C2]">Forward</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto text-center">
            TDG is fully conversant with North American, European, Japanese and
            other global emergency rail safety standards.
          </p>
        </motion.div>

        {/* Three Sections with Alternating Layout */}
        <div className="space-y-20 lg:space-y-45">
          {sections.map((section, index) => {
            const isImageLeft = section.imagePosition === "left";

            return (
              <motion.div
                key={section.key}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  isImageLeft ? "lg:grid-flow-dense" : ""
                }`}
                initial={{ opacity: 0, y: 40 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                }
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              >
                {/* Image */}
                <div
                  className={`${
                    isImageLeft
                      ? "order-1 lg:col-start-1"
                      : "order-1 lg:order-2"
                  }`}
                >
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-[300px] sm:h-[350px] lg:h-[450px] object-cover rounded-lg shadow-lg"
                  />
                </div>

                {/* Content */}
                <div
                  className={`${
                    isImageLeft
                      ? "order-2 lg:col-start-2"
                      : "order-2 lg:order-1"
                  }`}
                >
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 text-base lg:text-lg">
                    {section.description}
                  </p>

                  {/* Phone for Support */}
                  {section.phone && (
                    <p className="text-sm lg:text-base text-gray-700 mb-4">
                      For immediate assistance:{" "}
                      <a
                        href={`tel:${section.phone.replace(/\s/g, "")}`}
                        className="font-semibold text-[#0356C2] hover:underline"
                      >
                        {section.phone}
                      </a>
                    </p>
                  )}

                  {/* Links */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {section.links.map((link, linkIndex) => (
                      <button
                        key={linkIndex}
                        onClick={() => router.push(link.href)}
                        className="px-6 py-3 bg-[#0356C2] text-white font-semibold rounded-lg hover:bg-[#0E54C4] transition-colors duration-200 text-sm lg:text-base"
                      >
                        {link.text}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

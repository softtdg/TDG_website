"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const TDGProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      id: 1,
      image: "/images/home/projects/1.jpg",
      title: "LIFE RUNS ON RAILS",
      description:
        "Modern light rail systems with advanced LED lighting technology",
    },
    {
      id: 2,
      image: "/images/home/projects/2.jpg",
      title: "TRAINS MOVE NATIONS",
      description:
        "Interior lighting solutions for passenger comfort and safety",
    },
    {
      id: 3,
      image: "/images/home/projects/3.jpg",
      title: "TRAINS CARRY TIME",
      description:
        "Exterior lighting systems for station platforms and rail infrastructure",
    },
    {
      id: 4,
      image: "/images/home/projects/4.jpg",
      title: "TRAINS TELL TALES",
      description: "Luxurious interior lighting for premium rail experiences",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      className="w-full bg-white py-10 sm:py-20 px-4 sm:px-6 lg:px-8"
      ref={ref}
    >
      <div className="max-w-[1300px] mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Our Product Label */}
          <motion.div
            className="flex items-center justify-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="w-16 h-0.5 bg-[#000000]"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <motion.span
              className="text-[#000000] text-[13px] font-bold uppercase tracking-widest mx-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              our gallery
            </motion.span>
            <motion.div
              className="w-16 h-0.5 bg-[#000000]"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-4xl lg:text-6xl font-bold text-black uppercase"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            TDG Projects
          </motion.h1>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group"
              variants={itemVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
            >
              {/* Project Image */}
              <motion.div
                className="mb-6 overflow-hidden rounded-[20px]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[200px] sm:h-[375px] object-cover object-center"
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.4 },
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                />
              </motion.div>

              {/* Project Title */}
              <motion.h3
                className="text-lg font-bold text-black uppercase text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ color: "#0356C2" }}
              >
                {project.title}
              </motion.h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

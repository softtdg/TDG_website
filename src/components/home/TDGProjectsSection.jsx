"use client";
import React from "react";

export const TDGProjectsSection = () => {
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

  return (
    <div className="w-full bg-white py-10 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1300px] mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Our Product Label */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-0.5 bg-[#000000]"></div>
            <span className="text-[#000000] text-[13px] font-bold uppercase tracking-widest mx-4">
              our gallery
            </span>
            <div className="w-16 h-0.5 bg-[#000000]"></div>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl lg:text-6xl font-bold text-black uppercase">
            TDG Projects
          </h1>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group">
              {/* Project Image */}
              <div className="mb-6 overflow-hidden rounded-[20px]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[200px] sm:h-[375px] object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Project Title */}
              <h3 className="text-lg font-bold text-black uppercase text-center">
                {project.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Railway-related image URLs for different categories
export const railwayImages = {
  exterior: [
    "https://previews.123rf.com/images/sania01/sania012002/sania01200200294/141118784-the-headlight-of-a-modern-high-speed-train-with-the-reflection-of-a-railway-station-in-it.jpg", // Train front
    "https://s.alicdn.com/@sc04/kf/H6802c398cec34ae88ea783c3866e60f1V/Emark-Certified-5-Inch-Square-24V-160-150W-Sealed-Beam-For-Passenger-Cars-Trains.jpg", // Train locomotive
    "https://d1c4d7gnm6as1q.cloudfront.net/Pictures/1024x536/0/7/8/39078_lillemetrotrainlighting_84609.jpg", // Railway tracks
    "https://www.dellnerglass.co.uk/images/product/rail-windscren.jpg", // Train exterior
    "https://www.shutterstock.com/image-photo/tokyo-japan-062022-metro-train-600nw-2174777919.jpg", // Modern train
  ],
  interior: [
    "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop", // Train interior
    "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop", // Train cabin
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", // Passenger area
    "https://images.unsplash.com/photo-1515169067869-8a7b0b8e8b0c?w=800&h=600&fit=crop", // Train seats
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop", // Interior lighting
  ],
  emergency: [
    "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop", // Railway safety
    "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop", // Emergency systems
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", // Control systems
    "https://images.unsplash.com/photo-1515169067869-8a7b0b8e8b0c?w=800&h=600&fit=crop", // Railway infrastructure
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop", // Train systems
  ],
};

// Helper function to get railway image
export const getRailwayImage = (category, index) => {
  const images = railwayImages[category] || railwayImages.exterior;
  return images[index % images.length];
};

// Product data for each card - Railway-related images
export const productData = {
  Headlight: [
    {
      name: "LED Headlight System HL-3000",
      description:
        "High-intensity LED headlight system with 3000 lumens output, designed for long-range visibility in all weather conditions. Features advanced thermal management and IP67 rating.",
      image: getRailwayImage("exterior", 0),
      model: "/3dModels/demo.glb",
    },
    {
      name: "Compact LED Headlight HL-2000",
      description:
        "Compact design with 2000 lumens, perfect for urban rail applications. Energy-efficient with 50,000+ hour lifespan and integrated dimming control.",
      image: getRailwayImage("exterior", 1),
      model: "/3dModels/demo_2.glb",
    },
    {
      name: "High-Power Headlight HL-5000",
      description:
        "Ultra-high performance headlight system delivering 5000 lumens for high-speed rail applications. Features adaptive beam control and weather-resistant housing.",
      image: getRailwayImage("exterior", 2),
    },
    {
      name: "Dual-Beam Headlight HL-4000",
      description:
        "Advanced dual-beam headlight system with separate high and low beam modes. Intelligent switching for optimal visibility and energy efficiency.",
      image: getRailwayImage("exterior", 3),
    },
    {
      name: "Weather-Resistant Headlight HL-2500",
      description:
        "Rugged headlight system designed for extreme weather conditions. Features anti-fog technology and enhanced durability for harsh environments.",
      image: getRailwayImage("exterior", 4),
    },
  ],
  "Marker Light": [
    {
      name: "LED Light Marker LM-100",
      description:
        "Compact LED marker light with 360-degree visibility. Weatherproof design with 100,000+ hour lifespan and low power consumption.",
      image: getRailwayImage("exterior", 0),
    },
    {
      name: "High-Visibility Marker LM-200",
      description:
        "Enhanced visibility marker with dual-color LED technology. Features automatic brightness adjustment and integrated status monitoring.",
      image: getRailwayImage("exterior", 1),
    },
    {
      name: "Multi-Color Marker LM-300",
      description:
        "Advanced multi-color marker system with RGB LED technology. Programmable color schemes for different train identification requirements.",
      image: getRailwayImage("exterior", 2),
    },
    {
      name: "Compact Side Marker LM-150",
      description:
        "Ultra-compact side marker light for space-constrained applications. High brightness output with minimal power consumption.",
      image: getRailwayImage("exterior", 3),
    },
    {
      name: "Aerodynamic Marker LM-400",
      description:
        "Streamlined marker light designed for high-speed trains. Features aerodynamic housing and enhanced visibility at all angles.",
      image: getRailwayImage("exterior", 4),
    },
  ],
  Indicators: [
    {
      name: "LED Indicator System IND-500",
      description:
        "Multi-function LED indicator system for train status and signaling. Features programmable patterns and high visibility in daylight conditions.",
      image: getRailwayImage("exterior", 0),
    },
    {
      name: "Status Indicator Panel IND-300",
      description:
        "Compact indicator panel with multiple LED zones for comprehensive status display. Integrated with train control systems for real-time updates.",
      image: getRailwayImage("exterior", 1),
    },
    {
      name: "Directional Indicator IND-400",
      description:
        "Directional LED indicator with animated patterns for clear directional signaling. Weather-resistant and maintenance-free design.",
      image: getRailwayImage("exterior", 2),
    },
    {
      name: "Multi-Zone Indicator IND-600",
      description:
        "Advanced multi-zone indicator system with independent control for different signaling functions. Features synchronized patterns and high reliability.",
      image: getRailwayImage("exterior", 3),
    },
    {
      name: "Smart Indicator IND-700",
      description:
        "Intelligent indicator system with adaptive brightness and pattern recognition. Self-diagnostic capabilities and remote monitoring support.",
      image: getRailwayImage("exterior", 4),
    },
  ],
  Others: [
    {
      name: "Tail Light System TL-200",
      description:
        "High-visibility tail light system with integrated brake light functionality. Features emergency flash mode and long-range visibility.",
      image: getRailwayImage("exterior", 0),
    },
    {
      name: "Side Marker Light SM-150",
      description:
        "Compact side marker lights for train identification. Low profile design with high brightness output and extended service life.",
      image: getRailwayImage("exterior", 1),
    },
    {
      name: "Corner Light System CL-300",
      description:
        "Corner lighting system for enhanced train visibility at intersections and curves. Features wide-angle illumination and weatherproof housing.",
      image: getRailwayImage("exterior", 2),
    },
    {
      name: "Roof Marker Light RM-250",
      description:
        "Roof-mounted marker light system for overhead visibility. Designed for high-speed rail applications with aerodynamic housing.",
      image: getRailwayImage("exterior", 3),
    },
    {
      name: "Warning Light System WL-350",
      description:
        "High-intensity warning light system for train safety. Features multiple flash patterns and automatic activation during emergency situations.",
      image: getRailwayImage("exterior", 4),
    },
  ],
  "Main Lighting": [
    {
      name: "Main Interior Lighting System IL-5000",
      description:
        "Primary interior lighting system providing uniform illumination throughout train carriages. Features adjustable brightness and color temperature control for passenger comfort.",
      image: getRailwayImage("interior", 0),
    },
    {
      name: "LED Main Light Strip IL-3000",
      description:
        "Continuous LED light strip system for seamless interior illumination. Energy-efficient design with 200,000+ hour lifespan and dimming capabilities.",
      image: getRailwayImage("interior", 1),
    },
    {
      name: "Modular Main Lighting IL-4000",
      description:
        "Modular LED lighting system allowing flexible configuration for different carriage layouts. Easy installation and maintenance with plug-and-play modules.",
      image: getRailwayImage("interior", 2),
    },
    {
      name: "Ceiling Panel Lighting IL-6000",
      description:
        "Integrated ceiling panel lighting system with uniform light distribution. Features anti-glare technology and adjustable color temperature.",
      image: getRailwayImage("interior", 3),
    },
    {
      name: "Recessed Main Lighting IL-3500",
      description:
        "Recessed LED lighting system for modern train interiors. Sleek design with high efficiency and minimal maintenance requirements.",
      image: getRailwayImage("interior", 4),
    },
  ],
  "Passenger Comfort": [
    {
      name: "Ambient Comfort Lighting CL-200",
      description:
        "Specialized ambient lighting system designed to enhance passenger comfort during long journeys. Features circadian rhythm adjustment and mood lighting options.",
      image: getRailwayImage("interior", 0),
    },
    {
      name: "Reading Light System CL-100",
      description:
        "Individual reading lights with adjustable brightness and directional control. Perfect for passenger personal space illumination without disturbing others.",
      image: getRailwayImage("interior", 1),
    },
    {
      name: "Mood Lighting System CL-300",
      description:
        "Advanced mood lighting system with color-changing capabilities. Creates relaxing atmosphere with customizable color schemes and intensity control.",
      image: getRailwayImage("interior", 2),
    },
    {
      name: "Task Lighting CL-400",
      description:
        "Focused task lighting for work and reading areas. Features adjustable arm design and glare-free illumination for extended use.",
      image: getRailwayImage("interior", 3),
    },
    {
      name: "Circadian Lighting CL-500",
      description:
        "Biologically-optimized lighting system that adjusts color temperature throughout the day. Supports natural sleep-wake cycles for passenger well-being.",
      image: getRailwayImage("interior", 4),
    },
  ],
  Indication: [
    {
      name: "Passenger Information Display PID-500",
      description:
        "Integrated LED display system for passenger information, seat availability, and safety instructions. High-contrast display with multilingual support.",
      image: getRailwayImage("interior", 0),
    },
    {
      name: "Status Indicator Panel PID-300",
      description:
        "Compact status indicator panel for seat reservations and service information. Real-time updates with clear visual feedback.",
      image: getRailwayImage("interior", 1),
    },
    {
      name: "Seat Availability Display PID-600",
      description:
        "Advanced seat availability display with real-time status updates. Features color-coded indicators and integration with reservation systems.",
      image: getRailwayImage("interior", 2),
    },
    {
      name: "Safety Instruction Display PID-400",
      description:
        "Clear safety instruction display system with animated graphics. Multilingual support and high visibility for emergency procedures.",
      image: getRailwayImage("interior", 3),
    },
    {
      name: "Digital Information Board PID-700",
      description:
        "Large format digital information board for station announcements and route information. Features high-resolution display and remote content management.",
      image: getRailwayImage("interior", 4),
    },
  ],
  Specialty: [
    {
      name: "Premium Class Lighting PL-1000",
      description:
        "Luxury lighting system for premium class accommodations. Features customizable color schemes, dimming control, and elegant design aesthetics.",
      image: getRailwayImage("interior", 0),
    },
    {
      name: "Dining Car Lighting DL-800",
      description:
        "Specialized lighting for dining cars with warm color temperature and adjustable ambiance. Creates inviting atmosphere for meal service.",
      image: getRailwayImage("interior", 1),
    },
    {
      name: "Lounge Area Lighting PL-1200",
      description:
        "Sophisticated lighting system for passenger lounge areas. Features multiple lighting zones and customizable scenes for different times of day.",
      image: getRailwayImage("interior", 2),
    },
    {
      name: "VIP Compartment Lighting PL-1500",
      description:
        "Premium lighting solution for VIP compartments with advanced control systems. Features luxury finishes and personalized lighting presets.",
      image: getRailwayImage("interior", 3),
    },
    {
      name: "Sleeping Car Lighting PL-2000",
      description:
        "Specialized lighting for sleeping compartments with night mode and wake-up simulation. Features gentle transitions and privacy controls.",
      image: getRailwayImage("interior", 4),
    },
  ],
  "Emergency Lighting": [
    {
      name: "Emergency Lighting System EL-500",
      description:
        "Battery-backed emergency lighting system providing reliable illumination during power failures. Meets all international safety standards with 90-minute minimum runtime.",
      image: getRailwayImage("emergency", 0),
    },
    {
      name: "Emergency Exit Lighting EL-300",
      description:
        "High-visibility emergency exit lighting with clear directional indicators. Self-testing system with automatic battery monitoring.",
      image: getRailwayImage("emergency", 1),
    },
    {
      name: "Low Location Lighting EL-200",
      description:
        "Floor-level emergency lighting for safe evacuation in low visibility conditions. Durable design with impact-resistant housing.",
      image: getRailwayImage("emergency", 2),
    },
    {
      name: "Emergency Stairway Lighting EL-400",
      description:
        "Specialized emergency lighting for stairways and emergency exits. Features high-intensity output and weather-resistant construction.",
      image: getRailwayImage("emergency", 3),
    },
    {
      name: "Centralized Emergency System EL-600",
      description:
        "Comprehensive emergency lighting system with centralized control and monitoring. Features automatic testing and remote diagnostics.",
      image: getRailwayImage("emergency", 4),
    },
  ],
  "Energy Storage": [
    {
      name: "Battery Backup System BBS-1000",
      description:
        "High-capacity battery backup system for emergency lighting applications. Features advanced battery management and extended service life.",
      image: getRailwayImage("emergency", 0),
    },
    {
      name: "Energy Storage Unit ESU-500",
      description:
        "Compact energy storage solution for lighting systems. Integrated charge controller and monitoring system for optimal performance.",
      image: getRailwayImage("emergency", 1),
    },
    {
      name: "Lithium Battery Pack BBS-2000",
      description:
        "High-performance lithium battery pack with extended runtime. Features fast charging capability and intelligent power management.",
      image: getRailwayImage("emergency", 2),
    },
    {
      name: "Modular Energy Storage ESU-800",
      description:
        "Scalable energy storage system with modular battery units. Allows flexible capacity configuration based on specific requirements.",
      image: getRailwayImage("emergency", 3),
    },
    {
      name: "High-Capacity Backup BBS-3000",
      description:
        "Ultra-high capacity backup system for extended emergency operation. Features redundant power paths and advanced monitoring systems.",
      image: getRailwayImage("emergency", 4),
    },
  ],
  "Energy Control": [
    {
      name: "Central Lighting Controller CLC-2000",
      description:
        "Intelligent central control system for managing all lighting functions. Features scheduling, dimming control, and integration with train management systems.",
      image: getRailwayImage("emergency", 0),
    },
    {
      name: "Zone Controller ZC-500",
      description:
        "Zone-based lighting controller for independent control of different carriage sections. User-friendly interface with remote monitoring capabilities.",
      image: getRailwayImage("emergency", 1),
    },
    {
      name: "Smart Controller SC-1000",
      description:
        "Advanced smart controller with IoT connectivity and predictive maintenance features. Real-time monitoring and automated optimization.",
      image: getRailwayImage("emergency", 2),
    },
    {
      name: "Wireless Controller WC-600",
      description:
        "Wireless lighting control system with mobile app integration. Features remote access, scheduling, and energy monitoring capabilities.",
      image: getRailwayImage("emergency", 3),
    },
    {
      name: "Programmable Controller PC-800",
      description:
        "Highly programmable controller with customizable lighting scenes and schedules. Features advanced automation and integration options.",
      image: getRailwayImage("emergency", 4),
    },
  ],
};

export const productSections = [
  {
    title: "EXTERIOR LIGHTING",
    items: [
      {
        title: "Headlight",
        description:
          "High-performance LED headlight systems designed for optimal visibility and energy efficiency. Engineered to meet stringent railway safety standards while providing superior illumination for train operations.",
        image:
          "https://previews.123rf.com/images/sania01/sania012002/sania01200200294/141118784-the-headlight-of-a-modern-high-speed-train-with-the-reflection-of-a-railway-station-in-it.jpg",
      },
      {
        title: "Marker Light",
        description:
          "Advanced marker light solutions for train identification and safety. Compact, durable LED markers that ensure clear visibility in all weather conditions and lighting environments.",
        image:
          "https://s.alicdn.com/@sc04/kf/H6802c398cec34ae88ea783c3866e60f1V/Emark-Certified-5-Inch-Square-24V-160-150W-Sealed-Beam-For-Passenger-Cars-Trains.jpg",
      },
      {
        title: "Indicators",
        description:
          "Reliable LED indicator systems for signaling and status display. Precision-engineered for long-lasting performance and clear visual communication in railway applications.",
        image:
          "https://d1c4d7gnm6as1q.cloudfront.net/Pictures/1024x536/0/7/8/39078_lillemetrotrainlighting_84609.jpg",
      },
      {
        title: "Others",
        description:
          "Comprehensive range of additional exterior lighting solutions including tail lights, side markers, and specialized illumination systems tailored to specific railway requirements.",
        image:
          "https://www.shutterstock.com/image-photo/tokyo-japan-062022-metro-train-600nw-2174777919.jpg",
      },
    ],
  },
  {
    title: "INTERIOR LIGHTING",
    items: [
      {
        title: "Main Lighting",
        description:
          "Primary interior lighting systems providing optimal illumination for passenger comfort and safety. Energy-efficient LED solutions designed to create pleasant ambient lighting throughout train carriages.",
        image: "/images/innovation/img2.jpg",
      },
      {
        title: "Passenger Comfort",
        description:
          "Specialized lighting solutions focused on enhancing passenger experience. Features include adjustable brightness, color temperature control, and ergonomic design for long-distance travel comfort.",
        image: "/images/innovation/img3.jpg",
      },
      {
        title: "Indication",
        description:
          "Clear and intuitive indication lighting systems for passenger information displays, seat availability, and safety instructions. Designed for maximum visibility and user-friendly operation.",
        image: "/images/innovation/img4.jpg",
      },
      {
        title: "Specialty",
        description:
          "Customized interior lighting solutions for specialized applications including premium class accommodations, dining cars, and unique architectural lighting requirements for modern rail vehicles.",
        image: "/images/standards/banner.jpg",
      },
    ],
  },
  {
    title: "EMERGENCY & CONTROL SYSTEMS",
    items: [
      {
        title: "Emergency Lighting",
        description:
          "Critical emergency lighting systems ensuring passenger safety during power failures or emergency situations. Battery-backed LED solutions providing reliable illumination for safe evacuation and emergency procedures.",
        image: "/images/home/u1.jpg",
      },
      {
        title: "Energy Storage",
        description:
          "Advanced energy storage solutions for backup power systems and energy-efficient lighting operations. Integrated battery management systems designed for reliable performance and extended service life.",
        image: "/images/home/u2.jpg",
      },
      {
        title: "Energy Control",
        description:
          "Intelligent energy controller systems for centralized management of all lighting functions. Features include dimming control, scheduling, monitoring, and integration with train management systems.",
        image: "/images/home/u3.jpg",
      },
    ],
  },
];

// Product specifications data
export const productSpecs = {
  "LED Headlight System HL-3000": {
    specifications: [
      "Luminous Flux: 3000 lumens",
      "Power Consumption: 50W",
      "Voltage: 24V DC",
      "IP Rating: IP67",
      "Operating Temperature: -40°C to +85°C",
      "Lifespan: 50,000+ hours",
      "Beam Pattern: Asymmetric",
      "Certification: EN 13272, EN 50155",
    ],
    features: [
      "Advanced thermal management system",
      "Automatic dimming control",
      "Weather-resistant housing",
      "Long-range visibility up to 500m",
      "Energy-efficient LED technology",
    ],
  },
  // Add more product specs as needed
};

// Default product specifications (fallback)
export const defaultProductSpecs = {
  specifications: [
    "High-performance LED technology",
    "Energy-efficient design",
    "Long service life",
    "Weather-resistant construction",
    "Meets international safety standards",
  ],
  features: [
    "Durable construction",
    "Easy installation",
    "Low maintenance",
    "Reliable performance",
  ],
};

// Introduction text
export const introductionText =
  "TDG Transit Design Group offers a comprehensive range of innovative LED lighting solutions designed specifically for the global transportation industry. Our products are engineered to deliver exceptional performance, energy efficiency, and reliability across exterior, interior, and emergency lighting applications for trains, buses, and other transit vehicles.";

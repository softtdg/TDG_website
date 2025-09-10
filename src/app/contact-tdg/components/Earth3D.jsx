"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Sphere,
  Html,
  useTexture,
  OrbitControls,
  Stars,
} from "@react-three/drei";
import * as THREE from "three";

// Office locations data
const officeLocations = [
  {
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
  },
  {
    id: 2,
    name: "TDG United States",
    city: "North Tonawanda",
    country: "United States",
    address:
      "3829 Forest Park Way #500, North Tonawanda, NY 14120, United States",
    phone: "+1 (716) 123-4567",
    email: "sales_USA@tdgdesign.com",
    lat: 43.0389,
    lng: -78.8642,
    color: "#10B981",
  },
  {
    id: 3,
    name: "TDG India",
    city: "Greater Noida",
    country: "India",
    address:
      "32 Udyog Kendra Ecotech-III, Greater Noida, Uttar Pradesh, 201306, India",
    phone: "+91 120 123 4567",
    email: "sales_india@tdgdesign.com",
    lat: 28.4744,
    lng: 77.504,
    color: "#F59E0B",
  },
  {
    id: 4,
    name: "TDG France",
    city: "Sainte-Maure-de-Touraine",
    country: "France",
    address:
      "11 Rue Pierre Et Francoise Allaire, 37800 Sainte-Maure-de-Touraine, France",
    phone: "+33 2 47 12 34 56",
    email: "sales_europe@tdgdesign.com",
    lat: 47.1111,
    lng: 0.6222,
    color: "#EF4444",
  },
  {
    id: 5,
    name: "TDG United Kingdom",
    city: "Leicester",
    country: "United Kingdom",
    address:
      "4 Penman Way, 1st Floor, Gateway House, Grove Business Park, Leicester, United Kingdom",
    phone: "+44 116 123 4567",
    email: "sales_UK@tdgdesign.com",
    lat: 52.6369,
    lng: -1.1398,
    color: "#8B5CF6",
  },
];

// Convert lat/lng to 3D coordinates on sphere
function latLngToVector3(lat, lng, radius = 2.2) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Camera Reset Controller Component
function CameraResetController({
  isResettingToDefault,
  onResetComplete,
  controlsRef,
}) {
  const { camera } = useThree();
  const defaultCameraPosition = useMemo(() => [0, 0, 6], []);
  const defaultTarget = useMemo(() => [0, 0, 0], []);

  useFrame(() => {
    if (isResettingToDefault && controlsRef.current) {
      const currentPosition = camera.position;
      const targetPosition = new THREE.Vector3(...defaultCameraPosition);
      const targetLookAt = new THREE.Vector3(...defaultTarget);

      // Smoothly move camera to default position
      camera.position.lerp(targetPosition, 0.05);
      camera.lookAt(targetLookAt);

      // Update controls target
      controlsRef.current.target.lerp(targetLookAt, 0.05);
      controlsRef.current.update();

      // Check if we're close enough to default position
      const threshold = 0.1;
      if (camera.position.distanceTo(targetPosition) < threshold) {
        camera.position.copy(targetPosition);
        camera.lookAt(targetLookAt);
        controlsRef.current.target.copy(targetLookAt);
        controlsRef.current.update();
        onResetComplete();
      }
    }
  });

  return null;
}

// Earth component
function Earth({
  onLocationHover,
  hoveredLocation,
  sidebarHoveredLocation,
  officeLocations,
  clickedLocation,
  isRotatingToLocation,
  isHoveringEarthContainer,
  hasBeenManuallyRotated,
  isResettingToDefault,
  onManualRotation,
  earthRef,
}) {
  console.log("clickedLocation", clickedLocation);

  // Earth textures
  const [earthTexture, normalMap, specularMap] = useTexture([
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg",
  ]);

  useFrame((state) => {
    if (earthRef.current) {
      if (isRotatingToLocation && clickedLocation) {
        // Get target rotation based on location group
        let targetRotation;

        if (
          clickedLocation.name === "TDG Canada" ||
          clickedLocation.name === "TDG United States"
        ) {
          targetRotation = [0.7, 6.1, 0];
        } else if (
          clickedLocation.name === "TDG France" ||
          clickedLocation.name === "TDG United Kingdom"
        ) {
          targetRotation = [0.9, 4.8, 0];
        } else if (clickedLocation.name === "TDG India") {
          targetRotation = [0.4, 3.4, 0];
        } else {
          // Default rotation for any other locations
          targetRotation = [0.6, 4.5, 0.5];
        }

        console.log("targetRotation", targetRotation);

        // Smoothly rotate to target with improved speed and threshold
        const currentRotation = earthRef.current.rotation;
        const rotationDiffX = targetRotation[0] - currentRotation.x;
        const rotationDiffY = targetRotation[1] - currentRotation.y;
        const rotationDiffZ = targetRotation[2] - currentRotation.z;

        // Calculate total distance to target
        const totalDistance = Math.sqrt(
          rotationDiffX * rotationDiffX +
            rotationDiffY * rotationDiffY +
            rotationDiffZ * rotationDiffZ
        );

        // Use adaptive speed based on distance (faster when far, slower when close)
        const speed = Math.min(0.15, Math.max(0.05, totalDistance * 0.1));
        const threshold = 0.01; // Stop when very close to target

        if (totalDistance > threshold) {
          earthRef.current.rotation.x += rotationDiffX * speed;
          earthRef.current.rotation.y += rotationDiffY * speed;
          earthRef.current.rotation.z += rotationDiffZ * speed;
        } else {
          // Snap to exact target when very close
          earthRef.current.rotation.x = targetRotation[0];
          earthRef.current.rotation.y = targetRotation[1];
          earthRef.current.rotation.z = targetRotation[2];
        }
      } else if (
        sidebarHoveredLocation &&
        !isRotatingToLocation &&
        !hoveredLocation
      ) {
        // Get target rotation based on location group for hover
        let targetRotation;

        if (
          sidebarHoveredLocation.name === "TDG Canada" ||
          sidebarHoveredLocation.name === "TDG United States"
        ) {
          targetRotation = [0.7, 6.1, 0];
        } else if (
          sidebarHoveredLocation.name === "TDG France" ||
          sidebarHoveredLocation.name === "TDG United Kingdom"
        ) {
          targetRotation = [0.9, 4.8, 0];
        } else if (sidebarHoveredLocation.name === "TDG India") {
          targetRotation = [0.4, 3.4, 0];
        } else {
          // Default rotation for any other locations
          targetRotation = [0.6, 4.5, 0.5];
        }

        // Smoothly rotate to target with improved speed for hover
        const currentRotation = earthRef.current.rotation;
        const rotationDiffX = targetRotation[0] - currentRotation.x;
        const rotationDiffY = targetRotation[1] - currentRotation.y;
        const rotationDiffZ = targetRotation[2] - currentRotation.z;

        // Calculate total distance to target
        const totalDistance = Math.sqrt(
          rotationDiffX * rotationDiffX +
            rotationDiffY * rotationDiffY +
            rotationDiffZ * rotationDiffZ
        );

        // Use adaptive speed for hover (slower than click but still responsive)
        const speed = Math.min(0.08, Math.max(0.03, totalDistance * 0.08));
        const threshold = 0.02; // Slightly higher threshold for hover

        if (totalDistance > threshold) {
          earthRef.current.rotation.x += rotationDiffX * speed;
          earthRef.current.rotation.y += rotationDiffY * speed;
          earthRef.current.rotation.z += rotationDiffZ * speed;
        }
      }
      // Completely removed auto-rotation - Earth will stay stationary
    }
  });

  return (
    <group ref={earthRef} rotation={[0.6, 4.5, 0.5]}>
      {/* Main Earth */}
      <Sphere args={[2.2, 64, 64]}>
        <meshStandardMaterial
          map={earthTexture}
          normalMap={normalMap}
          roughness={0}
          metalness={0}
          transparent={false}
          color=""
          emissive=""
          emissiveIntensity={0}
        />
      </Sphere>

      {/* Location markers that rotate with Earth */}
      {officeLocations.map((location) => (
        <LocationMarker
          key={location.id}
          location={location}
          onHover={onLocationHover}
          isHovered={hoveredLocation?.id === location.id}
        />
      ))}
    </group>
  );
}

// Location marker component
function LocationMarker({ location, onHover, isHovered }) {
  const markerRef = useRef();
  const glowRef = useRef();
  const position = useMemo(
    () => latLngToVector3(location.lat, location.lng, 2.25),
    [location.lat, location.lng]
  );

  useFrame((state) => {
    if (markerRef.current) {
      const scale = isHovered ? 0.7 : 1; // Decrease size on hover
      markerRef.current.scale.setScalar(
        THREE.MathUtils.lerp(markerRef.current.scale.x, scale, 0.1)
      );
    }

    if (glowRef.current) {
      glowRef.current.rotation.z += 0.02;
      const pulseScale = isHovered
        ? 0.8
        : 1 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
      glowRef.current.scale.setScalar(pulseScale);
    }
  });

  return (
    <group position={position}>
      {/* Outer pulse ring */}
      <Sphere
        ref={glowRef}
        args={[0.12, 16, 16]}
        onPointerEnter={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
          onHover(location);
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "auto";
          onHover(null);
        }}
      >
        <meshBasicMaterial color={location.color} transparent opacity={0.3} />
      </Sphere>

      {/* Middle glow ring */}
      <Sphere
        args={[0.08, 16, 16]}
        onPointerEnter={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
          onHover(location);
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "auto";
          onHover(null);
        }}
      >
        <meshBasicMaterial color={location.color} transparent opacity={0.6} />
      </Sphere>

      {/* Main marker */}
      <Sphere
        ref={markerRef}
        args={[0.05, 16, 16]}
        onPointerEnter={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
          onHover(location);
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "auto";
          onHover(null);
        }}
      >
        <meshStandardMaterial
          color={location.color}
          emissive={location.color}
          emissiveIntensity={isHovered ? 0.8 : 0.4}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>

      {/* Inner bright core */}
      <Sphere args={[0.02, 8, 8]}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </Sphere>

      {/* Location label */}
      <Html
        position={[0, isHovered ? 0.2 : 0.2, 0]}
        center
        distanceFactor={4}
        occlude
      >
        <div
          className={`bg-gradient-to-r from-white to-blue-50 backdrop-blur-sm border border-blue-200 rounded-xl px-2 py-0 text-[10px] font-medium text-gray-900 whitespace-nowrap transition-all duration-300 shadow-lg ${
            isHovered
              ? "sm:block scale-110 hidden"
              : "sm:hidden scale-90 hidden"
          }`}
        >
          {location.city}, {location.country}
        </div>
      </Html>
    </group>
  );
}

// Office details popup component
function OfficeDetails({ location, onClose }) {
  if (!location) return null;

  return (
    <div className="absolute top-4 right-4 z-10 animate-in slide-in-from-right-5 duration-300">
      <div className="w-80 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: location.color }}
              ></div>
              {location.name}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ×
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-700">
                {location.city}, {location.country}
              </p>
              <p className="text-xs text-gray-500">{location.address}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 mt-4">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors cursor-pointer"
              onClick={() => {
                // Scroll to contact details section
                const contactSection = document.getElementById(
                  "contact-details-section"
                );
                if (contactSection) {
                  contactSection.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }
              }}
            >
              Contact This Office
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Earth3D component
export default function Earth3D({ onLocationSelect }) {
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [sidebarHoveredLocation, setSidebarHoveredLocation] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [isRotatingToLocation, setIsRotatingToLocation] = useState(false);
  const [isHoveringEarthContainer, setIsHoveringEarthContainer] =
    useState(false);
  const [hasBeenManuallyRotated, setHasBeenManuallyRotated] = useState(false);
  const [isResettingToDefault, setIsResettingToDefault] = useState(false);
  const [pendingLocation, setPendingLocation] = useState(null);
  const [pendingAction, setPendingAction] = useState(null); // 'click' or 'hover'
  const hoverTimeoutRef = useRef(null);
  const earthRef = useRef();
  const controlsRef = useRef();

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Clear container hover when marker is hovered
  useEffect(() => {
    if (hoveredLocation) {
      setIsHoveringEarthContainer(false);
    }
  }, [hoveredLocation]);

  // Debounced hover handler to prevent rapid state changes
  const handleLocationHover = (location) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    if (location) {
      // Immediate hover - no delay
      setHoveredLocation(location);
    } else {
      // Delayed unhover to prevent flickering when moving mouse
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredLocation(null);
        hoverTimeoutRef.current = null;
      }, 300); // Increased delay to 300ms for more stability
    }
  };

  // Function to handle clicking on sidebar location
  const handleLocationClick = (location) => {
    if (hasBeenManuallyRotated) {
      // If Earth has been manually rotated, first reset camera, then rotate to location
      setPendingLocation(location);
      setPendingAction("click");
      setIsResettingToDefault(true);
    } else {
      // If not manually rotated, directly rotate to location
      setClickedLocation(location);
      setHoveredLocation(location);
      setIsRotatingToLocation(true);

      // Notify parent component about location selection
      if (onLocationSelect) {
        onLocationSelect(location);
      }

      // Reset rotation state after animation
      setTimeout(() => {
        setIsRotatingToLocation(false);
      }, 2000);
    }
  };

  // Function to handle manual rotation detection
  const handleManualRotation = (shouldSet = true) => {
    setHasBeenManuallyRotated(shouldSet);
    if (!shouldSet) {
      // When resetting manual rotation flag, also stop resetting to default
      setIsResettingToDefault(false);

      // If there's a pending location, now rotate to it
      if (pendingLocation && pendingAction) {
        if (pendingAction === "click") {
          setClickedLocation(pendingLocation);
          setHoveredLocation(pendingLocation);
          setIsRotatingToLocation(true);

          // Notify parent component about location selection
          if (onLocationSelect) {
            onLocationSelect(pendingLocation);
          }

          // Reset rotation state after animation
          setTimeout(() => {
            setIsRotatingToLocation(false);
          }, 2000);
        } else if (pendingAction === "hover") {
          setSidebarHoveredLocation(pendingLocation);
        }

        setPendingLocation(null);
        setPendingAction(null);
      }
    }
  };

  // Function to handle sidebar hover
  const handleSidebarHover = (location) => {
    if (hasBeenManuallyRotated) {
      // If Earth has been manually rotated, first reset camera, then rotate to location
      setPendingLocation(location);
      setPendingAction("hover");
      setIsResettingToDefault(true);
    } else {
      // If not manually rotated, directly set hovered location
      setSidebarHoveredLocation(location);
    }
  };

  // Function to handle sidebar hover leave
  const handleSidebarHoverLeave = () => {
    if (!hasBeenManuallyRotated) {
      // Only clear sidebar hover if not manually rotated
      setSidebarHoveredLocation(null);
    } else if (pendingAction === "hover") {
      // If we're in the middle of a hover reset, cancel it
      setPendingLocation(null);
      setPendingAction(null);
      setIsResettingToDefault(false);
    }
    // If manually rotated and not in hover reset, don't clear the hover state until reset is complete
  };

  return (
    <div className="py-16 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Global Locations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore TDG offices and facilities around the world. Hover over any
            location to learn more.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* 3D Earth Container */}
          <div
            className="lg:col-span-2"
            onMouseEnter={() => {
              // Only set container hover if not already hovering a marker
              if (!hoveredLocation) {
                setIsHoveringEarthContainer(true);
              }
            }}
            onMouseLeave={() => {
              // Only clear container hover if not hovering a marker
              if (!hoveredLocation) {
                setIsHoveringEarthContainer(false);
              }
            }}
          >
            <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-3xl p-4 sm:p-8 h-[400px] sm:h-[600px] lg:h-[800px] overflow-hidden shadow-2xl border border-gray-200">
              <Canvas
                camera={{ position: [0, 0, 6], fov: 50 }}
                style={{ background: "transparent" }}
              >
                {/* Balanced Bright Lighting for Earth */}
                <ambientLight intensity={1.2} />
                <directionalLight
                  position={[1, 1, 1]}
                  intensity={2.8}
                  color="#ffffff"
                />
                <directionalLight
                  position={[-1, 1, 1]}
                  intensity={1.8}
                  color="#e3f2fd"
                />
                <directionalLight
                  position={[0, -1, 1]}
                  intensity={1.0}
                  color="#e0f7fa"
                />
                <pointLight
                  position={[0, 0, 4]}
                  intensity={1.8}
                  color="#ffffff"
                />
                <pointLight
                  position={[4, 4, 4]}
                  intensity={1.2}
                  color="#fffbe0"
                />
                <pointLight
                  position={[-4, -4, 4]}
                  intensity={0.8}
                  color="#ffe0b2"
                />
                <pointLight
                  position={[0, 0, -4]}
                  intensity={0.6}
                  color="#ffffff"
                />

                {/* Light background - no stars for light theme */}

                {/* Camera Reset Controller */}
                <CameraResetController
                  isResettingToDefault={isResettingToDefault}
                  onResetComplete={() => handleManualRotation(false)}
                  controlsRef={controlsRef}
                />

                {/* Earth with rotating markers */}
                <Earth
                  onLocationHover={handleLocationHover}
                  hoveredLocation={hoveredLocation}
                  sidebarHoveredLocation={sidebarHoveredLocation}
                  officeLocations={officeLocations}
                  clickedLocation={clickedLocation}
                  isRotatingToLocation={isRotatingToLocation}
                  isHoveringEarthContainer={isHoveringEarthContainer}
                  hasBeenManuallyRotated={hasBeenManuallyRotated}
                  isResettingToDefault={isResettingToDefault}
                  onManualRotation={handleManualRotation}
                  earthRef={earthRef}
                />

                {/* Camera controls */}
                <OrbitControls
                  ref={controlsRef}
                  enableZoom={true}
                  enablePan={false}
                  enableRotate={true}
                  minDistance={3}
                  maxDistance={6}
                  autoRotate={false}
                  onChange={handleManualRotation}
                />
              </Canvas>

              {/* Office Details Popup */}
              <OfficeDetails
                location={hoveredLocation}
                onClose={() => setHoveredLocation(null)}
              />

              {/* Earth Title */}
              <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
                <h3 className="text-gray-900 text-sm sm:text-lg font-semibold bg-white/80 backdrop-blur-sm px-2 py-1 sm:px-4 sm:py-2 rounded-lg border border-gray-200 shadow-sm">
                  🌍 TDG Global Network
                </h3>
              </div>
            </div>
          </div>

          {/* Office List */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Global Offices
            </h3>

            <div className="space-y-3">
              {officeLocations.map((location) => (
                <div
                  key={location.id}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    hoveredLocation?.id === location.id ||
                    sidebarHoveredLocation?.id === location.id
                      ? "bg-blue-100 backdrop-blur-sm border border-blue-200 shadow-md"
                      : "bg-white backdrop-blur-sm border border-gray-200 hover:bg-blue-50 shadow-sm"
                  }`}
                  onClick={() => handleLocationClick(location)}
                  onMouseEnter={() => handleSidebarHover(location)}
                  onMouseLeave={() => handleSidebarHoverLeave()}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: location.color }}
                    ></div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {location.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {location.city}, {location.country}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
    name: "TDG United States",
    city: "North Tonawanda",
    country: "United States",
    address:
      "3829 Forest Park Way #500, North Tonawanda, NY 14120, United States",
    phone: "+1 (716) 123-4567",
    email: "sales_USA@tdgdesign.com",
    lat: 41.0389,
    lng: -75.8642,
    color: "#FFFB00",
    map_lat: 43.06346,
    map_lng: -78.83247,
  },
  {
    id: 2,
    name: "TDG France",
    city: "Sainte-Maure-de-Touraine",
    country: "France",
    address:
      "11 Rue Pierre Et Francoise Allaire, 37800 Sainte-Maure-de-Touraine, France",
    phone: "+33 2 47 12 34 56",
    email: "sales_europe@tdgdesign.com",
    lat: 47.1111,
    lng: 0.6222,
    color: "#FFFB00",
    map_lat: 47.09788,
    map_lng: 0.61348,
  },

  {
    id: 3,
    name: "TDG United Kingdom",
    city: "Leicester",
    country: "United Kingdom",
    address:
      "4 Penman Way, 1st Floor, Gateway House, Grove Business Park, Leicester, United Kingdom",
    phone: "+44 116 123 4567",
    email: "sales_UK@tdgdesign.com",
    lat: 52.6369,
    lng: -1.1398,
    color: "#FFFB00",
    map_lat: 52.59608,
    map_lng: -1.18634,
  },
  {
    id: 4,
    name: "TDG Canada",
    city: "Mississauga",
    country: "Canada",
    address: "1.3770 Laird Rd Building A, Mississauga, ON L5L 0A7, Canada",
    phone: "+1 (905) 123-4567",
    email: "sales_canada@tdgdesign.com",
    lat: 43.589,
    lng: -79.6441,
    color: "#FFFB00",
    map_lat: 43.52284,
    map_lng: -79.71041,
  },

  {
    id: 5,
    name: "TDG India",
    city: "Greater Noida",
    country: "India",
    address:
      "32 Udyog Kendra Ecotech-III, Greater Noida, Uttar Pradesh, 201306, India",
    phone: "+91 120 123 4567",
    email: "sales_india@tdgdesign.com",
    lat: 28.4744,
    lng: 77.504,
    color: "#FFFB00",
    map_lat: 28.53313,
    map_lng: 77.46848,
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
  sidebarHoveredLocation,
  officeLocations,
  clickedLocation,
  isRotatingToLocation,
  isHoveringEarthContainer,
  hasBeenManuallyRotated,
  isResettingToDefault,
  onManualRotation,
  earthRef,
  onLocationClick,
  hoveredLocation,
  onEarthClick,
}) {
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
    <group ref={earthRef} rotation={[1.4, 4.2, 1.2]}>
      {/* Main Earth */}
      <Sphere
        args={[2.2, 64, 64]}
        onClick={(e) => {
          e.stopPropagation();
          if (onEarthClick) {
            onEarthClick();
          }
        }}
      >
        <meshStandardMaterial
          map={earthTexture}
          normalMap={normalMap}
          roughness={0}
          metalness={0}
          transparent={false}
          color="transparent"
          // emissive="lightgray"
          emissiveIntensity={1}
          opacity={1}
        />
      </Sphere>

      {/* Location markers that rotate with Earth */}
      {officeLocations.map((location) => (
        <LocationMarker
          key={location.id}
          location={location}
          onClick={onLocationClick}
          isHovered={hoveredLocation?.id === location.id}
        />
      ))}
    </group>
  );
}

// Location marker component
function LocationMarker({ location, onClick, isHovered }) {
  const markerRef = useRef();
  const glowRef = useRef();
  const glowRef2 = useRef();
  const position = useMemo(
    () => latLngToVector3(location.lat, location.lng, 2.25),
    [location.lat, location.lng]
  );

  // Use the fixed color for all marker visuals
  const markerColor = "#FFFB00";

  // Load the location marker texture
  const locationTexture = useTexture("/images/contact/location-mark.png");

  useFrame((state) => {
    if (glowRef.current) {
      glowRef.current.rotation.z += 0.02;
      // Keep the pulse at its maximum (always "pulsed")
      const pulseScale = 1.3;
      glowRef.current.scale.setScalar(pulseScale);
    }
    if (glowRef2.current) {
      glowRef2.current.rotation.z += 0.02;
      // Keep the pulse at its maximum (always "pulsed")
      const pulseScale = 1.3;
      glowRef2.current.scale.setScalar(pulseScale);
    }
  });

  return (
    <group position={position}>
      {/* Outer pulse ring */}
      <Sphere
        ref={glowRef}
        args={[0.051, 16, 16]}
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) {
            onClick(location, e);
          }
        }}
      >
        <meshBasicMaterial color={location.color} transparent opacity={0.5} />
      </Sphere>

      {/* Middle glow ring */}
      <Sphere
        ref={glowRef2}
        args={[0.068, 16, 16]}
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) {
            onClick(location, e);
          }
        }}
      >
        <meshBasicMaterial color={location.color} transparent opacity={0.5} />
      </Sphere>

      {/* Main marker */}
      <Sphere
        ref={markerRef}
        args={[0.05, 16, 16]}
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) {
            onClick(location, e);
          }
        }}
        onPointerEnter={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "auto";
        }}
        color={location.color}
        opacity={1}
        transparent={false}
        emissive={location.color}
        emissiveIntensity={1}
        roughness={0}
        metalness={1}
      >
        {/* <meshStandardMaterial
          color={location.color}
          emissive={location.color} // or a very subtle version of the color
          emissiveIntensity={1} // reduce intensity
          roughness={0}
          metalness={1}
          opacity={1}
        />{" "} */}
      </Sphere>

      {/* Inner bright core */}
      {/* <circleGeometry args={[0.025, 8, 8]}>
         <meshStandardMaterial
          color={location.color}
          roughness={1}
          metalness={0}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </circleGeometry> */}

      {/* Location label with office details */}
      {/* <Html
        position={[0.6, isHovered ? 0.2 : 0.2, 0]}
        center
        distanceFactor={4}
        occlude
      >
        <div
          className={`bg-white/95 backdrop-blur-sm border border-gray-200 rounded-[10px] shadow-2xl transition-all duration-300 ${
            isHovered
              ? "block scale-110 xl:hidden"
              : "hidden scale-90 xl:hidden"
          }`}
        >
          {isHovered ? (
            <div className="p-1 w-[120px] sm:w-[160px]">
              <div className="flex items-center justify-center mb-2">
                <h3 className="text-[10px] font-semibold text-gray-900 flex items-center gap-2">
                  {location.name}
                </h3>
              </div>

              <div className="space-y-1">
                <div>
                  <p className="text-[7px] font-medium text-gray-700 text-center">
                    {location.city}, {location.country}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-3 py-1">
              <p className="text-[10px] font-medium text-gray-900 whitespace-nowrap">
                {location.city}, {location.country}
              </p>
            </div>
          )}
        </div>
      </Html> */}
    </group>
  );
}

// Office Popup Component
function OfficePopup({
  office,
  isVisible,
  clickPosition,
  onClose,
  markerSide,
}) {
  if (!isVisible || !office) return null;

  // Calculate the end point for the L-shaped line
  const getLineEndPoint = () => {
    if (!clickPosition) return { x: 0, y: 0 };

    // Get the viewport dimensions
    const viewportWidth = window.innerWidth;

    // End point: 100px from the right edge, 100px from the top
    return {
      x: markerSide === "left" ? 100 : viewportWidth - 100,
      y: 100,
    };
  };

  const endPoint = getLineEndPoint();

  return (
    <div className="">
      {/* Connecting Line */}
      {clickPosition && (
        <svg
          className="fixed inset-0 pointer-events-none z-10"
          style={{ width: "100vw", height: "100vh" }}
        >
          <path
            d={
              window.innerWidth < 1024
                ? `M ${clickPosition.x} ${clickPosition.y} L ${
                    clickPosition.x + (markerSide === "left" ? -80 : 80)
                  } 220 L ${
                    endPoint.x - (markerSide === "left" ? -20 : 20)
                  } 220`
                : `M ${clickPosition.x} ${clickPosition.y} L ${
                    clickPosition.x + (markerSide === "left" ? -80 : 80)
                  } 220 L ${
                    endPoint.x - (markerSide === "left" ? -220 : 220)
                  } 220`
            }
            stroke="white"
            strokeWidth="2"
            fill="none"
            // className="animate-pulse"
          />
        </svg>
      )}

      {/* Popup */}
      <div
        data-popup="office-popup"
        // className="fixed z-20  rounded-lg shadow-2xl p-6 animate-in slide-in-from-right duration-300 top-[180px] right-[250px] ${markerSide === "left" ? "left-[100px]" : "right-[100px]"}"
        className={`fixed z-20   duration-300 lg:top-[120px] top-[150px] ${
          markerSide === "left"
            ? "left-[20px] lg:left-[250px] xl:left-[300px]"
            : "right-[20px] lg:right-[250px] xl:right-[300px]"
        }`}
      >
        {/* <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
        >
          ×
        </button> */}

        <div
          className="pr-8 cursor-pointer"
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
            onClose();
          }}
        >
          <div className="flex justify-center items-center gap-3 mb-2">
            {/* <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: "#FFD700" }}
            ></div> */}
            <h3 className="text-[18px] xl:text-[25px] font-bold text-white uppercase text-center">
              {office.name}
            </h3>
          </div>

          <div className="mb-6">
            <p className="text-white text-[15px] xl:text-[20px] text-center">
              {office.city}, {office.country}
            </p>
          </div>

          {/* <button
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
              onClose();
            }}
            className="w-full bg-white hover:bg-gray-100 text-black font-bold py-3 px-6 rounded-lg transition-colors text-sm uppercase tracking-wide"
          >
            MESSAGE THIS OFFICE
          </button> */}
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
  const [popupOffice, setPopupOffice] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [clickPosition, setClickPosition] = useState(null);
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [markerSide, setMarkerSide] = useState(null); // 'left' or 'right'
  const hoverTimeoutRef = useRef(null);
  const earthRef = useRef();
  const controlsRef = useRef();
  const isMarkerClickRef = useRef(false);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Global click handler to close popup when clicking outside
  useEffect(() => {
    const handleGlobalClick = (e) => {
      // Check if click is outside the Earth container and popup
      const earthContainer = document.querySelector(".lg\\:col-span-2");
      const popupElement = document.querySelector(
        '[data-popup="office-popup"]'
      );

      if (
        earthContainer &&
        !earthContainer.contains(e.target) &&
        (!popupElement || !popupElement.contains(e.target))
      ) {
        setHoveredLocation(null);
        setPopupVisible(false);
        setPopupOffice(null);
        setClickPosition(null);
        setIsPopupActive(false);
        // Re-enable controls
        if (controlsRef.current) {
          controlsRef.current.enabled = true;
        }
      }
    };

    if (hoveredLocation || popupVisible) {
      document.addEventListener("click", handleGlobalClick);
    }

    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [hoveredLocation, popupVisible]);

  // Clear container hover when marker is hovered
  useEffect(() => {
    if (hoveredLocation) {
      setIsHoveringEarthContainer(false);
    }
  }, [hoveredLocation]);

  // Debounced hover handler to prevent rapid state changes
  const handleLocationHover = (location, event) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    if (location) {
      // Capture hover position for connecting line
      const hoverPos = {
        x: event.clientX,
        y: event.clientY,
      };

      // Set popup data and position
      setPopupOffice(location);
      setClickPosition(hoverPos);
      setPopupVisible(true);

      // Immediate hover - no delay
      setHoveredLocation(location);
    } else {
      // Delayed unhover to prevent flickering when moving mouse
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredLocation(null);
        setPopupVisible(false);
        setPopupOffice(null);
        setClickPosition(null);
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
      }, 1000);
    }
  };

  // Function to handle clicking on location markers (shows popup with connecting line)
  const handleMarkerClick = (location, event) => {
    // Set flag to prevent Canvas click handler from firing
    isMarkerClickRef.current = true;

    // Stop Earth rotation immediately and set popup as active
    setIsPopupActive(true);
    if (controlsRef.current) {
      controlsRef.current.enabled = false;
    }

    // Determine marker side based on screen click position
    const viewportWidth = window.innerWidth;
    const isLeftSide = event.clientX < viewportWidth / 2; // Click position relative to screen center
    setMarkerSide(isLeftSide ? "left" : "right");

    // Capture click position for connecting line
    // Use absolute coordinates relative to the viewport
    const clickPos = {
      x: event.clientX,
      y: event.clientY,
    };

    // Set popup data and position
    setPopupOffice(location);
    setClickPosition(clickPos);
    setPopupVisible(true);

    // Also set as hovered to show existing popup
    setHoveredLocation(location);

    // Notify parent component about location selection for popup
    if (onLocationSelect) {
      onLocationSelect(location);
    }
  };

  // Function to handle clicking outside Earth to close popup
  const handleEarthContainerClick = (e) => {
    // Only close popup if clicking on the container itself, not on markers
    if (e.target === e.currentTarget) {
      setHoveredLocation(null);
      setPopupVisible(false);
      setPopupOffice(null);
      setClickPosition(null);
      setIsPopupActive(false);
      // Re-enable controls
      if (controlsRef.current) {
        controlsRef.current.enabled = true;
      }
    }
  };

  // Function to handle Earth rotation to close popup
  const handleEarthRotation = () => {
    setHoveredLocation(null);
    setPopupVisible(false);
    setPopupOffice(null);
    setClickPosition(null);
    setIsPopupActive(false);
    // Re-enable controls
    if (controlsRef.current) {
      controlsRef.current.enabled = true;
    }
  };

  // Function to handle mouse wheel scroll to close popup
  const handleWheelScroll = () => {
    setHoveredLocation(null);
    setPopupVisible(false);
    setPopupOffice(null);
    setClickPosition(null);
    setIsPopupActive(false);
    // Re-enable controls
    if (controlsRef.current) {
      controlsRef.current.enabled = true;
    }
  };

  // Function to close popup
  const handleClosePopup = () => {
    setPopupVisible(false);
    setPopupOffice(null);
    setClickPosition(null);
    setHoveredLocation(null);
    setIsPopupActive(false);
    // Re-enable controls
    if (controlsRef.current) {
      controlsRef.current.enabled = true;
    }
  };

  // Function to handle clicking on Earth surface to close popup
  const handleEarthClick = () => {
    setHoveredLocation(null);
    setPopupVisible(false);
    setPopupOffice(null);
    setClickPosition(null);
    setIsPopupActive(false);
    // Re-enable controls
    if (controlsRef.current) {
      controlsRef.current.enabled = true;
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
    <div
      // className="py-8 main_container max-md:min-h-[100vh] max-md:py-[200px] bg-[url('/images/contact/contact-bg.png')] xl:bg-[length:146%] bg-top bg-no-repeat"
      // className="py-8 main_container max-md:min-h-[100vh] max-md:py-[200px] bg-[url('/images/contact/contact-bg2.png')] xl:bg-[length:146%] bg-top bg-no-repeat"
      className="py-8 main_container max-md:min-h-[100vh] max-md:py-[200px] bg-[url('/images/contact/contact-bg3.png')] xl:bg-[length:146%] bg-top bg-no-repeat"
      // className="py-8 main_container max-md:min-h-[100vh] max-md:py-[200px] bg-[url('/images/contact/contact-bg6.png')] xl:bg-[length:146%] bg-top bg-no-repeat"
      // className="py-8 main_container max-md:min-h-[100vh] max-md:py-[200px] bg-[url('/images/contact/contact-bg5.png')] xl:bg-[length:146%] bg-top bg-no-repeat"
      // className="py-8 main_container max-md:min-h-[100vh] max-md:py-[200px] bg-[url('/images/contact/contact-bg2.jpg')] bg-cover bg-center bg-no-repeat"
      // className="py-8 main_container max-md:min-h-[100vh] max-md:py-[200px] bg-[url('/images/contact/contact-bg3.jpg')] bg-cover bg-center bg-no-repeat"
      // className="py-8 main_container max-md:min-h-[100vh] max-md:py-[200px] bg-[url('/images/contact/contact-bg4.png')] bg-cover bg-center bg-no-repeat"
      // className="py-8 main_container max-md:min-h-[100vh] max-md:py-[200px] bg-[url('/images/contact/contact-bg2.avif')] bg-cover bg-center bg-no-repeat"
      // className="py-8 main_container max-md:min-h-[100vh] max-md:py-[200px] bg-[url('/images/contact/contact-bg13.png')] bg-cover bg-center bg-no-repeat "
      onWheel={handleWheelScroll}
    >
      <div className="max-w-[1300px] mx-auto px-2 sm:px-4 lg:px-6">
        {/* <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Global Locations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore TDG offices and facilities around the world. Hover over any
            location to learn more.
          </p>
        </div> */}

        <div className="items-center">
          {/* 3D Earth Container */}
          <div
            className="lg:col-span-2"
            // onClick={handleEarthContainerClick}
            // onMouseEnter={() => {
            //   // Only set container hover if not already hovering a marker
            //   if (!hoveredLocation) {
            //     setIsHoveringEarthContainer(true);
            //   }
            // }}
            // onMouseLeave={() => {
            //   // Only clear container hover if not hovering a marker
            //   if (!hoveredLocation) {
            //     setIsHoveringEarthContainer(false);
            //   }
            // }}
          >
            <div className="relative from-white p-2 sm:p-4 h-[400px] sm:h-[600px] lg:h-[100vh] overflow-hidden">
              <Canvas
                camera={{ position: [0, 0, 6], fov: 55 }}
                style={{ background: "transparent" }}
                onClick={(e) => {
                  // Check if this was a marker click
                  if (isMarkerClickRef.current) {
                    isMarkerClickRef.current = false; // Reset flag
                    return; // Don't close popup
                  }

                  // Close popup when clicking on Canvas (Earth surface)
                  setPopupVisible(false);
                  setHoveredLocation(null);
                  setPopupOffice(null);
                  setClickPosition(null);
                  setIsPopupActive(false);
                  // Re-enable controls
                  if (controlsRef.current) {
                    controlsRef.current.enabled = true;
                  }
                }}
              >
                {/* Balanced Bright Lighting for Earth */}
                <ambientLight intensity={0.5} />
                <directionalLight
                  position={[1, 1, 1]}
                  intensity={2.5}
                  color="#ffffff"
                />
                <directionalLight
                  position={[-1, 1, 1]}
                  intensity={1.2}
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
                  sidebarHoveredLocation={sidebarHoveredLocation}
                  officeLocations={officeLocations}
                  clickedLocation={clickedLocation}
                  isRotatingToLocation={isRotatingToLocation}
                  isHoveringEarthContainer={isHoveringEarthContainer}
                  hasBeenManuallyRotated={hasBeenManuallyRotated}
                  isResettingToDefault={isResettingToDefault}
                  onManualRotation={handleManualRotation}
                  earthRef={earthRef}
                  onLocationClick={handleMarkerClick}
                  hoveredLocation={hoveredLocation}
                  onEarthClick={handleEarthClick}
                />

                {/* Camera controls */}
                <OrbitControls
                  ref={controlsRef}
                  enableZoom={false}
                  enablePan={false}
                  enableRotate={!isPopupActive}
                  minDistance={3}
                  maxDistance={6}
                  autoRotate={false}
                  onChange={(e) => {
                    if (!isPopupActive) {
                      handleManualRotation();
                    }
                    handleEarthRotation();
                  }}
                  onWheel={handleWheelScroll}
                />
              </Canvas>

              {/* Earth Title */}
              {/* <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
                <h3 className="text-gray-900 text-sm sm:text-lg font-semibold bg-white/80 backdrop-blur-sm px-2 py-1 sm:px-4 sm:py-2 rounded-lg border border-gray-200 shadow-sm">
                  🌍 TDG Global Network
                </h3>
              </div> */}
            </div>
          </div>
          {/* Office Popup */}
          {/* {typeof window !== "undefined" && window.innerWidth > 1280 && ( */}
          <OfficePopup
            office={popupOffice}
            isVisible={popupVisible}
            clickPosition={clickPosition}
            onClose={handleClosePopup}
            markerSide={markerSide}
          />
          {/* )} */}
          {/* Office List */}
          {/* <div className="space-y-3 sm:space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Global Offices
            </h3>

            <div className="space-y-3">
              {officeLocations.map((location) => (
                <div
                  key={location.id}
                  className="p-4 rounded-xl cursor-pointer transition-all duration-300 bg-white backdrop-blur-sm border border-gray-200 hover:bg-blue-50 shadow-sm"
                  onClick={() => handleLocationClick(location)}
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
          </div> */}
        </div>
      </div>
    </div>
  );
}

// "use client";

// import React, { useRef, useState, useMemo, useEffect } from "react";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import {
//   Sphere,
//   Html,
//   useTexture,
//   OrbitControls,
//   Stars,
// } from "@react-three/drei";
// import * as THREE from "three";

// // Office locations data
// const officeLocations = [
//   {
//     id: 1,
//     name: "TDG United States",
//     city: "North Tonawanda",
//     country: "United States",
//     address:
//       "3829 Forest Park Way #500, North Tonawanda, NY 14120, United States",
//     phone: "+1 (716) 123-4567",
//     email: "sales_USA@tdgdesign.com",
//     lat: 41.0389,
//     lng: -75.8642,
//     color: "#2FFF00",
//     map_lat: 43.06346,
//     map_lng: -78.83247,
//   },
//   {
//     id: 2,
//     name: "TDG France",
//     city: "Sainte-Maure-de-Touraine",
//     country: "France",
//     address:
//       "11 Rue Pierre Et Francoise Allaire, 37800 Sainte-Maure-de-Touraine, France",
//     phone: "+33 2 47 12 34 56",
//     email: "sales_europe@tdgdesign.com",
//     lat: 47.1111,
//     lng: 0.6222,
//     color: "#FF0000",
//     map_lat: 47.09788,
//     map_lng: 0.61348,
//   },

//   {
//     id: 3,
//     name: "TDG United Kingdom",
//     city: "Leicester",
//     country: "United Kingdom",
//     address:
//       "4 Penman Way, 1st Floor, Gateway House, Grove Business Park, Leicester, United Kingdom",
//     phone: "+44 116 123 4567",
//     email: "sales_UK@tdgdesign.com",
//     lat: 52.6369,
//     lng: -1.1398,
//     color: "#9B46D4",
//     map_lat: 52.59608,
//     map_lng: -1.18634,
//   },
//   {
//     id: 4,
//     name: "TDG Canada",
//     city: "Mississauga",
//     country: "Canada",
//     address: "1.3770 Laird Rd Building A, Mississauga, ON L5L 0A7, Canada",
//     phone: "+1 (905) 123-4567",
//     email: "sales_canada@tdgdesign.com",
//     lat: 43.589,
//     lng: -79.6441,
//     color: "#0059FF",
//     map_lat: 43.52284,
//     map_lng: -79.71041,
//   },

//   {
//     id: 5,
//     name: "TDG India",
//     city: "Greater Noida",
//     country: "India",
//     address:
//       "32 Udyog Kendra Ecotech-III, Greater Noida, Uttar Pradesh, 201306, India",
//     phone: "+91 120 123 4567",
//     email: "sales_india@tdgdesign.com",
//     lat: 28.4744,
//     lng: 77.504,
//     color: "#FF9D00",
//     map_lat: 28.53313,
//     map_lng: 77.46848,
//   },
// ];

// // Convert lat/lng to 3D coordinates on sphere
// function latLngToVector3(lat, lng, radius = 2.2) {
//   const phi = (90 - lat) * (Math.PI / 180);
//   const theta = (lng + 180) * (Math.PI / 180);

//   return new THREE.Vector3(
//     -(radius * Math.sin(phi) * Math.cos(theta)),
//     radius * Math.cos(phi),
//     radius * Math.sin(phi) * Math.sin(theta)
//   );
// }

// // Camera Reset Controller Component
// function CameraResetController({
//   isResettingToDefault,
//   onResetComplete,
//   controlsRef,
// }) {
//   const { camera } = useThree();
//   const defaultCameraPosition = useMemo(() => [0, 0, 6], []);
//   const defaultTarget = useMemo(() => [0, 0, 0], []);

//   useFrame(() => {
//     if (isResettingToDefault && controlsRef.current) {
//       const currentPosition = camera.position;
//       const targetPosition = new THREE.Vector3(...defaultCameraPosition);
//       const targetLookAt = new THREE.Vector3(...defaultTarget);

//       // Smoothly move camera to default position
//       camera.position.lerp(targetPosition, 0.05);
//       camera.lookAt(targetLookAt);

//       // Update controls target
//       controlsRef.current.target.lerp(targetLookAt, 0.05);
//       controlsRef.current.update();

//       // Check if we're close enough to default position
//       const threshold = 0.1;
//       if (camera.position.distanceTo(targetPosition) < threshold) {
//         camera.position.copy(targetPosition);
//         camera.lookAt(targetLookAt);
//         controlsRef.current.target.copy(targetLookAt);
//         controlsRef.current.update();
//         onResetComplete();
//       }
//     }
//   });

//   return null;
// }

// // Earth component
// function Earth({
//   sidebarHoveredLocation,
//   officeLocations,
//   clickedLocation,
//   isRotatingToLocation,
//   isHoveringEarthContainer,
//   hasBeenManuallyRotated,
//   isResettingToDefault,
//   onManualRotation,
//   earthRef,
//   onLocationClick,
//   hoveredLocation,
//   onEarthClick,
// }) {
//   console.log("clickedLocation", clickedLocation);

//   // Earth textures
//   const [earthTexture, normalMap, specularMap] = useTexture([
//     "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg",
//     "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg",
//     "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg",
//   ]);

//   useFrame((state) => {
//     if (earthRef.current) {
//       if (isRotatingToLocation && clickedLocation) {
//         // Get target rotation based on location group
//         let targetRotation;

//         if (
//           clickedLocation.name === "TDG Canada" ||
//           clickedLocation.name === "TDG United States"
//         ) {
//           targetRotation = [0.7, 6.1, 0];
//         } else if (
//           clickedLocation.name === "TDG France" ||
//           clickedLocation.name === "TDG United Kingdom"
//         ) {
//           targetRotation = [0.9, 4.8, 0];
//         } else if (clickedLocation.name === "TDG India") {
//           targetRotation = [0.4, 3.4, 0];
//         } else {
//           // Default rotation for any other locations
//           targetRotation = [0.6, 4.5, 0.5];
//         }

//         console.log("targetRotation", targetRotation);

//         // Smoothly rotate to target with improved speed and threshold
//         const currentRotation = earthRef.current.rotation;
//         const rotationDiffX = targetRotation[0] - currentRotation.x;
//         const rotationDiffY = targetRotation[1] - currentRotation.y;
//         const rotationDiffZ = targetRotation[2] - currentRotation.z;

//         // Calculate total distance to target
//         const totalDistance = Math.sqrt(
//           rotationDiffX * rotationDiffX +
//             rotationDiffY * rotationDiffY +
//             rotationDiffZ * rotationDiffZ
//         );

//         // Use adaptive speed based on distance (faster when far, slower when close)
//         const speed = Math.min(0.15, Math.max(0.05, totalDistance * 0.1));
//         const threshold = 0.01; // Stop when very close to target

//         if (totalDistance > threshold) {
//           earthRef.current.rotation.x += rotationDiffX * speed;
//           earthRef.current.rotation.y += rotationDiffY * speed;
//           earthRef.current.rotation.z += rotationDiffZ * speed;
//         } else {
//           // Snap to exact target when very close
//           earthRef.current.rotation.x = targetRotation[0];
//           earthRef.current.rotation.y = targetRotation[1];
//           earthRef.current.rotation.z = targetRotation[2];
//         }
//       } else if (
//         sidebarHoveredLocation &&
//         !isRotatingToLocation &&
//         !hoveredLocation
//       ) {
//         // Get target rotation based on location group for hover
//         let targetRotation;

//         if (
//           sidebarHoveredLocation.name === "TDG Canada" ||
//           sidebarHoveredLocation.name === "TDG United States"
//         ) {
//           targetRotation = [0.7, 6.1, 0];
//         } else if (
//           sidebarHoveredLocation.name === "TDG France" ||
//           sidebarHoveredLocation.name === "TDG United Kingdom"
//         ) {
//           targetRotation = [0.9, 4.8, 0];
//         } else if (sidebarHoveredLocation.name === "TDG India") {
//           targetRotation = [0.4, 3.4, 0];
//         } else {
//           // Default rotation for any other locations
//           targetRotation = [0.6, 4.5, 0.5];
//         }

//         // Smoothly rotate to target with improved speed for hover
//         const currentRotation = earthRef.current.rotation;
//         const rotationDiffX = targetRotation[0] - currentRotation.x;
//         const rotationDiffY = targetRotation[1] - currentRotation.y;
//         const rotationDiffZ = targetRotation[2] - currentRotation.z;

//         // Calculate total distance to target
//         const totalDistance = Math.sqrt(
//           rotationDiffX * rotationDiffX +
//             rotationDiffY * rotationDiffY +
//             rotationDiffZ * rotationDiffZ
//         );

//         // Use adaptive speed for hover (slower than click but still responsive)
//         const speed = Math.min(0.08, Math.max(0.03, totalDistance * 0.08));
//         const threshold = 0.02; // Slightly higher threshold for hover

//         if (totalDistance > threshold) {
//           earthRef.current.rotation.x += rotationDiffX * speed;
//           earthRef.current.rotation.y += rotationDiffY * speed;
//           earthRef.current.rotation.z += rotationDiffZ * speed;
//         }
//       }
//       // Completely removed auto-rotation - Earth will stay stationary
//     }
//   });

//   return (
//     <group ref={earthRef} rotation={[1.3, 4.5, 0.5]}>
//       {/* Main Earth */}
//       <Sphere
//         args={[2.2, 64, 64]}
//         onClick={(e) => {
//           e.stopPropagation();
//           if (onEarthClick) {
//             onEarthClick();
//           }
//         }}
//       >
//         <meshStandardMaterial
//           map={earthTexture}
//           normalMap={normalMap}
//           roughness={0}
//           metalness={0}
//           transparent={false}
//           color=""
//           emissive=""
//           emissiveIntensity={0}
//         />
//       </Sphere>

//       {/* Location markers that rotate with Earth */}
//       {officeLocations.map((location) => (
//         <LocationMarker
//           key={location.id}
//           location={location}
//           onClick={onLocationClick}
//           isHovered={hoveredLocation?.id === location.id}
//         />
//       ))}
//     </group>
//   );
// }

// // Location marker component
// function LocationMarker({ location, onClick, isHovered }) {
//   const markerRef = useRef();
//   const glowRef = useRef();
//   const position = useMemo(
//     () => latLngToVector3(location.lat, location.lng, 2.25),
//     [location.lat, location.lng]
//   );

//   useFrame((state) => {
//     if (glowRef.current) {
//       glowRef.current.rotation.z += 0.02;
//       const pulseScale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
//       glowRef.current.scale.setScalar(pulseScale);
//     }
//   });

//   return (
//     <group position={position}>
//       {/* Outer pulse ring */}
//       <Sphere
//         ref={glowRef}
//         args={[0.08, 16, 16]}
//         onClick={(e) => {
//           e.stopPropagation();
//           if (onClick) {
//             onClick(location);
//           }
//         }}
//         onPointerEnter={(e) => {
//           e.stopPropagation();
//           document.body.style.cursor = "pointer";
//         }}
//         onPointerLeave={(e) => {
//           e.stopPropagation();
//           document.body.style.cursor = "auto";
//         }}
//       >
//         <meshBasicMaterial color={location.color} transparent opacity={0.3} />
//       </Sphere>

//       {/* Middle glow ring */}
//       <Sphere
//         args={[0, 16, 16]}
//         onClick={(e) => {
//           e.stopPropagation();
//           if (onClick) {
//             onClick(location);
//           }
//         }}
//         onPointerEnter={(e) => {
//           e.stopPropagation();
//           document.body.style.cursor = "pointer";
//         }}
//         onPointerLeave={(e) => {
//           e.stopPropagation();
//           document.body.style.cursor = "auto";
//         }}
//       >
//         <meshBasicMaterial color={location.color} transparent opacity={0.6} />
//       </Sphere>

//       {/* Main marker */}
//       <Sphere
//         ref={markerRef}
//         args={[0.06, 16, 16]}
//         onClick={(e) => {
//           e.stopPropagation();
//           if (onClick) {
//             onClick(location);
//           }
//         }}
//         onPointerEnter={(e) => {
//           e.stopPropagation();
//           document.body.style.cursor = "pointer";
//         }}
//         onPointerLeave={(e) => {
//           e.stopPropagation();
//           document.body.style.cursor = "auto";
//         }}
//       >
//         <meshStandardMaterial
//           color={location.color}
//           emissive={location.color}
//           emissiveIntensity={0.4}
//           roughness={0.1}
//           metalness={0.8}
//         />
//       </Sphere>

//       {/* Inner bright core */}
//       <Sphere args={[0.025, 8, 8]}>
//         <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
//       </Sphere>

//       {/* Location label with office details */}
//       <Html
//         position={[0.8, isHovered ? 0.2 : 0.2, 0]}
//         center
//         distanceFactor={4}
//         occlude
//       >
//         <div
//           className={`bg-white/95 backdrop-blur-sm border border-gray-200 rounded-[10px] shadow-2xl transition-all duration-300 ${
//             isHovered
//               ? "sm:block scale-110 hidden"
//               : "sm:hidden scale-90 hidden"
//           }`}
//         >
//           {isHovered ? (
//             <div className="p-2 w-[230px]">
//               <div className="flex items-center justify-center mb-2">
//                 <h3 className="text-[15px] font-semibold text-gray-900 flex items-center gap-2">
//                   <div
//                     className="w-[15px] h-[15px] rounded-full"
//                     style={{ backgroundColor: location.color }}
//                   ></div>
//                   {location.name}
//                 </h3>
//               </div>

//               <div className="space-y-1">
//                 <div>
//                   <p className="text-[10px] font-medium text-gray-700 text-center">
//                     {location.city}, {location.country}
//                   </p>
//                 </div>
//               </div>

//               <div className="pt-2 mt-2">
//                 <button
//                   className="w-full text-[10px] bg-[#DBE2E7] hover:bg-[#DBE2E7]/80 text-black font-bold py-1 px-2 h-[30px] rounded-[8px] transition-colors cursor-pointer"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     // Scroll to contact details section
//                     const contactSection = document.getElementById(
//                       "contact-details-section"
//                     );
//                     if (contactSection) {
//                       contactSection.scrollIntoView({
//                         behavior: "smooth",
//                         block: "center",
//                       });
//                     }
//                   }}
//                 >
//                   MESSAGE THIS OFFICE
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="px-3 py-1">
//               <p className="text-[10px] font-medium text-gray-900 whitespace-nowrap">
//                 {location.city}, {location.country}
//               </p>
//             </div>
//           )}
//         </div>
//       </Html>
//     </group>
//   );
// }

// // Main Earth3D component
// export default function Earth3D({ onLocationSelect }) {
//   const [hoveredLocation, setHoveredLocation] = useState(null);
//   const [sidebarHoveredLocation, setSidebarHoveredLocation] = useState(null);
//   const [clickedLocation, setClickedLocation] = useState(null);
//   const [isRotatingToLocation, setIsRotatingToLocation] = useState(false);
//   const [isHoveringEarthContainer, setIsHoveringEarthContainer] =
//     useState(false);
//   const [hasBeenManuallyRotated, setHasBeenManuallyRotated] = useState(false);
//   const [isResettingToDefault, setIsResettingToDefault] = useState(false);
//   const [pendingLocation, setPendingLocation] = useState(null);
//   const [pendingAction, setPendingAction] = useState(null); // 'click' or 'hover'
//   const hoverTimeoutRef = useRef(null);
//   const earthRef = useRef();
//   const controlsRef = useRef();

//   // Cleanup timeout on unmount
//   useEffect(() => {
//     return () => {
//       if (hoverTimeoutRef.current) {
//         clearTimeout(hoverTimeoutRef.current);
//       }
//     };
//   }, []);

//   // Global click handler to close popup when clicking outside
//   useEffect(() => {
//     const handleGlobalClick = (e) => {
//       // Check if click is outside the Earth container
//       const earthContainer = document.querySelector(".lg\\:col-span-2");
//       if (earthContainer && !earthContainer.contains(e.target)) {
//         setHoveredLocation(null);
//       }
//     };

//     if (hoveredLocation) {
//       document.addEventListener("click", handleGlobalClick);
//     }

//     return () => {
//       document.removeEventListener("click", handleGlobalClick);
//     };
//   }, [hoveredLocation]);

//   // Clear container hover when marker is hovered
//   useEffect(() => {
//     if (hoveredLocation) {
//       setIsHoveringEarthContainer(false);
//     }
//   }, [hoveredLocation]);

//   // Debounced hover handler to prevent rapid state changes
//   const handleLocationHover = (location) => {
//     if (hoverTimeoutRef.current) {
//       clearTimeout(hoverTimeoutRef.current);
//       hoverTimeoutRef.current = null;
//     }

//     if (location) {
//       // Immediate hover - no delay
//       setHoveredLocation(location);
//     } else {
//       // Delayed unhover to prevent flickering when moving mouse
//       hoverTimeoutRef.current = setTimeout(() => {
//         setHoveredLocation(null);
//         hoverTimeoutRef.current = null;
//       }, 300); // Increased delay to 300ms for more stability
//     }
//   };

//   // Function to handle clicking on sidebar location
//   const handleLocationClick = (location) => {
//     if (hasBeenManuallyRotated) {
//       // If Earth has been manually rotated, first reset camera, then rotate to location
//       setPendingLocation(location);
//       setPendingAction("click");
//       setIsResettingToDefault(true);
//     } else {
//       // If not manually rotated, directly rotate to location
//       setClickedLocation(location);
//       setHoveredLocation(location);
//       setIsRotatingToLocation(true);

//       // Notify parent component about location selection
//       if (onLocationSelect) {
//         onLocationSelect(location);
//       }

//       // Reset rotation state after animation
//       setTimeout(() => {
//         setIsRotatingToLocation(false);
//       }, 1000);
//     }
//   };

//   // Function to handle clicking on location markers (only opens popup, no camera reset)
//   const handleMarkerClick = (location) => {
//     // Only set as hovered to show popup, no camera rotation
//     setHoveredLocation(location);

//     // Notify parent component about location selection for popup
//     if (onLocationSelect) {
//       onLocationSelect(location);
//     }
//   };

//   // Function to handle clicking outside Earth to close popup
//   const handleEarthContainerClick = (e) => {
//     // Only close popup if clicking on the container itself, not on markers
//     if (e.target === e.currentTarget) {
//       setHoveredLocation(null);
//     }
//   };

//   // Function to handle clicking on Earth surface to close popup
//   const handleEarthClick = () => {
//     setHoveredLocation(null);
//   };

//   // Function to handle manual rotation detection
//   const handleManualRotation = (shouldSet = true) => {
//     setHasBeenManuallyRotated(shouldSet);
//     if (!shouldSet) {
//       // When resetting manual rotation flag, also stop resetting to default
//       setIsResettingToDefault(false);

//       // If there's a pending location, now rotate to it
//       if (pendingLocation && pendingAction) {
//         if (pendingAction === "click") {
//           setClickedLocation(pendingLocation);
//           setHoveredLocation(pendingLocation);
//           setIsRotatingToLocation(true);

//           // Notify parent component about location selection
//           if (onLocationSelect) {
//             onLocationSelect(pendingLocation);
//           }

//           // Reset rotation state after animation
//           setTimeout(() => {
//             setIsRotatingToLocation(false);
//           }, 2000);
//         } else if (pendingAction === "hover") {
//           setSidebarHoveredLocation(pendingLocation);
//         }

//         setPendingLocation(null);
//         setPendingAction(null);
//       }
//     }
//   };

//   // Function to handle sidebar hover
//   const handleSidebarHover = (location) => {
//     if (hasBeenManuallyRotated) {
//       // If Earth has been manually rotated, first reset camera, then rotate to location
//       setPendingLocation(location);
//       setPendingAction("hover");
//       setIsResettingToDefault(true);
//     } else {
//       // If not manually rotated, directly set hovered location
//       setSidebarHoveredLocation(location);
//     }
//   };

//   // Function to handle sidebar hover leave
//   const handleSidebarHoverLeave = () => {
//     if (!hasBeenManuallyRotated) {
//       // Only clear sidebar hover if not manually rotated
//       setSidebarHoveredLocation(null);
//     } else if (pendingAction === "hover") {
//       // If we're in the middle of a hover reset, cancel it
//       setPendingLocation(null);
//       setPendingAction(null);
//       setIsResettingToDefault(false);
//     }
//     // If manually rotated and not in hover reset, don't clear the hover state until reset is complete
//   };

//   return (
//     <div
//       className="py-8"
//       style={{
//         backgroundImage: "url('/images/contact/contact-bg.png')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div className="max-w-[1300px] mx-auto px-2 sm:px-4 lg:px-6">
//         {/* <div className="text-center mb-12">
//           <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
//             Our Global Locations
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Explore TDG offices and facilities around the world. Hover over any
//             location to learn more.
//           </p>
//         </div> */}

//         <div className="items-center">
//           {/* 3D Earth Container */}
//           <div
//             className="lg:col-span-2"
//             onClick={handleEarthContainerClick}
//             onMouseEnter={() => {
//               // Only set container hover if not already hovering a marker
//               if (!hoveredLocation) {
//                 setIsHoveringEarthContainer(true);
//               }
//             }}
//             onMouseLeave={() => {
//               // Only clear container hover if not hovering a marker
//               if (!hoveredLocation) {
//                 setIsHoveringEarthContainer(false);
//               }
//             }}
//           >
//             <div
//               className="relative from-white p-2 sm:p-4 h-[400px] sm:h-[600px] lg:h-[800px] overflow-hidden"
//               onClick={handleEarthContainerClick}
//             >
//               <Canvas
//                 camera={{ position: [0, 0, 6], fov: 50 }}
//                 style={{ background: "transparent" }}
//                 onClick={(e) => {
//                   // Only close popup if clicking on the Canvas background, not on markers
//                   if (e.target === e.currentTarget) {
//                     setHoveredLocation(null);
//                   }
//                 }}
//               >
//                 {/* Balanced Bright Lighting for Earth */}
//                 <ambientLight intensity={1.2} />
//                 <directionalLight
//                   position={[1, 1, 1]}
//                   intensity={2.8}
//                   color="#ffffff"
//                 />
//                 <directionalLight
//                   position={[-1, 1, 1]}
//                   intensity={1.8}
//                   color="#e3f2fd"
//                 />
//                 <directionalLight
//                   position={[0, -1, 1]}
//                   intensity={1.0}
//                   color="#e0f7fa"
//                 />
//                 <pointLight
//                   position={[0, 0, 4]}
//                   intensity={1.8}
//                   color="#ffffff"
//                 />
//                 <pointLight
//                   position={[4, 4, 4]}
//                   intensity={1.2}
//                   color="#fffbe0"
//                 />
//                 <pointLight
//                   position={[-4, -4, 4]}
//                   intensity={0.8}
//                   color="#ffe0b2"
//                 />
//                 <pointLight
//                   position={[0, 0, -4]}
//                   intensity={0.6}
//                   color="#ffffff"
//                 />

//                 {/* Light background - no stars for light theme */}

//                 {/* Camera Reset Controller */}
//                 <CameraResetController
//                   isResettingToDefault={isResettingToDefault}
//                   onResetComplete={() => handleManualRotation(false)}
//                   controlsRef={controlsRef}
//                 />

//                 {/* Earth with rotating markers */}
//                 <Earth
//                   sidebarHoveredLocation={sidebarHoveredLocation}
//                   officeLocations={officeLocations}
//                   clickedLocation={clickedLocation}
//                   isRotatingToLocation={isRotatingToLocation}
//                   isHoveringEarthContainer={isHoveringEarthContainer}
//                   hasBeenManuallyRotated={hasBeenManuallyRotated}
//                   isResettingToDefault={isResettingToDefault}
//                   onManualRotation={handleManualRotation}
//                   earthRef={earthRef}
//                   onLocationClick={handleMarkerClick}
//                   hoveredLocation={hoveredLocation}
//                   onEarthClick={handleEarthClick}
//                 />

//                 {/* Camera controls */}
//                 <OrbitControls
//                   ref={controlsRef}
//                   enableZoom={false}
//                   enablePan={false}
//                   enableRotate={true}
//                   minDistance={3}
//                   maxDistance={6}
//                   autoRotate={false}
//                   onChange={handleManualRotation}
//                   minPolarAngle={Math.PI / 2}
//                   maxPolarAngle={Math.PI / 2}
//                 />
//               </Canvas>

//               {/* Earth Title */}
//               {/* <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
//                 <h3 className="text-gray-900 text-sm sm:text-lg font-semibold bg-white/80 backdrop-blur-sm px-2 py-1 sm:px-4 sm:py-2 rounded-lg border border-gray-200 shadow-sm">
//                   🌍 TDG Global Network
//                 </h3>
//               </div> */}
//             </div>
//           </div>

//           {/* Office List */}
//           {/* <div className="space-y-3 sm:space-y-4">
//             <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
//               Global Offices
//             </h3>

//             <div className="space-y-3">
//               {officeLocations.map((location) => (
//                 <div
//                   key={location.id}
//                   className="p-4 rounded-xl cursor-pointer transition-all duration-300 bg-white backdrop-blur-sm border border-gray-200 hover:bg-blue-50 shadow-sm"
//                   onClick={() => handleLocationClick(location)}
//                 >
//                   <div className="flex items-center gap-3">
//                     <div
//                       className="w-4 h-4 rounded-full"
//                       style={{ backgroundColor: location.color }}
//                     ></div>
//                     <div>
//                       <p className="font-medium text-gray-900">
//                         {location.name}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         {location.city}, {location.country}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// }

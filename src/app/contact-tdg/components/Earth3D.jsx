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
export const officeLocations = [
  {
    id: 1,
    name: "TDG United States",
    city: "North Tonawanda",
    country: "United States",
    address:
      "3829 Forest Park Way #500, North Tonawanda, NY 14120, United States",
    phone: "+1 (716) 123-4567",
    email: "sales_USA@tdgdesign.com",
    lat: 43.0635,
    lng: -78.8325,
    color: "#DC2626", // Red
    colorLight: "#EF4444",
    map_lat: 43.06346,
    map_lng: -78.83247,
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
    color: "#10B981", // Green
    colorLight: "#34D399",
    map_lat: 52.59608,
    map_lng: -1.18634,
  },
  {
    id: 4,
    name: "TDG Canada",
    city: "Mississauga",
    country: "Canada",
    address: "9-3770 Laird Rd Building A, Mississauga, ON L5L 0A7, Canada",
    phone: "+1 (905) 123-4567",
    email: "sales_canada@tdgdesign.com",
    lat: 43.589,
    lng: -79.6441,
    color: "#F59E0B", // Amber/Orange
    colorLight: "#FBBF24",
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
    color: "#8B5CF6", // Purple
    colorLight: "#A78BFA",
    map_lat: 28.53313,
    map_lng: 77.46848,
  },
  {
    id: 6,
    name: "TDG India",
    city: "Surat",
    country: "India",
    address:
      "2029, Silver Business Point, VIP Cir, Mota Varachha, Surat, Gujarat 394105",
    phone: "+91 261 123 4567",
    email: "sales_india@tdgdesign.com",
    lat: 21.243,
    lng: 72.9126,
    color: "#EC4899", // Pink
    colorLight: "#F472B6",
    map_lat: 21.23377,
    map_lng: 72.86358,
  },
  {
    id: 7,
    name: "TDG Poland",
    city: "Zabrze",
    country: "Poland",
    address: "Jozefa Dworaczka 1, 41-806 Zabrze, Poland",
    phone: "+48 32 123 4567",
    email: "sales_poland@tdgdesign.com",
    lat: 50.3107,
    lng: 18.7856,
    color: "#06B6D4", // Cyan
    colorLight: "#22D3EE",
    map_lat: 50.3107,
    map_lng: 18.7856,
  },
];

// Shown whenever we can't work out which office is closest to the visitor -
// either their country wasn't detected, or they're somewhere we have no office.
export const defaultLocation =
  officeLocations.find(
    (loc) => loc.email?.toLowerCase() === "sales_canada@tdgdesign.com"
  ) ||
  officeLocations.find((loc) => loc.id === 4) ||
  officeLocations[0];

// Radius the office markers sit at (Earth sphere is 2.2)
const MARKER_RADIUS = 2.15;

// A drag longer than this many pixels is a rotation, not a click
const DRAG_THRESHOLD = 5;

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

// Earth group rotation (Euler XYZ) that turns a lat/lng to face the default
// camera on +Z. Replaces the hand-tuned per-region values: every office lands
// dead centre, including any office added later.
function rotationForLatLng(lat, lng) {
  const latRad = lat * (Math.PI / 180);
  const lngRad = lng * (Math.PI / 180);
  let y = Math.atan2(-Math.cos(lngRad), -Math.sin(lngRad));
  if (y < 0) y += Math.PI * 2;
  return [latRad, y, 0];
}

// Shortest signed distance between two angles, so the Earth never takes the
// long way round (e.g. 6.1 -> 0.2 turns forwards, not almost a full circle)
function shortestAngleDelta(from, to) {
  return Math.atan2(Math.sin(to - from), Math.cos(to - from));
}

// Is a point on the globe's surface turned towards the camera, or has it
// rotated around to the far side? Small epsilon so points hide just before
// they reach the silhouette edge, where their screen position gets jittery.
const FACING_EPSILON = 0.06;
function isFacingCamera(worldPosition, camera) {
  const toCamera = camera.position.clone().sub(worldPosition).normalize();
  return worldPosition.clone().normalize().dot(toCamera) > FACING_EPSILON;
}

// Viewport coordinates for a world-space point
function projectToScreen(worldPosition, camera, size, domElement) {
  const ndc = worldPosition.clone().project(camera);
  const rect = domElement
    ? domElement.getBoundingClientRect()
    : { left: 0, top: 0 };
  return {
    x: (ndc.x * 0.5 + 0.5) * size.width + rect.left,
    y: (ndc.y * -0.5 + 0.5) * size.height + rect.top,
  };
}

// Which side of the screen the office card is pinned to. Hysteresis bands so
// a marker hovering near the centre while dragging doesn't flip back and forth.
function sideForPosition(x, currentSide) {
  const width = window.innerWidth;
  if (x < width * 0.45) return "left";
  if (x > width * 0.55) return "right";
  return currentSide || (x < width / 2 ? "left" : "right");
}

// L-shaped connector running from the marker up to the pinned office card
const CONNECTOR_ELBOW_Y = 220;
function buildConnectorPath(point, markerSide) {
  if (!point) return "";
  const viewportWidth = window.innerWidth;
  const inset = viewportWidth < 1800 ? 20 : 220;
  const endX = markerSide === "left" ? 100 : viewportWidth - 100;
  const elbowX = point.x + (markerSide === "left" ? -80 : 80);
  const targetX = markerSide === "left" ? endX + inset : endX - inset;
  return `M ${point.x} ${point.y} L ${elbowX} ${CONNECTOR_ELBOW_Y} L ${targetX} ${CONNECTOR_ELBOW_Y}`;
}

// Marker Position Calculator Component
function MarkerPositionCalculator({
  location,
  earthRef,
  onPositionCalculated,
  isCalculating,
}) {
  const { camera, size, gl } = useThree();
  const calculatedRef = useRef(false);

  useFrame(() => {
    if (
      isCalculating &&
      location &&
      earthRef.current &&
      !calculatedRef.current
    ) {
      // Marker position on the Earth group, moved into world space
      const worldPosition = latLngToVector3(
        location.lat,
        location.lng,
        MARKER_RADIUS
      ).applyMatrix4(earthRef.current.matrixWorld);

      // Only calculate once
      calculatedRef.current = true;

      onPositionCalculated(
        projectToScreen(worldPosition, camera, size, gl.domElement)
      );
    }

    // Reset when not calculating
    if (!isCalculating) {
      calculatedRef.current = false;
    }
  });

  return null;
}

// Keeps the open office card's connector line attached to its marker while the
// globe is being dragged, and closes the card once the marker turns away to the
// far side. Writes the SVG path straight to the DOM rather than through state,
// so dragging doesn't re-render the scene every frame.
function MarkerTracker({
  location,
  earthRef,
  linePathRef,
  markerSide,
  onSideChange,
  onOccluded,
}) {
  const { camera, size, gl } = useThree();
  const lastSideRef = useRef(markerSide);
  const reportedOccludedRef = useRef(false);

  // Keep the ref in step when the side is changed from outside (new marker)
  lastSideRef.current = markerSide;

  useFrame(() => {
    if (!location || !earthRef.current) return;

    const worldPosition = latLngToVector3(
      location.lat,
      location.lng,
      MARKER_RADIUS
    ).applyMatrix4(earthRef.current.matrixWorld);

    // Marker has rotated behind the globe - close the card once
    if (!isFacingCamera(worldPosition, camera)) {
      if (!reportedOccludedRef.current) {
        reportedOccludedRef.current = true;
        onOccluded();
      }
      return;
    }
    reportedOccludedRef.current = false;

    const point = projectToScreen(worldPosition, camera, size, gl.domElement);

    // Re-pin the card if the marker has crossed to the other half of the screen
    const nextSide = sideForPosition(point.x, lastSideRef.current);
    if (nextSide !== lastSideRef.current) {
      lastSideRef.current = nextSide;
      onSideChange(nextSide);
    }

    if (linePathRef.current) {
      linePathRef.current.setAttribute(
        "d",
        buildConnectorPath(point, lastSideRef.current)
      );
    }
  });

  return null;
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
  visitorCountry,
}) {
  // Earth textures. The specular map used to be fetched here and never used -
  // a third 2048px download for nothing.
  const [earthTexture, normalMap] = useTexture([
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg",
  ]);

  // Eases the Earth towards the rotation that centres `location`, taking the
  // shortest way round. `speed` is the fraction covered per 60fps frame, scaled
  // by delta so the animation runs at the same pace on a 144Hz screen.
  const easeTowardsLocation = (location, delta, maxSpeed, minSpeed, snap) => {
    const targetRotation = rotationForLatLng(location.lat, location.lng);
    const current = earthRef.current.rotation;

    const diffX = shortestAngleDelta(current.x, targetRotation[0]);
    const diffY = shortestAngleDelta(current.y, targetRotation[1]);
    const diffZ = shortestAngleDelta(current.z, targetRotation[2]);

    const totalDistance = Math.sqrt(
      diffX * diffX + diffY * diffY + diffZ * diffZ
    );

    if (totalDistance <= 0.01) {
      if (snap) {
        current.x = targetRotation[0];
        current.y = targetRotation[1];
        current.z = targetRotation[2];
      }
      return;
    }

    // Adaptive speed (faster when far, slower when close), made frame-rate
    // independent so it can't overshoot on a fast display
    const perFrame = Math.min(maxSpeed, Math.max(minSpeed, totalDistance * 0.1));
    const step = 1 - Math.pow(1 - perFrame, Math.min(delta, 0.1) * 60);

    current.x += diffX * step;
    current.y += diffY * step;
    current.z += diffZ * step;
  };

  useFrame((state, delta) => {
    if (!earthRef.current) return;

    if (isRotatingToLocation && clickedLocation) {
      easeTowardsLocation(clickedLocation, delta, 0.15, 0.05, true);
    } else if (
      sidebarHoveredLocation &&
      !isRotatingToLocation &&
      !hoveredLocation
    ) {
      // Slower than a click, but still responsive
      easeTowardsLocation(sidebarHoveredLocation, delta, 0.08, 0.03, false);
    }
    // Completely removed auto-rotation - Earth will stay stationary
  });

  const initialRotation = useMemo(() => {
    if (visitorCountry === "Canada" || visitorCountry === "United States") {
      return [0.7, 6.1, 0.3];
    } else if (
      visitorCountry === "United Kingdom" ||
      visitorCountry === "Poland"
    ) {
      return [1.2, 3.7, 0.6];
    } else if (visitorCountry === "India") {
      return [0.4, 3.4, 0];
    } else {
      return [0.7, 6.1, 0.3];
    }
  }, [visitorCountry]);

  // <group ref={earthRef} rotation={initialRotation}>

  return (
    <group ref={earthRef} rotation={initialRotation}>
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
        {/* Opaque: `transparent` with opacity 1 only cost an alpha-blend pass,
            and color="transparent" is not a colour - three fell back to white */}
        <meshStandardMaterial
          map={earthTexture}
          normalMap={normalMap}
          roughness={1}
          metalness={0.5}
          emissive="black"
          emissiveIntensity={0.005}
        />

        {/* <meshStandardMaterial
          map={earthTexture}
          normalMap={normalMap}
          roughness={0}
          metalness={0}
          transparent={false}
          color="transparent"
          // emissive="lightgray"
          emissiveIntensity={1}
          opacity={1}
        /> */}
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
  const pulseRing1Ref = useRef();
  const pulseRing2Ref = useRef();
  const pulseRing3Ref = useRef();
  const { camera, size, gl } = useThree();
  const position = useMemo(
    () => latLngToVector3(location.lat, location.lng, MARKER_RADIUS),
    [location.lat, location.lng]
  );

  // Raycasting ignores the globe, so markers on the far side still register
  // hovers and clicks through the Earth. Ignore them unless they face us.
  const isMarkerVisible = () => {
    if (!markerRef.current) return true;
    const worldPosition = new THREE.Vector3();
    markerRef.current.getWorldPosition(worldPosition);
    return isFacingCamera(worldPosition, camera);
  };

  // Use location-specific colors
  // Standard and attractive yellow and blue colors
  // const markerColor = "#2196F3"; // Bright, attractive blue
  // const markerColorLight = "#FFD600"; // Lively, attractive yellow
  const markerColor = "#FFD600"; // Bright, attractive yellow
  // const markerColorLight = "#FFD600"; // Lively, attractive blue
  const markerColorLight = "transparent"; // Lively, attractive blue

  // Track if each ring has completed its animation
  const ring1Completed = useRef(false);
  const ring2Completed = useRef(false);
  const ring3Completed = useRef(false);
  const startTime = useRef(null);

  // Unique pulse timing for each marker based on location ID
  // Each marker will have a different base speed and phase offset
  const pulseSpeed = useMemo(() => {
    // Base speed varies between 0.2 and 0.4 based on location ID
    return 0.2 + (location.id % 5) * 0.06;
  }, [location.id]);

  const phaseOffset = useMemo(() => {
    // Phase offset varies between 0 and 1 based on location ID
    return (location.id * 0.15) % 5;
  }, [location.id]);

  // Function to get screen position of marker center
  const getMarkerScreenPosition = () => {
    const worldPosition = new THREE.Vector3();
    if (markerRef.current) {
      markerRef.current.getWorldPosition(worldPosition);
    } else {
      worldPosition.copy(position);
    }
    return projectToScreen(worldPosition, camera, size, gl.domElement);
  };

  useFrame((state) => {
    // Initialize start time on first frame
    if (startTime.current === null) {
      startTime.current = state.clock.elapsedTime;
    }

    const elapsedTime = state.clock.elapsedTime - startTime.current;

    // Easing function for smooth start (ease-out cubic)
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const startScale = 1;
    const maxScale = 1.6; // Reduced from 2 for slightly smaller rings

    // Ring 1 - animate once, then stay at max scale
    if (pulseRing1Ref.current && !ring1Completed.current) {
      const adjustedTime = elapsedTime * pulseSpeed + phaseOffset;
      const pulse = adjustedTime % 1;
      const easedPulse = easeOutCubic(pulse);
      const scale = startScale + easedPulse * (maxScale - startScale);
      pulseRing1Ref.current.scale.setScalar(scale);
      pulseRing1Ref.current.material.opacity = Math.max(
        0,
        0.5 * (1 - easedPulse)
      );

      // Check if one full cycle has completed
      if (adjustedTime >= 1) {
        ring1Completed.current = true;
        pulseRing1Ref.current.scale.setScalar(maxScale);
        pulseRing1Ref.current.material.opacity = 0.2; // Slightly better visible opacity
      }
    } else if (pulseRing1Ref.current && ring1Completed.current) {
      // Keep at max scale with subtle visible opacity
      pulseRing1Ref.current.scale.setScalar(maxScale);
      pulseRing1Ref.current.material.opacity = 0.2;
    }

    // Ring 2 - animate once, then stay at max scale
    if (pulseRing2Ref.current && !ring2Completed.current) {
      const adjustedTime = elapsedTime * pulseSpeed + 0.33 + phaseOffset;
      const pulse = adjustedTime % 1;
      const easedPulse = easeOutCubic(pulse);
      const scale = startScale + easedPulse * (maxScale - startScale);
      pulseRing2Ref.current.scale.setScalar(scale);
      pulseRing2Ref.current.material.opacity = Math.max(
        0,
        0.32 * (1 - easedPulse)
      );

      // Check if one full cycle has completed
      if (adjustedTime >= 1) {
        ring2Completed.current = true;
        pulseRing2Ref.current.scale.setScalar(maxScale);
        pulseRing2Ref.current.material.opacity = 0.15; // Slightly better visible opacity
      }
    } else if (pulseRing2Ref.current && ring2Completed.current) {
      // Keep at max scale with subtle visible opacity
      pulseRing2Ref.current.scale.setScalar(maxScale);
      pulseRing2Ref.current.material.opacity = 0.15;
    }

    // Ring 3 - animate once, then stay at max scale
    if (pulseRing3Ref.current && !ring3Completed.current) {
      const adjustedTime = elapsedTime * pulseSpeed + 0.66 + phaseOffset;
      const pulse = adjustedTime % 1;
      const easedPulse = easeOutCubic(pulse);
      const scale = startScale + easedPulse * (maxScale - startScale);
      pulseRing3Ref.current.scale.setScalar(scale);
      pulseRing3Ref.current.material.opacity = Math.max(
        0,
        0.16 * (1 - easedPulse)
      );

      // Check if one full cycle has completed
      if (adjustedTime >= 1) {
        ring3Completed.current = true;
        pulseRing3Ref.current.scale.setScalar(maxScale);
        pulseRing3Ref.current.material.opacity = 0.08; // Slightly better visible opacity
      }
    } else if (pulseRing3Ref.current && ring3Completed.current) {
      // Keep at max scale with subtle visible opacity
      pulseRing3Ref.current.scale.setScalar(maxScale);
      pulseRing3Ref.current.material.opacity = 0.08;
    }

    /* ORIGINAL PULSE ANIMATION CODE - COMMENTED FOR BACKUP
    // Pulse animation for all three rings, with different phases
    // Each marker has unique timing based on location ID
    const time = state.clock.elapsedTime;

    // Easing function for smooth start (ease-out cubic)
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    // Ring 1 (phase offset based on location ID)
    if (pulseRing1Ref.current) {
      const pulse = (time * pulseSpeed + phaseOffset) % 1; // 0 to 1
      const easedPulse = easeOutCubic(pulse); // Apply easing for smooth start
      const startScale = 1; // Start from smaller scale
      const maxScale = 2; // Maximum scale
      const scale = startScale + easedPulse * (maxScale - startScale);
      pulseRing1Ref.current.scale.setScalar(scale);
      // Opacity starts low and fades out smoothly
      pulseRing1Ref.current.material.opacity = Math.max(
        0,
        0.5 * (1 - easedPulse)
      );
    }
    // Ring 2 (a third cycle offset + location phase offset)
    if (pulseRing2Ref.current) {
      const pulse = (time * pulseSpeed + 0.33 + phaseOffset) % 1;
      const easedPulse = easeOutCubic(pulse);
      const startScale = 1;
      const maxScale = 2;
      const scale = startScale + easedPulse * (maxScale - startScale);
      pulseRing2Ref.current.scale.setScalar(scale);
      pulseRing2Ref.current.material.opacity = Math.max(
        0,
        0.32 * (1 - easedPulse)
      );
    }
    // Ring 3 (two thirds cycle offset + location phase offset)
    if (pulseRing3Ref.current) {
      const pulse = (time * pulseSpeed + 0.66 + phaseOffset) % 1;
      const easedPulse = easeOutCubic(pulse);
      const startScale = 1;
      const maxScale = 2;
      const scale = startScale + easedPulse * (maxScale - startScale);
      pulseRing3Ref.current.scale.setScalar(scale);
      pulseRing3Ref.current.material.opacity = Math.max(
        0,
        0.16 * (1 - easedPulse)
      );
    }
    */
  });
  // Handler that calculates marker center and passes it to onClick
  const handleMarkerClick = (e) => {
    if (!isMarkerVisible()) return;
    e.stopPropagation();
    if (onClick) {
      const markerCenter = getMarkerScreenPosition();
      const syntheticEvent = {
        ...e,
        clientX: markerCenter.x,
        clientY: markerCenter.y,
      };
      onClick(location, syntheticEvent);
    }
  };

  // Calculate line connection from marker to Earth surface
  const lineLength = 0.8; // Distance from marker (2.35) to Earth surface (2.2)
  const lineDirection = useMemo(() => {
    // Normalize the position vector to get direction from Earth center to marker
    // We need the opposite direction (from marker toward Earth center)
    const dir = position.clone().normalize().multiplyScalar(-1);
    return dir;
  }, [position]);

  // Calculate position for the cylinder (midpoint along the line, extending from marker toward Earth)
  const linePosition = useMemo(() => {
    // Position the line starting from the marker, extending half the length toward Earth
    return lineDirection.clone().multiplyScalar(lineLength / 2);
  }, [lineDirection, lineLength]);

  // Calculate rotation to align cylinder with radial direction (toward Earth center)
  const lineRotation = useMemo(() => {
    // Create a quaternion that rotates from default up (0,1,0) to the direction toward Earth
    const up = new THREE.Vector3(0, 1, 0);
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(up, lineDirection);
    const euler = new THREE.Euler();
    euler.setFromQuaternion(quaternion);
    return [euler.x, euler.y, euler.z];
  }, [lineDirection]);

  return (
    <group position={position}>
      {/* Connection line from marker to Earth surface */}
      {/* <mesh position={linePosition} rotation={lineRotation}>
        <cylinderGeometry args={[0.008, 0.008, lineLength, 8]} />
        <meshStandardMaterial
          color={markerColor}
          roughness={0.3}
          metalness={0.2}
          emissive={markerColorLight}
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Animated Pulse Rings */}
      {/* <Sphere
        ref={pulseRing1Ref}
        args={[0.07, 16, 16]}
        onClick={handleMarkerClick}
      >
        <meshBasicMaterial
          color={markerColorLight}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
          depthWrite={true}
        />
      </Sphere>
      <Sphere
        ref={pulseRing2Ref}
        args={[0.07, 16, 16]}
        onClick={handleMarkerClick}
      >
        <meshBasicMaterial
          color={markerColorLight}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
          depthWrite={true}
        />
      </Sphere>
      <Sphere
        ref={pulseRing3Ref}
        args={[0.07, 16, 16]}
        onClick={handleMarkerClick}
      >
        <meshBasicMaterial
          color={markerColorLight}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
          depthWrite={true}
        />
      </Sphere> */}

      <Sphere
        ref={markerRef}
        // args={[0.064, 16, 16]}
        args={[0.07, 16, 16]}
        onClick={handleMarkerClick}
        onPointerEnter={(e) => {
          if (!isMarkerVisible()) return;
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "auto";
        }}
      >
        <meshStandardMaterial
          color={markerColor}
          roughness={1}
          metalness={0}
          emissive={markerColorLight}
          emissiveIntensity={0}
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </Sphere>

      {/* Main marker */}
      {/* <Sphere
        ref={markerRef}
        args={[0.05, 16, 16]}
        onClick={handleMarkerClick}
        onPointerEnter={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "auto";
        }}
        color={markerRed}
        opacity={1}
        transparent={false}
        emissive={markerRed}
        emissiveIntensity={1}
        roughness={0}
        metalness={1}
      /> */}
    </group>

    // <group position={position}>
    //   {/* Pulse Ring 3 - outermost */}
    //   <Sphere
    //     ref={pulseRing3Ref}
    //     args={[0.08, 16, 16]}
    //     onClick={handleMarkerClick}
    //   >
    //     <meshBasicMaterial
    //       color={markerRedLight}
    //       transparent
    //       opacity={0.6}
    //       side={THREE.DoubleSide}
    //     />
    //   </Sphere>

    //   {/* Pulse Ring 2 - middle */}
    //   <Sphere
    //     ref={pulseRing2Ref}
    //     args={[0.08, 16, 16]}
    //     onClick={handleMarkerClick}
    //   >
    //     <meshBasicMaterial
    //       color={markerRedLight}
    //       transparent
    //       opacity={0.4}
    //       side={THREE.DoubleSide}
    //     />
    //   </Sphere>

    //   {/* Pulse Ring 1 - innermost */}
    //   <Sphere
    //     ref={pulseRing1Ref}
    //     args={[0.08, 16, 16]}
    //     onClick={handleMarkerClick}
    //   >
    //     <meshBasicMaterial
    //       color={markerRedLight}
    //       transparent
    //       opacity={0.4}
    //       side={THREE.DoubleSide}
    //     />
    //   </Sphere>

    //   {/* Main circular marker - static, no pulse */}
    //   <Sphere
    //     ref={markerRef}
    //     args={[0.05, 16, 16]}
    //     onClick={handleMarkerClick}
    //     onPointerEnter={(e) => {
    //       e.stopPropagation();
    //       document.body.style.cursor = "pointer";
    //     }}
    //     onPointerLeave={(e) => {
    //       e.stopPropagation();
    //       document.body.style.cursor = "auto";
    //     }}
    //   >
    //     <meshStandardMaterial
    //       color={markerRed}
    //       roughness={0.2}
    //       metalness={0.3}
    //       emissive={markerRedLight}
    //       emissiveIntensity={0.2}
    //     />
    //   </Sphere>

    //   {/* Inner white highlight dot */}
    //   <Sphere
    //     args={[0.015, 12, 12]}
    //     position={[0, 0, 0.03]}
    //     onClick={handleMarkerClick}
    //   >
    //     <meshStandardMaterial
    //       color={markerWhite}
    //       roughness={0.1}
    //       metalness={0.8}
    //       emissive={markerWhite}
    //       emissiveIntensity={0.3}
    //     />
    //   </Sphere>
    // </group>
  );
}

// Office Popup Component
function OfficePopup({
  office,
  isVisible,
  clickPosition,
  onClose,
  markerSide,
  linePathRef,
}) {
  if (!isVisible || !office) return null;

  return (
    <div className="">
      {/* Connecting Line - MarkerTracker rewrites `d` each frame while the
          globe is dragged, so this value is only the starting shape */}
      {clickPosition && (
        <svg
          className="fixed inset-0 pointer-events-none z-10"
          style={{ width: "100vw", height: "100vh" }}
        >
          <path
            ref={linePathRef}
            d={buildConnectorPath(clickPosition, markerSide)}
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
        className={`fixed z-20   duration-300 xl:top-[100px] top-[120px] ${
          markerSide === "left"
            ? "left-[20px] lg:left-[250px] xl:left-[300px] [@media(max-width:1800px)]:left-[80px]"
            : "right-[20px] lg:right-[250px] xl:right-[300px] [@media(max-width:1800px)]:right-[80px]"
        }`}
      >
        {/* <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
        >
          ×
        </button> */}

        <div
          className={`cursor-pointer ${
            markerSide === "left"
              ? "[@media(max-width:1800px)]:pl-9 pl-5"
              : "[@media(max-width:1800px)]:pr-9 pr-5"
          } `}
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
          <div
            className="flex justify-end items-center gap-3"
            style={{
              justifyContent: markerSide === "left" ? "flex-start" : "flex-end",
            }}
          >
            {/* <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: "#FFD700" }}
            ></div> */}
            <h3 className="text-[18px] xl:text-[25px] font-bold text-white uppercase text-right">
              {office.name}
            </h3>
          </div>

          <div className="mb-2">
            <p
              className="text-white text-[15px] xl:text-[20px]"
              style={{ textAlign: markerSide === "left" ? "left" : "right" }}
            >
              {office.city}, {office.country}
            </p>
          </div>

          <button
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
            className="w-full bg-white hover:bg-gray-100 text-black font-bold py-2 px-6 rounded-lg transition-colors text-sm uppercase tracking-wide"
          >
            contact
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Earth3D component
export default function Earth3D({
  onLocationSelect,
  visitorCountry,
  countryDetectionLoading,
}) {
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
  const hasAutoSelectedRef = useRef(false);
  const linePathRef = useRef(null);
  const earthContainerRef = useRef(null);
  const pointerDownRef = useRef({ x: 0, y: 0 });
  const wasDragRef = useRef(false);
  const [isCalculatingMarkerPosition, setIsCalculatingMarkerPosition] =
    useState(false);
  const [pendingAutoSelectLocation, setPendingAutoSelectLocation] =
    useState(null);

  // Handler for when marker position is calculated
  const handleMarkerPositionCalculated = (position) => {
    if (pendingAutoSelectLocation) {
      // Determine marker side based on position
      setMarkerSide(sideForPosition(position.x, null));

      // Set popup data and position with actual marker position
      setPopupOffice(pendingAutoSelectLocation);
      setClickPosition(position);
      setPopupVisible(true);
      setHoveredLocation(pendingAutoSelectLocation);
      setIsPopupActive(true);

      // Stop calculating
      setIsCalculatingMarkerPosition(false);
      setPendingAutoSelectLocation(null);
    }
  };

  // Auto-select location based on visitor's country on mount
  useEffect(() => {
    if (countryDetectionLoading || hasAutoSelectedRef.current) return;

    // Find matching location(s) based on visitor country
    const findMatchingLocation = () => {
      // Handle country name variations
      const countryMap = {
        "United States": "United States",
        USA: "United States",
        US: "United States",
        "United Kingdom": "United Kingdom",
        UK: "United Kingdom",
        Canada: "Canada",
        India: "India",
        Poland: "Poland",
      };

      const normalizedCountry = countryMap[visitorCountry] || visitorCountry;

      // Find first matching location
      const matchingLocation = officeLocations.find(
        (loc) => loc.country === normalizedCountry
      );

      return matchingLocation;
    };

    // Falls back to Canada when the country is unknown or has no office
    const matchingLocation = findMatchingLocation() || defaultLocation;

    if (matchingLocation) {
      // Wait for Earth to be ready, then auto-select
      const timer = setTimeout(() => {
        // Rotate Earth to location first
        setClickedLocation(matchingLocation);
        setIsRotatingToLocation(true);

        // Disable controls temporarily
        if (controlsRef.current) {
          controlsRef.current.enabled = false;
        }

        // Notify parent component
        if (onLocationSelect) {
          onLocationSelect(matchingLocation);
        }

        // After rotation completes, calculate marker position
        setTimeout(() => {
          setIsRotatingToLocation(false);
          // Wait a bit more for Earth position to stabilize, then calculate marker position
          setTimeout(() => {
            setPendingAutoSelectLocation(matchingLocation);
            setIsCalculatingMarkerPosition(true);
          }, 100);
          // Re-enable controls after a short delay
          setTimeout(() => {
            if (controlsRef.current) {
              controlsRef.current.enabled = true;
            }
          }, 100);
        }, 100);

        hasAutoSelectedRef.current = true;
      }, 110); // Wait 200ms for Earth to initialize

      return () => clearTimeout(timer);
    }
  }, [visitorCountry, countryDetectionLoading, onLocationSelect]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // A drag to rotate the globe still ends in a `click` event. Measure how far
  // the pointer travelled so the close-popup handlers can tell a real click
  // from the end of a rotation, and let the user drag with the card open.
  useEffect(() => {
    const handlePointerDown = (e) => {
      pointerDownRef.current = { x: e.clientX, y: e.clientY };
      wasDragRef.current = false;
    };
    const handlePointerUp = (e) => {
      const dx = e.clientX - pointerDownRef.current.x;
      const dy = e.clientY - pointerDownRef.current.y;
      wasDragRef.current = Math.hypot(dx, dy) > DRAG_THRESHOLD;
    };

    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("pointerup", handlePointerUp, true);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("pointerup", handlePointerUp, true);
    };
  }, []);

  // Global click handler to close popup when clicking outside
  useEffect(() => {
    const handleGlobalClick = (e) => {
      // A rotation that finished outside the canvas is not a click
      if (wasDragRef.current) return;

      // Check if click is outside the Earth container and popup
      const earthContainer = earthContainerRef.current;
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
    // Finishing a rotation over a marker should not open its card
    if (wasDragRef.current) return;

    // Set flag to prevent Canvas click handler from firing
    isMarkerClickRef.current = true;

    // Card is open. The globe stays draggable - MarkerTracker keeps the
    // connector line attached to the marker while it turns.
    setIsPopupActive(true);

    // Determine marker side based on screen click position
    setMarkerSide(sideForPosition(event.clientX, null));

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

  // The marker has turned round to the far side of the globe - its card no
  // longer has anything to point at, so close it
  const handleMarkerOccluded = () => {
    setHoveredLocation(null);
    setPopupVisible(false);
    setPopupOffice(null);
    setClickPosition(null);
    setIsPopupActive(false);
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
    // Releasing a rotation over the globe is not a click
    if (wasDragRef.current) return;
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
      className="pb-8 main_container md:min-h-[100vh] max-md:py-[100px]"
      style={{
        background:
          // "radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 25%, #0f1419 50%, #0a0e1a 75%, #000000 100%)",
          "radial-gradient(ellipse at center, #000000 0%, #000000 25%, #000000 50%, #000000 75%, #000000 100%)",
      }}
      onWheel={handleWheelScroll}
    >
      <div className="w-full">
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
            className="w-full"
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
            <div
              ref={earthContainerRef}
              className="relative w-full h-[400px] sm:h-[600px] lg:h-[100vh] overflow-hidden"
            >
              <Canvas
                camera={{ position: [0, 0, 6], fov: 55 }}
                dpr={[1, 2]}
                style={{
                  background:
                    // "radial-gradient(ellipse at center, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.86) 20%, rgba(15, 20, 25, 0.4) 60%, rgba(0, 0, 0, 0.9) 100%)",
                    "radial-gradient(rgba(30, 30, 54, 0.8) 0%, rgb(36 47 75 / 86%) 2%, rgba(15, 20, 25, 0.4) 60%, rgba(0, 0, 0, 0.9) 100%)",
                  width: "100%",
                  height: "100%",
                }}
                onClick={(e) => {
                  // Check if this was a marker click
                  if (isMarkerClickRef.current) {
                    isMarkerClickRef.current = false; // Reset flag
                    return; // Don't close popup
                  }

                  // Dragging the globe ends in a click event too - ignore it,
                  // so the card survives a rotation
                  if (wasDragRef.current) return;

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
                {/* Balanced Bright Lighting for Earth - Even illumination on all sides */}
                <ambientLight intensity={1.5} />
                {/* Front side lights */}
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
                {/* Back side lights - matching front side intensity */}
                <directionalLight
                  position={[1, 1, -1]}
                  intensity={2.5}
                  color="#ffffff"
                />
                <directionalLight
                  position={[-1, 1, -1]}
                  intensity={1.2}
                  color="#e3f2fd"
                />
                <directionalLight
                  position={[0, -1, -1]}
                  intensity={1.0}
                  color="#e0f7fa"
                />
                {/* Point lights from all directions */}
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
                {/* Back side point lights - matching front side */}
                <pointLight
                  position={[0, 0, -4]}
                  intensity={1.8}
                  color="#ffffff"
                />
                <pointLight
                  position={[4, 4, -4]}
                  intensity={1.2}
                  color="#fffbe0"
                />
                <pointLight
                  position={[-4, -4, -4]}
                  intensity={0.8}
                  color="#ffe0b2"
                />
                {/* Additional side lights for even coverage */}
                <pointLight
                  position={[4, 0, 0]}
                  intensity={1.0}
                  color="#ffffff"
                />
                <pointLight
                  position={[-4, 0, 0]}
                  intensity={1.0}
                  color="#ffffff"
                />
                <pointLight
                  position={[0, 4, 0]}
                  intensity={1.0}
                  color="#ffffff"
                />
                <pointLight
                  position={[0, -4, 0]}
                  intensity={1.0}
                  color="#ffffff"
                />

                {/* Stars for space background - Soft Earth-style with subtle glow */}
                {/* Small stars - softer and more subtle */}
                <Stars
                  radius={400}
                  depth={100}
                  count={9000}
                  factor={3}
                  saturation={0}
                  fade
                  speed={0.1}
                />
                {/* <Stars
                  radius={400}
                  depth={100}
                  count={4000}
                  factor={8}
                  saturation={0}
                  fade
                  speed={0.1}
                /> */}
                {/* Medium stars - gentle glow */}
                <Stars
                  radius={400}
                  depth={100}
                  count={2500}
                  factor={12}
                  saturation={0}
                  fade
                  speed={0.1}
                />
                {/* Large stars - very subtle, Earth-like twinkle */}
                <Stars
                  radius={400}
                  depth={100}
                  count={200}
                  factor={40}
                  saturation={0}
                  fade
                  speed={0.1}
                />

                {/* Camera Reset Controller */}
                <CameraResetController
                  isResettingToDefault={isResettingToDefault}
                  onResetComplete={() => handleManualRotation(false)}
                  controlsRef={controlsRef}
                />

                {/* Marker Position Calculator for auto-selection */}
                <MarkerPositionCalculator
                  location={pendingAutoSelectLocation}
                  earthRef={earthRef}
                  onPositionCalculated={handleMarkerPositionCalculated}
                  isCalculating={isCalculatingMarkerPosition}
                />

                {/* Keeps the open card's line glued to its marker while the
                    globe is dragged */}
                {popupVisible && popupOffice && (
                  <MarkerTracker
                    location={popupOffice}
                    earthRef={earthRef}
                    linePathRef={linePathRef}
                    markerSide={markerSide}
                    onSideChange={setMarkerSide}
                    onOccluded={handleMarkerOccluded}
                  />
                )}

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
                  visitorCountry={visitorCountry}
                />

                {/* Camera controls */}
                <OrbitControls
                  ref={controlsRef}
                  enableZoom={false}
                  enablePan={false}
                  enableRotate
                  autoRotate={false}
                  enableDamping
                  dampingFactor={0.08}
                  // onStart only fires for real user input, unlike onChange,
                  // which also fires while the camera is being reset
                  onStart={() => handleManualRotation(true)}
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
            linePathRef={linePathRef}
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

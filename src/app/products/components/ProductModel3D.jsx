"use client";

import React from "react";
import { useGLTF } from "@react-three/drei";

/**
 * 3D Model Component
 * IMPORTANT: Request GLTF (.gltf) or GLB (.glb) files from the company
 * These are the best formats for web-based 3D models as they are:
 * - Optimized for web performance
 * - Support materials, textures, and animations
 * - Small file sizes
 * - Well-supported by Three.js and React Three Fiber
 */
export function ProductModel({ modelPath }) {
  // DEMO MODE: Currently showing a placeholder geometric shape
  // TO USE ACTUAL 3D FILES: Uncomment the code below and provide the modelPath

  // if (modelPath) {
  //   const { scene } = useGLTF(modelPath);
  //   return (
  //     <>
  //       <primitive object={scene} scale={1} />
  //       <ambientLight intensity={0.5} />
  //       <pointLight position={[5, 5, 5]} intensity={1} />
  //     </>
  //   );
  // }

  // Demo: A simple geometric representation of a product (light fixture)
  return (
    <>
      {/* Main body - represents the product housing */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 1, 0.5]} />
        <meshStandardMaterial color="#0356C2" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Light element - represents the LED/light source */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.5, 32]} />
        <meshStandardMaterial
          color="#FFD700"
          metalness={0.9}
          roughness={0.1}
          emissive="#FFD700"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Mounting bracket */}
      <mesh position={[0, -0.6, 0]} castShadow>
        <boxGeometry args={[0.2, 0.3, 0.2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Lighting setup */}
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} />
      <ambientLight intensity={0.5} />
    </>
  );
}

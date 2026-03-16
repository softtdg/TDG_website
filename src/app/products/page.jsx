"use client"
import React from "react"
import { HeroSection } from "./components/HeroSection"
import { ProductsContent } from "./components/ProductsContent"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import * as THREE from "three"
import { useEffect } from "react"
import { useGLTF } from "@react-three/drei"
import { productData } from "./consant/productsConstants"

// 3D Model Component
// export const Model3D = ({ url }) => {
//   const { scene } = useGLTF(url);

//   // Calculate bounding box to center and scale the model
//   useEffect(() => {
//     if (!scene) return;

//     // Calculate bounding box
//     const box = new THREE.Box3().setFromObject(scene);
//     const center = box.getCenter(new THREE.Vector3());
//     const size = box.getSize(new THREE.Vector3());

//     // Center the model
//     scene.position.sub(center);

//     // Scale to fit (adjust scale factor as needed)
//     const maxDim = Math.max(size.x, size.y, size.z);
//     if (maxDim > 0) {
//       const scale = 2 / maxDim; // Adjust this value to control model size
//       scene.scale.multiplyScalar(scale);
//     }
//   }, [scene]);

//   return <primitive object={scene} />;
// };

const page = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ProductsContent />
      <div className="h-[2px] opacity-0">
        {/* {productData.Headlight?.map((product) => {
          return (
            <Canvas
              camera={{ position: [0, 0, 5], fov: 30 }}
              style={{ background: "transparent" }}
              key={product.name}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <directionalLight position={[-5, -5, -5]} intensity={0.5} />
              <pointLight position={[0, 0, 5]} intensity={0.5} />
              <Model3D url={product.model || "/3dModels/demo.glb"} />
              <OrbitControls
                enableZoom={true}
                enablePan={false}
                enableRotate={true}
                minDistance={2}
                maxDistance={10}
                autoRotate={false}
              />
              <Environment preset="city" />
            </Canvas>
          );
        })} */}
      </div>
    </div>
  )
}

export default page

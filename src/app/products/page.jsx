"use client"
import React from "react"
import { HeroSection } from "./components/HeroSection"
import { ProductsContent } from "./components/ProductsContent"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import * as THREE from "three"
import { useEffect, memo, useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { productData } from "./consant/productsConstants"
import { InstantStopOrbitControls } from "./components/Product3DModelView"

// 3D Model Component - Optimized with memoization
const Model3D = memo(({ url }) => {
  const { scene } = useGLTF(url)
  const isInitialized = useRef(false)

  // Calculate bounding box to center and scale the model - only once
  useEffect(() => {
    if (!scene || isInitialized.current) return

    // Calculate bounding box
    const box = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())

    // Center the model
    scene.position.sub(center)

    // Scale to fit (adjust scale factor as needed)
    const maxDim = Math.max(size.x, size.y, size.z)
    if (maxDim > 0) {
      const scale = 2 / maxDim // Adjust this value to control model size
      scene.scale.multiplyScalar(scale)
    }

    isInitialized.current = true
  }, [scene])

  return <primitive object={scene} />
})

Model3D.displayName = "Model3D"

const page = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <div className="h-[700px]">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: "transparent" }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
          }}
        >
          {/* {modelUrl && <Model3D url={modelUrl} />} */}
          {/* {modelUrl && <Model3D url={"/3dModels/headlight.glb"} />} */}
          <Model3D url={"/3dModels/demo_2.glb"} />

          <InstantStopOrbitControls
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            minDistance={2}
            maxDistance={10}
            autoRotate={false}
            rotateSpeed={0.5}
            // enableDamping={true}
            // dampingFactor={0.05}
            // rotateSpeed={1}
            // zoomSpeed={0.8}
            // maxPolarAngle={Math.PI}
            // minPolarAngle={0}
          />
          <Environment preset="studio" />
        </Canvas>
      </div>
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

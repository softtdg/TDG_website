"use client"

import { Suspense, useEffect, useState, useRef, memo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, useGLTF } from "@react-three/drei"
import * as THREE from "three"

// 3D Model Component - Optimized with memoization
const Model3D = memo(({ url }) => {
  const { scene } = useGLTF(url)
  const isInitialized = useRef(false)

  // New asset URL must re-run fit/center (ref otherwise stays true and transmissive models can stay off-camera)
  useEffect(() => {
    isInitialized.current = false
  }, [url])

  // Calculate bounding box to center and scale the model - only once per loaded scene
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
  }, [scene, url])

  return <primitive object={scene} />
})

Model3D.displayName = "Model3D"

// OrbitControls wrapper that stops rotation immediately on mouse release
const InstantStopOrbitControls = (props) => {
  const controlsRef = useRef()
  const isDraggingRef = useRef(false)

  useEffect(() => {
    const controls = controlsRef.current
    if (!controls) return

    const handleStart = () => {
      isDraggingRef.current = true
    }

    const handleEnd = () => {
      isDraggingRef.current = false
      // Immediately stop rotation by zeroing spherical delta
      if (controls && controls.sphericalDelta) {
        controls.sphericalDelta.set(0, 0, 0)
      }
    }

    // Add event listeners to the controls DOM element
    const domElement = controls.domElement
    if (domElement) {
      domElement.addEventListener("mousedown", handleStart)
      domElement.addEventListener("mouseup", handleEnd)
      domElement.addEventListener("touchstart", handleStart, { passive: true })
      domElement.addEventListener("touchend", handleEnd, { passive: true })
      // Also handle pointer events for better compatibility
      domElement.addEventListener("pointerdown", handleStart)
      domElement.addEventListener("pointerup", handleEnd)

      return () => {
        domElement.removeEventListener("mousedown", handleStart)
        domElement.removeEventListener("mouseup", handleEnd)
        domElement.removeEventListener("touchstart", handleStart)
        domElement.removeEventListener("touchend", handleEnd)
        domElement.removeEventListener("pointerdown", handleStart)
        domElement.removeEventListener("pointerup", handleEnd)
      }
    }
  }, [])

  // Use useFrame to ensure rotation stops when not dragging
  useFrame(() => {
    if (!controlsRef.current || isDraggingRef.current) return

    const controls = controlsRef.current
    // Zero out spherical delta to prevent any residual rotation
    if (controls && controls.sphericalDelta) {
      controls.sphericalDelta.set(0, 0, 0)
    }
  })

  return <OrbitControls ref={controlsRef} enableDamping={false} {...props} />
}

/**
 * Product3DModelView Component
 * A reusable component for displaying 3D product models with optimized performance
 *
 * @param {string} modelUrl - URL path to the 3D model file (.glb format)
 * @param {string} title - Optional title for the section (default: "3D Model View")
 * @param {boolean} showTitle - Whether to show the section title (default: true)
 * @param {number} delayMs - Delay in milliseconds before showing the model (default: 0)
 * @param {object} className - Additional CSS classes for the wrapper
 * @param {string} height - Height classes for the canvas container (default: "h-[350px] sm:h-[450px] md:h-[550px]")
 */
export const Product3DModelView = ({
  modelUrl,
  title = "3D Model View",
  showTitle = true,
  delayMs = 0,
  className = "",
  height = "h-[350px] sm:h-[450px] md:h-[550px]",
}) => {
  const [showVisibleModel, setShowVisibleModel] = useState(delayMs === 0)

  // Show visible model after delay
  useEffect(() => {
    if (delayMs === 0) return

    const timer = setTimeout(() => {
      setShowVisibleModel(true)
    }, delayMs)

    return () => clearTimeout(timer)
  }, [delayMs])

  return (
    <div
      className={
        className ||
        "bg-white rounded-xl shadow-md border border-gray-200 p-6 sm:p-8"
      }
    >
      {/* Section Header with Accent */}
      {showTitle && (
        <div className="flex items-center gap-4 mb-6">
          <div className="h-1 w-12 bg-[#0356C2] rounded-full"></div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wide">
            {title}
          </h2>
        </div>
      )}

      {showVisibleModel ? (
        <div
          className={`relative w-full ${height} bg-gray-100 rounded-lg overflow-hidden border border-gray-200`}
          style={{ transform: "translateZ(0)", willChange: "auto" }}
        >
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0356C2] mx-auto mb-4"></div>
                  <p className="text-gray-600 font-medium">
                    Loading 3D Model...
                  </p>
                </div>
              </div>
            }
          >
            <Canvas
              camera={{ position: [0, 0, 5], fov: 30 }}
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
              {/* Transmissive glass materials need a scene background; transparent canvas alone reads as "invisible" */}
              {/* <color attach="background" args={["#f3f4f6"]} />
              {modelUrl && <Model3D key={modelUrl} url={modelUrl} />} */}

              {modelUrl && <Model3D url={modelUrl} />}
              {/* {modelUrl && <Model3D url={"/3dModels/headlight.glb"} />} */}
              {/* {modelUrl && <Model3D url={"/3dModels/demo_2.glb"} />} */}
              {/* {modelUrl && <Model3D url={"/3dModels/DemoLIght_GLB.glb"} />} */}

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
          </Suspense>
        </div>
      ) : (
        <div
          className={`relative w-full ${height} bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center`}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0356C2] mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading 3D Model...</p>
          </div>
        </div>
      )}

      <p className="text-sm text-gray-500 mt-4 italic">
        * Interactive 3D model - Click and drag to rotate, scroll to zoom
      </p>
    </div>
  )
}

// Export Model3D and InstantStopOrbitControls for use in other components if needed
export { Model3D, InstantStopOrbitControls }

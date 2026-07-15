"use client"

import { Suspense, useEffect, useState, useRef, memo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, useGLTF } from "@react-three/drei"
import * as THREE from "three"

// Sharper textures + materials for high-clarity product viewing
const enhanceModelQuality = (object) => {
  object.traverse((child) => {
    if (!child.isMesh) return

    child.castShadow = true
    child.receiveShadow = true
    child.frustumCulled = true

    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material]

    materials.forEach((material) => {
      if (!material) return

      const textureKeys = [
        "map",
        "normalMap",
        "roughnessMap",
        "metalnessMap",
        "aoMap",
        "emissiveMap",
        "bumpMap",
        "displacementMap",
      ]

      textureKeys.forEach((key) => {
        const texture = material[key]
        if (!texture) return
        texture.anisotropy = 16
        texture.generateMipmaps = true
        texture.minFilter = THREE.LinearMipmapLinearFilter
        texture.magFilter = THREE.LinearFilter
        texture.colorSpace =
          key === "map" || key === "emissiveMap"
            ? THREE.SRGBColorSpace
            : texture.colorSpace
        texture.needsUpdate = true
      })

      if ("envMapIntensity" in material) {
        material.envMapIntensity = Math.max(material.envMapIntensity || 1, 1.15)
      }
      material.needsUpdate = true
    })
  })
}

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

    enhanceModelQuality(scene)

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
  isExpanded = false,
  onExpandChange,
}) => {
  const [showVisibleModel, setShowVisibleModel] = useState(delayMs === 0)
  const [internalExpanded, setInternalExpanded] = useState(false)

  const expanded = onExpandChange ? isExpanded : internalExpanded
  const canvasHeight = expanded ? "h-[450px] sm:h-[560px] md:h-[680px]" : height

  const toggleExpand = () => {
    const next = !expanded
    if (onExpandChange) {
      onExpandChange(next)
    } else {
      setInternalExpanded(next)
    }
  }

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
        "bg-white rounded-xl shadow-md border border-gray-200 p-6 sm:p-8 transition-all duration-300"
      }
    >
      {/* Section Header with Accent */}
      {showTitle && (
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4 min-w-0">
            <div className="h-1 w-12 bg-[#0356C2] rounded-full flex-shrink-0"></div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wide truncate">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={toggleExpand}
            className="flex-shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#0356C2]"
            title={expanded ? "Exit fullscreen" : "Fullscreen"}
            aria-label={expanded ? "Exit fullscreen" : "Fullscreen"}
          >
            {expanded ? (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                />
              </svg>
            )}
          </button>
        </div>
      )}

      {showVisibleModel ? (
        <div
          className={`relative w-full ${canvasHeight} bg-gray-100 rounded-lg overflow-hidden border border-gray-200 transition-all duration-300`}
          style={{ transform: "translateZ(0)", willChange: "auto" }}
        >
          {!showTitle && (
            <button
              type="button"
              onClick={toggleExpand}
              className="absolute top-3 right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white/90 text-gray-600 shadow-sm transition-colors hover:bg-white hover:text-[#0356C2]"
              title={expanded ? "Exit fullscreen" : "Fullscreen"}
              aria-label={expanded ? "Exit fullscreen" : "Fullscreen"}
            >
              {expanded ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                  />
                </svg>
              )}
            </button>
          )}
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
              camera={{ position: [0, 0, 5], fov: 28, near: 0.1, far: 200 }}
              style={{ background: "transparent" }}
              // Higher pixel density for sharper/4K-like clarity on retina displays
              dpr={[1.5, 3]}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
                stencil: false,
                depth: true,
                preserveDrawingBuffer: true,
                precision: "highp",
              }}
              onCreated={({ gl }) => {
                gl.toneMapping = THREE.ACESFilmicToneMapping
                gl.toneMappingExposure = 1.15
                gl.outputColorSpace = THREE.SRGBColorSpace
                gl.setClearColor(0x000000, 0)
              }}
            >
              {/* Soft fill lights for cleaner product definition */}
              <ambientLight intensity={0.35} />
              <directionalLight
                position={[4, 6, 4]}
                intensity={1.1}
                castShadow={false}
              />
              <directionalLight position={[-4, 2, -3]} intensity={0.45} />
              <directionalLight position={[0, 3, -5]} intensity={0.3} />

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
              <Environment preset="studio" environmentIntensity={0.9} />
            </Canvas>
          </Suspense>
        </div>
      ) : (
        <div
          className={`relative w-full ${canvasHeight} bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center transition-all duration-300`}
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

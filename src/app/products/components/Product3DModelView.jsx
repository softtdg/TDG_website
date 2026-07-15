"use client"

import { useEffect, useState, useRef, memo } from "react"
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

const ModelViewerLoading = () => (
  <div className="w-full h-full flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0356C2] mx-auto mb-4"></div>
      <p className="text-gray-600 font-medium">Loading 3D Model...</p>
    </div>
  </div>
)

/**
 * Product3DModelView Component
 * Uses Google <model-viewer> for interactive GLB/GLTF previews
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
  const [viewerReady, setViewerReady] = useState(false)
  const [modelLoaded, setModelLoaded] = useState(false)
  const viewerRef = useRef(null)

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

  // Register <model-viewer> custom element (client-only)
  useEffect(() => {
    let cancelled = false

    const loadViewer = async () => {
      try {
        if (!customElements.get("model-viewer")) {
          await import("@google/model-viewer")
        }
        if (!cancelled) setViewerReady(true)
      } catch (error) {
        console.error("Failed to load model-viewer:", error)
      }
    }

    loadViewer()
    return () => {
      cancelled = true
    }
  }, [])

  // Show visible model after delay
  useEffect(() => {
    if (delayMs === 0) return

    const timer = setTimeout(() => {
      setShowVisibleModel(true)
    }, delayMs)

    return () => clearTimeout(timer)
  }, [delayMs])

  // Reset load state when model URL changes
  useEffect(() => {
    setModelLoaded(false)
  }, [modelUrl])

  // model-viewer uses DOM events (not React synthetic onLoad)
  useEffect(() => {
    const el = viewerRef.current
    if (!el) return

    const handleLoad = () => setModelLoaded(true)
    const handleError = (event) => {
      console.error("model-viewer failed to load:", modelUrl, event)
      setModelLoaded(true)
    }

    el.addEventListener("load", handleLoad)
    el.addEventListener("error", handleError)

    return () => {
      el.removeEventListener("load", handleLoad)
      el.removeEventListener("error", handleError)
    }
  }, [modelUrl, viewerReady, showVisibleModel])

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

          {!viewerReady || !modelUrl || !modelLoaded ? (
            <div className="absolute inset-0 z-[1]">
              <ModelViewerLoading />
            </div>
          ) : null}

          {viewerReady && modelUrl ? (
            <model-viewer
              ref={viewerRef}
              key={modelUrl}
              src={modelUrl}
              alt={title || "3D Model Preview"}
              camera-controls
              touch-action="pan-y"
              shadow-intensity="1"
              exposure="1"
              environment-image="neutral"
              loading="eager"
              reveal="auto"
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#f3f4f6",
                "--poster-color": "transparent",
              }}
            />
          ) : null}
        </div>
      ) : (
        <div
          className={`relative w-full ${canvasHeight} bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center transition-all duration-300`}
        >
          <ModelViewerLoading />
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

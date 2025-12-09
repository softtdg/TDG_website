"use client";

import React, { useEffect, useRef, useState } from "react";

const certificateGroups = [
  {
    title: "Canada",
    items: [
      {
        src: "/images/standards/certificates/canada1.jpg",
        title: "Transport Canada Compliance",
        description:
          "Documented conformity with Transport Canada requirements for rolling stock safety lighting systems.",
      },
      {
        src: "/images/standards/certificates/canada2.jpg",
        title: "Emergency Lighting Annex",
        description:
          "Annex summarizing emergency illumination specifications validated for commuter fleets across Canada.",
      },
      {
        src: "/images/standards/certificates/canada3.jpg",
        title: "Health Quality Certificate",
        description:
          "Certification confirming compliance with national health and environmental quality standards on board.",
      },
      {
        src: "/images/standards/certificates/canada4.jpg",
        title: "Passenger Safety Certificate",
        description:
          "Independent validation of illumination levels that support safe passenger movement and evacuation.",
      },
      {
        src: "/images/standards/certificates/canada5.jpg",
        title: "Annex – Low Location Lighting",
        description:
          "Supplemental approval for low-location exit path systems deployed on long-haul and metro fleets.",
      },
      {
        src: "/images/standards/certificates/canada6.jpg",
        title: "Emergency Signage Approval",
        description:
          "Certificate verifying emergency signage integration with primary and backup lighting controls.",
      },
      {
        src: "/images/standards/certificates/canada7.jpg",
        title: "Crashworthiness Lighting Report",
        description:
          "Assessment confirming crashworthy lighting assemblies that remain visible during impact events.",
      },
    ],
  },
  {
    title: "India",
    items: [
      {
        src: "/images/standards/certificates/india1.jpg",
        title: "RDSO Approval",
        description:
          "Railway Design & Standards Organisation approval covering emergency illumination for Indian coaches.",
      },
      {
        src: "/images/standards/certificates/india2.jpg",
        title: "Safety Compliance Audit",
        description:
          "Comprehensive audit certifying alignment with evacuation and signage requirements of Indian Railways.",
      },
      {
        src: "/images/standards/certificates/india3.jpg",
        title: "ISO Quality Certificate",
        description:
          "ISO-recognized certification acknowledging quality management for lighting component production.",
      },
    ],
  },
];

const buildRows = (items) => {
  const rows = [];
  const remaining = [...items];

  if (remaining.length) {
    const firstRowCount = Math.min(3, remaining.length);
    rows.push({
      includeTitle: true,
      items: remaining.splice(0, firstRowCount),
    });
  }

  while (remaining.length) {
    rows.push({ includeTitle: false, items: remaining.splice(0, 4) });
  }

  return rows;
};

export const CertificatesSection = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [transformOrigin, setTransformOrigin] = useState("center center");
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const panStartRef = useRef({ x: 0, y: 0 });

  const handleOpen = (item) => {
    setSelectedCertificate(item);
  };

  const handleClose = () => {
    setSelectedCertificate(null);
  };

  useEffect(() => {
    setZoom(1);
    setTransformOrigin("center center");
    setPan({ x: 0, y: 0 });
    setIsDragging(false);
  }, [selectedCertificate]);

  useEffect(() => {
    if (!selectedCertificate) return;

    const handleGlobalWheel = (event) => {
      if (event.ctrlKey) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", handleGlobalWheel, { passive: false });
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("wheel", handleGlobalWheel, {
        passive: false,
      });
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedCertificate]);

  const changeZoom = (delta) => {
    setZoom((prev) => {
      const next = Math.min(
        4,
        Math.max(1, parseFloat((prev + delta).toFixed(2)))
      );
      if (next === 1 && prev !== 1) {
        setPan({ x: 0, y: 0 });
        setTransformOrigin("center center");
      }
      return next;
    });
  };

  const handleZoomIn = () => changeZoom(0.25);
  const handleZoomOut = () => changeZoom(-0.25);
  const handleResetZoom = () => {
    setZoom(1);
    setTransformOrigin("center center");
    setPan({ x: 0, y: 0 });
  };

  const handleWheelZoom = (event) => {
    if (!selectedCertificate) return;
    if (!event.ctrlKey) return;

    event.preventDefault();

    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    const originX = `${((offsetX / rect.width) * 100).toFixed(2)}%`;
    const originY = `${((offsetY / rect.height) * 100).toFixed(2)}%`;
    setTransformOrigin(`${originX} ${originY}`);

    const delta = event.deltaY < 0 ? 0.25 : -0.25;
    changeZoom(delta);
  };

  const handleMouseDown = (event) => {
    if (zoom <= 1) return;
    event.preventDefault();
    setIsDragging(true);
    dragStartRef.current = { x: event.clientX, y: event.clientY };
    panStartRef.current = { ...pan };
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    event.preventDefault();
    const dx = event.clientX - dragStartRef.current.x;
    const dy = event.clientY - dragStartRef.current.y;
    setPan({ x: panStartRef.current.x + dx, y: panStartRef.current.y + dy });
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  return (
    <section id="certification" className="bg-white py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl xl:text-[50px] font-extrabold uppercase tracking-[4px] sm:tracking-[6px] text-[#111827]">
          Certification
        </h2>

        <div className="mt-8 sm:mt-12 lg:mt-16 space-y-8 sm:space-y-12 lg:space-y-16">
          {certificateGroups.map(({ title, items }, groupIdx) => (
            <div key={title} className="space-y-10">
              <div className="space-y-8">
                {buildRows(items).map((row, rowIdx) => {
                  const totalColumns = row.includeTitle
                    ? row.items.length + 1
                    : row.items.length;
                  return (
                    <div
                      key={`${title}-row-${rowIdx}`}
                      className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                    >
                      {row.includeTitle && (
                        <div className="flex items-center justify-center bg-white p-4 sm:p-6 text-center">
                          <span className="text-xl sm:text-2xl lg:text-[30px] font-semibold uppercase tracking-[2px] sm:tracking-[4px] lg:tracking-[6px] text-[#111827]">
                            {title}
                          </span>
                        </div>
                      )}
                      {row.items.map((item) => (
                        // <button
                        //                         key={item.src}
                        //                         type="button"
                        //                         onClick={() => handleOpen(item)}
                        //                         className="group cursor-pointer shadow-lg focus:outline-none"
                        //                       >
                        //                         <div className="relative flex h-full w-full items-center justify-center overflow-hidden border border-[#000000] bg-white">
                        //                           <img
                        //                             src={item.src}
                        //                             alt={`${title} certification`}
                        //                             className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
                        //                           />
                        //                           <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/50 via-black/10 to-transparent px-5 pb-6 opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:from-black/85 group-hover:via-black/60">
                        //                             <h3 className="translate-y-4 text-base font-semibold uppercase tracking-wide text-white opacity-0 transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                        //                               {item.title}
                        //                             </h3>
                        //                             <p className="mt-2 translate-y-6 text-sm text-white/90 opacity-0 transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                        //                               {item.description}
                        //                             </p>
                        //                           </div>
                        //                         </div>
                        //                       </button>

                        <div key={item.src} className="group shadow-lg">
                          <div className="relative flex h-[250px] sm:h-[300px] lg:h-[350px] w-full items-center justify-center overflow-hidden border border-[#000000] bg-gray-300">
                            {/* Placeholder for certificate image */}
                          </div>
                        </div>
                      ))}
                      {totalColumns < 4 &&
                        Array.from({ length: 4 - totalColumns }).map(
                          (_, idx) => (
                            <div
                              key={`spacer-${idx}`}
                              className="hidden lg:block"
                            />
                          )
                        )}
                    </div>
                  );
                })}
              </div>

              {groupIdx !== certificateGroups.length - 1 && (
                <div className="mx-auto mt-10 h-px w-full max-w-4xl bg-[#000000]" />
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 py-6 backdrop-blur-sm">
          <button
            type="button"
            onClick={handleClose}
            className="absolute z-50 bg-black/85 right-6 top-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/90 hover:text-[#111827]"
          >
            ✕
          </button>
          <div className="relative flex h-[90vh] w-full max-w-5xl items-center justify-center">
            <div
              className="flex h-full w-full items-center justify-center overflow-auto rounded-2xl bg-black/10"
              onWheel={handleWheelZoom}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={stopDragging}
              onMouseLeave={stopDragging}
              style={{
                cursor:
                  zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default",
              }}
            >
              {/* <img
                src={selectedCertificate.src}
                alt={selectedCertificate.title}
                draggable={false}
                className="h-full w-auto select-none drop-shadow-2xl"
                 style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  transformOrigin,
                }}
              /> */}
              <div
                className="h-full w-full bg-gray-300 flex items-center justify-center"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  transformOrigin,
                }}
              >
                <div className="text-gray-500 text-sm font-medium">
                  {/* Placeholder for certificate image */}
                </div>
              </div>
            </div>
            <div className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full bg-black/60 p-2 text-white">
              <button
                type="button"
                onClick={handleZoomOut}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl font-semibold transition hover:bg-white/20"
              >
                –
              </button>
              <span className="px-3 text-sm font-medium uppercase tracking-wide">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={handleZoomIn}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl font-semibold transition hover:bg-white/20"
              >
                +
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                className="ml-2 inline-flex h-10 items-center justify-center rounded-full bg-white/10 px-4 text-sm font-semibold uppercase tracking-wide transition hover:bg-white/20"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

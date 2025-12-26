"use client";

import React, { useEffect, useRef, useState } from "react";
import { fetchCertificates } from "@/lib/api";

/**
 * Group certificates by country and sort them
 * @param {Array} certificates - Array of certificates from API
 * @returns {Array} Array of certificate groups, each with a title (country) and items
 */
const groupCertificatesByCountry = (certificates) => {
  const grouped = {};

  certificates.forEach((certificate) => {
    const country = certificate.country || "Other";
    if (!grouped[country]) {
      grouped[country] = [];
    }
    grouped[country].push({
      src: certificate.image,
      title: certificate.title,
      description: certificate.description,
      order: certificate.order || 0,
    });
  });

  // Convert to array format and sort by order within each country
  return Object.entries(grouped)
    .map(([title, items]) => ({
      title,
      items: items.sort((a, b) => (a.order || 0) - (b.order || 0)),
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
};

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
  const [certificateGroups, setCertificateGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [transformOrigin, setTransformOrigin] = useState("center center");
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const panStartRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const loadCertificates = async () => {
      try {
        setLoading(true);
        const certificates = await fetchCertificates();
        const grouped = groupCertificatesByCountry(certificates);
        setCertificateGroups(grouped);
      } catch (error) {
        console.error("Error loading certificates:", error);
        setCertificateGroups([]);
      } finally {
        setLoading(false);
      }
    };

    loadCertificates();
  }, []);

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
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[3px] text-[#2d4a86] mb-3">
          CERTIFICATION
        </h2>
        <div className="h-1 w-20 bg-[#f4c806] mx-auto rounded-full"></div>

        {loading ? (
          <div className="mt-8 sm:mt-12 lg:mt-16 text-center py-12">
            <p className="text-gray-600">Loading certificates...</p>
          </div>
        ) : certificateGroups.length === 0 ? (
          <div className="mt-8 sm:mt-12 lg:mt-16 text-center py-12">
            <p className="text-gray-600">No certificates available.</p>
          </div>
        ) : (
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
                        {row.items.map((item, itemIdx) => (
                          <button
                            key={`${item.src}-${itemIdx}`}
                            type="button"
                            onClick={() => handleOpen(item)}
                            className="group cursor-pointer shadow-lg focus:outline-none"
                          >
                            <div className="relative flex h-full w-full items-center justify-center overflow-hidden border border-[#000000] bg-white">
                              <img
                                src={item.src}
                                alt={`${title} certification`}
                                className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
                              />
                              <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/50 via-black/10 to-transparent px-5 pb-6 opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:from-black/85 group-hover:via-black/60">
                                <h3 className="translate-y-4 text-base font-semibold uppercase tracking-wide text-white opacity-0 transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                                  {item.title}
                                </h3>
                                <p className="mt-2 translate-y-6 text-sm text-white/90 opacity-0 transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </button>
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
        )}
      </div>

      {selectedCertificate && (
        <div className="fixed inset-0 z-[500000] flex items-center justify-center bg-black/85 px-4 py-6 backdrop-blur-sm">
          <button
            type="button"
            onClick={handleClose}
            className="absolute z-[500000] bg-black/85 right-6 top-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/90 hover:text-[#111827]"
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
              <img
                src={selectedCertificate.src}
                alt={selectedCertificate.title}
                draggable={false}
                className="h-full w-auto select-none drop-shadow-2xl"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  transformOrigin,
                }}
              />
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

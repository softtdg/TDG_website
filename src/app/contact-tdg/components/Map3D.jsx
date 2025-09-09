"use client";

import React, { useState } from "react";

const Map3D = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locations = [
    {
      id: 1,
      name: "Headquarters",
      address: "123 Innovation Drive, San Francisco, CA 94105",
      phone: "+1 (555) 123-4567",
      email: "hq@tdg.com",
      coordinates: { lat: 37.7749, lng: -122.4194 },
      position: { x: 15, y: 35 }, // San Francisco
      color: "bg-blue-500",
      country: "United States",
    },
    {
      id: 2,
      name: "Manufacturing Plant",
      address: "456 Industrial Blvd, Houston, TX 77001",
      phone: "+1 (555) 234-5678",
      email: "manufacturing@tdg.com",
      coordinates: { lat: 29.7604, lng: -95.3698 },
      position: { x: 25, y: 50 }, // Houston
      color: "bg-green-500",
      country: "United States",
    },
    {
      id: 3,
      name: "Research Center",
      address: "789 Science Ave, Boston, MA 02101",
      phone: "+1 (555) 345-6789",
      email: "research@tdg.com",
      coordinates: { lat: 42.3601, lng: -71.0589 },
      position: { x: 30, y: 30 }, // Boston
      color: "bg-purple-500",
      country: "United States",
    },
    {
      id: 4,
      name: "International Office",
      address: "321 Global Plaza, London, UK EC1A 1BB",
      phone: "+44 20 7123 4567",
      email: "international@tdg.com",
      coordinates: { lat: 51.5074, lng: -0.1278 },
      position: { x: 50, y: 25 }, // London
      color: "bg-red-500",
      country: "United Kingdom",
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Global Locations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find TDG offices and facilities around the world. Click on any
            location to learn more.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 3D Earth Map Container */}
          <div className="lg:col-span-2">
            <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-2xl p-8 h-[500px] overflow-hidden">
              {/* Earth Background with Continents */}
              <div className="absolute inset-0 rounded-2xl">
                {/* North America */}
                <div
                  className="absolute w-32 h-20 bg-green-600 opacity-30 rounded-lg"
                  style={{ left: "15%", top: "25%" }}
                ></div>
                {/* Europe */}
                <div
                  className="absolute w-16 h-12 bg-green-600 opacity-30 rounded-lg"
                  style={{ left: "48%", top: "20%" }}
                ></div>
                {/* Asia */}
                <div
                  className="absolute w-24 h-16 bg-green-600 opacity-30 rounded-lg"
                  style={{ left: "65%", top: "15%" }}
                ></div>
                {/* Africa */}
                <div
                  className="absolute w-12 h-20 bg-green-600 opacity-30 rounded-lg"
                  style={{ left: "50%", top: "45%" }}
                ></div>
                {/* South America */}
                <div
                  className="absolute w-14 h-18 bg-green-600 opacity-30 rounded-lg"
                  style={{ left: "25%", top: "60%" }}
                ></div>
                {/* Australia */}
                <div
                  className="absolute w-16 h-8 bg-green-600 opacity-30 rounded-lg"
                  style={{ left: "75%", top: "70%" }}
                ></div>
              </div>

              {/* Ocean Grid Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
                  {Array.from({ length: 400 }).map((_, i) => (
                    <div key={i} className="border border-blue-300"></div>
                  ))}
                </div>
              </div>

              {/* Latitude/Longitude Lines */}
              <div className="absolute inset-0 opacity-10">
                {/* Horizontal lines (latitude) */}
                {[20, 40, 60, 80].map((y, i) => (
                  <div
                    key={`lat-${i}`}
                    className="absolute w-full border-t border-white"
                    style={{ top: `${y}%` }}
                  ></div>
                ))}
                {/* Vertical lines (longitude) */}
                {[25, 50, 75].map((x, i) => (
                  <div
                    key={`lng-${i}`}
                    className="absolute h-full border-l border-white"
                    style={{ left: `${x}%` }}
                  ></div>
                ))}
              </div>

              {/* Location Markers */}
              {locations.map((location) => (
                <div
                  key={location.id}
                  className={`absolute cursor-pointer transform transition-all duration-300 hover:scale-125 hover:shadow-lg ${
                    selectedLocation?.id === location.id
                      ? "scale-125 shadow-xl"
                      : ""
                  }`}
                  style={{
                    left: `${location.position.x}%`,
                    top: `${location.position.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onClick={() => setSelectedLocation(location)}
                >
                  {/* Pulse Animation */}
                  <div
                    className={`absolute inset-0 ${location.color} rounded-full animate-ping opacity-75 w-8 h-8`}
                  ></div>
                  <div
                    className={`relative w-8 h-8 ${location.color} rounded-full flex items-center justify-center shadow-lg border-2 border-white`}
                  >
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  {/* Location Label */}
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {location.name}
                  </div>
                </div>
              ))}

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {locations.map((location, index) => {
                  const nextLocation =
                    locations[(index + 1) % locations.length];
                  return (
                    <line
                      key={`line-${index}`}
                      x1={`${location.position.x}%`}
                      y1={`${location.position.y}%`}
                      x2={`${nextLocation.position.x}%`}
                      y2={`${nextLocation.position.y}%`}
                      stroke="rgba(59, 130, 246, 0.3)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                  );
                })}
              </svg>

              {/* Earth Title */}
              <div className="absolute top-4 left-4">
                <h3 className="text-white text-lg font-semibold bg-black bg-opacity-50 px-3 py-1 rounded">
                  🌍 TDG Global Network
                </h3>
              </div>

              {/* Compass */}
              <div className="absolute top-4 right-4">
                <div className="bg-black bg-opacity-50 px-3 py-1 rounded text-white text-sm">
                  <div className="text-center">
                    <div className="text-xs">N</div>
                    <div className="flex">
                      <div className="text-xs">W</div>
                      <div className="w-4 h-4 border border-white mx-1"></div>
                      <div className="text-xs">E</div>
                    </div>
                    <div className="text-xs">S</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location Details */}
          {/* <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {selectedLocation ? "Location Details" : "Select a Location"}
            </h3>

            {selectedLocation ? (
              <div className="bg-white rounded-xl p-6 shadow-lg border">
                <div className="flex items-center mb-4">
                  <div
                    className={`w-4 h-4 ${selectedLocation.color} rounded-full mr-3`}
                  ></div>
                  <h4 className="text-xl font-semibold text-gray-900">
                    {selectedLocation.name}
                  </h4>
                </div>

                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-gray-700 mb-1">Country</h5>
                    <p className="text-gray-600">{selectedLocation.country}</p>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-700 mb-1">Address</h5>
                    <p className="text-gray-600">{selectedLocation.address}</p>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-700 mb-1">
                      Coordinates
                    </h5>
                    <p className="text-gray-600 text-sm">
                      {selectedLocation.coordinates.lat.toFixed(4)}°N,{" "}
                      {Math.abs(selectedLocation.coordinates.lng).toFixed(4)}°W
                    </p>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-700 mb-1">Phone</h5>
                    <p className="text-gray-600">{selectedLocation.phone}</p>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-700 mb-1">Email</h5>
                    <p className="text-gray-600">{selectedLocation.email}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedLocation(null)}
                  className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Close Details
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-6 shadow-lg border">
                <p className="text-gray-600 text-center">
                  Click on any location marker on the map to view detailed
                  information about that office or facility.
                </p>
              </div>
            )}
*/}
          {/* All Locations List */}
          {/* <div className="bg-white rounded-xl p-6 shadow-lg border">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                All Locations
              </h4>
              <div className="space-y-3">
                {locations.map((location) => (
                  <div
                    key={location.id}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedLocation(location)}
                  >
                    <div
                      className={`w-3 h-3 ${location.color} rounded-full mr-3`}
                    ></div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {location.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {location.address}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Map3D;

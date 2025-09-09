"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the map component to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const RealisticMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locations = [
    {
      id: 1,
      name: "Headquarters",
      address: "123 Innovation Drive, San Francisco, CA 94105",
      phone: "+1 (555) 123-4567",
      email: "hq@tdg.com",
      coordinates: [37.7749, -122.4194], // San Francisco
      color: "bg-blue-500",
      country: "United States",
      description: "TDG's main headquarters and executive offices",
    },
    {
      id: 2,
      name: "Manufacturing Plant",
      address: "456 Industrial Blvd, Houston, TX 77001",
      phone: "+1 (555) 234-5678",
      email: "manufacturing@tdg.com",
      coordinates: [29.7604, -95.3698], // Houston
      color: "bg-green-500",
      country: "United States",
      description: "Primary manufacturing facility for LED lighting systems",
    },
    {
      id: 3,
      name: "Research Center",
      address: "789 Science Ave, Boston, MA 02101",
      phone: "+1 (555) 345-6789",
      email: "research@tdg.com",
      coordinates: [42.3601, -71.0589], // Boston
      color: "bg-purple-500",
      country: "United States",
      description: "Advanced research and development facility",
    },
    {
      id: 4,
      name: "International Office",
      address: "321 Global Plaza, London, UK EC1A 1BB",
      phone: "+44 20 7123 4567",
      email: "international@tdg.com",
      coordinates: [51.5074, -0.1278], // London
      color: "bg-red-500",
      country: "United Kingdom",
      description: "European operations and international business center",
    },
  ];

  // Custom marker icons
  const createCustomIcon = (color) => {
    return {
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      className: `custom-marker ${color}`,
    };
  };

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
          {/* Interactive Map */}
          <div className="lg:col-span-2">
            <div className="h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <MapContainer
                center={[39.8283, -98.5795]} // Center of USA
                zoom={4}
                style={{ height: "100%", width: "100%" }}
                className="rounded-2xl"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {locations.map((location) => (
                  <Marker
                    key={location.id}
                    position={location.coordinates}
                    eventHandlers={{
                      click: () => setSelectedLocation(location),
                    }}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">
                          {location.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {location.description}
                        </p>
                        <p className="text-sm text-gray-600">
                          {location.address}
                        </p>
                        <div className="mt-2 pt-2 border-t">
                          <p className="text-xs text-gray-500">
                            📞 {location.phone}
                          </p>
                          <p className="text-xs text-gray-500">
                            ✉️ {location.email}
                          </p>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-4">
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
                    <h5 className="font-medium text-gray-700 mb-1">
                      Description
                    </h5>
                    <p className="text-gray-600 text-sm">
                      {selectedLocation.description}
                    </p>
                  </div>

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
                      {selectedLocation.coordinates[0].toFixed(4)}°N,{" "}
                      {Math.abs(selectedLocation.coordinates[1]).toFixed(4)}°W
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

            {/* All Locations List */}
            <div className="bg-white rounded-xl p-6 shadow-lg border">
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
                        {location.country}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Legend */}
            <div className="bg-white rounded-xl p-6 shadow-lg border">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Map Legend
              </h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Headquarters</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Manufacturing</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Research</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">International</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealisticMap;

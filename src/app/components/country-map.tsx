"use client";

import { useState } from "react";

interface CountryMapProps {
  countryName: string;
  coordinates?: [number, number]; // [latitude, longitude]
  capital?: string;
}

export default function CountryMap({
  countryName,
  coordinates,
  capital,
}: CountryMapProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!coordinates) {
    return (
      <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
        <p className="text-purple-300 text-center">
          Map data not available for {countryName}
        </p>
      </div>
    );
  }

  const [lat, lng] = coordinates;

  // OpenStreetMap URL for embedding
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    lng - 10
  },${lat - 10},${lng + 10},${lat + 10}&layer=mapnik&marker=${lat},${lng}`;

  // URL to open in new tab
  const openMapUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}&zoom=6`;

  const handleMapClick = () => {
    window.open(openMapUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      aria-label="Country map"
      className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden"
    >
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Location Map</h3>
            <p className="text-sm text-purple-300">
              {capital && `Capital: ${capital}`} • {lat.toFixed(2)}°N,{" "}
              {lng.toFixed(2)}°E
            </p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 hover:border-purple-400/50 transition-all duration-300 text-sm"
          >
            {isExpanded ? "Collapse" : "Expand"}
          </button>
        </div>
      </div>

      <div
        className={`relative cursor-pointer group transition-all duration-300 ${
          isExpanded ? "h-[600px]" : "h-[300px]"
        }`}
        onClick={handleMapClick}
      >
        {/* Map Overlay with instructions */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10 flex items-center justify-center">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl px-6 py-3 text-center">
            <p className="text-white font-semibold mb-1">
              Click to view on OpenStreetMap
            </p>
            <p className="text-sm">Opens in a new tab</p>
          </div>
        </div>

        {/* Map iframe */}
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={mapUrl}
          className="w-full h-full"
          title={`Map of ${countryName}`}
          style={{ border: 0 }}
        />

        {/* Click indicator */}
        <div className="absolute top-4 right-4 z-20">
          <div className="backdrop-blur-xl bg-purple-500/80 border border-purple-400/50 rounded-full p-2 group-hover:scale-110 transition-transform">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Alternative: Google Maps link */}
      <div className="p-4 border-t border-white/10 flex items-center justify-center gap-4">
        <a
          href={`https://www.google.com/maps?q=${lat},${lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 hover:border-purple-400/50 transition-all duration-300 text-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          Open in Google Maps
        </a>
        <a
          href={openMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 hover:border-purple-400/50 transition-all duration-300 text-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          Open in OpenStreetMap
        </a>
      </div>
    </section>
  );
}

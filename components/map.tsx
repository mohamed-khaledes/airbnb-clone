'use client';
import { useEffect, useRef, useState } from 'react';
import { getCenter } from 'geolib';
import maplibregl, { Map as MapLibreMap, Marker, Popup } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// Available styles
const MAP_STYLES: Record<string, string> = {
  Dark: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  Light: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
  Voyager: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
  StadiaDark: 'https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json',
};

const Map = ({ searchResultData }: { searchResultData: SearchResultData }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const [styleUrl, setStyleUrl] = useState<string>(MAP_STYLES.Dark);

  // Calculate center
  const coordinates = searchResultData.map((listing) => ({
    longitude: listing.long,
    latitude: listing.lat,
  }));
  const center = getCenter(coordinates) as {
    longitude: number;
    latitude: number;
  };

  // Initialize map once
  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: styleUrl,
      center: [center.longitude, center.latitude],
      zoom: 11,
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  // Update style dynamically
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setStyle(styleUrl);
    }
  }, [styleUrl]);

  // Add markers when data changes
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    searchResultData.forEach((listing) => {
      const markerEl = document.createElement('div');
      markerEl.style.width = '32px';
      markerEl.style.height = '32px';
      markerEl.style.backgroundImage = 'url("/marker.png")';
      markerEl.style.backgroundSize = 'contain';
      markerEl.style.backgroundRepeat = 'no-repeat';
      markerEl.style.backgroundPosition = 'center';
      markerEl.style.cursor = 'pointer';

      const marker = new Marker({ element: markerEl })
        .setLngLat([listing.long, listing.lat])
        .addTo(mapRef.current!);

      markersRef.current.push(marker);

      markerEl.addEventListener('click', () => {
        new Popup()
          .setLngLat([listing.long, listing.lat])
          .setHTML(`<p style="color:white;">${listing.title}</p>`)
          .addTo(mapRef.current!);
      });
    });
  }, [searchResultData, styleUrl]);

  return (
    <div className="relative w-full h-full">
      {/* Map container */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Style Switcher */}
      <div className="absolute top-3 right-3 bg-white shadow-md rounded-lg p-2 flex gap-2 z-10">
        {Object.entries(MAP_STYLES).map(([label, url]) => (
          <button
            key={label}
            onClick={() => setStyleUrl(url)}
            className={`px-2 py-1 rounded text-sm font-medium ${
              styleUrl === url ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Map;

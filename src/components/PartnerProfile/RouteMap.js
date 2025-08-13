import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./styles/RouterMap.css";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const RouteMap = ({ partner, progress, isPlaying, routeData }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapContainerRef = useRef(null);

  // Initialize map
  useEffect(() => {
    if (
      !mapContainerRef.current ||
      mapRef.current ||
      !routeData ||
      routeData.length === 0
    )
      return;

    // Initialize map with full bounds
    mapRef.current = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false,
    }).fitBounds(routeData.map((p) => p.coordinates));

    // Add tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(mapRef.current);

    // Add route line
    L.polyline(
      routeData.map((p) => p.coordinates),
      {
        color: "#3498db",
        weight: 4,
        opacity: 0.8,
        lineJoin: "round",
      }
    ).addTo(mapRef.current);

    // Add markers
    routeData.forEach((point, index) => {
      if (point.type === "start" || point.type === "end") {
        L.marker(point.coordinates, {
          icon: new L.Icon.Default(),
        })
          .addTo(mapRef.current)
          .bindPopup(`<b>${point.type.toUpperCase()}</b><br>${point.time}`);
      }
    });

    // Add moving delivery marker
    markerRef.current = L.circleMarker(routeData[0].coordinates, {
      radius: 8,
      fillColor: "#e74c3c",
      color: "#fff",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8,
    }).addTo(mapRef.current);

    // Add custom controls
    L.control.zoom({ position: "topright" }).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [routeData]);

  // Update marker position
  useEffect(() => {
    if (!markerRef.current || !routeData || routeData.length === 0) return;

    const progressPercent = progress / 100;
    const totalPoints = routeData.length;
    const pointIndex = Math.min(
      Math.floor(progressPercent * (totalPoints - 1)),
      totalPoints - 2
    );
    const fraction = (progressPercent * (totalPoints - 1)) % 1;

    const current = routeData[pointIndex].coordinates;
    const next = routeData[pointIndex + 1].coordinates;

    const newLat = current[0] + (next[0] - current[0]) * fraction;
    const newLng = current[1] + (next[1] - current[1]) * fraction;

    markerRef.current.setLatLng([newLat, newLng]);

    if (isPlaying) {
      mapRef.current?.panTo([newLat, newLng], {
        animate: true,
        duration: 0.5,
      });
    }
  }, [progress, routeData, isPlaying]);

  return (
    <div id="map" ref={mapContainerRef} className="route-map-container"></div>
  );
};

export default RouteMap;
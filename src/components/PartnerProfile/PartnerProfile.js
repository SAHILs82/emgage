import React, { useState, useEffect } from "react";
import RouteMap from "./RouteMap";
import TimelineControls from "./TimelineControls";
import "./styles/PartnerProfile.css";

const PartnerProfile = ({ partner, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [routeData, setRouteData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + 3600000)); // +1 hour

  // Generate route data
  useEffect(() => {
    const generateRoute = () => {
      const points = [];
      const startTime = new Date(startDate);
      const endTime = new Date(endDate);
      const duration = endTime - startTime;

      // Generate random route points
      for (let i = 0; i <= 20; i++) {
        const time = new Date(startTime.getTime() + (duration * i) / 20);
        points.push({
          coordinates: [
            28.6139 + (Math.random() * 0.02 - 0.01),
            77.209 + (Math.random() * 0.02 - 0.01),
          ],
          time: time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: i === 0 ? "start" : i === 20 ? "end" : "waypoint",
        });
      }
      return points;
    };

    setRouteData(generateRoute());
    setProgress(0);
    setIsPlaying(false);
  }, [startDate, endDate]);

  // Animation effect
  useEffect(() => {
    let interval;
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 0.5, 100));
      }, 50);
    } else if (progress >= 100) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress]);

  return (
    <div className="partner-profile-container">
      <button className="close-btn" onClick={onClose}>
        ×
      </button>

      <div className="profile-content">
        <div className="controls-section">
          <div className="profile-header">
            <img
              src={partner.avatar}
              alt={partner.name}
              className="profile-avatar"
            />
            <div className="partner-info">
              <h2>{partner.name}</h2>
              <div className="delivery-status">
                <span
                  className={`status-badge ${
                    isPlaying ? "active" : "inactive"
                  }`}
                >
                  {isPlaying ? "IN PROGRESS" : "READY"}
                </span>
                <span>Order #: {Math.floor(Math.random() * 10000)}</span>
              </div>
            </div>
          </div>

          <TimelineControls
            isPlaying={isPlaying}
            onPlayPause={setIsPlaying}
            progress={progress}
            onProgressChange={setProgress}
            startDate={startDate}
            endDate={endDate}
            onDateChange={({ startDate, endDate }) => {
              setStartDate(startDate);
              setEndDate(endDate);
            }}
          />

          <div className="delivery-timeline">
            {routeData.map((point, index) => (
              <div
                key={index}
                className={`timeline-item ${
                  progress >= (index / routeData.length) * 100
                    ? "timeline-active"
                    : ""
                }`}
              >
                <div className="timeline-time">{point.time}</div>
                <div className="timeline-content">
                  {point.type === "start"
                    ? "Order picked up"
                    : point.type === "end"
                    ? "Order delivered"
                    : "On the way"}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="map-section">
          <RouteMap
            partner={partner}
            progress={progress}
            isPlaying={isPlaying}
            routeData={routeData}
          />
        </div>
      </div>
    </div>
  );
};

export default PartnerProfile;

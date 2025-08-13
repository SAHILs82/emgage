import React, { useEffect, useState, useRef } from "react";
// import React from "react";
import "./styles/TimelineControls.css";



const TimelineControls = ({
  isPlaying,
  onPlayPause,
  progress,
  onProgressChange,
  startDate,
  endDate,
  onDateChange,
}) => {
  const handleStartDateChange = (e) => {
    onDateChange({
      startDate: new Date(e.target.value),
      endDate: endDate,
    });
  };

  const handleEndDateChange = (e) => {
    onDateChange({
      startDate: startDate,
      endDate: new Date(e.target.value),
    });
  };

  return (
    <div className="timeline-controls">
      <div className="controls-row">
        <button className="play-btn" onClick={() => onPlayPause(!isPlaying)}>
          {isPlaying ? "⏸" : "▶"}
        </button>

        <div className="timeline">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => onProgressChange(parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="date-range-picker">
        <div className="date-input-group">
          <div className="date-input">
            <label>Start Date & Time</label>
            <input
              type="datetime-local"
              value={startDate.toISOString().slice(0, 16)}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="date-input">
            <label>End Date & Time</label>
            <input
              type="datetime-local"
              value={endDate.toISOString().slice(0, 16)}
              onChange={handleEndDateChange}
              min={startDate.toISOString().slice(0, 16)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineControls;
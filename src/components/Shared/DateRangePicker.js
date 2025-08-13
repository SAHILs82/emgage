// src/components/Shared/DateRangePicker.js
import React from "react";
import "../Shared/styles/DateRangePicker.css"; // Create this file too

const DateRangePicker = ({ startDate, endDate, onChange }) => {
  // Safely handle undefined/null dates
  const safeStartDate = startDate instanceof Date ? startDate : new Date();
  const safeEndDate = endDate instanceof Date ? endDate : new Date();

  const handleStartChange = (e) => {
    onChange({
      startDate: new Date(e.target.value),
      endDate: safeEndDate
    });
  };

  const handleEndChange = (e) => {
    onChange({
      startDate: safeStartDate,
      endDate: new Date(e.target.value)
    });
  };

  return (
    <div className="date-range-picker">
      <div className="date-input">
        <label>Start Date:</label>
        <input 
          type="date" 
          value={safeStartDate.toISOString().split('T')[0]}
          onChange={handleStartChange}
        />
      </div>
      <div className="date-input">
        <label>End Date:</label>
        <input 
          type="date" 
          value={safeEndDate.toISOString().split('T')[0]}
          onChange={handleEndChange}
          min={safeStartDate.toISOString().split('T')[0]}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
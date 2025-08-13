import React, { useState } from "react";
import "../DeliveryPartnerList/DeliveryPartnerList.css";
import PartnerProfile from "../PartnerProfile/PartnerProfile";

const DeliveryPartnerCard = ({ partner }) => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <div className="delivery-card" onClick={() => setShowProfile(true)}>
        <div className="card-header">
          <div className="avatar-container">
            <img src={partner.avatar} alt={partner.name} className="avatar" />
            <span className={`status-indicator ${partner.status}`}></span>
          </div>
          <div className="header-info">
            <h2 className="partner-name">{partner.name}</h2>
            <p className="partner-location">
              <span className="location-icon">📍</span> {partner.location}
            </p>
          </div>
        </div>

        <div className="card-body">
          <div className="delivery-info">
            <h3 className="section-title">Current Delivery</h3>
            <p className="delivery-details">{partner.currentDelivery}</p>
          </div>

          <div className="next-order">
            <h3 className="section-title">Next Order</h3>
            <p className="next-order-details">{partner.nextOrder}</p>
          </div>
        </div>

        <div className="card-footer">
          <div className="stats">
            <div className="stat-item">
              <span className="stat-value">{partner.totalOrdersCompleted}</span>
              <span className="stat-label">Total Orders</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{partner.rating}</span>
              <span className="stat-label">Rating</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{partner.onTimePercentage}%</span>
              <span className="stat-label">On Time</span>
            </div>
          </div>
        </div>
      </div>

      {showProfile && (
        <div className="profile-modal">
          <PartnerProfile
            partner={partner}
            onClose={() => setShowProfile(false)}
          />
        </div>
      )}
    </>
  );
};

export default DeliveryPartnerCard;
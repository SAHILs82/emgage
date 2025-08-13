import React from "react";
import "./DeliveryPartnerList.css";
import DeliveryPartnerCard from "../DeliveryPartnerCard/DeliveryPartnerCard"; // No curly braces
import  deliveryPartners  from "../../data/partnerData";
console.log(deliveryPartners); // should print the array

// const DeliveryPartnerCard = ({ partner }) => {
//   const [showProfile, setShowProfile] = useState(false);

//   return (
//     <>
//       <div className="delivery-card" onClick={() => setShowProfile(true)}>
//         {/* ... existing card content ... */}
//       </div>

//       {showProfile && (
//         <div className="profile-modal">
//           <PartnerProfile
//             partner={partner}
//             onClose={() => setShowProfile(false)}
//           />
//         </div>
//       )}
//     </>
//   );
// };

// export default DeliveryPartnerCard;
const DeliveryPartnerList = () => {
  return (
    <div className="partners-container">
      {deliveryPartners.map((partner) => (
        <DeliveryPartnerCard key={partner.id} partner={partner} />
      ))}
    </div>
  );
};

export default DeliveryPartnerList;

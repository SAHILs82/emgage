import React from "react";
import "./App.css";
import DeliveryPartnerList from "./components/DeliveryPartnerList/DeliverypartnerList";
function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Delivery Partners Dashboard</h1>
      </header>
      <main>
        <DeliveryPartnerList />
      </main>
    </div>
  );
}

export default App;

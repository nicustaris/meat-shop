import React from "react";

import "./App.css";
import Navbar from "./Navbar/Navbar";
import LatestOffers from "./layouts/LatestOffers/LatestOffers";
import CustomerFavorites from "./layouts/CustomerFavorites/CustomerFavorites";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main>
        <LatestOffers />
        <CustomerFavorites />
      </main>
    </div>
  );
};

export default App;

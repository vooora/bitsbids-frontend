import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./pages/LandingPage/LandingPage.js";
import UserProfilePage from "./pages/UserProfile/UserProfilePage.js";
import MyWalletPage from "./pages/UserProfile/MyWalletPage.js";
import SalesProductCard from "./components/ProductCard/SalesProductCard.js";
import MySalesPage from "./pages/UserProfile/MySales.js";

function App() {
  return (
    <div className="App">
      <MySalesPage />
    </div>
  );
}

export default App;

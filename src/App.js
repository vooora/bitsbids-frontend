import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./components/LandingPage/LandingPage";
import NewProduct from "./pages/NewProduct/NewProduct";

function App() {
  return (
    <div className="App">
      <NewProduct />
    </div>
  );
}

export default App;

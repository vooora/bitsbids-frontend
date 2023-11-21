import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import NewProduct from "./pages/NewProduct/NewProduct";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import LoginPage from "./components/utils/LoginPage";
import OAuth2CallbackPage from "./components/utils/OAuth2CallbackPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <NewProduct />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/login/oauth2/code/google"
            element={<OAuth2CallbackPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

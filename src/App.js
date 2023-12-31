import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import NewProduct from "./pages/NewProduct/NewProduct";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import LoginPage from "./components/utils/LoginPage";
import OAuth2CallbackPage from "./components/utils/OAuth2CallbackPage";
import { AuthProvider } from "./context/AuthContext";
import SearchResults from "./pages/SearchResults/SearchResults";
import UserProfilePage from "./pages/UserProfile/UserProfilePage";
import MyWalletPage from "./pages/UserProfile/MyWalletPage";
import Messages from "./pages/Messages/Messages";
import MySalesPage from "./pages/UserProfile/MySales";
import MyBidsPage from "./pages/UserProfile/MyBids";
import InfoForm from "./pages/InfoForm/InfoForm";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/search" element={<SearchResults />} />
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
              path="/messages"
              element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <UserProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wallet"
              element={
                <ProtectedRoute>
                  <MyWalletPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sales"
              element={
                <ProtectedRoute>
                  <MySalesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bids"
              element={
                <ProtectedRoute>
                  <MyBidsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <InfoForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login/oauth2/code/google"
              element={<OAuth2CallbackPage />}
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;

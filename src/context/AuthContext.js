import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const serverBaseUrl = "http://localhost:8080";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const checkAuthStatus = useCallback(async () => {
    setIsChecking(true);
    try {
      const res = await axios.get(`${serverBaseUrl}/api/auth/check`, {
        withCredentials: true,
      });
      setIsLoggedIn(res.status === 200);
      setIsChecking(false);
      return res.status === 200;
    } catch (error) {
      setIsLoggedIn(false);
      setIsChecking(false);
      return false;
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isChecking, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

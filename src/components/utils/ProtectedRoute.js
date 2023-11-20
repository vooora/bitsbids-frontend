import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://localhost:8080";

const checkAuth = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/auth/check`);
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const verifyAuth = async () => {
      const authStatus = await checkAuth();
      setIsAuthenticated(authStatus);
    };
    verifyAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      sessionStorage.setItem("redirectPath", window.location.pathname);
      window.location.href = `${baseUrl}/login`;
    }
  }, [isAuthenticated, location.pathname]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;

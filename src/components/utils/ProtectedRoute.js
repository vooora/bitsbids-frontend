import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import checkAuth from "./checkAuth";

const clientBaseUrl = "http://localhost:3000";

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
    console.log(isAuthenticated);
    if (isAuthenticated === false) {
      window.location.href = `${clientBaseUrl}/login`;
    }
  }, [isAuthenticated, location.pathname]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;

// OAuth2CallbackPage.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const baseUrl = "http://localhost:8080";

const checkAuth = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/auth/check`, {
      withCredentials: true,
    });
    return response.status === 200;
  } catch (error) {
    if (error.response) {
      console.error("Authentication check failed:", error.response.status);
      return false;
    } else if (error.request) {
      console.error("No response received for authentication check");
      return false;
    } else {
      console.error("Error setting up authentication check:", error.message);
      return false;
    }
  }
};

function OAuth2CallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuthentication = async () => {
      const isAuthenticated = await checkAuth();

      if (isAuthenticated) {
        const redirectPath = sessionStorage.getItem("redirectPath") || "/";
        console.log(redirectPath);
        console.log("here");
        sessionStorage.removeItem("redirectPath");
        navigate(redirectPath);
      } else {
        navigate("/login");
      }
    };

    verifyAuthentication();
  }, [navigate]);

  return <div>Logging you in...</div>;
}

export default OAuth2CallbackPage;

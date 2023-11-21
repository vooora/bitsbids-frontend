import { useEffect } from "react";
import checkAuth from "./checkAuth";

function OAuth2CallbackPage() {
  useEffect(() => {
    const verifyAuthentication = async () => {
      const isAuthenticated = await checkAuth();

      if (isAuthenticated) {
        const redirectPath = localStorage.getItem("redirectPath") || "/";
        window.location.href = redirectPath;
      } else {
        window.location.href = "/login";
      }
    };

    verifyAuthentication();
  }, []);

  return <div>Logging you in...</div>;
}

export default OAuth2CallbackPage;

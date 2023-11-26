import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function OAuth2CallbackPage() {
  const navigate = useNavigate();
  const { checkAuthStatus } = useContext(AuthContext);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkAuthStatus().then(() => {
      setIsChecking(false);
    });
  }, [checkAuthStatus]);

  useEffect(() => {
    if (!isChecking) {
      const redirectPath = localStorage.getItem("redirectPath") || "/";
      navigate(redirectPath);
    }
  }, [isChecking, navigate]);

  return <div>Logging you in...</div>;
}

export default OAuth2CallbackPage;

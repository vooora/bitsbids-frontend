import { useEffect, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function OAuth2CallbackPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { checkAuthStatus } = useContext(AuthContext);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const error = searchParams.get("error");

    if (error) {
      navigate("/", { state: { message: error, variant: "danger" } });
    } else {
      checkAuthStatus().then(() => {
        setIsChecking(false);
      });
    }
  }, [checkAuthStatus, location.search, navigate]);

  useEffect(() => {
    if (!isChecking) {
      const redirectPath = localStorage.getItem("redirectPath") || "/";
      navigate(redirectPath);
    }
  }, [isChecking, navigate]);

  return <div>Logging you in...</div>;
}

export default OAuth2CallbackPage;

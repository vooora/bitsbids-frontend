import { useEffect, useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { checkAuthStatus } = useContext(AuthContext);
  const [authCheckCompleted, setAuthCheckCompleted] = useState(false);

  useEffect(() => {
    const verifyAuthentication = async () => {
      const isLoggedIn = await checkAuthStatus();
      setAuthCheckCompleted(true);

      if (!isLoggedIn) {
        navigate("/login", { replace: true });
      }
    };

    verifyAuthentication();
  }, [checkAuthStatus, navigate]);

  if (!authCheckCompleted) {
    return <div>Loading...</div>;
  }

  return children;
}

export default ProtectedRoute;

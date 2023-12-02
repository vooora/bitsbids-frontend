import { useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";

const serverBaseUrl = process.env.REACT_APP_BACKEND_URL;

function LoginPage() {
  const { resetAuthError } = useContext(AuthContext);
  useEffect(() => {
    const loginUrl = `${serverBaseUrl}/oauth2/authorization/google`;
    resetAuthError();
    window.location.href = loginUrl;
  }, [resetAuthError]);

  return <div>Redirecting to login...</div>;
}

export default LoginPage;

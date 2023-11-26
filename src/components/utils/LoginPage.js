import { useEffect } from "react";

const serverBaseUrl = "http://localhost:8080";

function LoginPage() {
  useEffect(() => {
    const loginUrl = `${serverBaseUrl}/oauth2/authorization/google`;
    window.location.href = loginUrl;
  }, []);

  return <div>Redirecting to login...</div>;
}

export default LoginPage;

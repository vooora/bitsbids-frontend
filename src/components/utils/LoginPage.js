import { useEffect } from "react";

const baseUrl = "http://localhost:8080";

function LoginPage() {
  useEffect(() => {
    const redirectPath = "/products";
    const loginUrl = `${baseUrl}/oauth2/authorization/google?redirect=${encodeURIComponent(
      redirectPath
    )}`;
    window.location.href = loginUrl;
  }, []);

  return <div>Redirecting to login...</div>;
}

export default LoginPage;

import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/auth/check`);
      setIsAuthenticated(response.status === 200);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

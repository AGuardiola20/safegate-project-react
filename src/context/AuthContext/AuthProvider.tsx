import React, { useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  const savedAuthState = sessionStorage.getItem("isAuthenticated");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    savedAuthState === "true"
  );

  useEffect(() => {
    if (isAuthenticated) {
      sessionStorage.setItem("isAuthenticated", "true");
    } else {
      sessionStorage.removeItem("isAuthenticated");
    }
  }, [isAuthenticated]);

  const login = (path: string) => {
    setIsAuthenticated(true);
    navigate(path);
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

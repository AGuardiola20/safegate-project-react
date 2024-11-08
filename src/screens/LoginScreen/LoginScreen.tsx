// LoginScreen.tsx
import React from "react";
import { useAuth } from "../../context/AuthContext/AuthProvider";

const LoginScreen: React.FC = () => {
  const { login } = useAuth();

  const handleLogin = () => {
    // TODO: Aqui se agrega la logica de validación
    login();
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
};

export default LoginScreen;

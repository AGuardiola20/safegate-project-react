import React from "react";
import { useAuth } from "../../hooks/useAuth";
import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./LoginScreen.module.css";

const LoginScreen: React.FC = () => {
  const { login } = useAuth();

  const handleLogin = () => {
    // TODO: Aqui se agrega la logica de validación
    login();
  };

  return (
    <div>
      <h2>Login</h2>
      <LoginForm />
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
};

export default LoginScreen;

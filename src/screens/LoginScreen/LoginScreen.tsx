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
    <div className={styles.container}>
      <LoginForm loginFunction={handleLogin} />
    </div>
  );
};

export default LoginScreen;

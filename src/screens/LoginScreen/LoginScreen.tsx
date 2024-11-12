import React from "react";
import { useAuth } from "../../hooks/useAuth";
import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./LoginScreen.module.css";

const LoginScreen: React.FC = () => {
  const { login } = useAuth();

  const handleLogin = (username: string) => {
    // TODO: Aqui se agrega la logica de validación
    if (username === "admin") {
      login("/admin");
    } else {
      login("/user");
    }
  };

  return (
    <div className={styles.container}>
      <LoginForm loginFunction={handleLogin} />
    </div>
  );
};

export default LoginScreen;

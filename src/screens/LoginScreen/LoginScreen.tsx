import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./LoginScreen.module.css";

const LoginScreen: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log("Usuario autenticado:", user.email);

      if (user.email === "admin@gmail.com") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error al iniciar sesión:", error.message);
        setError("Credenciales incorrectas. Inténtalo de nuevo.");
      } else {
        console.error("Error desconocido:", error);
        setError("Ocurrió un error desconocido. Inténtalo de nuevo.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <LoginForm loginFunction={handleLogin} error={error} />
    </div>
  );
};

export default LoginScreen;

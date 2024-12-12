import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./LoginScreen.module.css";
import { useDispatch } from "react-redux";
import { setRole } from "../../redux/store/roleSlice";
import { useNavigate } from "react-router-dom";

const LoginScreen: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
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
        console.log("funciona");
        console.log("admin");

        dispatch(setRole("admin"));
      } else {
        console.log("user");

        dispatch(setRole("user"));
      }
      navigate("/room");
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

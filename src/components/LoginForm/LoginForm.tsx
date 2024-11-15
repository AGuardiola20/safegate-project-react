import React, { useState } from "react";
import styles from "./LoginForm.module.css";

type LoginFormProps = {
  loginFunction: (email: string, password: string) => void;
};

const LoginForm = ({ loginFunction }: LoginFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    loginFunction(email, password);
  };

  return (
    <div className={styles.cardContainer}>
      <div>
        <div className={styles.formTitle}>
          <h1 className={styles.loginTitle}>Inicio de Sesion</h1>
        </div>
      </div>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <input
          className={styles.inputFormat}
          placeholder="Correo Electrónico"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.inputFormat}
          placeholder="Contraseña"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles.submitContainer}>
          <input
            className={styles.submitInput}
            type="submit"
            value="Inicio de Sesion"
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

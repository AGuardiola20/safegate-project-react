import React, { useState } from "react";
import "./LoginForm.css";

const LoginForm = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    console.log("Username:", userName);
    console.log("Password:", password);
    cleanInputs();
  };

  const cleanInputs = () => {
    setUserName("");
    setPassword("");
  };

  return (
    <div className="card_container">
      <div>
        <div className="form_title">
          <h1 className="login_title">Inicio de Sesion</h1>
        </div>
      </div>
      <form className="form_container" onSubmit={handleSubmit}>
        <input
          className="input_format"
          placeholder="Nombre de Usuario"
          type="text"
          name="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="input_format"
          placeholder="Contraseña"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="submit_container">
          <input
            className="submit_input"
            type="submit"
            value="Inicio de Sesion"
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

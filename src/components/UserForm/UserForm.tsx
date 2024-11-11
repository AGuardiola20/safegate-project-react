import React, { useState } from "react";
import styles from "./UserForm.module.css";

const UserForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    id: "",
    age: "",
    genre: "",
    plate: "",
    companions: "",
    checkInTime: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formData).some((field) => field === "")) {
      alert("Por favor, complete todos los campos.");
      return;
    }
    console.log("Datos del formulario:", formData);
    cleanInputs();
  };

  const cleanInputs = () => {
    setFormData({
      firstName: "",
      lastName: "",
      id: "",
      age: "",
      genre: "",
      plate: "",
      companions: "",
      checkInTime: "",
    });
  };

  return (
    <div className={styles.cardContainer}>
      <div>
        <div className={styles.formTitle}>
          <h1 className={styles.registerUserTitle}>Registro de Visitante</h1>
        </div>
      </div>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <input
          className={styles.inputFormat}
          placeholder="Nombre"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          className={styles.inputFormat}
          placeholder="Apellido"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          className={styles.inputFormat}
          placeholder="Cedula"
          type="number"
          name="id"
          title="Ingrese su numero de cedula sin guiones ej. 206980321"
          value={formData.id}
          onChange={handleChange}
        />
        <input
          className={styles.inputFormat}
          placeholder="Edad"
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <select
          name="genre"
          id="genre"
          className={styles.inputSelectionFormat}
          value={formData.genre}
          onChange={handleChange}
        >
          <option value="">Selecciona un Genero</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
        <input
          className={styles.inputFormat}
          placeholder="Placa Vehiculo"
          type="text"
          name="plate"
          value={formData.plate}
          onChange={handleChange}
        />
        <input
          className={styles.inputFormat}
          placeholder="Cantidad Acompañantes"
          type="number"
          name="companions"
          value={formData.companions}
          onChange={handleChange}
        />
        <label htmlFor="checkInTime">Hora Ingreso</label>
        <input
          className={styles.inputFormat}
          type="time"
          name="checkInTime"
          value={formData.checkInTime}
          onChange={handleChange}
        />
        <div className={styles.submitContainer}></div>
      </form>
    </div>
  );
};

export default UserForm;

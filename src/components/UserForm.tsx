import React, { useState } from "react";
import "./UserForm.css";

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
    <div className="card_container">
      <div>
        <div className="form_title">
          <h1 className="registerUser_title">Registro de Visitante</h1>
        </div>
      </div>
      <form className="form_container" onSubmit={handleSubmit}>
        <input
          className="input_format"
          placeholder="Nombre"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          className="input_format"
          placeholder="Apellido"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          className="input_format"
          placeholder="Cedula"
          type="number"
          name="id"
          title="Ingrese su numero de cedula sin guiones ej. 206980321"
          value={formData.id}
          onChange={handleChange}
        />
        <input
          className="input_format"
          placeholder="Edad"
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <select
          name="genre"
          id="genre"
          className="input_selection_format"
          value={formData.genre}
          onChange={handleChange}
        >
          <option value="">Selecciona un Genero</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
        <input
          className="input_format"
          placeholder="Placa Vehiculo"
          type="text"
          name="plate"
          value={formData.plate}
          onChange={handleChange}
        />
        <input
          className="input_format"
          placeholder="Cantidad Acompañantes"
          type="number"
          name="companions"
          value={formData.companions}
          onChange={handleChange}
        />
        <label htmlFor="checkInTime">Hora Ingreso</label>
        <input
          className="input_format"
          type="time"
          name="checkInTime"
          value={formData.checkInTime}
          onChange={handleChange}
        />
        <div className="submit_container">
            {/* <button className="submit_input" type="submit">Registrar Visita</button> */}
          {/* <input
            className="submit_input"
            type="submit"
            value="Inicio de Sesion"
          /> */}
        </div>
      </form>
    </div>
  );
};

export default UserForm;

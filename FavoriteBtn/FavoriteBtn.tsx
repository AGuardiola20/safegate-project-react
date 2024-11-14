import React, { useState, useEffect } from "react";
import styles from "..FavoriteBtn.module.css";
import { Btn } from "../Btn/Btn";

interface UserFormData {
  firstName: string;
  lastName: string;
  id: string;
  age: string;
  genre: string;
  plate: string;
  companions: string;
  checkInTime: string;
}

const UserForm = () => {
  const [formData, setFormData] = useState<UserFormData>({
    firstName: "",
    lastName: "",
    id: "",
    age: "",
    genre: "",
    plate: "",
    companions: "",
    checkInTime: "",
  });

  const [favorites, setFavorites] = useState<UserFormData[]>(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const isAlreadyFavorite = favorites.some((fav) => fav.id === formData.id);
    setIsFavorite(isAlreadyFavorite);
  }, [formData, favorites]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

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

  const openFav = () => {
    console.log("Favoritos");
    alert("Favoritos: " + JSON.stringify(favorites));
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (fav) => fav.id !== formData.id
      );
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...favorites, formData];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  return (
    <div className={styles.cardContainer}>
      <div>
        <div className={styles.formTitle}>
          <h1 className={styles.registerUserTitle}>Registro de Visitante</h1>
        </div>
      </div>
      <div className={styles.favoriteBtn}>
        <Btn text="Favoritos" isPrimary={false} onClick={openFav} />
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
        <Btn
          text={isFavorite ? "Quitar de Favoritos" : "Añadir a Favoritos"}
          isPrimary={true}
          onClick={toggleFavorite}
        />
        <Btn text="Ingresar" isPrimary onClick={() => handleSubmit()} />
      </form>
    </div>
  );
};

export default UserForm;

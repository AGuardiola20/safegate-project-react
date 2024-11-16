import React, { useState, useEffect } from "react";
import styles from "./UserForm.module.css";
import Modal from "react-modal";
import { Btn } from "../Btn/Btn";
import { Guest } from "../../types/types";

const getFavorites = (): Guest[] => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

const addFavorite = (guest: Guest) => {
  const favorites = getFavorites();
  favorites.push(guest);
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

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

  const [favorites, setFavorites] = useState<Guest[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

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
      setError("Por favor, complete todos los campos.");
      return;
    }

    const guest: Guest = {
      name: `${formData.firstName} ${formData.lastName}`,
      age: Number(formData.age),
      isMale: formData.genre === "Masculino",
      plate: formData.plate,
      idNumber: formData.id,
      checkInTime: formData.checkInTime,
      companions: Number(formData.companions),
      houseNumber: "A1",
      isConfirmed: false,
    };

    addFavorite(guest);
    setFavorites(getFavorites());
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
    setError("");
  };

  const openFav = () => {
    setIsModalOpen(true);
  };

  const closeFav = () => {
    setIsModalOpen(false);
  };

  const handleSelectFavorite = (guest: Guest) => {
    setFormData({
      firstName: guest.name.split(" ")[0],
      lastName: guest.name.split(" ").slice(1).join(" "),
      id: guest.idNumber,
      age: guest.age ? guest.age.toString() : "",
      genre: guest.isMale ? "Masculino" : "Femenino",
      plate: guest.plate || "",
      companions: guest.companions ? guest.companions.toString() : "",
      checkInTime: guest.checkInTime || "",
    });
    closeFav();
  };

  const hasFormData = Object.values(formData).some((field) => field !== "");

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
      {error && <p className={styles.errorText}>{error}</p>}{" "}
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
        {hasFormData && (
          <Btn
            text="Eliminar Datos"
            isPrimary
            onClick={cleanInputs}
            style={{ backgroundColor: "#f44336" }}
          />
        )}
        <Btn text="Ingresar" isPrimary onClick={() => handleSubmit()} />
      </form>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeFav}
        contentLabel="Lista de Favoritos"
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
        closeTimeoutMS={300}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Lista de Favoritos</h2>
          <button
            className={styles.closeButton}
            onClick={closeFav}
            aria-label="Cerrar modal"
          >
            &times;
          </button>
        </div>
        <div className={styles.modalBody}>
          {favorites.length > 0 ? (
            <ul className={styles.favoriteList}>
              {favorites.map((fav, index) => (
                <li
                  key={index}
                  className={styles.favoriteItem}
                  onClick={() => handleSelectFavorite(fav)}
                  title={`Seleccionar ${fav.name}`}
                >
                  {fav.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.emptyState}>No tienes favoritos guardados.</p>
          )}
        </div>
        <div className={styles.modalFooter}>
          <Btn text="Cerrar" isPrimary onClick={closeFav} />
        </div>
      </Modal>
    </div>
  );
};

export default UserForm;

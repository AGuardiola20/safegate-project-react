import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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
  if (!favorites.some((favorite) => favorite.idNumber === guest.idNumber)) {
    favorites.push(guest);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

type FormInputs = {
  firstName: string;
  lastName: string;
  id: string;
  age: string;
  genre: string;
  plate: string;
  companions: string;
  checkInTime: string;
};

const UserForm = () => {
  const [favorites, setFavorites] = useState<Guest[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const guest: Guest = {
      name: `${data.firstName} ${data.lastName}`,
      age: Number(data.age),
      isMale: data.genre === "Masculino",
      plate: data.plate,
      idNumber: data.id,
      checkInTime: data.checkInTime,
      companions: Number(data.companions),
      houseNumber: "A1",
      isConfirmed: false,
    };

    addFavorite(guest);
    setFavorites(getFavorites());
    reset(); // Clear the form
  };

  const openFav = () => setIsModalOpen(true);
  const closeFav = () => setIsModalOpen(false);

  const handleSelectFavorite = (guest: Guest) => {
    setValue("firstName", guest.name.split(" ")[0]);
    setValue("lastName", guest.name.split(" ").slice(1).join(" "));
    setValue("id", guest.idNumber);
    setValue("age", guest.age ? guest.age.toString() : "");
    setValue("genre", guest.isMale ? "Masculino" : "Femenino");
    setValue("plate", guest.plate || "");
    setValue("companions", guest.companions ? guest.companions.toString() : "");
    setValue("checkInTime", guest.checkInTime || "");
    closeFav();
  };

  return (
    <div className={styles.cardContainer}>
      <div>
        <h1 className={styles.registerUserTitle}>Registro de Visitante</h1>
      </div>
      <div className={styles.favoriteBtn}>
        <Btn text="Favoritos" isPrimary={false} onClick={openFav} />
      </div>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.inputFormat}
          placeholder="Nombre"
          {...register("firstName", { required: "El nombre es requerido" })}
        />
        {errors.firstName && (
          <span className={styles.errorText}>{errors.firstName.message}</span>
        )}

        <input
          className={styles.inputFormat}
          placeholder="Apellido"
          {...register("lastName", { required: "El apellido es requerido" })}
        />
        {errors.lastName && (
          <span className={styles.errorText}>{errors.lastName.message}</span>
        )}

        <input
          className={styles.inputFormat}
          placeholder="Cédula"
          type="text"
          {...register("id", { required: "La cédula es requerida" })}
        />
        {errors.id && (
          <span className={styles.errorText}>{errors.id.message}</span>
        )}

        <input
          className={styles.inputFormat}
          placeholder="Edad"
          type="number"
          {...register("age", {
            required: "La edad es requerida",
            valueAsNumber: true,
          })}
        />
        {errors.age && (
          <span className={styles.errorText}>{errors.age.message}</span>
        )}

        <select
          className={styles.inputSelectionFormat}
          {...register("genre", { required: "El género es requerido" })}
        >
          <option value="">Selecciona un Género</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
        {errors.genre && (
          <span className={styles.errorText}>{errors.genre.message}</span>
        )}

        <input
          className={styles.inputFormat}
          placeholder="Placa Vehículo"
          type="text"
          {...register("plate")}
        />

        <input
          className={styles.inputFormat}
          placeholder="Cantidad de Acompañantes"
          type="number"
          {...register("companions", { valueAsNumber: true })}
        />

        <label htmlFor="checkInTime">Hora Ingreso</label>
        <input
          className={styles.inputFormat}
          type="time"
          {...register("checkInTime")}
        />

        <Btn text="Ingresar" isPrimary type="submit" />
      </form>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeFav}
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

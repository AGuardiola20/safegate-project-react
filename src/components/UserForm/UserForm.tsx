import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import styles from "./UserForm.module.css";
import { Btn } from "../Btn/Btn";
import { Guest } from "../../types/types";

// Utility functions to manage favorites
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

const UserForm = () => {
  const [favorites, setFavorites] = useState<Guest[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm<{
    firstName: string;
    lastName: string;
    id: string;
    age: string;
    plate: string;
    companions: string;
    checkInTime: string;
  }>({
    defaultValues: {
      firstName: "",
      lastName: "",
      id: "",
      age: "",
      plate: "",
      companions: "",
      checkInTime: "",
    },
  });

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const onSubmit = (data: any) => {
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
    reset();

  const handleSelectFavorite = (guest: Guest) => {
    setValue("firstName", guest.name.split(" ")[0]);
    setValue("lastName", guest.name.split(" ").slice(1).join(" "));
    setValue("id", guest.idNumber);
    setValue("age", guest.age?.toString() || "");
    setValue("plate", guest.plate || "");
    setValue("companions", guest.companions?.toString() || "");
    setValue("checkInTime", guest.checkInTime || "");
    setIsModalOpen(false);
  };

  return (
    <div className={styles.cardContainer}>
      <h1 className={styles.registerUserTitle}>Registro de Visitante</h1>
      <div className={styles.favoriteBtn}>
        <Btn
          text="Favoritos"
          isPrimary={false}
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <input
          {...register("firstName", { required: "El nombre es obligatorio" })}
          className={styles.inputFormat}
          placeholder="Nombre"
        />
        {errors.firstName && (
          <p className={styles.errorText}>{errors.firstName.message}</p>
        )}

        <input
          {...register("lastName", { required: "El apellido es obligatorio" })}
          className={styles.inputFormat}
          placeholder="Apellido"
        />
        {errors.lastName && (
          <p className={styles.errorText}>{errors.lastName.message}</p>
        )}

        <input
          {...register("id", {
            required: "La cédula es obligatoria",
            pattern: {
              value: /^[0-9]+$/,
              message: "La cédula debe contener solo números",
            },
          })}
          className={styles.inputFormat}
          placeholder="Cédula"
        />
        {errors.id && <p className={styles.errorText}>{errors.id.message}</p>}

        <input
          {...register("age", {
            required: "La edad es obligatoria",
            valueAsNumber: true,
          })}
          className={styles.inputFormat}
          placeholder="Edad"
          type="number"
        />
        {errors.age && <p className={styles.errorText}>{errors.age.message}</p>}

        <input
          {...register("companions", { valueAsNumber: true })}
          className={styles.inputFormat}
          placeholder="Cantidad Acompañantes"
          type="number"
        />

        <input
          {...register("checkInTime")}
          className={styles.inputFormat}
          placeholder="Hora de Ingreso"
          type="time"
        />

    
        <Btn text="Ingresar" isPrimary type="submit" />

    
        {isDirty && (
          <Btn
            text="Eliminar Datos"
            isPrimary
            style={{ backgroundColor: "#f44336" }}
            onClick={() => reset()}
          />
        )}
      </form>

 
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Lista de Favoritos"
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
        closeTimeoutMS={300}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Lista de Favoritos</h2>
          <button
            className={styles.closeButton}
            onClick={() => setIsModalOpen(false)}
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
          <Btn text="Cerrar" isPrimary onClick={() => setIsModalOpen(false)} />
        </div>
      </Modal>
    </div>
  );
};

export default UserForm;

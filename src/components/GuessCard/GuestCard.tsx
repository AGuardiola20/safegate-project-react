import { useState } from "react";
import Modal from "react-modal";
import { Guest } from "../../types/types";
import { Btn } from "../Btn/Btn";
import styles from "./GuestCard.module.css";

type GuestCardProps = {
  guest: Guest;
  onConfirmGuest: (idNumber: string) => void;
};

const formatCheckInTime = (checkInTime: string): string => {
  const [hour, minute] = checkInTime.split("T")[1].split(":");
  let hourNumber = parseInt(hour, 10);
  const ampm = hourNumber >= 12 ? "PM" : "AM";
  hourNumber = hourNumber % 12 || 12;
  return `${hourNumber}:${minute} ${ampm}`;
};

const InfoItem = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => (
  <div className={styles.cardInfoItem}>
    <p className={styles.cardItemTitle}>{title}:</p>
    <p>{value}</p>
  </div>
);

export const GuestCard = ({ guest, onConfirmGuest }: GuestCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const time12hr = formatCheckInTime(guest.checkInTime);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = () => {
    onConfirmGuest(guest.idNumber);
    closeModal();
  };

  return (
    <>
      <div
        className={
          guest.isConfirmed
            ? `${styles.cardContainer} ${styles.cardConfirmed}`
            : styles.cardContainer
        }
        onClick={openModal}
      >
        <div className={styles.cardHeader}>
          <div>
            <h2>{guest.name}</h2>
            <p>{`${guest.age} años / ${guest.isMale ? "Hombre" : "Mujer"}`}</p>
          </div>
          <h3>{guest.houseNumber}</h3>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Información del Invitado"
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
      >
        <h2>Información detallada de {guest.name}</h2>
        <InfoItem title="Cédula" value={guest.idNumber} />
        <InfoItem title="Placa" value={guest.plate} />
        <InfoItem title="Hora de ingreso" value={time12hr} />
        <InfoItem title="Acompañantes" value={guest.companions} />
        <Btn text="Ingresar" isPrimary onClick={handleSubmit} />
      </Modal>
    </>
  );
};

import { useState } from "react";
import Modal from "react-modal";
import { Guest } from "../../types/types";
import "./GuestCard.css";
import { Btn } from "../Btn/Btn";

type GuestCardProps = {
  guest: Guest;
  onConfirmGuest: (idNumber: string) => void;
};

const formatCheckInTime = (checkInTime: string): string => {
  const [hour, minute] = checkInTime.split("T")[1].split(":");
  let hourNumber: number = parseInt(hour, 10);
  const ampm: string = hourNumber >= 12 ? "PM" : "AM";
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
  <div className="card_info-item">
    <p className="card_item_title">{title}:</p>
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
          guest.isConfirmed ? "card_container card_confirmed" : "card_container"
        }
        onClick={openModal}
      >
        <div className="card_header">
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
        className="modal_content"
        overlayClassName="modal_overlay"
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

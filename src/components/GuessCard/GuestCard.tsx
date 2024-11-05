import { Guest } from "../../types/types";
import "./GuestCard.css";

type GuestCardProps = {
  guest: Guest;
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

export const GuestCard = ({ guest }: GuestCardProps) => {
  const time12hr = formatCheckInTime(guest.checkInTime);

  return (
    <div className="card_container">
      <div className="card_header">
        <div>
          <h2>{guest.name}</h2>
          <p>{`${guest.age} años / ${guest.isMale ? "Hombre" : "Mujer"}`}</p>
        </div>
        <h3>{guest.houseNumber}</h3>
      </div>
      <div className="card_info">
        <InfoItem title="Cédula" value={guest.idNumber} />
        <InfoItem title="Placa" value={guest.plate} />
        <InfoItem title="Hora de ingreso" value={time12hr} />
        <InfoItem title="Acompañantes" value={guest.companions} />
      </div>
    </div>
  );
};
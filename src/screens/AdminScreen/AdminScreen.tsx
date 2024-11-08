import { useState } from "react";
import { GuestCard } from "../../components/GuessCard/GuestCard";
import { useAuth } from "../../hooks/useAuth";
import { Guest } from "../../types/types";
import LogoImg from "../../assets/imgs/logoTemp.png";
import UserImg from "../../assets/imgs/UserImg.png";
import "./AdminScreen.css";

// TODO: Cambiar esto por data funcional
const GUEST: Guest[] = [
  {
    name: "John Doe",
    age: 30,
    isMale: true,
    plate: "ABC123",
    idNumber: "123456789",
    checkInTime: "2024-11-08T14:30:00",
    companions: 2,
    houseNumber: "12A",
  },
  {
    name: "Jane Smith",
    age: 28,
    isMale: false,
    plate: "XYZ456",
    idNumber: "987654321",
    checkInTime: "2024-11-09T15:00:00",
    companions: 1,
    houseNumber: "8B",
  },
  {
    name: "Alice Johnson",
    age: 35,
    isMale: false,
    plate: "LMN789",
    idNumber: "456789123",
    checkInTime: "2024-11-10T16:15:00",
    companions: 0,
    houseNumber: "5C",
  },
  {
    name: "Bob Brown",
    age: 40,
    isMale: true,
    plate: "JKL012",
    idNumber: "321654987",
    checkInTime: "2024-11-08T17:45:00",
    companions: 3,
    houseNumber: "3D",
  },
  {
    name: "Emma Davis",
    age: 26,
    isMale: false,
    plate: "PQR345",
    idNumber: "654321789",
    checkInTime: "2024-11-09T18:30:00",
    companions: 1,
    houseNumber: "9E",
  },
];

export const AdminScreen = () => {
  const { logout, isAuthenticated } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const filteredGuests = GUEST.filter((guest) => {
    const guestCheckInDate = new Date(guest.checkInTime).toLocaleDateString(
      "es-ES",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

    return (
      guestCheckInDate === formattedDate &&
      (guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guest.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guest.houseNumber.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  if (!isAuthenticated) {
    return <p>No tienes acceso a esta página.</p>;
  }

  return (
    <>
      <div className="header">
        <img className="logo" src={LogoImg} alt={`${LogoImg}-img`} />
        <h1>SafeGate</h1>
        <img className="userImg" src={UserImg} alt={`${UserImg}-img`} />
      </div>
      <h3>{formattedDate}</h3>

      <input
        type="text"
        placeholder="Buscar invitado..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="searchInput"
      />

      <div className="guestCardsContainer">
        {filteredGuests.length > 0 ? (
          filteredGuests.map((guest) => (
            <GuestCard key={guest.idNumber} guest={guest} />
          ))
        ) : (
          <p>No se encontraron invitados.</p>
        )}
      </div>

      <button onClick={logout}>Cerrar sesión</button>
    </>
  );
};

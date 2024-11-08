import { GuestCard } from "../../components/GuessCard/GuestCard";
import { useAuth } from "../../hooks/useAuth";
import { Guest } from "../../types/types";
import "./AdminScreen.css";

// TODO: Cambiar esto por data funcional
const GUEST: Guest[] = [
  {
    name: "John Doe",
    age: 30,
    isMale: true,
    plate: "ABC123",
    idNumber: "123456789",
    checkInTime: "2024-11-04T14:30:00",
    companions: 2,
    houseNumber: "12A",
  },
  {
    name: "Jane Smith",
    age: 28,
    isMale: false,
    plate: "XYZ456",
    idNumber: "987654321",
    checkInTime: "2024-11-04T15:00:00",
    companions: 1,
    houseNumber: "8B",
  },
  {
    name: "Alice Johnson",
    age: 35,
    isMale: false,
    plate: "LMN789",
    idNumber: "456789123",
    checkInTime: "2024-11-04T16:15:00",
    companions: 0,
    houseNumber: "5C",
  },
  {
    name: "Bob Brown",
    age: 40,
    isMale: true,
    plate: "JKL012",
    idNumber: "321654987",
    checkInTime: "2024-11-04T17:45:00",
    companions: 3,
    houseNumber: "3D",
  },
  {
    name: "Emma Davis",
    age: 26,
    isMale: false,
    plate: "PQR345",
    idNumber: "654321789",
    checkInTime: "2024-11-04T18:30:00",
    companions: 1,
    houseNumber: "9E",
  },
];

export const AdminScreen = () => {
  const { logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <p>No tienes acceso a esta página.</p>;
  }

  return (
    <>
      <div className="guestCardsContainer">
        <GuestCard guest={GUEST[0]} />
        <GuestCard guest={GUEST[1]} />
        <GuestCard guest={GUEST[2]} />
      </div>
      <button onClick={logout}>Cerrar sesión</button>
    </>
  );
};

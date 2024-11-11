import { useState, useEffect } from "react";
import { GuestCard } from "../../components/GuessCard/GuestCard";
import { useAuth } from "../../hooks/useAuth";
import { Guest } from "../../types/types";
import LogoImg from "../../assets/imgs/logoTemp.png";
import UserImg from "../../assets/imgs/UserImg.png";
import styles from "./AdminScreen.module.css";
import { IoIosArrowDown } from "react-icons/io";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// TODO: Cambiar esto por data funcional
const GUEST: Guest[] = [
  {
    name: "John Doe",
    age: 30,
    isMale: true,
    plate: "ABC123",
    idNumber: "123456789",
    checkInTime: "2024-11-09T14:30:00",
    companions: 2,
    houseNumber: "12A",
    isConfirmed: false,
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
    isConfirmed: true,
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
    isConfirmed: true,
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
    isConfirmed: false,
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
    isConfirmed: true,
  },
];

export const AdminScreen = () => {
  const { logout, isAuthenticated } = useAuth();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | [Date, Date] | null>(
    new Date()
  );

  const formattedDate = selectedDate
    ? (Array.isArray(selectedDate)
        ? selectedDate[0]
        : selectedDate
      ).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  useEffect(() => {
    const filteredGuests = GUEST.filter((guest) => {
      const guestDate = new Date(guest.checkInTime).toLocaleDateString(
        "es-ES",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      );
      return guestDate === formattedDate;
    });
    setGuests(filteredGuests);
  }, [formattedDate]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleConfirmGuest = (idNumber: string) => {
    setGuests((prevGuests) =>
      prevGuests.map((guest) =>
        guest.idNumber === idNumber ? { ...guest, isConfirmed: true } : guest
      )
    );
  };

  const filteredGuests = guests.filter((guest) => {
    return (
      guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.houseNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleDateClick = () => {
    setShowCalendar((prev) => !prev);
  };

  const handleDateChange = (date: Date | [Date, Date] | null) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowCalendar(false);
    }
  };

  if (!isAuthenticated) {
    return <p>No tienes acceso a esta página.</p>;
  }

  return (
    <>
      <div className={styles.header}>
        <img
          className={`${styles.logo} ${styles.img}`}
          src={LogoImg}
          alt="Logo"
        />
        <h1>SafeGate</h1>
        <img
          className={`${styles.userImg} ${styles.img}`}
          src={UserImg}
          alt="User"
        />
      </div>
      <div className={styles.dateContainer} onClick={handleDateClick}>
        <h3 className={styles.date}>{formattedDate}</h3>
        <div className={styles.icon}>
          <IoIosArrowDown />
        </div>
      </div>

      {showCalendar && (
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <div className={styles.calendarContainer}>
            <Calendar onChange={handleDateChange} value={selectedDate} />
          </div>
        </div>
      )}

      <input
        type="text"
        placeholder="Buscar invitado..."
        value={searchQuery}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />

      <div className={styles.guestCardsContainer}>
        {filteredGuests.length > 0 ? (
          filteredGuests.map((guest) => (
            <GuestCard
              key={guest.idNumber}
              guest={guest}
              onConfirmGuest={handleConfirmGuest}
            />
          ))
        ) : (
          <p>No se encontraron invitados.</p>
        )}
      </div>

      <button onClick={logout}>Cerrar sesión</button>
    </>
  );
};

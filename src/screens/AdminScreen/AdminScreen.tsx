import { useState, useEffect } from "react";
import { GuestCard } from "../../components/GuessCard/GuestCard";
import { Guest } from "../../types/types";
import LogoImg from "../../assets/imgs/logoTemp.png";
import UserImg from "../../assets/imgs/UserImg.png";
import styles from "./AdminScreen.module.css";
import { IoIosArrowDown } from "react-icons/io";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Logout } from "../../components/Logout/Logout";
import useGuests from "../../hooks/useGuests";

export const AdminScreen = () => {
  const { guestList } = useGuests();
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
    const filteredGuests = guestList.filter((guest) => {
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
  }, [formattedDate, guestList]);

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

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowCalendar(false);
    }
  };

  return (
    <div className={styles.container}>
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

      <Logout />
    </div>
  );
};

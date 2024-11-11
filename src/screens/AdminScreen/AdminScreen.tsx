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
  {
    name: "Charlie Green",
    age: 32,
    isMale: true,
    plate: "DEF678",
    idNumber: "159753486",
    checkInTime: "2024-11-11T10:00:00",
    companions: 1,
    houseNumber: "4F",
    isConfirmed: false,
  },
  {
    name: "Sophie Turner",
    age: 24,
    isMale: false,
    plate: "GHI901",
    idNumber: "852963741",
    checkInTime: "2024-11-12T12:00:00",
    companions: 0,
    houseNumber: "6A",
    isConfirmed: true,
  },
  {
    name: "Michael Scott",
    age: 45,
    isMale: true,
    plate: "JKL234",
    idNumber: "963258741",
    checkInTime: "2024-11-15T08:45:00",
    companions: 2,
    houseNumber: "15B",
    isConfirmed: true,
  },
  {
    name: "Rachel Green",
    age: 33,
    isMale: false,
    plate: "MNO567",
    idNumber: "753159468",
    checkInTime: "2024-11-18T09:30:00",
    companions: 1,
    houseNumber: "7D",
    isConfirmed: false,
  },
  {
    name: "Jack Black",
    age: 38,
    isMale: true,
    plate: "STU890",
    idNumber: "147258369",
    checkInTime: "2024-11-20T14:00:00",
    companions: 0,
    houseNumber: "10E",
    isConfirmed: true,
  },
  {
    name: "Olivia White",
    age: 27,
    isMale: false,
    plate: "VWX123",
    idNumber: "369741852",
    checkInTime: "2024-11-21T11:30:00",
    companions: 0,
    houseNumber: "11C",
    isConfirmed: false,
  },
  {
    name: "Lucas Wilson",
    age: 29,
    isMale: true,
    plate: "YZA456",
    idNumber: "741852963",
    checkInTime: "2024-11-22T13:00:00",
    companions: 2,
    houseNumber: "13B",
    isConfirmed: true,
  },
  {
    name: "Sophia Lee",
    age: 31,
    isMale: false,
    plate: "BCD789",
    idNumber: "852963741",
    checkInTime: "2024-11-23T17:45:00",
    companions: 1,
    houseNumber: "14D",
    isConfirmed: false,
  },
  {
    name: "James Harris",
    age: 37,
    isMale: true,
    plate: "EFG234",
    idNumber: "369258147",
    checkInTime: "2024-11-24T08:30:00",
    companions: 1,
    houseNumber: "16A",
    isConfirmed: true,
  },
  {
    name: "Mia Clark",
    age: 26,
    isMale: false,
    plate: "HIJ567",
    idNumber: "147258369",
    checkInTime: "2024-11-25T15:30:00",
    companions: 0,
    houseNumber: "17C",
    isConfirmed: false,
  },
  {
    name: "Ethan Lewis",
    age: 32,
    isMale: true,
    plate: "KLM890",
    idNumber: "258369741",
    checkInTime: "2024-11-26T10:00:00",
    companions: 3,
    houseNumber: "18D",
    isConfirmed: true,
  },
  {
    name: "Zoe Miller",
    age: 25,
    isMale: false,
    plate: "NOP123",
    idNumber: "369852741",
    checkInTime: "2024-11-27T09:15:00",
    companions: 1,
    houseNumber: "19B",
    isConfirmed: false,
  },
  {
    name: "Liam Scott",
    age: 42,
    isMale: true,
    plate: "QRS456",
    idNumber: "123789456",
    checkInTime: "2024-11-28T13:45:00",
    companions: 2,
    houseNumber: "20C",
    isConfirmed: true,
  },
  {
    name: "Chloe Turner",
    age: 29,
    isMale: false,
    plate: "TUV789",
    idNumber: "963741258",
    checkInTime: "2024-11-29T12:00:00",
    companions: 0,
    houseNumber: "21A",
    isConfirmed: false,
  },
  {
    name: "Benjamin Allen",
    age: 31,
    isMale: true,
    plate: "WXY012",
    idNumber: "654123987",
    checkInTime: "2024-11-01T10:30:00",
    companions: 1,
    houseNumber: "1D",
    isConfirmed: true,
  },
  {
    name: "Ella Carter",
    age: 27,
    isMale: false,
    plate: "ZAB345",
    idNumber: "258147369",
    checkInTime: "2024-11-02T09:00:00",
    companions: 0,
    houseNumber: "2F",
    isConfirmed: true,
  },
  {
    name: "Daniel Roberts",
    age: 39,
    isMale: true,
    plate: "CDE678",
    idNumber: "456123789",
    checkInTime: "2024-11-03T16:45:00",
    companions: 3,
    houseNumber: "3A",
    isConfirmed: false,
  },
  {
    name: "Amelia Adams",
    age: 33,
    isMale: false,
    plate: "FGH901",
    idNumber: "741963258",
    checkInTime: "2024-11-04T14:30:00",
    companions: 1,
    houseNumber: "4B",
    isConfirmed: true,
  },
  {
    name: "Matthew Nelson",
    age: 41,
    isMale: true,
    plate: "IJK234",
    idNumber: "852741963",
    checkInTime: "2024-11-05T13:15:00",
    companions: 0,
    houseNumber: "5F",
    isConfirmed: false,
  },
  {
    name: "Lucas King",
    age: 28,
    isMale: true,
    plate: "LMN567",
    idNumber: "369852741",
    checkInTime: "2024-11-06T10:45:00",
    companions: 2,
    houseNumber: "6D",
    isConfirmed: true,
  },
  {
    name: "Victoria Young",
    age: 32,
    isMale: false,
    plate: "NOP890",
    idNumber: "654987321",
    checkInTime: "2024-11-07T12:00:00",
    companions: 1,
    houseNumber: "7A",
    isConfirmed: false,
  },
  {
    name: "Jacob Perez",
    age: 38,
    isMale: true,
    plate: "PQR123",
    idNumber: "852963741",
    checkInTime: "2024-11-08T16:30:00",
    companions: 1,
    houseNumber: "8C",
    isConfirmed: true,
  },
  {
    name: "Avery Harris",
    age: 27,
    isMale: false,
    plate: "STU456",
    idNumber: "147258369",
    checkInTime: "2024-11-09T09:00:00",
    companions: 2,
    houseNumber: "9F",
    isConfirmed: true,
  },
  {
    name: "Nathan Walker",
    age: 33,
    isMale: true,
    plate: "VWX789",
    idNumber: "369741258",
    checkInTime: "2024-11-10T18:30:00",
    companions: 1,
    houseNumber: "10A",
    isConfirmed: false,
  },
  {
    name: "Grace Allen",
    age: 30,
    isMale: false,
    plate: "YZA012",
    idNumber: "258963741",
    checkInTime: "2024-11-11T11:00:00",
    companions: 0,
    houseNumber: "11B",
    isConfirmed: true,
  },
  {
    name: "Owen Carter",
    age: 41,
    isMale: true,
    plate: "BCD345",
    idNumber: "741852963",
    checkInTime: "2024-11-12T10:15:00",
    companions: 2,
    houseNumber: "12D",
    isConfirmed: false,
  },
  {
    name: "Lily Taylor",
    age: 26,
    isMale: false,
    plate: "EFG678",
    idNumber: "963258741",
    checkInTime: "2024-11-13T12:00:00",
    companions: 1,
    houseNumber: "13F",
    isConfirmed: true,
  },
  {
    name: "Isaac Martinez",
    age: 29,
    isMale: true,
    plate: "GHI901",
    idNumber: "258369741",
    checkInTime: "2024-11-14T13:30:00",
    companions: 3,
    houseNumber: "14A",
    isConfirmed: false,
  },
  {
    name: "Layla Wilson",
    age: 34,
    isMale: false,
    plate: "JKL234",
    idNumber: "741963258",
    checkInTime: "2024-11-15T09:00:00",
    companions: 2,
    houseNumber: "15D",
    isConfirmed: true,
  },
  {
    name: "Aidan Robinson",
    age: 40,
    isMale: true,
    plate: "MNO567",
    idNumber: "963741258",
    checkInTime: "2024-11-16T15:00:00",
    companions: 1,
    houseNumber: "16B",
    isConfirmed: false,
  },
  {
    name: "Evelyn Perez",
    age: 33,
    isMale: false,
    plate: "PQR890",
    idNumber: "852963741",
    checkInTime: "2024-11-17T08:45:00",
    companions: 0,
    houseNumber: "17F",
    isConfirmed: true,
  },
  {
    name: "Liam Taylor",
    age: 27,
    isMale: true,
    plate: "RST012",
    idNumber: "258147369",
    checkInTime: "2024-11-18T10:00:00",
    companions: 2,
    houseNumber: "18A",
    isConfirmed: false,
  },
  {
    name: "Ruby Moore",
    age: 34,
    isMale: false,
    plate: "TUV345",
    idNumber: "369852741",
    checkInTime: "2024-11-19T16:00:00",
    companions: 1,
    houseNumber: "19D",
    isConfirmed: true,
  },
  {
    name: "Daniel Evans",
    age: 31,
    isMale: true,
    plate: "WXY678",
    idNumber: "741258963",
    checkInTime: "2024-11-20T12:15:00",
    companions: 0,
    houseNumber: "20F",
    isConfirmed: false,
  },
  {
    name: "Megan Brown",
    age: 29,
    isMale: false,
    plate: "XYZ890",
    idNumber: "258963741",
    checkInTime: "2024-11-21T14:45:00",
    companions: 3,
    houseNumber: "21C",
    isConfirmed: true,
  },
  {
    name: "Gabriel White",
    age: 43,
    isMale: true,
    plate: "ABC234",
    idNumber: "963258741",
    checkInTime: "2024-11-22T16:30:00",
    companions: 1,
    houseNumber: "22A",
    isConfirmed: false,
  },
  {
    name: "Zoey Black",
    age: 26,
    isMale: false,
    plate: "DEF567",
    idNumber: "741963258",
    checkInTime: "2024-11-23T10:45:00",
    companions: 0,
    houseNumber: "23B",
    isConfirmed: true,
  },
  {
    name: "Joseph Allen",
    age: 31,
    isMale: true,
    plate: "GHI890",
    idNumber: "258369741",
    checkInTime: "2024-11-24T08:30:00",
    companions: 2,
    houseNumber: "24F",
    isConfirmed: false,
  },
  {
    name: "Natalie Wilson",
    age: 36,
    isMale: false,
    plate: "JKL012",
    idNumber: "369741258",
    checkInTime: "2024-11-25T13:15:00",
    companions: 0,
    houseNumber: "25A",
    isConfirmed: true,
  },
  {
    name: "Oscar Clark",
    age: 30,
    isMale: true,
    plate: "LMN345",
    idNumber: "741852963",
    checkInTime: "2024-11-26T09:00:00",
    companions: 3,
    houseNumber: "26B",
    isConfirmed: false,
  },
  {
    name: "Amelia Young",
    age: 29,
    isMale: false,
    plate: "NOP678",
    idNumber: "852963741",
    checkInTime: "2024-11-27T10:45:00",
    companions: 0,
    houseNumber: "27C",
    isConfirmed: true,
  },
  {
    name: "Isaac Roberts",
    age: 37,
    isMale: true,
    plate: "QRS901",
    idNumber: "963741258",
    checkInTime: "2024-11-28T14:30:00",
    companions: 1,
    houseNumber: "28D",
    isConfirmed: false,
  },
  {
    name: "Charlotte Miller",
    age: 34,
    isMale: false,
    plate: "TUV234",
    idNumber: "258369741",
    checkInTime: "2024-11-29T15:00:00",
    companions: 2,
    houseNumber: "29A",
    isConfirmed: true,
  },
  {
    name: "Elijah Harris",
    age: 30,
    isMale: true,
    plate: "WXY567",
    idNumber: "741963258",
    checkInTime: "2024-11-30T16:30:00",
    companions: 1,
    houseNumber: "30B",
    isConfirmed: false,
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

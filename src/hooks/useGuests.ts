import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Guest } from "../types/types";

const useGuests = () => {
  const [guestList, setGuestsList] = useState<Guest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuests = async () => {
      setLoading(true);
      try {
        const guestsCollection = collection(db, "guests");
        const querySnapshot = await getDocs(guestsCollection);

        const guestsListCollection = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Guest, "id">),
        }));

        setGuestsList(guestsListCollection);
      } catch (err) {
        console.error("Error fetching guests:", err);
        setError("Failed to fetch guests");
      } finally {
        setLoading(false);
      }
    };

    fetchGuests();
  }, []);

  return { guestList, loading, error };
};

export default useGuests;

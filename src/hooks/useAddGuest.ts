import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Guest } from "../types/types";

const useAddGuest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const addGuest = async (guest: Guest) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const guestsCollection = collection(db, "guests");
      await addDoc(guestsCollection, guest);

      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido al agregar el invitado.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { addGuest, loading, error, success };
};

export default useAddGuest;

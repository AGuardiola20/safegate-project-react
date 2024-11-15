import { signOut } from "firebase/auth";
import { Btn } from "../Btn/Btn";
import styles from "./Logout.module.css";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Sesión cerrada correctamente");
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

  return (
    <div className={styles.logoutContainer}>
      <Btn text="Cerrar Sesion" isPrimary={false} onClick={handleLogout} />
    </div>
  );
};

import { useAuth } from "../../hooks/useAuth";
import { Btn } from "../Btn/Btn";
import styles from "./Logout.module.css";

export const Logout = () => {
  const { logout } = useAuth();

  return (
    <div className={styles.logoutContainer}>
      <Btn text="Cerrar Sesion" isPrimary={false} onClick={logout} />
    </div>
  );
};

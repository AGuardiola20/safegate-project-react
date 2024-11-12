import { Btn } from "../../components/Btn/Btn";
import UserForm from "../../components/UserForm/UserForm";
import { useAuth } from "../../hooks/useAuth";
import styles from "./UserScreen.module.css";

export const UserScreen = () => {
  const { logout, isAuthenticated } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.userFormContainer}>
        <UserForm />
      </div>
      <div className={styles.logoutContainer}>
        <Btn text="Cerrar Sesion" isPrimary={false} onClick={logout} />
      </div>
    </div>
  );
};

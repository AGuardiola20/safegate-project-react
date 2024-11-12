import { useAuth } from "../../hooks/useAuth";
import styles from "./UserScreen.module.css";

export const UserScreen = () => {
  const { logout, isAuthenticated } = useAuth();

  return (
    <>
      <button onClick={logout}>Cerrar sesión</button>
      <div>UserScreen</div>;
    </>
  );
};

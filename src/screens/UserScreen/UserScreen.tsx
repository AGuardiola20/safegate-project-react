import { Logout } from "../../components/Logout/Logout";
import UserForm from "../../components/UserForm/UserForm";
import styles from "./UserScreen.module.css";

export const UserScreen = () => {
  return (
    <div className={styles.container}>
      <div className={styles.userFormContainer}>
        <UserForm />
      </div>
      <Logout />
    </div>
  );
};

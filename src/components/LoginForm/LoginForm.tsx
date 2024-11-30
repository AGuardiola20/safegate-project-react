import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./LoginForm.module.css";

type LoginFormProps = {
  loginFunction: (email: string, password: string) => void;
  error?: string | null;
};

type Inputs = {
  userName: string;
  passWord: string;
};

const LoginForm = ({ loginFunction, error }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    loginFunction(data.userName, data.passWord);
  };

  return (
    <div className={styles.cardContainer}>
      <div>
        <div className={styles.formTitle}>
          <h1 className={styles.loginTitle}>Inicio de Sesion</h1>
        </div>
      </div>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className={styles.inputFormat}
            placeholder="Correo Electrónico"
            type="email"
            id="userName"
            {...register("userName", {
              required: "*El Correo Electronico es Obligatorio",
            })}
          />
          {errors.userName && (
            <p className={styles.errorForm}>{errors.userName.message}</p>
          )}
        </div>

        <div>
          <input
            className={styles.inputFormat}
            placeholder="Contraseña"
            type="password"
            {...register("passWord", {
              required: "*La Contraseña es requerida",
            })}
          />
          {errors.passWord && (
            <p className={styles.errorForm}>{errors.passWord.message}</p>
          )}
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.submitContainer}>
          <input
            className={styles.submitInput}
            type="submit"
            value="Inicio de Sesion"
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

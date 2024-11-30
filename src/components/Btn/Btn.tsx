import React from "react";
import styles from "./Btn.module.css";

type ButtonType = "submit" | "button" | "reset";

type BtnProps = {
  text: string;
  isPrimary: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  type?: ButtonType;
};

export const Btn = ({ text, isPrimary, onClick, style, type }: BtnProps) => {
  return (
    <button
      className={`${styles["btnContainer"]} ${
        !isPrimary && styles["btnSecondary"]
      }`}
      style={style}
      onClick={onClick}
      type={type ? type : "button"}
    >
      {text}
    </button>
  );
};

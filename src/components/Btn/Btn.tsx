import React from "react";
import styles from "./Btn.module.css";

type BtnProps = {
  text: string;
  isPrimary: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
};

export const Btn = ({ text, isPrimary, onClick, style }: BtnProps) => {
  return (
    <button
      className={`${styles["btnContainer"]} ${
        !isPrimary && styles["btnSecondary"]
      }`}
      style={style}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

import React from "react";
import "./Btn.css";

type BtnProps = {
  text: string;
  isPrimary: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
};

export const Btn = ({ text, isPrimary, onClick, style }: BtnProps) => {
  return (
    <button
      className={isPrimary ? "btn-container" : "btn-container btn-secondary"}
      style={style}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

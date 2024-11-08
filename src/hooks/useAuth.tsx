import { useContext } from "react";
import {
  AuthContext,
  AuthContextType,
} from "../context/AuthContext/AuthContext";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
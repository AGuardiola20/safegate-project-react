import { createContext } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (path: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

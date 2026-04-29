import { createContext } from "react";
import type { User } from "../services/authService";

export interface AuthContextType {
  user: User | null;
  ready: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  ready: false,
  setUser: () => {},
  logout: () => {},
});

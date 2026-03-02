import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import type { User } from "../services/authService";
import { AuthContext } from "./auth-context";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;
    let mounted = true;
    (async () => {
      try {
        const decoded = jwtDecode<User>(token);
        if (mounted) setUser({ id: decoded.id, username: decoded.username || "", email: decoded.email || "", role: decoded.role });
      } catch {
        if (mounted) setUser(null);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

"use client";

import { UserDTO } from "@/types/userDTO";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
  currentUser: UserDTO | null;
  setCurrentUser: (user: UserDTO | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserDTO | null>(null);

  useEffect(() => {
    // Load user from localStorage on initial load
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const saveUser = (user: UserDTO | null) => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
    setCurrentUser(user);
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser: saveUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

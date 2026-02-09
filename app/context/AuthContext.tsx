"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { User, Role } from "@/app/types/user";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (role: Role) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS: Record<Role, User> = {
  ADMIN: {
    id: "admin-1",
    firstName: "Admin",
    lastName: "User",
    email: "admin@4zee.com",
    role: "ADMIN",
    createdAt: new Date().toISOString(),
  },
  REALTOR: {
    id: "realtor-1",
    firstName: "Realtor",
    lastName: "Agent",
    email: "realtor@4zee.com",
    role: "REALTOR",
    createdAt: new Date().toISOString(),
  },
  CLIENT: {
    id: "client-1",
    firstName: "John",
    lastName: "Doe",
    email: "client@4zee.com",
    role: "CLIENT",
    createdAt: new Date().toISOString(),
  },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    // Check local storage on mount
    const storedUser = localStorage.getItem("4zee_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
        localStorage.removeItem("4zee_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (role: Role) => {
    setLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockUser = MOCK_USERS[role];
    setUser(mockUser);
    localStorage.setItem("4zee_user", JSON.stringify(mockUser));
    // Set cookie for middleware
    document.cookie = "token=mock-token; path=/; max-age=86400";
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("4zee_user");
    document.cookie = "token=; path=/; max-age=0";
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

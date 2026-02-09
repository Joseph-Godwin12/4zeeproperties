"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { User, Role } from "@/app/types/user";
import { api, AuthUser, LoginPayload } from "@/lib/api";
import {
  setToken,
  setRoleCookie,
  setStoredUser,
  getStoredUser,
  clearAuth,
} from "@/lib/auth";
import { useRouter } from "next/navigation";

// ---------------------------------------------------------------------------
// Context shape
// ---------------------------------------------------------------------------

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginPayload) => Promise<{ success: boolean; error?: string; role?: Role }>;
  logout: () => void;
  /** Call after registration to hydrate context without a second login */
  setUserFromApi: (apiUser: AuthUser, token?: string) => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Map the backend AuthUser shape to our frontend User type. */
function toUser(u: AuthUser): User {
  return {
    id: u.id,
    email: u.email,
    role: u.role,
    firstName: u.email.split("@")[0], // fallback; backend doesn't return name yet
    lastName: "",
    createdAt: u.createdAt ?? new Date().toISOString(),
    updatedAt: u.updatedAt,
  };
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = getStoredUser<User>();
    if (stored) {
      setUser(stored);
    }
    setLoading(false);
  }, []);

  // --------------------------------------------------
  // Login  –  POST /auth/login
  // --------------------------------------------------
  const login = async (
    credentials: LoginPayload,
  ): Promise<{ success: boolean; error?: string; role?: Role }> => {
    setLoading(true);
    try {
      const res = await api.login(credentials);

      if (!res.success || !res.data) {
        setLoading(false);
        return { success: false, error: res.error ?? "Invalid credentials" };
      }

      const { access_token, user: apiUser } = res.data;

      // Persist token + role cookie (for middleware) + user
      setToken(access_token);
      setRoleCookie(apiUser.role);
      const frontendUser = toUser(apiUser);
      setStoredUser(frontendUser);
      setUser(frontendUser);
      setLoading(false);

      return { success: true, role: apiUser.role };
    } catch {
      setLoading(false);
      return { success: false, error: "Network error. Please try again." };
    }
  };

  // --------------------------------------------------
  // Logout
  // --------------------------------------------------
  const logout = () => {
    setUser(null);
    clearAuth();
    router.push("/auth/login");
  };

  // --------------------------------------------------
  // setUserFromApi  –  used after registration
  // --------------------------------------------------
  const setUserFromApi = (apiUser: AuthUser, token?: string) => {
    if (token) {
      setToken(token);
      setRoleCookie(apiUser.role);
    }
    const frontendUser = toUser(apiUser);
    setStoredUser(frontendUser);
    setUser(frontendUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        setUserFromApi,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

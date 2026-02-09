"use client";

import { useAuth } from "./useAuth";
import { Role } from "@/app/types/user";

export const useRole = (allowedRoles: Role[]) => {
  const { user, loading } = useAuth();
  
  if (loading) return { isAuthorized: false, loading: true };
  
  if (!user) return { isAuthorized: false, loading: false };
  
  const isAuthorized = allowedRoles.includes(user.role);
  
  return { isAuthorized, loading: false };
};

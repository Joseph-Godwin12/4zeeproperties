// ---------------------------------------------------------------------------
// lib/auth.ts  –  Token & cookie helpers for JWT-based auth
// ---------------------------------------------------------------------------

const TOKEN_KEY = "4zee_token";
const USER_KEY = "4zee_user";

/** Store the JWT token in localStorage + a cookie for middleware. */
export function setToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  // Cookie accessible by Next.js middleware (7-day expiry matches backend)
  document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

/** Read JWT from localStorage. */
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

/** Remove token from both stores. */
export function clearToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  document.cookie = "token=; path=/; max-age=0";
}

/** Persist the user role in a cookie so middleware can read it. */
export function setRoleCookie(role: string) {
  if (typeof window === "undefined") return;
  document.cookie = `auth-role=${role}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

/** Remove role cookie. */
export function clearRoleCookie() {
  if (typeof window === "undefined") return;
  document.cookie = "auth-role=; path=/; max-age=0";
}

/** Persist user JSON in localStorage. */
export function setStoredUser(user: object) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/** Read user from localStorage. */
export function getStoredUser<T = object>(): T | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/** Clear user from localStorage. */
export function clearStoredUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(USER_KEY);
}

/** Clear everything (logout). */
export function clearAuth() {
  clearToken();
  clearRoleCookie();
  clearStoredUser();
}

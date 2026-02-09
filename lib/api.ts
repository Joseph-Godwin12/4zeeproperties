const API_BASE_URL = "https://fourzeeproperties-backend.onrender.com";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build headers – attaches the Bearer token when available. */
function authHeaders(): Record<string, string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("4zee_token");
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

/** Generic request wrapper with error normalisation. */
async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<{ success: boolean; data?: T; error?: string; statusCode?: number }> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: { ...authHeaders(), ...(options.headers as Record<string, string>) },
    });

    const json = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: json.error || json.message || "Something went wrong",
        statusCode: res.status,
      };
    }

    return json; // { success: true, data: … }
  } catch (err) {
    return { success: false, error: "Network error. Please check your connection." };
  }
}

// ---------------------------------------------------------------------------
// Auth API  –  POST /auth/register  |  POST /auth/login  |  GET /auth/me
// ---------------------------------------------------------------------------

export interface RegisterPayload {
  email: string;
  password: string;
  role: "CLIENT" | "REALTOR";
  referralCode?: string;
  dob?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: "ADMIN" | "REALTOR" | "CLIENT";
  createdAt?: string;
  updatedAt?: string;
  client?: { id: string; phone?: string; address?: string; dateOfBirth?: string };
  realtor?: { id: string; referralCode?: string; recruiterId?: string };
}

export interface LoginResponse {
  access_token: string;
  user: AuthUser;
}

export const api = {
  // ======================== AUTH ========================

  /** POST /auth/register – create CLIENT or REALTOR account */
  register: (data: RegisterPayload) =>
    request<{ id: string; email: string; role: string; createdAt: string }>(
      "/auth/register",
      { method: "POST", body: JSON.stringify(data) },
    ),

  /** POST /auth/login – returns JWT + user */
  login: (data: LoginPayload) =>
    request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  /** GET /auth/me – fetch authenticated user profile */
  me: () => request<AuthUser>("/auth/me"),

  /** POST /auth/forgot-password */
  forgotPassword: (email: string) =>
    request<{ message: string }>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),
};

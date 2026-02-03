const API_BASE_URL = "https://fourzeeproperties-backend.onrender.com";

export const api = {
  // ================= CLIENT =================
  clientSignup: async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    const res = await fetch(`${API_BASE_URL}/client/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  clientLogin: async (data: {
    email: string;
    password: string;
  }) => {
    const res = await fetch(`${API_BASE_URL}/client/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  // ================= REALTOR =================
  realtorSignup: async (data: {
    name: string;
    email: string;
    password: string;
    referralCode?: string; // Optional referral code
  }) => {
    const res = await fetch(`${API_BASE_URL}/realtor/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  realtorLogin: async (data: {
    email: string;
    password: string;
  }) => {
    const res = await fetch(`${API_BASE_URL}/realtor/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return res.json();
  },
};

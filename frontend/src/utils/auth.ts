import { apiFetch } from "./api";

const TOKEN_KEY = "birthday30_token";

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const verifySession = async () => {
  const token = getToken();

  if (!token) return false;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL || "http://localhost:3000/api"}/auth/me`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response.ok;
  } catch {
    return false;
  }
};

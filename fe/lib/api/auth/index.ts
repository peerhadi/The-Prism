import { fetcher } from "@/lib/api/fetcher";
import type { AuthResponse, AuthUser } from "./types";

const BASE_URL = "/api";

/**
 * REGISTER
 */
export async function registerUser(data: {
  email: string;
  password: string;
  username?: string;
}) {
  return fetcher<AuthResponse>(`${BASE_URL}/register`, {
    method: "POST",
    body: data,
  });
}

/**
 * LOGIN
 */
export async function loginUser(data: { email: string; password: string }) {
  return fetcher<AuthResponse>(`${BASE_URL}/login`, {
    method: "POST",
    body: data,
  });
}

/**
 * GET CURRENT USER
 */
export async function getMe(token?: string) {
  return fetcher<AuthUser>(`${BASE_URL}/me`, {
    method: "GET",
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });
}

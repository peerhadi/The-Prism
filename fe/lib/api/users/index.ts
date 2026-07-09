import { fetcher } from "@/lib/api/fetcher";
import type { User } from "./types";

const BASE_URL = "http://localhost:8080/api/users";

/**
 * GET all users
 */
export async function getUsers() {
  return fetcher<User[]>(BASE_URL);
}

/**
 * GET user by id
 */
export async function getUser(id: string) {
  return fetcher<User>(`${BASE_URL}/${id}`);
}

/**
 * CREATE user
 */
export async function createUser(data: Partial<User>) {
  return fetcher<User>(BASE_URL, {
    method: "POST",
    body: data,
  });
}

/**
 * UPDATE user
 */
export async function updateUser(id: string, data: Partial<User>) {
  return fetcher<User>(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: data,
  });
}

/**
 * DELETE user
 */
export async function deleteUser(id: string) {
  return fetcher<{ success: boolean }>(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
}

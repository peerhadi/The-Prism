import { fetcher } from "@/lib/api/fetcher";
import type { Category } from "./types";

const BASE_URL = "/api/categories";

/**
 * GET all categories
 */
export async function getCategories() {
  return fetcher<Category[]>(BASE_URL);
}

/**
 * GET single category
 */
export async function getCategory(id: string) {
  return fetcher<Category>(`${BASE_URL}/${id}`);
}

/**
 * CREATE category
 */
export async function createCategory(data: Partial<Category>) {
  return fetcher<Category>(BASE_URL, {
    method: "POST",
    body: data,
  });
}

/**
 * UPDATE category
 */
export async function updateCategory(id: string, data: Partial<Category>) {
  return fetcher<Category>(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: data,
  });
}

/**
 * DELETE category
 */
export async function deleteCategory(id: string) {
  return fetcher<{ success: boolean }>(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
}

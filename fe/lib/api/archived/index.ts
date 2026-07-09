import { fetcher } from "@/lib/api/fetcher";
import type { Archived } from "./types";

const BASE_URL = "http://localhost:8080/api/archived";

/**
 * GET all archived items
 */
export async function getArchived() {
  return fetcher<Archived[]>(BASE_URL);
}

/**
 * GET one archived item
 */
export async function getArchivedById(id: string) {
  return fetcher<Archived>(`${BASE_URL}/${id}`);
}

/**
 * CREATE archived entry
 */
export async function createArchived(data: Partial<Archived>) {
  return fetcher<Archived>(BASE_URL, {
    method: "POST",
    body: data,
  });
}

/**
 * UPDATE archived entry
 */
export async function updateArchived(id: string, data: Partial<Archived>) {
  return fetcher<Archived>(`${BASE_URL}/${id}`, {
    method: "PATCH",
    body: data,
  });
}

/**
 * DELETE archived entry
 */
export async function deleteArchived(id: string) {
  return fetcher<{ success: boolean }>(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
}

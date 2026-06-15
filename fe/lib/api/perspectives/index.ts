import { fetcher } from "@/lib/api/fetcher";
import type { Perspective } from "./types";

const BASE_URL = "/api/perspectives";

/**
 * GET all perspectives
 */
export async function getPerspectives() {
  return fetcher<Perspective[]>(BASE_URL);
}

/**
 * GET single perspective
 */
export async function getPerspective(id: string) {
  return fetcher<Perspective>(`${BASE_URL}/${id}`);
}

/**
 * CREATE perspective
 */
export async function createPerspective(data: Partial<Perspective>) {
  return fetcher<Perspective>(BASE_URL, {
    method: "POST",
    body: data,
  });
}

/**
 * UPDATE perspective
 */
export async function updatePerspective(
  id: string,
  data: Partial<Perspective>,
) {
  return fetcher<Perspective>(`${BASE_URL}/${id}`, {
    method: "PATCH",
    body: data,
  });
}

/**
 * DELETE perspective
 */
export async function deletePerspective(id: string) {
  return fetcher<{ success: boolean }>(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
}

/**
 * RSS SYNC (your custom endpoint)
 */
export async function syncPerspectivesRSS() {
  return fetcher<{ success: boolean }>("/api/perspectives/rss/sync", {
    method: "POST",
  });
}

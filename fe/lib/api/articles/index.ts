import { fetcher } from "@/lib/api/fetcher";
import type { Article } from "./types";

const BASE_URL = "http://localhost:8080/api/articles";

/**
 * GET all articles
 */
export async function getArticles() {
  return fetcher<Article[]>(BASE_URL);
}

/**
 * GET single article
 */
export async function getArticle(id: string) {
  return fetcher<Article>(`${BASE_URL}/${id}`);
}

/**
 * CREATE article
 */
export async function createArticle(data: Partial<Article>) {
  return fetcher<Article>(BASE_URL, {
    method: "POST",
    body: data,
  });
}

/**
 * UPDATE article
 */
export async function updateArticle(id: string, data: Partial<Article>) {
  return fetcher<Article>(`${BASE_URL}/${id}`, {
    method: "PATCH",
    body: data,
  });
}

/**
 * DELETE article
 */
export async function deleteArticle(id: string) {
  return fetcher<{ success: boolean }>(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
}

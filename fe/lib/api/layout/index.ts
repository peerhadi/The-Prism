import { fetcher } from "@/lib/api/fetcher";
import type { LayoutComponent, LayoutResponse } from "./types";

const BASE_URL = "/api/layout";

export async function getLayout(type: string) {
  return fetcher<LayoutResponse>(`${BASE_URL}/${type}`);
}

export async function saveLayout(type: string, components: LayoutComponent[]) {
  return fetcher<LayoutResponse>(`${BASE_URL}/${type}`, {
    method: "POST",
    body: { components },
  });
}

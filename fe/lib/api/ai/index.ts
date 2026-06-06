import { fetcher } from "@/lib/api/fetcher";
import type { AIChatRequest, AIChatResponse } from "./types";

const BASE_URL = "/api/ai";

/**
 * CHAT with AI
 */
export async function chatWithAI(data: AIChatRequest) {
  return fetcher<AIChatResponse>(`${BASE_URL}`, {
    method: "POST",
    body: data,
  });
}

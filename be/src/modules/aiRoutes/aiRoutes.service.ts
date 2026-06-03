import { SYSTEM_PROMPT } from "./systemPrompt.js";

export class AIService {
  async chat(data: any) {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        temperature: 0,
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: JSON.stringify(data),
          },
        ],
      }),
    });

    const json = await res.json();

    return json?.choices?.[0]?.message?.content ?? "";
  }
}

import { SYSTEM_PROMPT } from "./systemPrompt.js";

export class AIService {
  async chat(data: any) {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: [
            {
              role: "user",
              parts: [{ text: JSON.stringify(data) }],
            },
          ],
          generationConfig: {
            temperature: 0,
            maxOutputTokens: 16384,
          },
        }),
      },
    );

    const json = await res.json();
    console.log(json);

    return json?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  }
}

import { jsonrepair } from "jsonrepair";

const PERSPECTIVE_PROMPT = `
You are a news analyst.

For every article produce:

[
  {
    "title": ""
    "imageUrl": "",
    "neutral": {
      "title": "",
      "summary"": "",
      "description": "",
    },
    "extreme": {
      "title": "",
      "summary": "",
      "description": "",
    },
  }
]

Rules:
- DO NOT KEEP ANY FIELD EMPTY
- USE IMAGE URL EXTRACT FROM RSS FEED
- facts must remain identical
- no new information
- JSON only
`;

function safeParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    try {
      return JSON.parse(jsonrepair(text));
    } catch {
      return null;
    }
  }
}

async function callGroq(prompt: string, data: any) {
  console.log(prompt, data);
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
          content: prompt,
        },
        {
          role: "user",
          content: JSON.stringify(data),
        },
      ],
    }),
  });

  const json = await res.json();
  console.log(json);

  return json?.choices[0]?.message?.content || "";
}

export async function generatePerspectives(articles: any[]) {
  const raw = await callGroq(PERSPECTIVE_PROMPT, articles);
  console.log(raw);

  return safeParse(raw) || [];
}

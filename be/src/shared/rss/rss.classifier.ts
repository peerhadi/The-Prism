import { jsonrepair } from "jsonrepair";

const CLASSIFY_PROMPT = `
You are an expert news editor.

You will receive articles.

Select EXACTLY:

- major_stories (2)
- majorish_stories (6)
- good_headlines (4)
- minor_interesting (2)
- trending (8)
- eye_catching (5)
- controversial (1)

For every selected article return:

{
  "title": "",
  "description": "",
  "summary": "",
  "biasLevel": 0,
  "imageUrl": null,
  "sources": [],
  "type": SHORT/HERO/SMALL/LIST depending on the importance.
}
ALL FIELDS ARE MANDATORY LEAVE THEM EMPTY IF NOT POSSIBLE TO FILL. MANDATORY TO MENTION. ALL FIELDS: title, description, summary, biasLevel, imageUrl, sources, type ALL MANDATORY DO NOT MISS ONE, CREATE IT IF NECESSARY, BUT SET IT TO A VALID VALUE
Return STRICT JSON ONLY:

{
  "major_stories": [],
  "majorish_stories": [],
  "good_headlines": [],
  "minor_interesting": [],
  "trending": [],
  "eye_catching": [],
  "controversial": []
}

Rules:
- Preserve title exactly.
- I NEED 2 HERO CARDS, 10 SMALL CARDS, 12 LIST CARDS, 4 SHORT CARDS EXACTLY.
- 28 TOTAL STORIES MINIMUM
- IMAGE URLS can NOT be null, you need to set it to some value, repeat links if necessary
- DO NOT EVER EVER GIVE ME AN EXPLANATION. NO text before or after JSON.
- Preserve description exactly.
- summary should be a short neutral summary.
- biasLevel must be a number between 0 and 1.
- sources must contain the original source information.
- type must match the section the article belongs to.
- Return JSON only.
- DO NOT put any article without an IMAGE URL, if there isn't one present, do not use that article
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
  return json?.choices[0]?.message?.content || "";
}

export async function classifyArticles(items: any[]) {
  const raw = await callGroq(CLASSIFY_PROMPT, items);
  console.log(raw);
  const parsed = safeParse(raw);

  if (!parsed) {
    console.log("Classification Error: ", raw);
  }

  return parsed;
}

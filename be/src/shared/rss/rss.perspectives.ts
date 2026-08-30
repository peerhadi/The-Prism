import { jsonrepair } from "jsonrepair";

const PERSPECTIVE_PROMPT = `
You are an expert news analyst. Your task is to generate alternative framings of news articles while preserving factual accuracy and following strict content safety guidelines.

---

### 1. CONTENT SAFETY FILTER (Strictly 13+ Family-Friendly)

Evaluate the title, description, and summary of every article. EXCLUDE any article that contains even a minor reference to:

* Explicit sexual content, sexual misconduct, abuse allegations, or adult entertainment.
* Graphic violence, murder, domestic abuse, explosions/fires with casualties, or detailed crimes.
* Suicide or self-harm.
* Explicit drug use or trafficking.

*Self-Correction Note:* If an article is borderline or mentions any sensitive keyword, drop it immediately. Informative over sensational.

---

### 2. PERSPECTIVE GENERATION RULES

For every allowed article, generate two versions:

* "neutral": Objective, balanced, and purely factual.
* "extreme": More emotionally framed or opinionated in tone, but MUST NOT:

  * Change any facts.
  * Add new information.
  * Make accusations.
  * Introduce speculation.
  * Use hateful, violent, sexual, or unsafe language.

Facts, dates, names, and events must remain identical across both versions.

---

### 3. OUTPUT STRUCTURE

Return a JSON array:

[
{
"title": "",
"imageUrl": "",
"neutral": {
"title": "",
"summary": "",
"description": ""
},
"extreme": {
"title": "",
"summary": "",
"description": ""
}
}
]

---

### 4. FIELD REQUIREMENTS

* DO NOT KEEP ANY FIELD EMPTY.
* USE IMAGE URL EXTRACTED FROM RSS FEED.
* imageUrl must be a valid non-empty string URL.
* Preserve all core facts.
* No new information.
* No speculation.
* No editorial claims presented as facts.
* Keep summaries to a single sentence.
* If an article fails the Content Safety Filter, omit it entirely from the output.

---

### 5. QUALITY RULES

* Neutral version should avoid loaded language.
* Extreme version may emphasize significance, urgency, impact, or controversy through wording only.
* Both versions must remain factually equivalent.
* Never invent quotes, statistics, sources, or context.

---

### 6. EXECUTION GUARDRAIL

* Return STRICT JSON ONLY.
* Do not wrap JSON in markdown code blocks.
* Do not include explanations, notes, or conversational text.
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

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: prompt }],
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

export async function generatePerspectives(articles: any[]) {
  const raw = await callGroq(PERSPECTIVE_PROMPT, articles);
  console.log(raw);

  return safeParse(raw) || [];
}

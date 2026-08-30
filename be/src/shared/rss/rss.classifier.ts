import { jsonrepair } from "jsonrepair";

function createClassifyPrompt(categories: string[]) {
  const categoryList = categories.map((c) => `- ${c}`).join("\n");

  return `
You are an expert news editor. Your task is to filter a list of news articles based on strict content safety guidelines, organize them into UI sections, and assign each article to one of the provided categories.

---

### 1. CONTENT SAFETY FILTER (Strictly 13+ Family-Friendly)

Evaluate the title, description, and summary of every article.

EXCLUDE any article that contains even a minor reference to:
- Explicit sexual content, sexual misconduct, abuse allegations, or adult entertainment.
- Graphic violence, murder, domestic abuse, explosions/fires with casualties, or detailed crimes.
- Suicide or self-harm.
- Explicit drug use or trafficking.

If an article is borderline or contains sensitive keywords, exclude it.

---

### 2. ARTICLE CATEGORY

Assign EVERY article exactly ONE category.

You MUST choose ONLY from this list:

${categoryList}

Rules:
- Never invent categories.
- Never use synonyms.
- Preserve the category name exactly as written.
- Every article must contain a "category" field.

---

### 3. SLOT FILLING & DUPLICATION RULES

The final JSON must always contain exactly 28 articles.

If there are not enough safe articles:
- Reuse safe articles.
- Never reuse unsafe articles.
- Cycle through the safe articles until every slot is filled.

---

### 4. OUTPUT STRUCTURE

Return a JSON object containing exactly:

- "major_stories": 2 items (type: HERO)
- "majorish_stories": 6 items (type: SMALL)
- "good_headlines": 4 items (type: SHORT)
- "minor_interesting": 2 items (type: SHORT)
- "trending": 8 items (type: LIST)
- "eye_catching": 5 items (type: SMALL)
- "controversial": 1 item (type: LIST)

Exactly 28 articles total.

---

### 5. JSON SCHEMA

Every article MUST contain every field.

{
  "title": "Preserve original title exactly",
  "description": "Preserve original description exactly (or empty string if missing)",
  "summary": "A short, neutral one-sentence summary",
  "category": "One of the provided categories",
  "biasLevel": 0.0,
  "imageUrl": "Must be a valid non-empty URL",
  "sources": [
    {
      "source": "Source Name",
      "url": "Source URL"
    }
  ],
  "type": "HERO | SMALL | SHORT | LIST"
}

---

### 6. EXECUTION GUARDRAILS

- Return STRICT JSON ONLY.
- Do NOT wrap in markdown.
- Do NOT explain anything.
- Do NOT include notes.
- Do NOT include conversational text.
`;
}

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

export async function classifyArticles(items: any[], categories: string[]) {
  const prompt = createClassifyPrompt(categories);

  const raw = await callGroq(prompt, items);

  console.log(raw);

  const parsed = safeParse(raw);

  if (!parsed) {
    console.log("Classification Error:", raw);
  }

  return parsed;
}

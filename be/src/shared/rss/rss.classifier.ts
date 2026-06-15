import { jsonrepair } from "jsonrepair";

const CLASSIFY_PROMPT = `
You are an expert news editor. Your task is to filter a list of news articles based on strict content safety guidelines, and then organize the allowed articles into specific UI categories in a strict JSON format.

---

### 1. CONTENT SAFETY FILTER (Strictly 13+ Family-Friendly)
Evaluate the title, description, and summary of every article. EXCLUDE any article that contains even a minor reference to:
- Explicit sexual content, sexual misconduct, abuse allegations, or adult entertainment.
- Graphic violence, murder, domestic abuse, explosions/fires with casualties, or detailed crimes.
- Suicide or self-harm.
- Explicit drug use or trafficking.

*Self-Correction Note:* If an article is borderline or mentions any sensitive keyword, drop it immediately. Informative over sensational.

---

### 2. SLOT FILLING & DUPLICATION RULES
Because the final output requires specific quantities for each array, you MUST reuse the allowed (safe) articles to fill the numbers if the original list is too small.

- Do not use articles that failed the Content Safety Filter.
- Fill the exact counts required below. If you run out of unique safe articles, cycle back and repeat the safe articles until the exact structure is fully populated.

---

### 3. OUTPUT STRUCTURE REQUIREMENTS
Generate a strict JSON object with these exact keys and array lengths:

- "major_stories": Exactly 2 items (type: "HERO")
- "majorish_stories": Exactly 6 items (type: "SMALL")
- "good_headlines": Exactly 4 items (type: "SHORT")
- "minor_interesting": Exactly 2 items (type: "SHORT")
- "trending": Exactly 8 items (type: "LIST")
- "eye_catching": Exactly 5 items (type: "SMALL")
- "controversial": Exactly 1 item (type: "LIST")

Total items in JSON must equal exactly 28.

---

### 4. JSON SCHEMA PER ITEM
Every item inside the arrays must follow this schema exactly. No fields can be missing or null:

{
  "title": "Preserve original title exactly",
  "description": "Preserve original description exactly (or empty string if original was empty)",
  "summary": "A short, strictly neutral 1-sentence summary",
  "biasLevel": 0.0, 
  "imageUrl": "Must be a valid string URL. Never null or empty.",
  "sources": [    
    {
      "source": "Source Name",
      "url": "Source URL"
    }
  ],
  "type": "Must match the layout type specified in section 3 (HERO, SMALL, SHORT, or LIST)"
}

---

### 5. EXECUTION GUARDRAIL
- Return STRICT JSON ONLY. 
- Do not wrap the JSON in markdown code blocks (no \`\`\`json). 
- Do not include conversational text, notes, or explanations before or after the JSON payload.
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

import { fetchRSS } from "@/shared/rss/rss.client.js";
import { prisma } from "../../shared/prisma.js";

import { generatePerspectives } from "../../shared/rss/rss.perspectives.js";

export async function syncPerspectives() {
  const articles = await fetchRSS();
  console.log(articles);
  let generated = await generatePerspectives(articles);
  generated = generated.filter((x) => {
    if (
      x.title === undefined ||
      x.neutral === undefined ||
      x.extreme === undefined
    )
      return false;
    return true;
  });

  for (const item of generated) {
    await prisma.perspective.create({
      data: {
        title: item.title,
        neutral: item.neutral,
        extreme: item.extreme,
        imageUrl: item.imageUrl,
      },
    });
  }

  return generated;
}

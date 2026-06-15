import { prisma } from "../../shared/prisma.js";

import { fetchRSS } from "../../shared/rss/rss.client.js";
import { classifyArticles } from "../../shared/rss/rss.classifier.js";

export async function syncArticles() {
  const rssItems = await fetchRSS();

  const groups = await classifyArticles(rssItems);

  for (let articles of Object.values(groups)) {
    console.log("THE ARTICLES", groups, articles);
    articles = articles.filter((x) => {
      if (
        x.title === undefined ||
        x.description === undefined ||
        x.summary === undefined ||
        x.biasLevel === undefined ||
        x.imageUrl === undefined ||
        x.sources === undefined ||
        x.type === undefined
      ) {
        return false;
      }

      return true;
    });
    for (const article of articles as any[]) {
      console.log(article);
      await prisma.article.create({
        data: {
          title: article.title,
          description: article.description || "",
          summary: article.summary,
          biasLevel: article.biasLevel,
          imageUrl: article.imageUrl,
          sources: article.sources || [],
          type: article.type || "SMALL",
        },
      });
    }
  }

  return "Successful";
}

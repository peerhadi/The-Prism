import { prisma } from "../../shared/prisma.js";

import { fetchRSS } from "../../shared/rss/rss.client.js";
import { classifyArticles } from "../../shared/rss/rss.classifier.js";

export async function syncArticles() {
  const rssItems = await fetchRSS();

  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const groups = await classifyArticles(
    rssItems,
    categories.map((c) => c.name),
  );

  const categoryMap = new Map(
    categories.map((c) => [c.name.toLowerCase(), c.id]),
  );

  for (let articles of Object.values(groups) as any[]) {
    articles = articles.filter((x: any) => {
      return (
        x.title !== undefined &&
        x.description !== undefined &&
        x.summary !== undefined &&
        x.biasLevel !== undefined &&
        x.imageUrl !== undefined &&
        x.sources !== undefined &&
        x.type !== undefined &&
        x.category !== undefined
      );
    });

    for (const article of articles) {
      const categoryId = categoryMap.get(article.category.toLowerCase());

      await prisma.article.create({
        data: {
          title: article.title,
          description: article.description || "",
          summary: article.summary,
          biasLevel: article.biasLevel,
          imageUrl: article.imageUrl,
          sources: article.sources || [],
          type: article.type,
          categoryId: categoryId ?? null,
        },
      });
    }
  }

  return "Successful";
}

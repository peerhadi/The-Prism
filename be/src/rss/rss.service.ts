
import Parser from "rss-parser"

import { prisma } from "../shared/prisma.js"
import { RSS_FEEDS } from "./feeds.js"

const parser = new Parser()

export async function syncFeeds() {
  for (const url of RSS_FEEDS) {
    try {
      const feed = await parser.parseURL(url)

      for (const item of feed.items) {
        if (!item.title) continue

        const exists = await prisma.article.findFirst({
          where: {
            title: item.title
          }
        })

        if (exists) continue

        await prisma.article.create({
          data: {
            title: item.title,
            description: item.contentSnippet || "",
            summary: item.contentSnippet || "",
            biasLevel: 0,
            imageUrl: "",
            sources: {
              source: feed.title,
              url
            },
            type: "SHORT"
          }
        })
      }
    } catch {}
  }
}

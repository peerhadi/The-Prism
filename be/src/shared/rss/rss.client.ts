import Parser from "rss-parser";
import { RSS_FEEDS } from "./rss.config.js";
import * as cheerio from "cheerio";
function extractImage(html) {
  if (!html) return null;

  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);

  return match?.[1] || null;
}
async function getOgImage(url) {
  try {
    const html = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    }).then((r) => r.text());

    const $ = cheerio.load(html);

    return (
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content") ||
      null
    );
  } catch {
    return null;
  }
}
const parser = new Parser();

export async function fetchRSS() {
  const items: any[] = [];

  for (const url of RSS_FEEDS) {
    try {
      const feed = await parser.parseURL(url);

      const top = (feed.items || []).slice(0, 5);
      for (const article of top) {
        article.image =
          article.enclosure?.url ||
          extractImage(article.content) ||
          extractImage(article.description) ||
          null;
      }
      const missing = top.filter((a) => !a.image);

      for (const article of missing) {
        article.image = await getOgImage(article.link);
      }
      console.log(top);
      for (const item of top) {
        if (!item.title) continue;

        // Push to your array
        items.push({
          title: item.title,
          description: item.contentSnippet || "",
          link: item.link,
          source: url,
          imageUrl: item.image,
        });
      }
    } catch (err) {
      console.error("RSS failed:", url);
    }
  }
  console.log(items);

  return items.map((item, index) => ({
    id: index,
    ...item,
  }));
}

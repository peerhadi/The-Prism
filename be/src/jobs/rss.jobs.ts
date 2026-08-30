import cron from "node-cron";

import { syncArticles } from "../modules/articles/article.rss.js";
import { syncPerspectives } from "../modules/perspectives/perspective.rss.js";

export function startRSSJob() {
  cron.schedule("*/60 * * * *", async () => {
    const articles = await syncArticles();

    const perspectives = await syncPerspectives();
  });
}

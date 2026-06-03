import cron from "node-cron";

import { syncArticles } from "../modules/articles/article.rss.js";
import { syncPerspectives } from "../modules/perspectives/perspective.rss.js";

export function startRSSJob() {
  cron.schedule("*/60 * * * *", async () => {
    console.log("Running RSS job");

    const articles = await syncArticles();

    console.log("articles:", articles.length);

    const perspectives = await syncPerspectives();

    console.log("perspectives:", perspectives.length);
  });
}

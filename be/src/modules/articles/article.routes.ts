import { FastifyInstance } from "fastify";

import { ArticleController } from "./article.controller.js";
import { syncArticles } from "./article.rss.js";

const controller = new ArticleController();

export async function articleRoutes(app: FastifyInstance) {
  app.get("/", controller.findAll);

  app.get("/:id", controller.findOne);

  app.post("/", controller.create);

  app.patch("/:id", controller.update);

  app.delete("/:id", controller.delete);
  app.post("/rss/sync", async (_, reply) => {
    const data = await syncArticles();

    return reply.send({
      count: data.length,
      articles: data,
    });
  });
}

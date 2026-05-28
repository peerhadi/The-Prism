import { FastifyInstance } from "fastify";

import { ArticleController } from "./article.controller.js";

const controller = new ArticleController();

export async function articleRoutes(app: FastifyInstance) {
  app.get("/", controller.findAll);

  app.get("/:id", controller.findOne);

  app.post("/", controller.create);

  app.patch("/:id", controller.update);

  app.delete("/:id", controller.delete);
}

import { FastifyInstance } from "fastify";

import { CategoryController } from "./category.controller.js";

const controller = new CategoryController();

export async function categoryRoutes(app: FastifyInstance) {
  app.get("/", controller.findAll);

  app.get("/:id", controller.findOne);

  app.post("/", controller.create);

  app.patch("/:id", controller.update);

  app.delete("/:id", controller.delete);
}

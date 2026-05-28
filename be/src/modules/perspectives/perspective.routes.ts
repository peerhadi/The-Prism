import { FastifyInstance } from "fastify";

import { PerspectiveController } from "./perspective.controller.js";

const controller = new PerspectiveController();

export async function perspectiveRoutes(app: FastifyInstance) {
  app.get("/", controller.findAll);

  app.get("/:id", controller.findOne);

  app.post("/", controller.create);

  app.patch("/:id", controller.update);

  app.delete("/:id", controller.delete);
}

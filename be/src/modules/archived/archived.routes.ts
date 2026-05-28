import { FastifyInstance } from "fastify";

import { ArchivedController } from "./archived.controller.js";

const controller = new ArchivedController();

export async function archivedRoutes(app: FastifyInstance) {
  app.get("/", controller.findAll);

  app.get("/:id", controller.findOne);

  app.post("/", controller.create);

  app.patch("/:id", controller.update);

  app.delete("/:id", controller.delete);
}

import { FastifyInstance } from "fastify";

import { PerspectiveController } from "./perspective.controller.js";
import { syncPerspectives } from "./perspective.rss.js";

const controller = new PerspectiveController();

export async function perspectiveRoutes(app: FastifyInstance) {
  app.get("/", controller.findAll);

  app.get("/:id", controller.findOne);

  app.post("/", controller.create);

  app.patch("/:id", controller.update);

  app.delete("/:id", controller.delete);
  app.get("/rss/sync", async (_, reply) => {
    await syncPerspectives();

    return reply.code(200).send({ success: true });
  });
}

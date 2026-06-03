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
  app.post("/rss/sync", async (_, reply) => {
    const data = await syncPerspectives();

    return reply.send({
      count: data.length,
      data,
    });
  });
}

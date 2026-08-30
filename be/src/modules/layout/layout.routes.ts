import { FastifyInstance } from "fastify";

import layoutController from "./layout.controller";

export default async function layoutRoutes(app: FastifyInstance) {
  app.get("/:type", async (request, reply) => {
    const params = request.params as {
      type: string;
    };

    const layout = await layoutController.get(params.type);

    return reply.send(layout);
  });

  app.post("/:type", async (request, reply) => {
    const params = request.params as {
      type: string;
    };

    const body = request.body as {
      components: any[];
    };
    const layout = await layoutController.save(params.type, body.components);

    return reply.send(layout);
  });
}

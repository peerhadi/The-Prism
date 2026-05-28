import { FastifyInstance } from "fastify";

import { prisma } from "../../shared/prisma.js";

export async function userRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    return prisma.user.findMany();
  });

  app.get("/:id", async (request) => {
    const params = request.params as {
      id: string;
    };

    return prisma.user.findUnique({
      where: {
        id: params.id,
      },
    });
  });

  app.post("/", async (request) => {
    const body = request.body as any;

    return prisma.user.create({
      data: body,
    });
  });

  app.patch("/:id", async (request) => {
    const params = request.params as {
      id: string;
    };

    const body = request.body as any;

    return prisma.user.update({
      where: {
        id: params.id,
      },
      data: body,
    });
  });

  app.delete("/:id", async (request) => {
    const params = request.params as {
      id: string;
    };

    return prisma.user.delete({
      where: {
        id: params.id,
      },
    });
  });
}

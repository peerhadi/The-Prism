import { FastifyInstance } from "fastify";
import bcrypt from "bcryptjs";
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
  app.put("/:id/change-password", async (request, reply) => {
    const params = request.params as {
      id: string;
    };
    const body = request.body as {
      currentPassword: string;
      newPassword: string;
    };

    console.log(request.body, body);
    const user = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!user) {
      return reply.code(404).send({
        error: "User not found",
      });
    }

    const validPassword = await bcrypt.compare(
      body.currentPassword,
      user.password,
    );

    if (!validPassword) {
      return reply.code(400).send({
        error: "Incorrect password",
      });
    }

    const hashedPassword = await bcrypt.hash(body.newPassword, 10);

    await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return {
      success: true,
    };
  });
  app.post("/", async (request) => {
    const body = request.body as any;

    return prisma.user.create({
      data: body,
    });
  });

  app.put("/:id", async (request) => {
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

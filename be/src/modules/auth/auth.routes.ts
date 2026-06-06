import { FastifyInstance } from "fastify";
import bcrypt from "bcryptjs";
import { githubAuth } from "./auth.controller.js";
import { prisma } from "../../shared/prisma.js";
import { githubAuth } from "./auth.controller.js";

export async function authRoutes(app: FastifyInstance) {
  app.post("/register", async (request, reply) => {
    const body = request.body as {
      email: string;
      password: string;
      username?: string;
    };

    const hashed = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        username: body.username ?? "",
        password: hashed,
        role: "USER",
      },
    });

    const token = await reply.jwtSign({
      sub: user.id,
    });

    const { password, ...safeUser } = user;

    return {
      user: safeUser,
      token,
    };
  });

  app.post("/login", async (request, reply) => {
    const body = request.body as {
      email: string;
      password: string;
    };

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      return reply.unauthorized();
    }

    const valid = await bcrypt.compare(body.password, user.password);

    if (!valid) {
      return reply.unauthorized();
    }

    const token = await reply.jwtSign({
      sub: user.id,
    });

    const { password, ...safeUser } = user;

    return {
      user: safeUser,
      token,
    };
  });
  app.get(
    "/me",
    {
      preHandler: [app.authenticate],
    },
    async (request) => {
      const userId = (request.user as { sub: string }).sub;

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw app.httpErrors.notFound();
      }

      const { password, ...safeUser } = user;

      return safeUser;
    },
  );
  app.post("/github", githubAuth);
}

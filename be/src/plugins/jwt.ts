import { FastifyInstance } from "fastify";
import jwt from "@fastify/jwt";

import { env } from "../shared/env.js";

export async function registerJwt(app: FastifyInstance) {
  await app.register(jwt, {
    secret: env.JWT_SECRET,
  });

  app.decorate("authenticate", async function (request: any, reply: any) {
    await request.jwtVerify();
  });
}

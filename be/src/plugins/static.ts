import fastifyStatic from "@fastify/static";
import path from "path";

import { FastifyInstance } from "fastify";

export async function registerStatic(app: FastifyInstance) {
  await app.register(fastifyStatic, {
    root: path.join(process.cwd(), "uploads"),
    prefix: "/uploads/",
  });
}

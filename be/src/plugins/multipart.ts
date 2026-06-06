import multipart from "@fastify/multipart";
import { FastifyInstance } from "fastify";

export async function registerMultipart(app: FastifyInstance) {
  await app.register(multipart);
}

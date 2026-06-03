import { FastifyInstance } from "fastify";

import { AIController } from "./aiRoutes.controller.js";

const controller = new AIController();

export async function aiRoutes(app: FastifyInstance) {
  app.post("/", controller.chat);
}

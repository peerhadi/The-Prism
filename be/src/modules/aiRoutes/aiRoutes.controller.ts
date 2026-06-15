import { FastifyReply, FastifyRequest } from "fastify";

import { AIService } from "./aiRoutes.service.js";

const service = new AIService();

export class AIController {
  async chat(request: FastifyRequest, reply: FastifyReply) {
    const data = await service.chat(request.body);

    return reply.send({
      response: data,
    });
  }
}

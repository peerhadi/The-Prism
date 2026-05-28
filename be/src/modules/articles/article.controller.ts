import { FastifyReply, FastifyRequest } from "fastify";

import { ArticleService } from "./article.service.js";

const service = new ArticleService();

export class ArticleController {
  async findAll(_: FastifyRequest, reply: FastifyReply) {
    const data = await service.findAll();

    return reply.send(data);
  }

  async findOne(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as {
      id: string;
    };

    const data = await service.findOne(params.id);

    return reply.send(data);
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as any;

    const data = await service.create(body);

    return reply.send(data);
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as {
      id: string;
    };

    const body = request.body as any;

    const data = await service.update(params.id, body);

    return reply.send(data);
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as {
      id: string;
    };

    const data = await service.delete(params.id);

    return reply.send(data);
  }
}

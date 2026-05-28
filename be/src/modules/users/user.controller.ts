
import { FastifyReply, FastifyRequest } from "fastify"

import { UserService } from "./user.service.js"

const service = new UserService()

export class UserController {
  async findAll(_: FastifyRequest, reply: FastifyReply) {
    const data = await service.findAll()

    return reply.send(data)
  }
}

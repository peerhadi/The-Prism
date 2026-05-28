
import { FastifyReply, FastifyRequest } from "fastify"

export async function authGuard(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await request.jwtVerify()
}

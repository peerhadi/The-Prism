
import { FastifyInstance } from "fastify"
import bcrypt from "bcryptjs"

import { prisma } from "../../shared/prisma.js"

export async function authRoutes(app: FastifyInstance) {
  app.post("/register", async (request, reply) => {
    const body = request.body as any

    const hashed = await bcrypt.hash(body.password, 10)

    const user = await prisma.user.create({
      data: {
        ...body,
        password: hashed
      }
    })

    const token = await reply.jwtSign({
      sub: user.id
    })

    return {
      user,
      token
    }
  })

  app.post("/login", async (request, reply) => {
    const body = request.body as any

    const user = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    })

    if (!user) {
      return reply.unauthorized()
    }

    const valid = await bcrypt.compare(body.password, user.password)

    if (!valid) {
      return reply.unauthorized()
    }

    const token = await reply.jwtSign({
      sub: user.id
    })

    return {
      user,
      token
    }
  })
}

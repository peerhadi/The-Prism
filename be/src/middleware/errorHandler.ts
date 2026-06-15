import { FastifyInstance } from "fastify";

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((err, req, reply) => {
    req.log.error(err);

    reply.code(500).send({
      error: "Internal Server Error",
      message: err.message,
    });
  });
}

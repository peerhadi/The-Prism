import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

import { FastifyInstance } from "fastify";

export async function uploadRoutes(app: FastifyInstance) {
  app.post("/", async (request, reply) => {
    const file = await request.file();

    if (!file) {
      return reply.code(400).send({
        error: "No file uploaded",
      });
    }

    const ext = path.extname(file.filename) || ".jpg";
    const filename = crypto.randomUUID() + ext;

    const uploadDir = path.join(process.cwd(), "uploads");

    await fs.mkdir(uploadDir, {
      recursive: true,
    });

    const filepath = path.join(uploadDir, filename);

    await fs.writeFile(filepath, await file.toBuffer());

    return {
      imageUrl: `http://localhost:8080/uploads/${filename}`,
    };
  });
}

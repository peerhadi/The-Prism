import { prisma } from "../shared/prisma.js";

export async function methodGuard(request: any, reply: any) {
  if (request.method === "GET") {
    return;
  }

  await request.jwtVerify();

  const userId = request.user?.sub;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return reply.code(401).send({
      error: "Unauthorized",
    });
  }

  const isUserUpdate =
    request.url.split("/").includes("users") &&
    (request.method === "PUT" || request.method === "DELETE");

  if (isUserUpdate) {
    const targetId = request.params?.id;

    if (targetId === userId) {
      return;
    }
  }

  if (user.role !== "ADMIN") {
    return reply.code(403).send({
      error: "Admin only",
    });
  }
}

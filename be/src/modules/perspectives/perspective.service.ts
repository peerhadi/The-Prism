import { prisma } from "../../shared/prisma.js";

export class PerspectiveService {
  async findAll() {
    return prisma.perspective.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findOne(id: string) {
    return prisma.perspective.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: any) {
    return prisma.perspective.create({
      data,
    });
  }

  async update(id: string, data: any) {
    return prisma.perspective.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.perspective.delete({
      where: {
        id,
      },
    });
  }
}

import { prisma } from "../../shared/prisma.js";

export class ArchivedService {
  async findAll() {
    return prisma.archived.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findOne(id: string) {
    return prisma.archived.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: any) {
    return prisma.archived.create({
      data,
    });
  }

  async update(id: string, data: any) {
    return prisma.archived.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.archived.delete({
      where: {
        id,
      },
    });
  }
}

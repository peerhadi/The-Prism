import { prisma } from "../../shared/prisma.js";

export class CategoryService {
  async findAll() {
    return prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findOne(id: string) {
    return prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: any) {
    return prisma.category.create({
      data,
    });
  }

  async update(id: string, data: any) {
    return prisma.category.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.category.delete({
      where: {
        id,
      },
    });
  }
}

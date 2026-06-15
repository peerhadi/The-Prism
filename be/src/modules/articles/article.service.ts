import { prisma } from "../../shared/prisma.js";

export class ArticleService {
  async findAll() {
    return prisma.article.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findOne(id: string) {
    return prisma.article.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: any) {
    return prisma.article.create({
      data,
    });
  }

  async update(id: string, data: any) {
    return prisma.article.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.article.delete({
      where: {
        id,
      },
    });
  }
}

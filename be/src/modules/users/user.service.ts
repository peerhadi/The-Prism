
import { prisma } from "../../shared/prisma.js"

export class UserService {
  async findAll() {
    return prisma.user.findMany()
  }
}

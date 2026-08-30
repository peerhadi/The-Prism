// src/shared/seedAdmin.ts

import { prisma } from "@/shared/prisma.js";
import bcrypt from "bcryptjs";

export async function seedAdmin() {
  const existingAdmin = await prisma.user.findFirst({
    where: {
      role: "ADMIN",
    },
  });

  if (existingAdmin) return;

  const hashed = await bcrypt.hash("prismadmin", 10);

  await prisma.user.create({
    data: {
      username: "prismadmin",
      email: "admin@prism.com",
      password: hashed,
      role: "ADMIN",
    },
  });
}

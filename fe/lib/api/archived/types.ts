export type Archived = {
  id: string;
  articles: Record<string, unknown>; // Prisma Json
  createdAt: string;
};

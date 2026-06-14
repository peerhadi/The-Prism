export type Perspective = {
  id: string;
  title: string;
  neutral: Record<string, unknown>; // Prisma Json
  extreme: Record<string, unknown>; // Prisma Json
  imageUrl?: string | null;
  createdAt: string;
};

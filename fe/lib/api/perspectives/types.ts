export type Perspective = {
  id: string;
  title: string;
  neutral: any; // Prisma Json
  extreme: any; // Prisma Json
  imageUrl?: string | null;
  createdAt: string;
};

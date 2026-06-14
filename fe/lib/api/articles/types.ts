export enum ArticleType {
  SHORT = "SHORT",
  HERO = "HERO",
  SMALL = "SMALL",
  LIST = "LIST",
}

export type Article = {
  id: string;
  categoryId?: string | null;
  title: string;
  description: string;
  summary: string;
  biasLevel: number;
  imageUrl?: string | null;
  sources: string[]; // Prisma Json
  type: ArticleType;
  createdAt: string;
};

export type Role = "ADMIN" | "USER";

export type User = {
  id: string;
  username: string;
  email: string;
  sources: string[];
  profileImageUrl?: string | null;
  bio?: string | null;
  bannerUrl?: string | null;
  createdAt: string;
  role: Role;
};

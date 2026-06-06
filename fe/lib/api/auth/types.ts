import type { Role } from "../users/types";

export type AuthUser = {
  id: string;
  email: string;
  username: string;
  sources: string[];
  profileImageUrl?: string | null;
  bio?: string | null;
  bannerUrl?: string | null;
  createdAt: string;
  role: Role;
};

export type AuthResponse = {
  user: AuthUser;
  token: string;
};

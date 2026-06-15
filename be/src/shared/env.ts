import "dotenv/config";
import { z } from "zod";

export const env = z
  .object({
    PORT: z.coerce.number(),
    DATABASE_URL: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    GITHUB_CLIENT_ID: z.string(),
    REDIS_URL: z.string(),
    JWT_SECRET: z.string(),
  })
  .parse(process.env);

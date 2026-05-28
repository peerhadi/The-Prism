
import "dotenv/config"
import { z } from "zod"

export const env = z.object({
  PORT: z.coerce.number(),
  DATABASE_URL: z.string(),
  REDIS_URL: z.string(),
  JWT_SECRET: z.string()
}).parse(process.env)

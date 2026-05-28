
import { redis } from "../shared/redis.js"

export async function cache<T>(
  key: string,
  fn: () => Promise<T>,
  ttl = 60
) {
  const cached = await redis.get(key)

  if (cached) {
    return JSON.parse(cached)
  }

  const data = await fn()

  await redis.set(key, JSON.stringify(data), "EX", ttl)

  return data
}

import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import sensible from "@fastify/sensible";

import { env } from "./shared/env.js";

import { authRoutes } from "./modules/auth/auth.routes.js";
import { userRoutes } from "./modules/users/user.routes.js";
import { articleRoutes } from "./modules/articles/article.routes.js";
import { perspectiveRoutes } from "./modules/perspectives/perspective.routes.js";
import { categoryRoutes } from "./modules/categories/category.routes.js";
import { archivedRoutes } from "./modules/archived/archived.routes.js";

const app = Fastify();

await app.register(cors, {
  origin: true,
});

await app.register(jwt, {
  secret: env.JWT_SECRET,
});

await app.register(sensible);

await app.register(authRoutes, {
  prefix: "/api/auth",
});

await app.register(userRoutes, {
  prefix: "/api/users",
});

await app.register(articleRoutes, {
  prefix: "/api/articles",
});

await app.register(perspectiveRoutes, {
  prefix: "/api/perspectives",
});

await app.register(categoryRoutes, {
  prefix: "/api/categories",
});

await app.register(archivedRoutes, {
  prefix: "/api/archived",
});

await app.listen({
  port: env.PORT,
  host: "0.0.0.0",
});

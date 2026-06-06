import Fastify from "fastify";

import { registerCors } from "./plugins/cors.js";
import { registerJwt } from "./plugins/jwt.js";
import { registerMultipart } from "./plugins/multipart.js";
import { registerStatic } from "./plugins/static.js";

import { registerErrorHandler } from "./middleware/errorHandler.js";

import { authRoutes } from "./modules/auth/auth.routes.js";
import { userRoutes } from "./modules/users/user.routes.js";
import { articleRoutes } from "./modules/articles/article.routes.js";
import { perspectiveRoutes } from "./modules/perspectives/perspective.routes.js";
import { categoryRoutes } from "./modules/categories/category.routes.js";
import { archivedRoutes } from "./modules/archived/archived.routes.js";
import { aiRoutes } from "./modules/aiRoutes/aiRoutes.routes.js";

import { methodGuard } from "./middleware/methodGuard.js";
import { uploadRoutes } from "./routes/upload.routes.js";

export async function buildApp() {
  const app = Fastify({ logger: true });

  registerErrorHandler(app);

  await registerCors(app);
  await registerJwt(app);
  await registerMultipart(app);
  await registerStatic(app);

  await app.register(authRoutes, { prefix: "/api/auth" });
  await app.register(aiRoutes, { prefix: "/api/aiRoutes" });

  await app.register(
    async (instance) => {
      instance.addHook("preHandler", methodGuard);
      await instance.register(userRoutes);
    },
    { prefix: "/api/users" },
  );

  await app.register(
    async (instance) => {
      instance.addHook("preHandler", methodGuard);
      await instance.register(articleRoutes);
    },
    { prefix: "/api/articles" },
  );

  await app.register(
    async (instance) => {
      instance.addHook("preHandler", methodGuard);
      await instance.register(perspectiveRoutes);
    },
    { prefix: "/api/perspectives" },
  );

  await app.register(
    async (instance) => {
      instance.addHook("preHandler", methodGuard);
      await instance.register(categoryRoutes);
    },
    { prefix: "/api/categories" },
  );

  await app.register(
    async (instance) => {
      instance.addHook("preHandler", methodGuard);
      await instance.register(archivedRoutes);
    },
    { prefix: "/api/archived" },
  );

  await app.register(uploadRoutes, {
    prefix: "/api/upload",
  });

  return app;
}

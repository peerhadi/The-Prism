import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import sensible from "@fastify/sensible";
import multipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";

import fetch from "node-fetch";
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

import { env } from "./shared/env.js";
import { prisma } from "./shared/prisma.js";

import { authRoutes } from "./modules/auth/auth.routes.js";
import { userRoutes } from "./modules/users/user.routes.js";
import { articleRoutes } from "./modules/articles/article.routes.js";
import { perspectiveRoutes } from "./modules/perspectives/perspective.routes.js";
import { categoryRoutes } from "./modules/categories/category.routes.js";
import { archivedRoutes } from "./modules/archived/archived.routes.js";
import { aiRoutes } from "./modules/aiRoutes/aiRoutes.routes.js";

import { startRSSJob } from "./jobs/rss.jobs.js";
import { seedAdmin } from "./jobs/seedAdmin.js";

/* -------------------------------------------------------
   APP INIT
------------------------------------------------------- */

const app = Fastify({ logger: true });

/* -------------------------------------------------------
   GLOBAL ERROR HANDLER
------------------------------------------------------- */

app.setErrorHandler((err, req, reply) => {
  req.log.error(err);
  reply.code(500).send({
    error: "Internal Server Error",
    message: err.message,
  });
});

/* -------------------------------------------------------
   AUTH HELPERS (kept in same file intentionally)
------------------------------------------------------- */

app.decorate("authenticate", async (request: any, reply: any) => {
  await request.jwtVerify();
});

app.decorate("adminOnly", async (request: any, reply: any) => {
  await request.jwtVerify();

  const userId = request.user?.sub;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return reply.code(401).send({ error: "Unauthorized" });
  }

  if (user.role !== "ADMIN") {
    return reply.code(403).send({ error: "Admin only" });
  }
});

/* -------------------------------------------------------
   PLUGINS
------------------------------------------------------- */

await app.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
});

await app.register(jwt, {
  secret: env.JWT_SECRET,
});

await app.register(sensible);
await app.register(multipart);

/* static uploads */
await app.register(fastifyStatic, {
  root: path.join(process.cwd(), "uploads"),
  prefix: "/uploads/",
});

/* -------------------------------------------------------
   BACKGROUND JOBS
------------------------------------------------------- */

startRSSJob();
await seedAdmin();

/* -------------------------------------------------------
   ROUTES
------------------------------------------------------- */
function methodBasedGuard(app: any) {
  app.addHook("preHandler", async (request: any, reply: any) => {
    const method = request.method;

    // Allow all GET requests
    if (method === "GET") return;

    await request.jwtVerify();

    const userId = request.user?.sub;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return reply.code(401).send({ error: "Unauthorized" });
    }

    // Allow PUT if user is updating their own profile
    console.log(request);
    const isUserRoute =
      request.url.split("/").includes("api") &&
      request.url.split("/").includes("users") &&
      method === "PUT";

    if (isUserRoute) {
      const targetId = (request.params as any)?.id;

      if (targetId === userId) return; // allow self-update
    }

    // Everything else requires admin
    if (user.role !== "ADMIN") {
      return reply.code(403).send({ error: "Admin only" });
    }
  });
}
await app.register(authRoutes, { prefix: "/api/auth" });
await app.register(aiRoutes, { prefix: "/api/aiRoutes" });
await app.register(
  async function (instance) {
    methodBasedGuard(instance);
    await instance.register(userRoutes);
  },
  { prefix: "/api/users" },
);

await app.register(
  async function (instance) {
    methodBasedGuard(instance);
    await instance.register(articleRoutes);
  },
  { prefix: "/api/articles" },
);

await app.register(
  async function (instance) {
    methodBasedGuard(instance);
    await instance.register(perspectiveRoutes);
  },
  { prefix: "/api/perspectives" },
);

await app.register(
  async function (instance) {
    methodBasedGuard(instance);
    await instance.register(categoryRoutes);
  },
  { prefix: "/api/categories" },
);

await app.register(
  async function (instance) {
    methodBasedGuard(instance);
    await instance.register(archivedRoutes);
  },
  { prefix: "/api/archived" },
);

/* -------------------------------------------------------
   FILE UPLOAD ROUTE
------------------------------------------------------- */

app.post("/api/upload", async (request, reply) => {
  const file = await request.file();

  if (!file) {
    return reply.code(400).send({ error: "No file uploaded" });
  }

  const ext = path.extname(file.filename) || ".jpg";
  const filename = crypto.randomUUID() + ext;

  const uploadDir = path.join(process.cwd(), "uploads");
  await fs.mkdir(uploadDir, { recursive: true });

  const filepath = path.join(uploadDir, filename);
  await fs.writeFile(filepath, await file.toBuffer());

  return {
    imageUrl: `http://localhost:8080/uploads/${filename}`,
  };
});

/* -------------------------------------------------------
   GITHUB OAUTH (kept inline but cleaned)
------------------------------------------------------- */

app.post("/api/auth/github", async (req, reply) => {
  try {
    const { code } = req.body as any;

    if (!code) {
      return reply.code(400).send({ error: "Missing code" });
    }

    const tokenRes = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      },
    );

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return reply.code(401).send(tokenData);
    }

    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const githubUser = await userRes.json();

    return {
      user: githubUser,
      token: tokenData.access_token,
    };
  } catch (err: any) {
    req.log.error(err);
    return reply.code(500).send({ error: "OAuth failed" });
  }
});

/* -------------------------------------------------------
   START SERVER
------------------------------------------------------- */

await app.listen({
  port: env.PORT,
  host: "0.0.0.0",
});

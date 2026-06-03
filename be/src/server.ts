import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import sensible from "@fastify/sensible";
import fetch from "node-fetch";
import { startRSSJob } from "./jobs/rss.jobs.js";

import { env } from "./shared/env.js";

import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { userRoutes } from "./modules/users/user.routes.js";
import { articleRoutes } from "./modules/articles/article.routes.js";
import { perspectiveRoutes } from "./modules/perspectives/perspective.routes.js";
import { categoryRoutes } from "./modules/categories/category.routes.js";
import { archivedRoutes } from "./modules/archived/archived.routes.js";
import multipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import path from "path";

import fp from "fastify-plugin";
const app = Fastify();
await app.register(multipart);
app.decorate("authenticate", async (request, reply) => {
  await request.jwtVerify();
});
export default fp(async (app) => {
  app.decorate("authenticate", async (request: any, reply: any) => {
    await request.jwtVerify();
  });
});
startRSSJob();
app.setErrorHandler((err, req, reply) => {
  console.error(err);

  reply
    .code(500)
    .send({ error: "Internal Server Error", message: err.message });
});
// ---------------- CORS ----------------
await app.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
});

// ---------------- JWT ----------------
await app.register(jwt, {
  secret: env.JWT_SECRET,
});

// ---------------- UTIL ----------------
await app.register(sensible);

// ---------------- ROUTES ----------------
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

await app.register(fastifyStatic, {
  root: path.join(process.cwd(), "uploads"),
  prefix: "/uploads/",
});

await app.register(archivedRoutes, {
  prefix: "/api/archived",
});

app.post("/api/upload", async (request, reply) => {
  const file = await request.file();

  if (!file) {
    return reply.code(400).send({
      error: "No file uploaded",
    });
  }

  const ext = path.extname(file.filename) || ".jpg";

  const filename = crypto.randomUUID() + ext;

  const uploadDir = path.join(process.cwd(), "uploads");

  await fs.mkdir(uploadDir, {
    recursive: true,
  });

  const filepath = path.join(uploadDir, filename);

  await fs.writeFile(filepath, await file.toBuffer());

  return {
    imageUrl: `http://localhost:8080/uploads/${filename}`,
  };
});
// ======================================================
// ✅ GITHUB OAUTH CALLBACK (THIS IS WHAT YOU WERE MISSING)
// ======================================================
app.post("/api/auth/github", async (req, reply) => {
  console.log("➡️ HIT GITHUB ROUTE");

  const start = Date.now();

  try {
    const { code } = req.body as any;

    console.log("CODE:", code);

    if (!code) {
      console.log("❌ NO CODE");
      return reply.code(400).send({ error: "Missing code" });
    }

    // 1. Exchange token
    console.log("➡️ exchanging code");

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

    console.log("TOKEN RESPONSE:", tokenData);

    if (!tokenData.access_token) {
      console.log("❌ NO ACCESS TOKEN");
      return reply.code(401).send(tokenData);
    }

    // 2. Fetch user
    console.log("➡️ fetching user");

    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const user = await userRes.json();

    console.log("USER:", user);

    console.log("✅ DONE in", Date.now() - start, "ms");

    return {
      user,
      token: tokenData.access_token,
    };
  } catch (err) {
    console.error("🔥 CRASH:", err);
    return reply.code(500).send({ error: "OAuth failed" });
  }
});
// ---------------- START SERVER ----------------
await app.listen({
  port: env.PORT,
  host: "0.0.0.0",
});

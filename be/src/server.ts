import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import sensible from "@fastify/sensible";
import fetch from "node-fetch";

import { env } from "./shared/env.js";

import { authRoutes } from "./modules/auth/auth.routes.js";
import { userRoutes } from "./modules/users/user.routes.js";
import { articleRoutes } from "./modules/articles/article.routes.js";
import { perspectiveRoutes } from "./modules/perspectives/perspective.routes.js";
import { categoryRoutes } from "./modules/categories/category.routes.js";
import { archivedRoutes } from "./modules/archived/archived.routes.js";

const app = Fastify();
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

await app.register(archivedRoutes, {
  prefix: "/api/archived",
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

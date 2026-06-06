import { buildApp } from "./app.js";

import { env } from "./shared/env.js";

import { startRSSJob } from "./jobs/rss.jobs.js";
import { seedAdmin } from "./jobs/seedAdmin.js";

const app = await buildApp();

startRSSJob();
await seedAdmin();

await app.listen({
  port: env.PORT,
  host: "0.0.0.0",
});

import Fastify from "fastify";
import awsLambdaFastify from "@fastify/aws-lambda";
import { buildApp } from "@/app.js";

const app = await buildApp();

const proxy = awsLambdaFastify(app);

export const handler = proxy;

import { join } from "path";
import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import { FastifyPluginAsync } from "fastify";
import FastifyCors from "@fastify/cors";
import categoryRoutes from "./controllers/category.controller";

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  const ALLOWED_DOMAINS = (process.env.ALLOWED_DOMAINS as string).split(",");
  fastify.register(FastifyCors, {
    origin: ALLOWED_DOMAINS,
  });

  // Register the category routes
  fastify.register(categoryRoutes);

  // This loads all plugins defined in plugins
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  // This loads all plugins defined in routes
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: opts,
  });
};

export default app;
export { app, options };

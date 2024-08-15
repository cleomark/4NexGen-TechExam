import Fastify from "fastify";
import app from "./app";

const server = Fastify({
  logger: true,
});

server.register(app);

server.listen({ port: 3000 }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on http://localhost:3000`);
});

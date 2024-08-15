import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function categoryRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/category",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { category_name } = request.body as any;
      const category = await prisma.category.create({
        data: { category_name },
      });
      reply.send(category);
    }
  );

  fastify.get(
    "/categories",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const categories = await prisma.category.findMany();
      reply.send(categories);
    }
  );

  fastify.put(
    "/category/:id",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params as any;
      const { category_name } = request.body as any;
      const category = await prisma.category.update({
        where: { id: Number(id) },
        data: { category_name },
      });
      reply.send(category);
    }
  );

  fastify.delete(
    "/category/:id",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params as any;
      await prisma.category.delete({ where: { id: Number(id) } });
      reply.send({ message: "Category deleted successfully" });
    }
  );
}

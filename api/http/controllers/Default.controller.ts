import type { FastifyReply, FastifyRequest } from 'fastify';

export default class {
  public static async hello(
    req: FastifyRequest<{ Querystring: { name: string } }>,
    reply: FastifyReply
  ) {
    const { name } = req.query;

    reply.code(200).send({ hello: name ?? 'world' });
  }
}

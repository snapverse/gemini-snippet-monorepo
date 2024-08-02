import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

fastify.get('/', async () => {
  return { hello: 'world' };
});

fastify.listen({ port: 5000 }).catch((reason) => {
  fastify.log.error(reason);
  process.exit(1);
});

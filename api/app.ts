import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import Fastify from 'fastify';

import env from './env';
import DefaultRoutes from './routes/Default.routes';
import GeminiRoutes from './routes/Gemini.routes';
import { SWAGGER_OPTIONS, SWAGGER_UI_OPTIONS } from './swagger/options';

(async () => {
  const fastify = Fastify({ logger: true });

  await fastify.register(swagger, SWAGGER_OPTIONS);
  await fastify.register(swaggerUI, SWAGGER_UI_OPTIONS);

  await fastify.register(cors, {
    methods: ['*'],
    origin: '*'
  });

  fastify.register(DefaultRoutes);
  fastify.register(GeminiRoutes, { prefix: '/gemini' });

  await fastify.ready();
  fastify.swagger();

  fastify.listen(
    {
      port: Number(env.SERVER_PORT) ?? 3000,
      host: env.SERVER_HOST ?? '0.0.0.0'
    },
    (reason) => {
      if (reason) {
        fastify.log.error(reason);
        process.exit(1);
      }
    }
  );
})();

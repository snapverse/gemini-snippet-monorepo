import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

import DefaultController from '@/http/controllers/Default.controller';

export default function (
  fastify: FastifyInstance,
  _options: FastifyPluginOptions,
  done: (err?: Error) => void
) {
  fastify.get(
    '/',
    {
      schema: {
        tags: ['default'],
        summary: 'Just a gretting',
        description: 'Sample endpoint',
        querystring: {
          type: 'object',
          required: [],
          additionalProperties: false,
          properties: {
            name: {
              type: 'string',
              description: 'Type a name'
            }
          }
        },
        response: {
          200: {
            description: 'Successful response',
            type: 'object',
            properties: {
              hello: { type: 'string' }
            }
          }
        }
      }
    },
    DefaultController.hello
  );

  done();
}

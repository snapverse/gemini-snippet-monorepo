import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

import GeminiController from '@/http/controllers/Gemini.controller';

export default function (
  fastify: FastifyInstance,
  _options: FastifyPluginOptions,
  done: (err?: Error) => void
) {
  fastify.get(
    '/generateCodeSnippet',
    {
      schema: {
        tags: ['gemini'],
        description:
          'Creation of a code snippet with the help of a fine-tuned Gemini AI model',
        summary: 'Create code snippet with Gemini AI',
        querystring: {
          type: 'object',
          required: ['prompt'],
          additionalProperties: false,
          properties: {
            prompt: {
              type: 'string',
              description:
                'Google Search query (?q=XXXX) for the generation of the Code Snippet'
            }
          }
        },
        response: {
          201: {
            description: 'Code Snippet created',
            type: 'object',
            required: ['content'],
            properties: {
              id: { type: 'string' },
              created: { type: 'number' },
              model: { type: 'string' },
              count_tokens: { type: 'number' },
              content: {
                type: 'object',
                required: ['code_snippet', 'language', 'explanation'],
                properties: {
                  finish_reason: { type: 'string' },
                  code_snippet: { type: 'string' },
                  language: { type: 'string' },
                  explanation: { type: 'string' }
                }
              }
            }
          }
        }
      }
    },
    GeminiController.generateCodeSnippet
  );

  done();
}

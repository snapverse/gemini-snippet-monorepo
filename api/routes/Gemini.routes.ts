import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

import GeminiController from '@/http/controllers/Gemini.controller';

export default function (
  fastify: FastifyInstance,
  _options: FastifyPluginOptions,
  done: (err?: Error) => void
) {
  fastify.post(
    '/generateCodeSnippet',
    {
      schema: {
        tags: ['gemini'],
        description:
          'Creation of a code snippet with the help of a fine-tuned Gemini AI model',
        summary: 'Create code snippet with Gemini AI',
        body: {
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

  fastify.patch(
    '/isCodeRelatedResearch',
    {
      schema: {
        tags: ['gemini'],
        description:
          "A trained Gemini model attempts to respond with 'Yes' or 'No' based on the 'research' parameter of the endpoint, determining if the research topic is related to code.",
        summary: 'Detect if the research if code related',
        body: {
          type: 'object',
          required: ['research'],
          additionalProperties: false,
          properties: {
            research: {
              type: 'string',
              description:
                'Google Search query (?q=XXXX) used to determine if the research topic is related to code.'
            }
          }
        },
        response: {
          200: {
            description: 'Yes',
            content: {
              'text/plain': {
                schema: {
                  examples: ['Yes', 'No'],
                  type: 'string'
                }
              }
            }
          },
          204: {
            description: 'No',
            content: {
              'text/plain': {
                schema: {
                  examples: [''],
                  type: 'string'
                }
              }
            }
          }
        }
      }
    },
    GeminiController.isCodeRelatedResearch
  );

  done();
}

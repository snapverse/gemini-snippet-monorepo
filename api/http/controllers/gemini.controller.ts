import type { FastifyReply, FastifyRequest } from 'fastify';

import genId from '@/helpers/genId';
import CodeSnippet from '@/models/CodeSnippet';
import gemini from '@/training/gemini';
import gen from '@/training/gen';

export default class {
  public static async generateCodeSnippet(
    req: FastifyRequest<{ Querystring: { prompt: string } }>,
    reply: FastifyReply
  ) {
    const codeSnippet = await gen.codeSnippet(req.query.prompt);

    const [explanation, language] = await Promise.all([
      gen.explanation(codeSnippet),
      gen.programmingLanguage(codeSnippet)
    ]);

    reply.code(201).send({
      id: `${gemini.model.split('/')[1]}_${genId()}`,
      created: Date.now(),
      model: gemini.model,
      count_tokens: 999,
      content: {
        finish_reason: 'stop',
        code_snippet: codeSnippet,
        language: language,
        explanation: explanation
      }
    });

    CodeSnippet.insert({
      code: codeSnippet,
      explanation: explanation,
      language: language
    });
  }
}

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
      gen.explanation({ prompt: req.query.prompt, codeSnippet }),
      gen.programmingLanguage(codeSnippet)
    ]);

    reply.code(201).send({
      id: `${gemini.model.split('/')[1]}_${genId()}`,
      created: Date.now(),
      model: gemini.model,
      count_tokens: 999,
      content: {
        finish_reason: 'stop',
        code_snippet: codeSnippet.substring(
          codeSnippet.indexOf('\n') + 1,
          codeSnippet.lastIndexOf('\n') - 1
        ),
        language: language,
        explanation: explanation
      }
    });

    CodeSnippet.insert({
      prompt: req.query.prompt,
      code: codeSnippet,
      explanation: explanation,
      language: language
    }).catch(console.error);
  }

  public static async isCodeRelatedResearch(
    req: FastifyRequest<{ Querystring: { research: string } }>,
    reply: FastifyReply
  ) {
    const text = await gen.isCodeRelatedResearch(req.query.research);

    reply.type('text/plain');

    if (text.trim() === 'Yes') {
      return reply.code(200).send('Yes');
    } else {
      return reply.code(204).send('No'); // fastify seems to delete this if 204
    }
  }
}

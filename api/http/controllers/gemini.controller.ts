import type { FastifyReply, FastifyRequest } from 'fastify';

import genId from '@/helpers/genId';
import gemini from '@/training/gemini';

export default class {
  public static async generateCodeSnippet(
    req: FastifyRequest<{ Querystring: { prompt: string } }>,
    reply: FastifyReply
  ) {
    const genCodeSnippet = async () => {
      const prompt = `Generate a single code snippet on this prompt: ${req.query.prompt}`;
      const result = await gemini.generateContent(prompt);
      const response = result.response;
      const usage = Object.values(response.usageMetadata).reduce(
        (prev, curr) => prev + curr,
        0
      );
      return { text: response.text(), usage };
    };

    const genProgrammingLanguage = async (codeSnippet: string) => {
      const prompt = `Return ONLY the language used from this code snippet (if the language have symbols use the chars versions): ${codeSnippet}`;
      const result = await gemini.generateContent(prompt, {});
      const response = result.response;
      const usage = Object.values(response.usageMetadata).reduce(
        (prev, curr) => prev + curr,
        0
      );
      return { text: response.text(), usage };
    };

    const genExplanation = async (codeSnippet: string) => {
      const prompt = `Make a pretty short explanation of what this code snippet does and is: ${codeSnippet}`;
      const result = await gemini.generateContent(prompt);
      const response = result.response;

      const usage = Object.values(response.usageMetadata).reduce(
        (prev, curr) => prev + curr,
        0
      );
      return { text: response.text(), usage };
    };

    const codeSnippet = await genCodeSnippet();

    const [explanation, language] = await Promise.all([
      genExplanation(codeSnippet.text),
      genProgrammingLanguage(codeSnippet.text)
    ]);

    reply.code(201).send({
      id: `${gemini.model.split('/')[1]}_${genId()}`,
      created: Date.now(),
      model: gemini.model,
      count_tokens: codeSnippet.usage + explanation.usage + language.usage,
      content: {
        finish_reason: 'stop',
        code_snippet: codeSnippet.text,
        language: language.text,
        explanation: explanation.text
      }
    });
  }
}

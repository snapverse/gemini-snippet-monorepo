import processCsv from '@/helpers/processCsv';
import gemini from './gemini';

export default {
  async codeSnippet(prompt: string) {
    const csv = await processCsv('/training/datasets/datasets.csv');

    const parts = csv.flatMap(([, input, output]) => [
      { text: input },
      { text: output }
    ]);

    const result = await gemini.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: "Based on a prompt (coming from the user's Google research query) I need you to generate a useful code snippet, DO NOT EXPLAIN the code, we need code snippet solutions."
            },
            ...parts,
            {
              text: `google_research: ${prompt}`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 1.25,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        stopSequences: ['---', 'None'],
        responseMimeType: 'text/plain'
      }
    });

    return result.response.text();
  },
  async programmingLanguage(codeSnippet: string) {
    const parts = [
      { text: 'Return ONLY the language used from this code snippet.' },
      {
        text: 'code_snippet: #include <iostream> int main() { std::cout << "Hello, World!" << std::endl; return 0; }'
      },
      { text: 'language: C++' },
      {
        text: 'code_snippet: def greet(name):\n    print(f"Hello, {name}! Welcome to Python programming.")\n\n# Example usage:\ngreet("Sandra")'
      },
      { text: 'language: Python' },
      {
        text: 'code_snippet: function add(a: number, b: number): number {\n    return a + b;\n}\n\n// Example usage:\nconst result = add(5, 3);\nconsole.log(`The sum is ${result}`);'
      },
      { text: 'language: TypeScript' },
      {
        text: "code_snippet: document.getElementById('myElement').textContent = 'Hello, JavaScript!';"
      },
      { text: 'language: JavaScript' },
      { text: `code_snippet: ${codeSnippet}` }
    ];

    const result = await gemini.generateContent({
      contents: [{ role: 'user', parts }]
    });

    return result.response.text().trim();
  },
  async explanation(codeSnippet: string) {
    const prompt = `Make a pretty short explanation of this code: ${codeSnippet}`;

    const result = await gemini.generateContent(prompt);

    return result.response.text().trim();
  }
};

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
        temperature: 0.85,
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
  async explanation(props: { prompt: string; codeSnippet: string }) {
    const prompt = `The user provided the following prompt to generate a code snippet:
    * Code Snippet: ${props.codeSnippet}
    * User's Prompt: ${props.prompt}

    Please explain how to accomplish the task described by the user, based on the provided code snippet.`;

    const result = await gemini.generateContent(prompt);

    return result.response.text().trim();
  },
  async isCodeRelatedResearch(prompt: string) {
    const history = [
      {
        role: 'user',
        parts: [
          {
            text: "Your purpose is to respond only with 'Yes' or 'No' based on whether the research topic is related to fields like IoT, Programming, Development, DevOps, Data Science, Machine Learning, Artificial Intelligence, etc. If the topic is related to any other field, such as Geography, Social Media, Animals, or anything outside the mentioned domains, respond with 'No'. Provide no other explanations or details."
          },
          { text: 'How to optimize SQL queries for large databases' }
        ]
      },
      {
        role: 'model',
        parts: [{ text: 'Yes' }]
      },
      {
        role: 'user',
        parts: [{ text: 'Difference between GET and POST methods in HTTP' }]
      },
      {
        role: 'model',
        parts: [{ text: 'Yes' }]
      },
      {
        role: 'user',
        parts: [{ text: 'Impact of climate change on polar bear populations' }]
      },
      {
        role: 'model',
        parts: [{ text: 'No' }]
      },
      {
        role: 'user',
        parts: [
          { text: 'Best practices for asynchronous programming in JavaScript' }
        ]
      },
      {
        role: 'model',
        parts: [{ text: 'Yes' }]
      },
      {
        role: 'user',
        parts: [
          { text: 'History and cultural significance of Día de los Muertos' }
        ]
      },
      {
        role: 'model',
        parts: [{ text: 'No' }]
      },
      {
        role: 'user',
        parts: [{ text: 'How to optimize SQL queries for large databases' }]
      },
      {
        role: 'model',
        parts: [{ text: 'Yes \n' }]
      }
    ];

    const chatSession = gemini.startChat({
      history,
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: 'text/plain'
      }
    });

    const result = await chatSession.sendMessage(prompt);

    return result.response.text().trim();
  }
};

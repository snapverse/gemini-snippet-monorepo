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
    const history = [
      {
        role: 'user',
        parts: [
          {
            text: 'Return ONLY the language used of this code snippet, priorize the chars versions of the languages.'
          },
          {
            text: '```cpp\n#include <iostream> int main() { std::cout << "Hello, World!" << std::endl; return 0; }\n```'
          }
        ]
      },
      {
        role: 'model',
        parts: [{ text: 'Cpp' }]
      },
      {
        role: 'user',
        parts: [
          {
            text: '```python\ndef greet(name):\n    print(f"Hello, {name}! Welcome to Python programming.")\n\n# Example usage:\ngreet("Sandra")\n```'
          }
        ]
      },
      {
        role: 'model',
        parts: [{ text: 'Python' }]
      },
      {
        role: 'user',
        parts: [
          {
            text: '```typescript\nfunction add(a: number, b: number): number {\n    return a + b;\n}\n\n// Example usage:\nconst result = add(5, 3);\nconsole.log(`The sum is ${result}`);\n```'
          }
        ]
      },
      {
        role: 'model',
        parts: [{ text: 'TypeScript' }]
      },
      {
        role: 'user',
        parts: [
          {
            text: '```javascript\ndocument.getElementById("myElement").textContent = "Hello, JavaScript!";\n```'
          }
        ]
      },
      {
        role: 'model',
        parts: [{ text: 'JavaScript' }]
      }
    ];

    const chatSession = gemini.startChat({
      history,
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 256,
        responseMimeType: 'text/plain'
      }
    });

    const result = await chatSession.sendMessage(codeSnippet);

    return result.response.text().trim();
  },
  async explanation(props: { prompt: string; codeSnippet: string }) {
    const prompt = `The user provided the following prompt to generate a code snippet:
    * Code Snippet: ${props.codeSnippet}
    * User's Prompt: ${props.prompt}

    Please explain how to accomplish the task described by the user, based on the provided code snippet in 200 characters or less.`;

    const result = await gemini.generateContent(prompt);

    return result.response.text().trim();
  },
  async isCodeRelatedResearch(prompt: string) {
    const history = [
      {
        role: 'user',
        parts: [
          {
            text: "Your purpose is to respond ONLY WITH 'Yes' or 'No' based on whether the research topic is related to fields like IoT, Programming, Algorithms, Development, DevOps, Data Science, Machine Learning, Artificial Intelligence..."
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
        parts: [{ text: 'How to print a variable in C++' }]
      },
      {
        role: 'model',
        parts: [{ text: 'Yes' }]
      },
      {
        role: 'user',
        parts: [{ text: '¿Cómo hacer una autentificación con Google?' }]
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
        parts: [{ text: 'Yes' }]
      }
    ];

    const chatSession = gemini.startChat({
      history,
      generationConfig: {
        temperature: 2,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 64,
        responseMimeType: 'text/plain'
      }
    });

    const result = await chatSession.sendMessage(prompt.trim());

    return result.response.text().trim();
  }
};

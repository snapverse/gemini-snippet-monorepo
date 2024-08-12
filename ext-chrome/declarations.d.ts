declare const MONOREPO_ROOT: string;

declare namespace ApiModels {
  export interface CodeSnippetBody {
    content: {
      code_snippet: string;
      language: string;
      explanation: string;
      finish_reason: string;
    };
    id: string;
    created: number;
    model: string;
    count_tokens: number;
  }
}
